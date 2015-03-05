var welcome = require('./controllers/welcome'),
    about = require('./controllers/about'),
    docs = require('./controllers/docs');

var routes = {
  '/welcome': function() {
    return welcome.init()
  },
  '/about': function() {
    return about.init();
  },
  '/docs': function() {
    return docs.init()
  }
}

var router = require('director').Router(routes);

router.init('/welcome');
