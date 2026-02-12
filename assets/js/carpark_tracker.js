 const DATA_URL = "https://nathanwangly.github.io/nsw-park-ride-tracker/data/processed/insights.json?v=" + new Date().getTime();
//const DATA_URL = "/dummy_insights.json";

let chartInstance = null;
let allData = [];

async function initTracker() {
    // Get UI Elements
    const facilitySelect = document.getElementById('facilitySelect');
    const daySelect = document.getElementById('daySelect');
    const holidayToggle = document.getElementById('holidayToggle');

    // Robustness check: Ensure elements exist before proceeding
    if (!facilitySelect || !daySelect || !holidayToggle) return;

    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error("Network response was not ok");
        allData = await response.json();

        // 1. Get unique facilities and standard days
        const facilities = [...new Set(allData.map(item => item.facility))].sort();
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        // 2. Populate Facility Dropdown
        facilitySelect.innerHTML = ""; // Clear "Loading..."
        facilities.forEach(f => {
            const opt = document.createElement('option');
            opt.value = f;
            opt.innerText = f;
            facilitySelect.appendChild(opt);
        });

        // 3. Populate Day Dropdown
        daySelect.innerHTML = "";
        days.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d;
            opt.innerText = d;
            daySelect.appendChild(opt);
        });

        // 4. Set default to today's day
        const today = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
        if (days.includes(today)) daySelect.value = today;

        // 5. Attach Listeners
        facilitySelect.addEventListener('change', updateSelection);
        daySelect.addEventListener('change', updateSelection);
        holidayToggle.addEventListener('change', updateSelection);

        // 6. First run
        updateSelection();

    } catch (error) {
        console.error("Initialization Error:", error);
    }
}

function updateSelection() {
    const facility = document.getElementById('facilitySelect').value;
    const day = document.getElementById('daySelect').value;
    const isSchoolHoliday = document.getElementById('holidayToggle').checked;
    const statusText = isSchoolHoliday ? "School Holiday" : "Normal Period";

    const canvas = document.getElementById('occupancyChart');
    const noData = document.getElementById('noDataCard');
    const results = document.getElementById('resultsContainer');

    const match = allData.find(item => 
        item.facility === facility && 
        item.day === day && 
        item.status === statusText
    );

    if (match) {
        canvas.style.display = "block";
        noData.style.display = "none";
        results.style.display = "block";
        renderChart(match);
        updateSummary(match);
    } else {
        canvas.style.display = "none";
        noData.style.display = "flex";
        results.style.display = "none";
    }
}

function updateSummary(item) {
    const fillEl = document.getElementById('fillTime');
    const emptyEl = document.getElementById('emptyTime');
    const warningElement = document.getElementById('lowDataWarning');

    const statusMap = {
        "Normal Period": "regular",
        "School Holiday": "school holiday"
    };
    const displayStatus = statusMap[item.status] || item.status.toLowerCase();
    const displayEmptyTime = item.summary.empty_time.toLowerCase();

    // 1. Phrasing Logic
    if (item.summary.fill_time === "Rarely full") {
        fillEl.innerHTML = `<span><strong>${item.facility}</strong> is <strong>rarely full</strong> on ${displayStatus} ${item.day}s.</span>`;
        emptyEl.style.display = "none"; 
    } else {
        fillEl.innerHTML = `<span><strong>${item.facility}</strong>&nbsp;is typically full by&nbsp;<strong>${item.summary.fill_time}</strong>&nbsp;on ${displayStatus} ${item.day}s.</span>`;
        emptyEl.style.display = "flex";
        emptyEl.innerHTML = `<span>Spaces usually begin to become available from&nbsp;<strong>${displayEmptyTime}</strong>.</span>`;
    }

    // 2. Warning Toggle
    warningElement.style.display = item.low_data_warning ? "flex" : "none";
}

function renderChart(item) {
    const ctx = document.getElementById('occupancyChart').getContext('2d');
    const z = 2.576; 

    const labels = item.series.map(d => d.label);
    const means = item.series.map(d => d.avg);
    const upperCI = item.series.map(d => d.avg + (z * d.se));
    const lowerCI = item.series.map(d => Math.max(0, d.avg - (z * d.se)));

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Average spots available',
                    data: means,
                    borderColor: '#0062ff',
                    backgroundColor: '#0062ff',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: false,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    zIndex: 10
                },
                {
                    label: 'Typical range',
                    data: upperCI,
                    borderColor: 'transparent',
                    borderWidth: 1,
                    backgroundColor: 'rgba(72, 75, 255, 0.12)',
                    pointRadius: 0,
                    fill: '+1', 
                    zIndex: 1,
                    // Disable hover interactions for this dataset
                    hitRadius: 0, 
                    hoverRadius: 0
                },
                {
                    label: 'Lower Bound (Hidden)',
                    data: lowerCI,
                    borderColor: 'transparent',
                    backgroundColor: 'transparent',
                    pointRadius: 0,
                    fill: false,
                    zIndex: 1,
                    // Disable hover interactions for this dataset
                    hitRadius: 0,
                    hoverRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true, // Forces solid icons
                        pointStyle: 'rect',  // Forces standard rectangle shape
                        boxWidth: 12,        // Set specific width
                        boxHeight: 12,       // Set specific height
                        padding: 20,
                        filter: (item) => !item.text.includes('Hidden')
                    }
                },
                tooltip: {
                    padding: 12,
                    boxPadding: 8,
                    usePointStyle: true, // Forces the icon to be a consistent shape
                    boxWidth: 10,        // Forces consistent width
                    boxHeight: 10,       // Forces consistent height
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#1f2937',
                    bodyColor: '#1f2937',
                    borderColor: '#d1d5db',
                    borderWidth: 1,
                    filter: function(tooltipItem) {
                        return tooltipItem.datasetIndex < 2; 
                    },
                    callbacks: {
                        label: function(context) {
                            const index = context.dataIndex;
                            const avg = Math.round(means[index]);
                            const low = Math.round(lowerCI[index]);
                            const high = Math.round(upperCI[index]);

                            if (context.datasetIndex === 0) {
                                return `Average: ${avg} spots`;
                            }
                            if (context.datasetIndex === 1) {
                                return (low === high) 
                                    ? `Typical Range: N/A` 
                                    : `Typical Range: ${low} – ${high}`;
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Available Spots', font: { weight: 'bold' } },
                    grid: { color: '#e5e7eb' }
                },
                x: {
                    grid: { color: '#f3f4f6' },
                    ticks: { autoSkip: true, maxTicksLimit: 8 }
                }
            }
        }
    });
}

// Start the app
window.addEventListener('DOMContentLoaded', initTracker);