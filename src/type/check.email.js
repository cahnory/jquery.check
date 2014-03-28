(function ($) {
  'use strict';

  $.extend($.check.regional[''], {
    emailFormat:  '{{field}} must be a valid email'
  });

  $.check.validators.email = function (value, options, report) {
    // check format
    report.setRule('format',
      value.match(/^.+@.+\..+$/),
      this.getMessage('emailFormat', options));

    return report.isValid();
  };
}(jQuery));