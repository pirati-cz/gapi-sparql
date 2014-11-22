(function() {
  var FormatterCsv, self,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  self = null;

  FormatterCsv = (function() {
    function FormatterCsv(options) {
      this.output = __bind(this.output, this);
      self = this;
      this.options = options;
    }

    FormatterCsv.prototype.output = function(req, res, body) {
      return console.log("csvFormat");
    };

    return FormatterCsv;

  })();

  module.exports = FormatterCsv;

}).call(this);
