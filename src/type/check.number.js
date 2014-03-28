(function ($) {
  'use strict';

  $.extend($.check.regional[''], {
    numberFormat: '{{field}} must be a valid number',
    intFormat:    '{{field}} must be a valid integer',
    step:         '{{field}} must be multiple of {{step}}',
    min:          '{{field}} must be greater than or equal to {{min}}',
    max:          '{{field}} must be smaller than or equal to {{max}}',
    between:      '{{field}} must be between {{min}} and {{max}}'
  });

  $.check.validators.number = function (value, options, report) {
    var number;

    // sanitize decimal separator
    if (options.decimalSeparator && options.decimalSeparator !== '.') {
      value = value
        // Force error on non matching normal separator
        .replace('.', options.decimalSeparator + '!')
        // Replace custom separator
        .replace(options.decimalSeparator, '.');
    }

    // typecast the value
    number = parseFloat(value);

    // check format
    if (!value.match(/^(?:[0-9]+|[0-9]*(\.[0-9]+))$/)) {
      report.setRule('format', false, this.getMessage('numberFormat', options));
    } else if (options.int) {
      report.setRule('format', !isNaN(number) && number === Math.round(number), this.getMessage('intFormat', options));
    } else {
      report.setRule('format', !isNaN(number), this.getMessage('numberFormat', options));
    }

    // check multiple
    if (!isNaN(options.step)) {
      report.setRule('step', number % options.step === 0, this.getMessage('step', options));
    }
    // check between
    if (!isNaN(options.min + options.max)) {
      report.setRule('between', number >= options.min && number <= options.max, this.getMessage('between', options));

    // check min
    } else if (!isNaN(options.min)) {
      report.setRule('min', number >= options.min, this.getMessage('min', options));

    // check max
    } else if (!isNaN(options.max)) {
      report.setRule('max', number <= options.max, this.getMessage('max', options));
    }

    return report.isValid();
  };
  $.check.validators.int = function (value, options, report) {
    options.int = true;
    return this.validateValue(value, options, report);
  };
}(jQuery));