var Page = (function() {

  Page = function(name) {
    this.name = name;
  }

  Page.prototype = {
    getData: function() {
      return {
        data: {
          title: "Hi! Welcome to Frames!",
          text: "Hope you enjoy this fun little framework."
        }
      }
    }
  }

  return Page;

})()
