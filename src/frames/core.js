var $ = require('zepto-browserify').$;
var P = require('pubsub-js');
var C = require('../config/frames_config');
var _ = require('underscore');

var Frames = (function() {

  Frames = {
    subscribe: function(name, callback) {
      P.unsubscribe(name);
      P.subscribe(name, callback);
    },
    publish: function(name, data) {
      P.publish(name, data);
    },
    render: function(template, data) {
      $.ajax({
        type: 'GET',
        url: C.viewDirectory() + template + '.html',
        success: function(res) {
          if ($("#" + template).length === 0) { $("body").append(res); };
          var append_int = setInterval(function() {
            if ($("#" + template).length > 0) {
              clearInterval(append_int);
              var compiled = _.template($("#" + template).html());
              $("#yield").html(compiled(data));
            }
          }, 10)

        },
        error: function(x, y, z) {
          console.log(x,y,z);
        }
      })
    }
  }

  return Frames;

})();

module.exports = Frames;
