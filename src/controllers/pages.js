var Pages = (function() {

  function Pages(name) {
    this.name = name;
  }

  Pages.prototype = {
    index: function() {
      var page = new Page();

      frames_core.renderView(page.getData())
    }
  };

  return Pages;

})();
