var weather = require('../models/weather');
var PubSub = require('pubsub-js');

var Weather = (function() {

  var mod = {}

  mod.init = function(city, state) {
    PubSub.subscribe("WEATHER_RESPONSE", function(msg, data) {
      console.log(msg, data);
    });
    weather.getWeather(city, state);
  }

  return mod;

})();

module.exports = Weather;
