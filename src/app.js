var weather = require('./controllers/weather');

var routes = {
  'weather/:city/:state': function(city, state) {
    return weather.init(city, state);
  }
}

var router = require('director').Router(routes);

router.init();
