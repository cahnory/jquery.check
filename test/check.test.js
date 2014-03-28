(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  var basicModuleOptions  = {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  };

  module('jQuery#check', basicModuleOptions);

  test('is chainable', function() {
    expect(1);
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.check(), this.elems, 'should be chainable');
  });

  module('Value validations', basicModuleOptions);
  test('text', function() {
    ok( this.elems.check('validateValue', '', {type: 'text'}),                  'required: empty string succeeds');
    ok(!this.elems.check('validateValue', '', {type: 'text', required: true}),  'required: empty string fails');

    ok( this.elems.check('validateValue', 'sample', {type: 'text', minlength: 5}), 'minlength: longer string succeeds');
    ok( this.elems.check('validateValue', 'sample', {type: 'text', minlength: 6}), 'minlength: equal string succeeds');
    ok(!this.elems.check('validateValue', 'sample', {type: 'text', minlength: 7}), 'minlength: shorter string fails');

    ok(!this.elems.check('validateValue', 'sample', {type: 'text', maxlength: 5}), 'maxlength: longer string fails');
    ok( this.elems.check('validateValue', 'sample', {type: 'text', maxlength: 6}), 'maxlength: equal string succeeds');
    ok( this.elems.check('validateValue', 'sample', {type: 'text', maxlength: 7}), 'maxlength: shorter string succeeds');

    ok( this.elems.check('validateValue', 'sample', {type: 'text', minlength: 5, maxlength: 7}), 'minlength, maxlength: between string succeeds');
    ok(!this.elems.check('validateValue', 'sample', {type: 'text', minlength: 7, maxlength: 7}), 'minlength, maxlength: shorter string fails');
    ok(!this.elems.check('validateValue', 'sample', {type: 'text', minlength: 5, maxlength: 5}), 'minlength, maxlength: longer string fails');
    ok( this.elems.check('validateValue', 'sample', {type: 'text', minlength: 6, maxlength: 7}), 'minlength, maxlength: equal to minlength string succeeds');
    ok( this.elems.check('validateValue', 'sample', {type: 'text', minlength: 5, maxlength: 6}), 'minlength, maxlength: equal to maxlength string succeeds');

    ok( this.elems.check('validateValue', 'sample', {type: 'text', pattern: '[a-z]'}), 'pattern: matching string succeeds');
    ok(!this.elems.check('validateValue', 'sample', {type: 'text', pattern: '[0-9]'}), 'pattern: non matching string fails');
    ok(!this.elems.check('validateValue', 'sample', {type: 'text', pattern: '[A-Z]'}), 'pattern: non matching case string fails');
  });

  test('number', function() {
    ok( this.elems.check('validateValue', '', {type: 'number'}), 'required: empty number succeeds');
    ok(!this.elems.check('validateValue', '', {type: 'number', required: true}), 'required: empty number fails');

    ok(!this.elems.check('validateValue', '3,14', {type: 'number'}), 'format: decimal comma fails');
    ok( this.elems.check('validateValue', '3.14', {type: 'number'}), 'format: decimal point succeeds');
    ok( this.elems.check('validateValue', '.14',  {type: 'number'}), 'format: decimal without integer part succeeds');
    ok( this.elems.check('validateValue', '3,14', {type: 'number', decimalSeparator: ','}), 'decimalSeparator: decimal with corresponding separator succeeds');
    ok(!this.elems.check('validateValue', '3.14', {type: 'number', decimalSeparator: ','}), 'decimalSeparator: decimal without corresponding separator fails');
    ok(!this.elems.check('validateValue', ' 3 ',  {type: 'number', decimalSeparator: ','}), 'decimalSeparator: non trimmed number fails');
    ok(!this.elems.check('validateValue', 'x 3',  {type: 'number', decimalSeparator: ','}), 'decimalSeparator: number preceded by a string fails');
    ok(!this.elems.check('validateValue', '3 m',  {type: 'number', decimalSeparator: ','}), 'decimalSeparator: number followed by a string fails');

    ok(!this.elems.check('validateValue', '3.14', {type: 'number', int: true}), 'int: decimal number fails');
    ok( this.elems.check('validateValue', '3',    {type: 'number', int: true}), 'int: integer number succeeds');

    ok(!this.elems.check('validateValue', '6', {type: 'number', min: 7}), 'min: smaller number fails');
    ok( this.elems.check('validateValue', '6', {type: 'number', min: 6}), 'min: equal number succeeds');
    ok( this.elems.check('validateValue', '6', {type: 'number', min: 5}), 'min: greater number succeeds');

    ok(!this.elems.check('validateValue', '6', {type: 'number', max: 5}), 'max: greater number fails');
    ok( this.elems.check('validateValue', '6', {type: 'number', max: 6}), 'max: equal number succeeds');
    ok( this.elems.check('validateValue', '6', {type: 'number', max: 7}), 'max: smaller number succeeds');

    ok( this.elems.check('validateValue', '6', {type: 'number', min: 5, max: 7}), 'min, max: between number succeeds');
    ok(!this.elems.check('validateValue', '6', {type: 'number', min: 7, max: 7}), 'min, max: smaller number fails');
    ok(!this.elems.check('validateValue', '6', {type: 'number', min: 5, max: 5}), 'min, max: greater number fails');
    ok( this.elems.check('validateValue', '6', {type: 'number', min: 6, max: 7}), 'min, max: equal to min number succeeds');
    ok( this.elems.check('validateValue', '6', {type: 'number', min: 5, max: 6}), 'min, max: equal to max number succeeds');

    ok( this.elems.check('validateValue', '0', {type: 'number', step: 2}), 'step: zero number succeeds');
    ok( this.elems.check('validateValue', '6', {type: 'number', step: 2}), 'step: multiple of step succeeds');
    ok(!this.elems.check('validateValue', '6', {type: 'number', step: 4}), 'step: non multiple of step fails');
  });

  test('date', function() {
    ok( this.elems.check('validateValue', '', {type: 'date'}), 'required: empty date succeeds');
    ok(!this.elems.check('validateValue', '', {type: 'date', required: true}), 'required: empty date fails');

    ok( this.elems.check('validateValue', '1985-02-12', {type: 'date'}), 'format: well formated date succeeds');
    ok(!this.elems.check('validateValue', '1985/02/12', {type: 'date'}), 'format: badly formated date fails');
    ok(!this.elems.check('validateValue', '1985-02-31', {type: 'date'}), 'format: non existing date fails');
  });

  test('email', function() {
    ok( this.elems.check('validateValue', '', {type: 'email'}), 'required: empty email succeeds');
    ok(!this.elems.check('validateValue', '', {type: 'email', required: true}), 'required: empty email fails');

    // Test only against valid email
    ok( this.elems.check('validateValue', 'email@example.com', {type: 'email'}), '\"email@example.com\" email should succeeds');
    ok( this.elems.check('validateValue', 'firstname.lastname@example.com', {type: 'email'}), '\"firstname.lastname@example.com\" email should succeeds');
    ok( this.elems.check('validateValue', 'email@subdomain.example.com', {type: 'email'}), '\"email@subdomain.example.com\" email should succeeds');
    ok( this.elems.check('validateValue', 'firstname+lastname@example.com', {type: 'email'}), '\"firstname+lastname@example.com\" email should succeeds');
    ok( this.elems.check('validateValue', 'email@123.123.123.123', {type: 'email'}), '\"email@123.123.123.123\" email should succeeds');
    ok( this.elems.check('validateValue', 'email@[123.123.123.123]', {type: 'email'}), '\"email@[123.123.123.123]\" email should succeeds');
    ok( this.elems.check('validateValue', '"email"@example.com', {type: 'email'}), '\"\\"email\\"@example.com\" email should succeeds');
    ok( this.elems.check('validateValue', '1234567890@example.com', {type: 'email'}), '\"1234567890@example.com\" email should succeeds');
    ok( this.elems.check('validateValue', 'email@example-one.com', {type: 'email'}), '\"email@example-one.com\" email should succeeds');
    ok( this.elems.check('validateValue', '_______@example.com', {type: 'email'}), '\"_______@example.com\" email should succeeds');
    ok( this.elems.check('validateValue', 'email@example.name', {type: 'email'}), '\"email@example.name\" email should succeeds');
    ok( this.elems.check('validateValue', 'email@example.museum', {type: 'email'}), '\"email@example.museum\" email should succeeds');
    ok( this.elems.check('validateValue', 'email@example.co.jp', {type: 'email'}), '\"email@example.co.jp\" email should succeeds');
    ok( this.elems.check('validateValue', 'firstname-lastname@example.com', {type: 'email'}), '\"firstname-lastname@example.com\" email should succeeds');
    ok( this.elems.check('validateValue', 'much.”more\ unusual”@example.com', {type: 'email'}), '\"much.”more\ unusual”@example.com\" email should succeeds');
    ok( this.elems.check('validateValue', 'very.unusual.”@”.unusual.com@example.com', {type: 'email'}), '\"very.unusual.”@”.unusual.com@example.com\" email should succeeds');
    ok( this.elems.check('validateValue', 'very.”(),:;<>[]”.VERY.”very@\\ "very”.unusual@strange.example.com', {type: 'email'}), '\"very.”(),:;<>[]”.VERY.”very@\\ \\"very”.unusual@strange.example.com\" email should succeeds');
  });

  test('URL', function() {
    ok( this.elems.check('validateValue', '', {type: 'url'}), 'required: empty url succeeds');
    ok(!this.elems.check('validateValue', '', {type: 'url', required: true}), 'required: empty url fails');

    // http://mathiasbynens.be/demo/url-regex
    ok( this.elems.check('validateValue', "http://foo.com/blah_blah", {type: 'url'}), "\"http://foo.com/blah_blah\" url should succeeds");
    ok( this.elems.check('validateValue', "http://foo.com/blah_blah/", {type: 'url'}), "\"http://foo.com/blah_blah/\" url should succeeds");
    ok( this.elems.check('validateValue', "http://foo.com/blah_blah_(wikipedia)", {type: 'url'}), "\"http://foo.com/blah_blah_(wikipedia)\" url should succeeds");
    ok( this.elems.check('validateValue', "http://foo.com/blah_blah_(wikipedia)_(again)", {type: 'url'}), "\"http://foo.com/blah_blah_(wikipedia)_(again)\" url should succeeds");
    ok( this.elems.check('validateValue', "http://www.example.com/wpstyle/?p=364", {type: 'url'}), "\"http://www.example.com/wpstyle/?p=364\" url should succeeds");
    ok( this.elems.check('validateValue', "https://www.example.com/foo/?bar=baz&inga=42&quux", {type: 'url'}), "\"https://www.example.com/foo/?bar=baz&inga=42&quux\" url should succeeds");
    ok( this.elems.check('validateValue', "http://✪df.ws/123", {type: 'url'}), "\"http://✪df.ws/123\" url should succeeds");
    ok( this.elems.check('validateValue', "http://userid:password@example.com:8080", {type: 'url'}), "\"http://userid:password@example.com:8080\" url should succeeds");
    ok( this.elems.check('validateValue', "http://userid:password@example.com:8080/", {type: 'url'}), "\"http://userid:password@example.com:8080/\" url should succeeds");
    ok( this.elems.check('validateValue', "http://userid@example.com", {type: 'url'}), "\"http://userid@example.com\" url should succeeds");
    ok( this.elems.check('validateValue', "http://userid@example.com/", {type: 'url'}), "\"http://userid@example.com/\" url should succeeds");
    ok( this.elems.check('validateValue', "http://userid@example.com:8080", {type: 'url'}), "\"http://userid@example.com:8080\" url should succeeds");
    ok( this.elems.check('validateValue', "http://userid@example.com:8080/", {type: 'url'}), "\"http://userid@example.com:8080/\" url should succeeds");
    ok( this.elems.check('validateValue', "http://userid:password@example.com", {type: 'url'}), "\"http://userid:password@example.com\" url should succeeds");
    ok( this.elems.check('validateValue', "http://userid:password@example.com/", {type: 'url'}), "\"http://userid:password@example.com/\" url should succeeds");
    ok( this.elems.check('validateValue', "http://142.42.1.1/", {type: 'url'}), "\"http://142.42.1.1/\" url should succeeds");
    ok( this.elems.check('validateValue', "http://142.42.1.1:8080/", {type: 'url'}), "\"http://142.42.1.1:8080/\" url should succeeds");
    ok( this.elems.check('validateValue', "http://➡.ws/䨹", {type: 'url'}), "\"http://➡.ws/䨹\" url should succeeds");
    ok( this.elems.check('validateValue', "http://⌘.ws", {type: 'url'}), "\"http://⌘.ws\" url should succeeds");
    ok( this.elems.check('validateValue', "http://⌘.ws/", {type: 'url'}), "\"http://⌘.ws/\" url should succeeds");
    ok( this.elems.check('validateValue', "http://foo.com/blah_(wikipedia)#cite-1", {type: 'url'}), "\"http://foo.com/blah_(wikipedia)#cite-1\" url should succeeds");
    ok( this.elems.check('validateValue', "http://foo.com/blah_(wikipedia)_blah#cite-1", {type: 'url'}), "\"http://foo.com/blah_(wikipedia)_blah#cite-1\" url should succeeds");
    ok( this.elems.check('validateValue', "http://foo.com/unicode_(✪)_in_parens", {type: 'url'}), "\"http://foo.com/unicode_(✪)_in_parens\" url should succeeds");
    ok( this.elems.check('validateValue', "http://foo.com/(something)?after=parens", {type: 'url'}), "\"http://foo.com/(something)?after=parens\" url should succeeds");
    ok( this.elems.check('validateValue', "http://☺.damowmow.com/", {type: 'url'}), "\"http://☺.damowmow.com/\" url should succeeds");
    ok( this.elems.check('validateValue', "http://code.google.com/events/#&product=browser", {type: 'url'}), "\"http://code.google.com/events/#&product=browser\" url should succeeds");
    ok( this.elems.check('validateValue', "http://j.mp", {type: 'url'}), "\"http://j.mp\" url should succeeds");
    ok( this.elems.check('validateValue', "ftp://foo.bar/baz", {type: 'url'}), "\"ftp://foo.bar/baz\" url should succeeds");
    ok( this.elems.check('validateValue', "http://foo.bar/?q=Test%20URL-encoded%20stuff", {type: 'url'}), "\"http://foo.bar/?q=Test%20URL-encoded%20stuff\" url should succeeds");
    ok( this.elems.check('validateValue', "http://مثال.إختبار", {type: 'url'}), "\"http://مثال.إختبار\" url should succeeds");
    ok( this.elems.check('validateValue', "http://例子.测试", {type: 'url'}), "\"http://例子.测试\" url should succeeds");
    ok( this.elems.check('validateValue', "http://उदाहरण.परीक्षा", {type: 'url'}), "\"http://उदाहरण.परीक्षा\" url should succeeds");
    ok( this.elems.check('validateValue', "http://-.~_!$&'()*+,;=:%40:80%2f::::::@example.com", {type: 'url'}), "\"http://-.~_!$&'()*+,;=:%40:80%2f::::::@example.com\" url should succeeds");
    ok( this.elems.check('validateValue', "http://1337.net", {type: 'url'}), "\"http://1337.net\" url should succeeds");
    ok( this.elems.check('validateValue', "http://a.b-c.de", {type: 'url'}), "\"http://a.b-c.de\" url should succeeds");
    ok( this.elems.check('validateValue', "http://223.255.255.254", {type: 'url'}), "\"http://223.255.255.254\" url should succeeds");

    ok(!this.elems.check('validateValue', "http://", {type: 'url'}), "\"http://\" url should fails");
    ok(!this.elems.check('validateValue', "http://.", {type: 'url'}), "\"http://.\" url should fails");
    ok(!this.elems.check('validateValue', "http://..", {type: 'url'}), "\"http://..\" url should fails");
    ok(!this.elems.check('validateValue', "http://../", {type: 'url'}), "\"http://../\" url should fails");
    ok(!this.elems.check('validateValue', "http://?", {type: 'url'}), "\"http://?\" url should fails");
    ok(!this.elems.check('validateValue', "http://??", {type: 'url'}), "\"http://??\" url should fails");
    ok(!this.elems.check('validateValue', "http://??/", {type: 'url'}), "\"http://??/\" url should fails");
    ok(!this.elems.check('validateValue', "http://#", {type: 'url'}), "\"http://#\" url should fails");
    ok(!this.elems.check('validateValue', "http://##", {type: 'url'}), "\"http://##\" url should fails");
    ok(!this.elems.check('validateValue', "http://##/", {type: 'url'}), "\"http://##/\" url should fails");
    ok(!this.elems.check('validateValue', "http://foo.bar?q=Spaces should be encoded", {type: 'url'}), "\"http://foo.bar?q=Spaces should be encoded\" url should fails");
    ok(!this.elems.check('validateValue', "//", {type: 'url'}), "\"//\" url should fails");
    ok(!this.elems.check('validateValue', "//a", {type: 'url'}), "\"//a\" url should fails");
    ok(!this.elems.check('validateValue', "///a", {type: 'url'}), "\"///a\" url should fails");
    ok(!this.elems.check('validateValue', "///", {type: 'url'}), "\"///\" url should fails");
    ok(!this.elems.check('validateValue', "http:///a", {type: 'url'}), "\"http:///a\" url should fails");
    ok(!this.elems.check('validateValue', "foo.com", {type: 'url'}), "\"foo.com\" url should fails");
    ok(!this.elems.check('validateValue', "rdar://1234", {type: 'url'}), "\"rdar://1234\" url should fails");
    ok(!this.elems.check('validateValue', "h://test", {type: 'url'}), "\"h://test\" url should fails");
    ok(!this.elems.check('validateValue', "http:// shouldfail.com", {type: 'url'}), "\"http:// shouldfail.com\" url should fails");
    ok(!this.elems.check('validateValue', ":// should fail", {type: 'url'}), "\":// should fail\" url should fails");
    ok(!this.elems.check('validateValue', "http://foo.bar/foo(bar)baz quux", {type: 'url'}), "\"http://foo.bar/foo(bar)baz quux\" url should fails");
    ok(!this.elems.check('validateValue', "ftps://foo.bar/", {type: 'url'}), "\"ftps://foo.bar/\" url should fails");
    ok(!this.elems.check('validateValue', "http://-error-.invalid/", {type: 'url'}), "\"http://-error-.invalid/\" url should fails");
    ok(!this.elems.check('validateValue', "http://a.b--c.de/", {type: 'url'}), "\"http://a.b--c.de/\" url should fails");
    ok(!this.elems.check('validateValue', "http://-a.b.co", {type: 'url'}), "\"http://-a.b.co\" url should fails");
    ok(!this.elems.check('validateValue', "http://a.b-.co", {type: 'url'}), "\"http://a.b-.co\" url should fails");
    ok(!this.elems.check('validateValue', "http://0.0.0.0", {type: 'url'}), "\"http://0.0.0.0\" url should fails");
    ok(!this.elems.check('validateValue', "http://10.1.1.0", {type: 'url'}), "\"http://10.1.1.0\" url should fails");
    ok(!this.elems.check('validateValue', "http://10.1.1.255", {type: 'url'}), "\"http://10.1.1.255\" url should fails");
    ok(!this.elems.check('validateValue', "http://224.1.1.1", {type: 'url'}), "\"http://224.1.1.1\" url should fails");
    ok(!this.elems.check('validateValue', "http://1.1.1.1.1", {type: 'url'}), "\"http://1.1.1.1.1\" url should fails");
    ok(!this.elems.check('validateValue', "http://123.123.123", {type: 'url'}), "\"http://123.123.123\" url should fails");
    ok(!this.elems.check('validateValue', "http://3628126748", {type: 'url'}), "\"http://3628126748\" url should fails");
    ok(!this.elems.check('validateValue', "http://.www.foo.bar/", {type: 'url'}), "\"http://.www.foo.bar/\" url should fails");
    ok(!this.elems.check('validateValue', "http://www.foo.bar./", {type: 'url'}), "\"http://www.foo.bar./\" url should fails");
    ok(!this.elems.check('validateValue', "http://.www.foo.bar./", {type: 'url'}), "\"http://.www.foo.bar./\" url should fails");
    ok(!this.elems.check('validateValue', "http://10.1.1.1", {type: 'url'}), "\"http://10.1.1.1\" url should fails");
    ok(!this.elems.check('validateValue', "http://10.1.1.254", {type: 'url'}), "\"http://10.1.1.254\" url should fails");
  });

}(jQuery));


