var $amount = $('#amount');
var $converted = $('#converted');
var $frais = $('#frais');
var $taux = $('#taux');
var $fixe = $('#fixe');
var $variable = $('#variable');

$amount.on('input', function () {
  convert();
});

function convert() {
  var amount = toFloat($amount.val());
  var convertedAmount = amount * toFloat($taux.text());
  var charge = calculateCharge(convertedAmount);

  var converted = convertedAmount + charge;

  $converted.text(converted.toFixed(2));
  $frais.text(charge.toFixed(2));
}

function calculateCharge(convertedAmount) {
  return convertedAmount *
    toFloat($variable.text()) / 100 +
    toFloat($fixe.text());
}

function toFloat(val) {
  return parseFloat(val, 10) || 0;
}

$('#type').on('change', function () {
  var frais = $('#type option:selected').data();
  var fixe = frais.fixe, variable = frais.variable;
  $fixe.text(fixe.toFixed(2));
  $variable.text(variable.toFixed(2));
  convert();
});

$(function () {
  $('#type').change();
});

$('form').on('submit', function (event) {
  event.preventDefault();
});

// Use yql and google to obtain a recent USD to EUR conversion rate
$.get("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20%3D%20%22USDEUR%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?",
  function (result) {
    var rate = result && result.query && result.query.results && result.query.results.rate;
    if (rate) {
      $taux.text(rate.Rate);
      $taux.parent().addClass("badge-success");
      convert();
    }
  },
  'json'
);
