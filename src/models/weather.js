var $ = require('zepto-browserify').$;
var Frames = require('../frames/core');

var Weather = (function() {
  mod = {}

  mod.getWeather = function(city, state) {
    var req = 'http://api.openweathermap.org/data/2.5/weather?q=' +
      city + '&units=imperial&appid=50c2a12fb9f8bbc253dabe922c32d66e';

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
