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

$('#type').change();

$('form').on('submit', function (event) {
  event.preventDefault();
});
