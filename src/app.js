var $ = require('zepto-browserify').$,
  weather = require('./controllers/weather');

var routes = {
  'weather/:city/:state': function(city, state) {
    console.log(city, state);
    return weather.init(city, state);
  }
}

var router = require('director').Router(routes);

router.init();
