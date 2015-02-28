var Frames = require('../frames/core');
var Welcome = (function() {
  mod = {
    init: function() {
      Frames.render('welcome')
    }
  }

  return mod;
})();

module.exports = Welcome;
