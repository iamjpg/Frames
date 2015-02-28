var P = require('pubsub-js');

var PubSub = (function() {

  PubSub = {
    subscribe: function(name, callback) {
      P.unsubscribe(name);
      P.subscribe(name, callback);
    },
    publish: function(name, data) {
      P.publish(name, data);
    }
  }

  return PubSub;

})();

module.exports = PubSub;
