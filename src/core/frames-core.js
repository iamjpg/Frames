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
    
  };

  return FramesCore;

})();
