define(function(require) {

  var test = require('../../../test')
  var global = this


  require.async('./a', function(a) {
    test.assert(a.name === 'a', 'load CMD module file')
    done()
  })

  require.async('./b.js', function() {
    test.assert(global.specs_modules_require_async === true, 'load normal script file')
    global.specs_modules_require_async = undefined
    done()
  })

  require.async(['./c1', './c2'], function(c1, c2) {
    test.assert(c1.name === 'c1', c1.name)
    test.assert(c2.name === 'c2', c2.name)
    done()
  })


  var count = 0

  function done() {
    if (++count === 3) {
      test.next()
    }
  }
});

