var weather = require('./controllers/weather');
var welcome = require('./controllers/welcome');

var routes = {
  '': function() {
    return welcome.init()
  },
  'weather/:city/:state': function(city, state) {
    return weather.init(city, state);
  }
}

var router = require('director').Router(routes);

router.init('/');
