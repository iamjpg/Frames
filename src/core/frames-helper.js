var FramesHelper;

FramesHelper = (function($) {
  FramesHelper = function(name) {
    return this.name = name;
  };
  FramesHelper.prototype = {
    present404: function() {
      $.ajax({
        url: frames_core.base_path + "views/404.html",
        dataType: "html",
        success: function(res) {
          $("#yield").html(res);
        }
      });
    }
  };
  return FramesHelper;
})(window.jQuery);
