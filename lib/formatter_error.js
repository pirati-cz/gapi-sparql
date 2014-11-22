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
      console.log("errorFormat");
      body = "Not Acceptable. Supported Accepts: " + this.options.accept;
      res.writeHead(406, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'text/plain'
      });
      res.write(body);
      return res.end();
    };

    return FormatterError;

  })();

  module.exports = FormatterError;

}).call(this);
