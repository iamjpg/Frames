var Frames = require('../frames/core');
var About = (function() {
  mod = {
    init: function() {
      Frames.render('about')
    }
  }

  return mod;
})()

module.exports = About;
