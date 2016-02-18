define(function (require) {
  var registerSuite = require('intern!object'),
      assert        = require('intern/chai!assert'),
      plugin        = require('intern/dojo/node!../index'),
      fs            = require('intern/dojo/node!fs'),
      gonzales      = require('intern/dojo/node!../node_modules/gonzales-pe');

  registerSuite({
    name: 'polish-use-color-variables',

    message: function () {
      assert.strictEqual(plugin.message, 'All colors should be defined as variables in a single file.');
    }
  });

  registerSuite({
    name: 'polish-use-color-variables SCSS tests',
    test: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/scss.scss', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'scss' }));

        assert.strictEqual(errors.length, 5);
        assert.equal(errors[0].node.toString().trim(), '#707020');
        assert.equal(errors[1].node.toString().trim(), 'palegoldenrod');
        assert.equal(errors[2].node.toString().trim(), '1px solid #707020');
        assert.equal(errors[3].node.toString().trim(), 'rgba(0, 0, 0, 0.4)');
        assert.equal(errors[4].node.toString().trim(), 'rgb(255, 255, 255, 0.5)');
      }));
    }
  });
});