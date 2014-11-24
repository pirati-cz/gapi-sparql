(function() {
  var FormatterError, self,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  self = null;

  FormatterError = (function() {
    function FormatterError(options) {
      this.output = __bind(this.output, this);
      self = this;
      this.options = options;
    }

    FormatterError.prototype.output = function(req, res, body) {
      if (this.options.debug > 1) {
        console.log("htmlFormat");
      }
      res.statusCode = 406;
      body = "Not Acceptable. Supported Accepts: " + this.options.accept;
      res.setHeader('content-type', 'text/plain');
      res.setHeader('content-length', Buffer.byteLength(body));
      return body;
    };

    return FormatterError;

  })();

  module.exports = FormatterError;

}).call(this);
