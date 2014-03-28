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