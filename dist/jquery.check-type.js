/*! Check - v0.1.0 - 2014-03-28
* https://github.com/cahnory/jquery.check
* Copyright (c) 2014 François Germain; Licensed MIT */
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
(function ($) {
  'use strict';

  $.extend($.check.regional[''], {
    urlFormat:  '{{field}} must be a valid URL',
    urlScheme:  '{{field}} must start by one of these: {{scheme}}'
  });

  $.check.validators.url = function (value, options, report) {
    if (!options.regex) {
      // prepare scheme option
      if (!options.scheme) {
        options.scheme = ['http://', 'https://', 'ftp://'];

      // single scheme to array
      } else if (!(options.scheme instanceof Array)) {
        options.scheme = [options.scheme];
      }

      // https://gist.github.com/dperini/729294
      options.regex = new RegExp(
        '^' +
          // protocol identifier
          '[a-z0-9]+:(?://)?' +
          // user:pass authentication
          '(?:\\S+(?::\\S*)?@)?' +
          '(?:' +
            // IP address exclusion
            // private & local networks
            '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
            '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
            '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
            // IP address dotted notation octets
            // excludes loopback network 0.0.0.0
            // excludes reserved space >= 224.0.0.0
            // excludes network & broacast addresses
            // (first & last IP address of each class)
            '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
            '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
            '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
          '|' +
            // host name
            '(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)' +
            // domain name
            '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*' +
            // TLD identifier
            '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
          ')' +
          // port number
          '(?::\\d{2,5})?' +
          // resource path
          '(?:/[^\\s]*)?' +
          '$',
        'i'
      );
    }

    // check format
    //scheme = value.match(/^[a-z0-9]+:(?:\/\/)|^?/);
    report
      .setRule('format', options.regex.test(value), this.getMessage('urlFormat', options))
      .setRule('scheme', $.inArray(value.match(/^[a-z0-9]+:(?:\/\/)?|/)[0], options.scheme) !== -1, this.getMessage('urlScheme', options));

    return report.isValid();
  };
}(jQuery));

