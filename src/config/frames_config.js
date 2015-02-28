var Config = (function() {
  var config = {

    viewDirectory: function() {
      return FRAMES_VIEW_DIR || '/dist/views/';
    }

  }
  return config;
})()

module.exports = Config
