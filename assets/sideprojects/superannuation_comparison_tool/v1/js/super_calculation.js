"use strict";

// update contribution amount and form label based on frequency input -------------------

var freqtext = {
    '52': 'week',
    '26': 'fortnight',
    '12': 'month',
    '4': 'quarter',
    '2': '6 months',
    '1': 'year'
};

var saveFreq = parseFloat($('#savefreq').val());
var feeFreq = parseFloat($('#flatfeefreq').val());
var origSaveFreq = 0;
var origBalance = 0;
var origFeeFreq = 0;
var origFee = 0;
var chart;

function updateContributionsLabel() {
  $('#savingsLabel').text('Contribution amount per ' + freqtext[saveFreq] + ' (pre-tax)');
}

updateContributionsLabel();

$('#savefreq').change(function () {
  var newFreq = parseFloat($('#savefreq').val());
  if (newFreq == saveFreq) return;
  var oldFreq = saveFreq;
  saveFreq = newFreq;
  updateContributionsLabel();
  if (origSaveFreq == 0 || Number.isNaN(origBalance)) {
    origSaveFreq = oldFreq;
    origBalance = parseFloat($('#savamount').val());
  }
  if (Number.isNaN(origBalance)) return;
  $('#savamount').val(Math.round(origBalance / newFreq * origSaveFreq));
});

$('#savamount').change(function () {
  origSaveFreq = 0;
});

// update fee amount and form label based on frequency input ----------------------------

function updateFeesLabel() {
  $('#feesLabel').text('Total flat fees per ' + freqtext[feeFreq]);
}

updateFeesLabel();

$('#flatfeefreq').change(function () {
  var newFeeFreq = parseFloat($('#flatfeefreq').val());
  if (newFeeFreq == feeFreq) return;
  var oldFeeFreq = feeFreq;
  feeFreq = newFeeFreq;
  updateFeesLabel();
  if (origFeeFreq == 0 || Number.isNaN(origFee)) {
    origFeeFreq = oldFeeFreq;
    origFee = parseFloat($('#flatfeeamount').val());
  }
  if (Number.isNaN(origFee)) return;
  $('#flatfeeamount').val(Math.round(origFee / newFeeFreq * origFeeFreq));
});

$('#flatfeeamount').change(function () {
  origFeeFreq = 0;
});

// update calculation based on number of years to simulate ------------------------------
var years = 30 // default

$('#numyears').change(function () {
  years = parseInt($('#numyears').val());
  updateCalc();
});

var concessional_tax_rate = 0.15;

// update calculation -------------------------------------------------------------------

function updateCalc() {
  var res = $('#result').hide();

  // starting balance
  var current_balance = parseFloat($('#currbal').val());

  // contribution amount and frequency
  var contribution_amount = parseFloat($('#savamount').val());
  var contributions_per_year = saveFreq;
  var total_annual_contribution = contribution_amount * contributions_per_year;
  var total_annual_contribution_posttax = total_annual_contribution * (1 - concessional_tax_rate);

  // subtract annualised flat fee
  var annual_flat_fee = parseFloat($('#flatfeeamount').val()) * feeFreq;
  var annual_net_contribution = total_annual_contribution_posttax - annual_flat_fee

  // investment return rate
  var investment_return_rate = parseFloat($('#investreturns').val());
  var annual_compounding_rate = 1 + investment_return_rate / 100

  // subtract annual percentage fee
  var annual_percentage_fee = parseFloat($('#percfee').val());
  var net_investment_return_rate = investment_return_rate - annual_percentage_fee
  var net_compounding_rate = 1 + net_investment_return_rate / 100

  // calculate final balance
  if (net_investment_return_rate == 0) {
    final_balance = current_balance + annual_net_contribution * years
  } else {
    var original_balance_w_interest = current_balance * Math.pow(net_compounding_rate, years)
    var total_annuity = annual_net_contribution * (Math.pow(net_compounding_rate, years + 1) - 1) / (net_investment_return_rate / 100)
    var final_balance = original_balance_w_interest + total_annuity
  }

  var output_currbal;
  output_currbal = "Your projected balance after " + years + " years would be $" + Math.round(final_balance).toLocaleString() + '.';
  res.html(output_currbal).show();

  updateChart(current_balance, annual_net_contribution, net_investment_return_rate, net_compounding_rate);

}

// update chart -------------------------------------------------------------------------

function updateChart(current_balance, annual_net_contribution, net_investment_return_rate, net_compounding_rate) {
  $('#chart').show();

  var data = [];
  var labels = [];

  for (var year = 0; year <= years; year++) {
    if (net_investment_return_rate == 0) {
      data.push(current_balance + annual_net_contribution * year)
    } else {
      data.push(current_balance + annual_net_contribution * (Math.pow(net_compounding_rate, year) - 1) / (net_investment_return_rate / 100))
    }
    labels.push("Year " + year)
  };

  if (typeof chart =='undefined') {
    var ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          borderWidth: 1,
          borderColor: "#8e1600",
          backgroundColor: "#8e1600",
          pointBackgroundColor: "#8e1600",
          pointBorderColor: "#8e1600",
          fill: false
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label;
              var dollars = Math.round(tooltipItem.value).toLocaleString();
              return label + ': $' + dollars;
            }
          }
        }
      }
    });
  }

  chart.data.labels = labels;
  chart.data.datasets[0].label = 'Projected balance';
  chart.data.datasets[0].data = data;

  chart.update();

}

$('#supercalc').change(updateCalc);
updateCalc();
