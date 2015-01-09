var FramesCore;

FramesCore = (function() {
  FramesCore.prototype.core_objects = {};

  FramesCore.prototype.base_path = null;

  function FramesCore(name) {
    this.name = name;
  }

  FramesCore.prototype.parseURL = function() {
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
          if (src.indexOf("frames-") > -1) {
            _ths.base_path = src.substr(0, l - length);
            if (_ths.base_path.indexOf('core') > -1) {
              _ths.base_path = _ths.base_path + '../'
            }
            nunjucks.configure(_ths.base_path + '/views', {
              noCache: true,
              autoescape: false
            });
          }
          _results.push(--i);
        }
        return _results;
      })();
    }
    window.scrollTo(0, 0);
    hash = window.location.hash;
    if (hash === "#!/" || hash === "#/" || hash === "") {
      _ths.current_route = "/";
    } else {
      _ths.current_route = hash.replace("#", "").replace("!", "");
    }
    return frames_router.matchRoute(_ths.current_route);
  };

  FramesCore.prototype.constructObject = function(str) {
    var obj;
    obj = str.split(".");
    this.controller = obj[0];
    this.action = obj[1];
    if (!this.isConstructed()) {
      this.core_objects[this.controller] = eval("new " + this.controller);
    }
    return eval("this.core_objects['" + this.controller + "']." + this.action + "()");
  };

  FramesCore.prototype.isConstructed = function() {
    var key, _found, _i;
    _found = void 0;
    _i = void 0;
    _found = false;
    _i = 0;
    for (key in this.core_objects) {
      if (key === this.controller) {
        _found = true;
      }
    }
    return _found;
  };

  FramesCore.prototype.renderView = function(options) {

    var page = frames_core.controller.toLocaleLowerCase() +
        "/" + frames_core.action.toLocaleLowerCase() +
        ".html"

    if (!options.append) {
      $("#yield").empty();
    }

    nunjucks.render(page, options.data, function(err, res) {

      $("#yield").append(res);

      setTimeout(function() {
        frames_helper.hideLoader();
        PubSub.publish("view_rendered");
      });
    });

  FramesCore.prototype.viewRendered = function(callback) {
    PubSub.clearAllSubscriptions();
    PubSub.subscribe("view_rendered", callback);
  }

  };

  return FramesCore;

})();
