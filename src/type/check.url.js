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

