(function() {
  var FormatterXml, self,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  self = null;

  FormatterXml = (function() {
    function FormatterXml(options) {
      this.output = __bind(this.output, this);
      self = this;
      this.options = options;
    }

    FormatterXml.prototype.output = function(req, res, body) {
      return console.log("xmlFormat");
    };

    return FormatterXml;

  })();

  module.exports = FormatterXml;

}).call(this);
