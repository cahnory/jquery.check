(function ($) {
  'use strict';

  $.extend($.check.regional[''], {
    dateFormat:     '{{field}} must be a valid date (yyyy-mm-dd)'
  });

  $.check.validators.date = function (value, options, report) {
    // typecast the value
    var date = new Date(value);

    // is valid date and well formatted
    report.setRule('format', !isNaN(date.getTime()) && value === date.toISOString().substr(0, 10), this.getMessage('dateFormat', options));

    return report.isValid();
  };
}(jQuery));