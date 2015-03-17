
var $ = require('zepto-browserify').$;

var Welcome = (function() {
  mod = {
    init: function() {
      $('#yield').html(JST['src/views/welcome.html']())
    }
  }

  return mod;
})();

module.exports = Welcome;
