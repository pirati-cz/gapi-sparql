(function() {
  var FormatterTab, self,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  self = null;

  FormatterTab = (function() {
    function FormatterTab(options) {
      this.output = __bind(this.output, this);
      self = this;
      this.options = options;
    }

    FormatterTab.prototype.output = function(req, res, body) {
      return console.log("tabFormat");
    };

    return FormatterTab;

  })();

  module.exports = FormatterTab;

}).call(this);
