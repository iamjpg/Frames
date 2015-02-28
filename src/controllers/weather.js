var weather = require('../models/weather');

var Weather = (function() {

  var mod = {}

  mod.init = function(city, state) {
    var obj = weather.getWeather(city, state);
  }

  return mod;

})();

module.exports = Weather;
