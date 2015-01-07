var Pages = (function() {

  function Pages(name) {
    this.name = name;
  }

  Pages.prototype = {
    index: function() {

      // Construct model instance.
      var page = new Page();

      // Render view passing data to said view.
      frames_core.renderView(page.getData());

      // View rendered subscriber for post processing.
      frames_core.viewRendered(function() {
        
      });
    }
  };

  return Pages;

})();
