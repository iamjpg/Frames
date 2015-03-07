
var Config = (function() {
  var config = {

    packageName: function() {
      return (typeof FRAMES_PACKAGE_NAME === "undefined") ? 'frames' : FRAMES_PACKAGE_NAME;
    }

  }
  return config;
})()

module.exports = Config
