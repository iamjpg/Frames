var FramesRouter;

FramesRouter = (function() {
  FramesRouter.prototype.routes = {};

  FramesRouter.prototype.params = {};

  function FramesRouter(name) {
    this.routeMatcher = routeMatcher;
    this.name = name;
  }

  FramesRouter.prototype.addRoute = function(route, action) {
    return this.routes[route] = action;
  };

  FramesRouter.prototype.matchRoute = function(route) {
    var key, match, rm;
    match = false;
    for (key in frames_router.routes) {
      if (key !== "/") {
        rm = this.routeMatcher(key);
        rm = rm.parse(window.location.hash.replace("#", "").replace("!", ""));
        if (is_.object(rm)) {
          this.params = rm;
          frames_core.constructObject(this.routes[key]);
          match = true;
        }
      }
    }
    if (route === "/") {
      match = true;
      frames_core.constructObject(this.routes["/"]);
    }
    if (!match) {
      frames_helper.present404();
    }
    if (match) {
      return frames_helper.presentLoader();
    }
  };

  FramesRouter.prototype.setVariables = function(route_key, obj) {
    var i, obj_val, _results;
    route_key = route_key.split("/");
    i = 0;
    obj_val = 1;
    _results = [];
    while (i < route_key.length) {
      if (route_key[i].indexOf(":") > -1) {
        route_key[i] = route_key[i].substr(1);
        this.variables[route_key[i]] = obj[obj_val];
        obj_val++;
      }
      _results.push(i++);
    }
    return _results;
  };

  return FramesRouter;

})();
