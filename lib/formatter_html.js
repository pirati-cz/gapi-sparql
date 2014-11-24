(function() {
  var FormatterHtml, fs, restify, self,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  restify = require('restify');

  fs = require('fs');

  self = null;

  FormatterHtml = (function() {
    function FormatterHtml(options) {
      this.output = __bind(this.output, this);
      self = this;
      this.options = options;
      this.static_page_temp = null;
      this.resources_path = 'resources/formatter_html';
    }

    FormatterHtml.prototype.output = function(req, res, body) {
      var d3, jquery, script, static_page_temp, style, title;
      if (this.options.debug > 1) {
        console.log("htmlFormat");
      }
      title = 'GAPI';
      if (body instanceof restify.ResourceNotFoundError) {
        res.statusCode = 200;
        if (this.static_page_temp === null) {
          style = fs.readFileSync(this.resources_path + '/style.min.css', {
            'encoding': 'utf-8'
          });
          d3 = fs.readFileSync(this.resources_path + '/d3.v3.min.js', {
            'encoding': 'utf-8'
          });
          jquery = fs.readFileSync(this.resources_path + '/jquery.min.js', {
            'encoding': 'utf-8'
          });
          script = fs.readFileSync(this.resources_path + '/script.min.js', {
            'encoding': 'utf-8'
          });
          static_page_temp = fs.readFileSync(this.resources_path + '/index.html', {
            'encoding': 'utf-8'
          });
          static_page_temp = static_page_temp.replace('{% style %}', style);
          static_page_temp = static_page_temp.replace('{% d3 %}', d3);
          static_page_temp = static_page_temp.replace('{% jquery %}', jquery);
          static_page_temp = static_page_temp.replace('{% script %}', script);
          this.static_page_temp = static_page_temp;
        }
      }
      return this.static_page_temp;
    };

    return FormatterHtml;

  })();

  module.exports = FormatterHtml;

}).call(this);
