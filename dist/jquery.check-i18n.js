/*! Check - v0.1.1 - 2014-03-28
* https://github.com/cahnory/jquery.check
* Copyright (c) 2014 François Germain; Licensed MIT */
(function ($) {
  'use strict';

  $.check.regional.en  = {
    required:       '{{field}} is required.',

    // number
    numberFormat:   '{{field}} must be a valid number',
    intFormat:      '{{field}} must be a valid integer',
    step:           '{{field}} must be multiple of {{step}}',
    min:            '{{field}} must be greater than or equal to {{min}}',
    max:            '{{field}} must be smaller than or equal to {{max}}',
    between:        '{{field}} must be between {{min}} and {{max}}',

    // text
    minlength:      '{{field}} length must be greater than or equal to {{minlength}}',
    maxlength:      '{{field}} length must be smaller than or equal to {{maxlength}}',
    betweenlength:  '{{field}} length must be between {{minlength}} and {{maxlength}}',
    pattern:        '{{field}} must match the pattern \'{{pattern}}\'',

    // url
    urlFormat:      '{{field}} must be a valid URL',
    urlScheme:      '{{field}} must start by one of these: <em>{{scheme.join("</em>, <em>")}}</em>',

    // other types
    emailFormat:    '{{field}} must be a valid email',
    dateFormat:     '{{field}} must be a valid date (yyyy-mm-dd)',

    // Placeholder for message variables
    placeholders: {
      field: 'This field'
    }
  };

}(jQuery));
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