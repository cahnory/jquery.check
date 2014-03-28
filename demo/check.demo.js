(function ($) {

  $('form')
    .on($.check.events.valid, function (event, report) {
      $(event.target)
        .removeClass('--invalid')
        .next('.form__helper').empty();
    })
    .on($.check.events.invalid, function (event, report) {
      var output, field, rule, i;
      field         = $(event.target).addClass('--invalid');
      output        = getFieldOutput(field).empty();
      rule   = report.getRule(0);
      i             = 0;

      while (rule) {
        $('<li class="form__rule"></li>')
          .html(report.getMessage(rule))
          .toggleClass('--invalid', !report.isValidRule(rule))
          .appendTo(output);
        rule = report.getRule(++i);
      }
    })
    .check({
      regional: $.check.regional.fr
    });
  
  var getFieldOutput = function (field) {
    var helper, rules;

    // find or create helper
    helper  = field.next('.form__helper');
    if (!helper.length) {
      helper = $('<div class="form__helper"></div>').insertAfter(field);
    }

    // find or create rules
    rules  = helper.children('.form__rules');
    if (!rules.length) {
      rules = $('<ul class="form__rules"></ul>').appendTo(helper);
    }

    return rules;
  };
  

}(jQuery));