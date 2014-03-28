(function ($) {
  'use strict';

  $.check.regional.fr  = {
    required:       '{{field}} est requis.',

    // number
    numberFormat: '{{field}} doit être un nombre',
    intFormat:    '{{field}} doit être un nombre entier',
    step:         '{{field}} doit être multiple {{step}}',
    min:          '{{field}} doit être supérieur ou égal à {{min}}',
    max:          '{{field}} doit être inférieur ou égal à {{max}}',
    between:      '{{field}} doit être compris entre {{min}} et {{max}} inclus',

    // text
    minlength:      '{{field}} doit avoir un minimum de {{minlength}} caractère{{minlength > 1 ? "s" : ""}}',
    maxlength:      '{{field}} est limité à {{maxlength}} caractère{{maxlength > 1 ? "s" : ""}}',
    betweenlength:  '{{field}} doit contenir entre {{minlength}} et {{maxlength}} caractère{{minlength > 1 || maxlength > 1 ? "s" : ""}}',
    pattern:        '{{field}} doit correspondre au pattern \'{{pattern}}\'',

    // url
    urlFormat:      '{{field}} doit être une URL valide',
    urlScheme:      '{{field}} doit commencer par&nbsp;: <em>{{scheme.join("</em>, <em>")}}.</em>',

    // other types
    emailFormat:    '{{field}} doit être un email valide',
    dateFormat:     '{{field}} doit être une date valide (aaaa-mm-jj)',

    // Placeholder for message variables
    placeholders: {
      field:        'Ce champs',
      dateExample:  '1985-24-02'
    }
  };

}(jQuery));