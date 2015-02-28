var $ = require('zepto-browserify').$;

var Weather = (function() {
  mod = {}

  mod.getWeather = function(city, state) {
    $.ajax({
      type: "get",
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + state + '&units=imperial',
      dataType: 'jsonp',
      success: function(res) {
        
      }
    })
  }

  return mod;
})()

module.exports = Weather;
