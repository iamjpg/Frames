var FramesHelper;

FramesHelper = (function($) {
  FramesHelper = function(name) {
    return this.name = name;
  };
  FramesHelper.prototype = {
    presentLoader: function() {
      var htmlStr, opts, target, wH, wW;
      htmlStr = void 0;
      opts = void 0;
      target = void 0;
      wH = void 0;
      wW = void 0;
      wH = $(window).outerHeight(true);
      wW = $(window).outerWidth(true);
      if ($("#frames-loader").length === 0) {
        htmlStr = "<div id =\"frames-loader\"></div>";
        $("body").append(htmlStr);
      }
      $("#frames-loader").css({
        padding: "10px",
        background: "#000",
        color: "#FFF",
        width: 100,
        height: 100,
        "text-align": "center",
        position: "absolute",
        top: wH / 2 - 60,
        left: wW / 2 - 60,
        "z-index": 2000,
        display: "none",
        "border-radius": "10px"
      }, opts = {
        lines: 7,
        length: 7,
        width: 2,
        radius: 6,
        corners: 1,
        rotate: 50,
        color: "#FFF",
        speed: 1,
        trail: 56,
        shadow: false,
        hwaccel: false,
        className: "spinner",
        zIndex: 2e9,
        top: "60px",
        left: "60px"
      });
      $("#frames-loader").show();
      target = document.getElementById("frames-loader");
      if (this.spinner == null) {
        return this.spinner = new Spinner(opts).spin(target);
      }
    },
    hideLoader: function() {
      return $("#frames-loader").hide();
    },
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
