/*! Check - v0.1.1 - 2014-03-28
* https://github.com/cahnory/jquery.check
* Copyright (c) 2014 François Germain; Licensed MIT */
(function ($) {
  'use strict';

  var
    Plugin, Report,
    optionsData, htmlValidationSupport, timedValidation, templateCache;

  Plugin = $.easyPlug({
    name:     'check',
    events:   ['invalid', 'valid', 'success', 'fail'],
    regional: {},
    presets:  {
      htmlValidation:     false,
      validateOnSubmit:   true,
      validateOnChange:   true
    },
    construct: function () {
      // merge custom with global messages
      this.settings.regional  = $.extend({}, Plugin.regional[''], this.settings.regional);
      // block html validation only if it's supported
      this.settings.htmlValidation  = this.settings.htmlValidation || !htmlValidationSupport;

      // select fields and enable
      this.refresh();
      this.enable();
    },
    prototype: {
      enabled: false,
      enable: function () {
        var plugin = this;
        if (!this.enabled) {
          // override html validation
          if (!this.settings.htmlValidation) {
            this.fields
              .on(Plugin.addNamespace('invalid'), function (event) {
                event.preventDefault();
                // delay validation to avoid useless validation
                clearTimeout(timedValidation);
                timedValidation = setTimeout(function () { plugin.validate(); }, 1);
              });
          }
          // validate field on change
          if (this.settings.validateOnChange) {
            this.fields
              .on(Plugin.addNamespace('blur change keyup keydown'), function () {
                plugin.validateField(this);
              });
          }
          // validate form on submit
          if (this.settings.validateOnSubmit) {
            this.element
              .on(Plugin.addNamespace('submit'), function (event) {
                if (!plugin.validate()) {
                  event.preventDefault();
                }
              });
          }
          //
          this.enabled = true;
        }
      },
      disable: function () {
        if (this.enabled) {
          this.fields
            .off(Plugin.addNamespace('blur change keyup keydown invalid'))
            .removeData(Plugin.addPrefix('options'));
          this.element.off(Plugin.addNamespace('submit'));
          this.enabled = false;
        }
      },
      // refresh listened fields selection
      refresh:  function () {
        var enabled = this.enabled;

        // disable fields in case some are removed
        this.disable();

        // find input fields and reset their options
        this.fields = $(this.element.find(':input:not([type="button"],[type="submit"],[type="reset"])'))
          .removeData(optionsData);

        // enable if it was
        if (enabled) {
          this.enable();
        }
      },
      validate: function () {
        var result = true, plugin = this;
        this.fields.each(function () {
          result = plugin.validateField(this) && result;
        });

        // trigger event according to the field validity
        this.element.trigger(Plugin.events[result ? 'success' : 'fail']);
        return result;
      },
      validateField: function (field, report) {
        field   = $(field);
        report  = Report.getInstance(report);
        this.validateValue(Plugin.getFieldValue(field), Plugin.getFieldOptions(field), report);

        // trigger event according to the field validity
        field.trigger(Plugin.events[report.isValid() ? 'valid' : 'invalid'], [report]);

        return report.isValid();
      },
      validateValue: function (value, options, report) {
        report = Report.getInstance(report);

        // empty value
        if (value === '') {
          // set 'required' rule on error only
          if (options.required) {
            report.setRule('required', false, this.getMessage('required', options));
          }

        // non empty value
        } else {
          // set type rules on non empty value only
          if (Plugin.validators[options.type]) {
            Plugin.validators[options.type].call(this, value, options, report);
          }
        }

        return report.isValid();
      },
      getMessage: function (name, options) {
        // parse and return defined message
        if (this.settings.regional[name]) {
          return Plugin.parseMessage(
            this.settings.regional[name],
            $.extend({}, this.settings.regional.placeholders, options)
          );
        }

        return name;
      }
    }
  });

  Plugin.regional = {
    '': {
      required:       '{{field}} is required.',

      // Type
      urlFormat:      '{{field}} must be a valid URL',

      // Placeholder for message variables
      placeholders: {
        field: 'this field'
      }
    }
  };

  Plugin.validators = {};

  // if the html validation is supported by the client
  htmlValidationSupport = document.createElement('input').hasOwnProperty('oninvalid');

  // Fields options are stored the first time they are read
  optionsData = Plugin.addPrefix('options');

  // return field options, stored in data
  Plugin.getFieldOptions  = function (field) {
    var options;
    field = $(field);
    options = field.data(optionsData);

    // Options not stored yet
    if (!options) {
      // get options by attribute
      options = {
        type:       field.prop('type') || 'text',
        required:   field.prop('required'),
        step:       parseFloat(field.prop('step')),
        min:        parseFloat(field.prop('min')),
        max:        parseFloat(field.prop('max')),
        maxlength:  parseFloat(field.prop('maxlength'))
      };
      // merge options with data-rules definition
      options = $.extend(options, (new Function('return {' + (field.attr('data-rules') || '') + '}'))());
      // store data
      field.data(optionsData, options);
    }

    return options;
  };

  // return field value even if it does not
  // correspond to the input type
  Plugin.getFieldValue = function (field) {
    var value, validity;
    field = $(field);
    value = field.val();

    // empty value could be input type mismatch
    if (value === '' && htmlValidationSupport) {
      validity = field.prop('validity');
      value = validity.valueMissing || validity.valid ? '' : false;
    }
    return value;
  };

  Plugin.parseMessage = function (message, data) {
    // source: http://ejohn.org/blog/javascript-micro-templating/
    templateCache[message] = templateCache[message] || new Function("obj",
      "var p=[],print=function(){p.push.apply(p,arguments);};" +

      // Introduce the data as local variables using with(){}
      "with(obj){p.push('" +

      // Convert the template into pure JavaScript
      message
        .replace(/[\r\t\n]/g, " ")
        .split("{{").join("\t")
        .replace(/((^|\}\})[^\t]*)'/g, "$1\r")
        .replace(/\t(.*?)\}\}/g, "',$1,'")
        .split("\t").join("');")
        .split("}}").join("p.push('")
        .split("\r").join("\\'")
        + "');}return p.join('');"
      );
    return templateCache[message](data);
  };
  templateCache = {};

  // make a new test report
  Report = function (data) {
    // make sure the report is an object
    // keep the reference if possible
    if (typeof data !== 'object' || data instanceof Array) {
      data = {};
    }
    this.data         = data;

    // ordered rules keywords
    data.rules = [];
    // rule message by keyword
    data.messages     = {};
    // invalid rules keywords
    data.errors       = [];
  };

  // return given Report instance or a new one
  Report.getInstance    = function (report) {
    if (!(report instanceof Report)) {
      report = new Report(report);
    }
    return report;
  };

  Report.prototype  = {
    // set a new rule test
    setRule: function (rule, valid, message) {
      this.data.rules.push(rule);
      this.data.messages[rule] = message;
      // add to errors if not valid
      if (!valid) {
        this.data.errors.push(rule);
      }
      return this;
    },
    // tell if all rules are valid
    isValid:  function () {
      return !this.data.errors.length;
    },
    isValidRule: function (name) {
      return $.inArray(name, this.data.errors) === -1;
    },
    getErrors: function () {
      return this.data.errors;
    },
    getRule: function (i) {
      return this.data.rules[i];
    },
    getRules: function () {
      return this.data.rules;
    },
    getMessage: function (rule) {
      return this.data.messages[rule];
    }
  };

}(jQuery));