---
permalink: /superannuation_comparison_tool_v1/
layout: single_custom
title: Super Comparison Tool V1
excerpt: Super Comparison Tool V1
author_profile: true
published: true
---

<html lang ="en">
  <head>
    <title>Superannuation Comparison Tool</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="shortcut icon" href="#" />
    <link rel="stylesheet" href="/assets/sideprojects/superannuation_comparison_tool/v1/css/style_website.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
      <div class="subcontainer">
        <h1>Superannuation Comparison Tool</h1>
        <form id="supercalc" onSubmit="return false;">

          <h3><b>Contributions</b></h3>

          <!-- Starting super balance -->
          <div class="form-group row">
            <label for="currbal" class="col-6 col-form-label">Current balance</label>
            <div class="col-6">
              <div class="input-group">
                <div class="input-group-prepend"><span class="input-group-text">$</span></div>
                <input type="number" class="form-control" id="currbal" value="5000" min="0" step=".01"  required>
              </div>
            </div>
          </div>

          <!-- Contribution frequency -->
          <div class="form-group row">
            <label for="savefreq" class="col-6 col-form-label">Contribution frequency</label>
            <div class="col-6">
              <select class="form-control" id="savefreq">
                <option value="52">Weekly</option>
                <option value="26" selected>Fortnightly</option>
                <option value="12">Monthly</option>
                <option value="4">Quarterly</option>
              </select>
            </div>
          </div>

          <!-- Contribution amount -->
          <div class="form-group row">
            <label id="savingsLabel" for="savamount" class="col-6 col-form-label">Contribution amount</label>
            <div class="col-6">
              <div class="input-group">
                <div class="input-group-prepend"><span class="input-group-text">$</span></div>
                <input type="number" class="form-control" id="savamount" value="250" min="0" step=".01"  required>
              </div>
            </div>
          </div>

          <h3><b>Fund Performance</b></h3>

          <!-- Estimated investment returns per annum -->
          <div class="form-group row">
            <label for="investreturns" class="col-6 col-form-label">Estimated investment returns (p.a.)</label>
            <div class="col-6">
              <div class="input-group">
                <input type="number" class="form-control" id="investreturns" value="5" min="0" step=".01"  required>
                <div class="input-group-append"><span class="input-group-text">%</span></div>
              </div>
            </div>
          </div>

          <h3><b>Fees</b></h3>

          <!-- Flat fee frequency -->
          <div class="form-group row">
            <label for="flatfeefreq" class="col-6 col-form-label">Flat fee frequency</label>
            <div class="col-6">
              <select class="form-control" id="flatfeefreq">
                <option value="52">Weekly</option>
                <option value="26" selected>Fortnightly</option>
                <option value="12">Monthly</option>
                <option value="4">Quarterly</option>
                <option value="1">Annually</option>
              </select>
            </div>
          </div>

          <!-- Total flat fees -->
          <div class="form-group row">
            <label id="feesLabel" for="flatfeeamount" class="col-6 col-form-label">Total fees</label>
            <div class="col-6">
              <div class="input-group">
                <div class="input-group-prepend"><span class="input-group-text">$</span></div>
                <input type="number" class="form-control" id="flatfeeamount" value="0" min="0" step=".01" required>
              </div>
            </div>
          </div>

          <!-- Percentage fee per annum -->
          <div class="form-group row">
            <label for="percfee" class="col-6 col-form-label">Total percentage fees (p.a.)</label>
            <div class="col-6">
              <div class="input-group">
                <input type="number" class="form-control" id="percfee" value="0" min="0" step=".01" required>
                <div class="input-group-append"><span class="input-group-text">%</span></div>
              </div>
            </div>
          </div>
        </form>

        <h3><b>Years Until Retirement</b></h3>

        <!-- Number of years -->
        <div class="form-group row">
          <label for="numyears" class="col-6 col-form-label">Number of years</label>
          <div class="col-6">
            <div class="input-group">
              <input type="range" class="form-control" id="numyears" min="5" max="60" value="30" required>
            </div>
          </div>
        </div>
      </form>

        <!-- chart output -->
        <div id="results">
          <h3>Projected returns</h3>
          <p class="lead" id="result"></p>

          <canvas id="chart" style="display: none"></canvas>
        </div>

      </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" integrity="sha256-Uv9BNBucvCPipKQ2NS9wYpJmi8DTOEfTA/nH2aoJALw=" crossorigin="anonymous"></script>
    <script src="/assets/sideprojects/superannuation_comparison_tool/v1/js/super_calculation.js"></script>
  </body>
</html>
