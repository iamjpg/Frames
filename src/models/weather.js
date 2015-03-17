var $ = require('zepto-browserify').$;
var Frames = require('../frames/core');

var Weather = (function() {
  mod = {}

  mod.getWeather = function(city, state) {
    var req = 'http://api.openweathermap.org/data/2.5/weather?q=' +
      city + ',' + state + '&units=imperial';

    $.ajax({
      type: "get",
      url: req,
      dataType: 'jsonp',
      success: function(res) {
        Frames.publish("WEATHER_RESPONSE", res);
      }
    });
  }

  return mod;
})()

module.exports = Weather;
