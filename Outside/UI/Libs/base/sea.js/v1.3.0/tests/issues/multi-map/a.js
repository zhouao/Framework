define(function(require, exports, module) {

  exports.name = 'a';

  var test = require('../../test');
  test.assert(/a\.js\?1$/.test(module.id), module.id);


  var scripts = document.getElementsByTagName('script');

  for (var i = 0; i < scripts.length; i++) {
    var src = scripts[i].src;
    if (src && /\/a\.js/.test(src)) {
      test.assert(/\?1/.test(src), src);
    }
  }

});
