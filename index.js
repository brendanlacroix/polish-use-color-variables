var cssColors = require('css-color-names');

module.exports = {
  name: 'use-color-variables',
  message: 'All colors should be defined as variables in a single file.',
  test: function(ast, path){
    var errors = [];

    ast.traverse(function(node) {
      if (node.type !== 'value') {
        return;
      }

      node.forEach('color', function(color) {
        errors.push({
          node    : node,
          message : color.toString()
        });
      });

      node.forEach('ident', function(ident) {
        if (Object.keys(cssColors).indexOf(ident.toString()) === -1) {
          return;
        }

        errors.push({
          node      : node,
          message   : ident.toString()
        });
      });
    });

    return errors;
  }
};