"use strict";

$("#super-input-form").change(function() {
    updateCalc();
})

function updateCalc() {

  var concessional_tax_rate = 0.15;
  var inflation_rate = 2;
  var years = parseInt($('#numyears').val());
    // check if greater than 0 and up to 0 decimal places
  if (checkValidValue(years, 0, 0) == false) {
    return;
  }

  var balances_array = new Array(3);
  var fund_name_array = new Array(3);

  for (var n = 1; n < 4; n++) {

    // fund names
    var fund_name = $('#fundname-' + n).val();

    // starting balances
    var current_balance = parseFloat($('#currbal-' + n).val());
      // check if greater than 0 and up to 2 decimal places
    if (checkValidValue(current_balance, 0, 2) == false) {
      return;
    }

    // contribution amount and frequency
    var contribution_amount = parseFloat($('#savamount-' + n).val());
    var contributions_per_year = parseFloat($('#savefreq-' + n).val());
    var total_annual_contribution = contribution_amount * contributions_per_year;
      // check if greater than 0 and up to 2 decimal places
    if (checkValidValue(total_annual_contribution, 0, 2) == false) {
      return;
    }
    var total_annual_contribution_posttax = total_annual_contribution * (1 - concessional_tax_rate);

    // subtract annualised flat fee
    var feeFreq = parseFloat($('#flatfeefreq-' + n).val());
    var annual_flat_fee = parseFloat($('#flatfeeamount-' + n).val()) * feeFreq;
      // check if greater than 0 and up to 2 decimal places
    if (checkValidValue(annual_flat_fee, 0, 2) == false) {
      return;
    }
    var annual_net_contribution = total_annual_contribution_posttax - annual_flat_fee

    // investment return rate
    var investment_return_rate = parseFloat($('#investreturns-' + n).val());
      // check if greater than 0 and up to 2 decimal places
    if (checkValidValue(investment_return_rate, -10, 2) == false) {
      return;
    }

    // subtract annual percentage fee
    var annual_percentage_fee = parseFloat($('#percfee-' + n).val());
      // check if greater than 0 and up to 2 decimal places
    if (checkValidValue(annual_percentage_fee, 0, 2) == false) {
      return;
    }
    var net_investment_return_rate = investment_return_rate - annual_percentage_fee - inflation_rate
    var net_compounding_rate = 1 + net_investment_return_rate / 100

    // calculate yearly balances
    var yearly_balances = [];
    for (var year = 0; year <= years; year++) {
      if (net_investment_return_rate == 0) {
        yearly_balances.push(current_balance + annual_net_contribution * year)
      } else {
        yearly_balances.push(current_balance * Math.pow(net_compounding_rate, year) + annual_net_contribution * (Math.pow(net_compounding_rate, year) - 1) / (net_investment_return_rate / 100))
      }
    };

    balances_array[n-1] = yearly_balances;
    fund_name_array[n-1] = fund_name
  }

  // clear old chart
  clearOldChart();

  if (typeof chart =='undefined') {
    var ctx = document.getElementById('chart').getContext('2d');

    // line data
    var super_1 = {
      label: fund_name_array[0],
      data: balances_array[0],
      fill: false,
      borderColor: 'blue'
    };

    var super_2 = {
      label: fund_name_array[1],
      data: balances_array[1],
      fill: false,
      borderColor: 'red'
    };

    var super_3 = {
      label: fund_name_array[2],
      data: balances_array[2],
      fill: false,
      borderColor: 'green'
    };

    // plot data
    var plotData = {
      labels: Array.from(Array(years+1).keys()),
      //labels: (Array.from(Array(years+1).keys())).map(i => 'Year ' + i),
      datasets: [super_1, super_2, super_3]
    };

    // chart options
    var chartOptions = {
      title: {
        display: true,
        text: "Projected balances after " + years + " years"
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Year"
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: "Projected balance ($)"
          },
          ticks: {
            beginAtZero: true,
            userCallback: function(value, index, values) {
                value = value.toString();
                value = value.split(/(?=(?:...)*$)/);
                value = value.join(',');
                return value;
              }
            }
        }]
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'line'
        }
      },
      tooltips: {
        callbacks: {
          title: function(tooltipItem, data) {
            return 'Year ' + tooltipItem[0].xLabel
          },
          label: function(tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label;
            var dollars = Math.round(tooltipItem.value).toLocaleString();
            return label + ': $' + dollars;
          }
        }
      }
    };

    // draw chart
    var chart = new Chart(ctx, {
      type: 'line',
      data: plotData,
      options: chartOptions
    });

    chart.update();
    $('#chart').show();

  }

}

function clearOldChart() {
  $('#chart').remove();
  $('#chart-container').append('<canvas id="chart" style="display: none"></canvas>')
}

// function to check whether value is greater than 0 and up to 2 decimal places
function checkValidValue(input_variable, min_value, decimal_places) {
  if (input_variable < min_value || !Number.isInteger(Math.pow(10, decimal_places) * input_variable)) {
    return false;
  }
}

updateCalc();
