var weather = require('../models/weather');
var Frames = require('../frames/core')
var $ = require('zepto-browserify').$;

var Weather = (function() {

  var mod = {}

  mod.init = function(city, state) {
    Frames.subscribe("WEATHER_RESPONSE", function(msg, data) {
      $('#yield').html(JST['src/views/weather.html'](data))
    });
    weather.getWeather(city, state);
  }

  return mod;

})();

module.exports = Weather;
