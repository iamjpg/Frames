
var Config = (function() {
  var config = {

    viewDirectory: function() {
      return (typeof FRAMES_VIEW_DIR === "undefined") ? '/dist/views/' : FRAMES_VIEW_DIR;
    }

  }
  return config;
})()

module.exports = Config
