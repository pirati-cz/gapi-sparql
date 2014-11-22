(function() {
  var FormatterJson, self,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  self = null;

  FormatterJson = (function() {
    function FormatterJson(options) {
      this.output = __bind(this.output, this);
      self = this;
      this.options = options;
    }

    FormatterJson.prototype.output = function(req, res, body) {
      console.log("jsonFormat");
      return JSON.stringify(body, null, '  ');
    };

    return FormatterJson;

  })();

  module.exports = FormatterJson;

}).call(this);
