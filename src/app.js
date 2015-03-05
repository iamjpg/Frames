var weather = require('./controllers/weather');
var welcome = require('./controllers/welcome');

var routes = {
  '': function() {
    return welcome.init()
  }
}

var router = require('director').Router(routes);

router.init('/');
