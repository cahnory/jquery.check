(function ($) {
  'use strict';

  $.extend($.check.regional[''], {
    minlength:      '{{field}} length must be greater than or equal to {{minlength}}',
    maxlength:      '{{field}} length must be smaller than or equal to {{maxlength}}',
    betweenlength:  '{{field}} length must be between {{minlength}} and {{maxlength}}',
    pattern:        '{{field}} must match the pattern \'{{pattern}}\''
  });

  $.check.validators.text = function (value, options, report) {
    // check between
    if (!isNaN(options.minlength + options.maxlength)) {
      report.setRule('betweenlength', value.length >= options.minlength && value.length <= options.maxlength, this.getMessage('betweenlength', options));

    // check min
    } else if (!isNaN(options.minlength)) {
      report.setRule('minlength', value.length >= options.minlength, this.getMessage('minlength', options));

    // check max
    } else if (!isNaN(options.maxlength)) {
      report.setRule('maxlength', value.length <= options.maxlength, this.getMessage('maxlength', options));
    }

    // check pattern
    if (options.pattern) {
      if (!options.regex) {
        options.regex = new RegExp(options.pattern);
      }
      report.setRule('pattern', value.match(options.pattern), this.getMessage('pattern', options));
    }

    return report.isValid();
  };

  // set textarea as text alias
  $.check.validators.textarea = $.check.validators.text;
}(jQuery));