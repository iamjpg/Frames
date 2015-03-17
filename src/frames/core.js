var $ = require('zepto-browserify').$;
var P = require('pubsub-js');
var C = require('../config/frames_config');
var _ = require('underscore');
var NProgress = require('nprogress');

var Frames = (function() {

  Frames = {
    getRootDir: function() {
      var hash, _ths;
      _ths = this;
      if (!this.base_path) {
        (function(name) {
          var i, l, length, scripts, src, _results;
          scripts = document.getElementsByTagName("script");
          i = scripts.length - 1;
          _results = [];
          while (i >= 0) {
            src = scripts[i].src;
            l = src.length;
            length = src.substr(src.lastIndexOf('/') + 1).length;
            if (src.indexOf(C.packageName() + ".") > -1 || src.indexOf("dist/bundle.") > -1) {
              _ths.base_path = src.substr(0, l - length);
              _ths.base_path = _ths.base_path + '../';
            }
            _results.push(--i);
          }
          return _results;
        })();
      }
    },
    subscribe: function(name, callback) {
      NProgress.start();
      NProgress.inc();
      P.unsubscribe(name);
      P.subscribe(name, callback);
    },
    publish: function(name, data) {
      P.publish(name, data);
    },
    render: function(template, data, options) {
      var self = this;

      var r = function() {
        var append_int = setInterval(function() {
          if ($("#" + template).length > 0) {
            clearInterval(append_int);
            var compiled = _.template($("#" + template).html());
            if (options && options.appendTo) {
              $(options.appendTo).html(compiled(data));
            } else {
              $("#yield").html(compiled(data));
            }

            NProgress.done();
          }
        }, 10)
      }

      if ($("#" + template).length === 0) {
        $.ajax({
          type: 'GET',
          url: self.base_path + 'build/views/' + template + '.html',
          success: function(res) {
            $("body").append(res);
            r();
          },
          error: function(x, y, z) {
            console.log(x,y,z);
          }
        });
      } else {
        r();
      }
    }
  }

  return Frames;

})();

Frames.getRootDir();

module.exports = Frames;
