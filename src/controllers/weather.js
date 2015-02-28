var weather = require('../models/weather');
var Frames = require('../frames/core');

var Weather = (function() {

  var mod = {}

  mod.init = function(city, state) {
    console.log("-------");
    Frames.subscribe("WEATHER_RESPONSE", function(msg, data) {
      console.log(msg, data);
      Frames.render('weather', data);
    });
    weather.getWeather(city, state);
  }

  return mod;

})();

module.exports = Weather;
