(function() {
  var GapiSparql, restify, self, sparql;

  restify = require('restify');

  sparql = require('../lib/sparql');

  self = null;

  GapiSparql = (function() {
    function GapiSparql(options) {
      var server, _base, _base1, _base2;
      self = this;
      this.options = options || {};
      if ((_base = this.options).debug == null) {
        _base.debug = options.debug || 1;
      }
      this.options.mode = options.mode || 'simple';
      this.options.name = 'gapi-sparql';
      this.options.version = '0.0.1';
      if ((_base1 = this.options).host == null) {
        _base1.host = options.host || 'localhost';
      }
      if ((_base2 = this.options).listenPort == null) {
        _base2.listenPort = process.env.PORT || options.port || 5000;
      }
      this.options.accept = ['text/html', 'text/csv', 'text/tab-separated-values', 'application/sparql-results+xml', 'application/sparql-results+json'];
      this.options.formatters = {
        'text/html': (new (require('../lib/formatter_html'))(this.options)).output,
        'text/csv': (new (require('../lib/formatter_csv'))(this.options)).output,
        'text/tab-separated-values': (new (require('../lib/formatter_tab'))(this.options)).output,
        'application/sparql-results+xml': (new (require('../lib/formatter_xml'))(this.options)).output,
        'application/sparql-results+json': (new (require('../lib/formatter_json'))(this.options)).output,
        '*/*': (new (require('../lib/formatter_error'))(this.options)).output
      };
      server = restify.createServer(this.options);
      server.use(restify.bodyParser());
      server.use(restify.queryParser());
      server.use(restify.urlEncodedBodyParser());
      this.server = server;
    }

    GapiSparql.run = function(argv, exit) {
      var gapisparql;
      this.argv = argv;
      this.exit = exit;
      gapisparql = new GapiSparql(this.argv);
      gapisparql.start();
      gapisparql.server.get('/.*/', function(req, res, next) {
        return gapisparql.query('GET', req, res, next);
      });
      gapisparql.server.post('/.*/', function(req, res, next) {
        return gapisparql.query('POST', req, res, next);
      });
      gapisparql.server.put('/.*/', function(req, res, next) {
        return gapisparql.query('PUT', req, res, next);
      });
      return gapisparql.server.del('/.*/', function(req, res, next) {
        return gapisparql.query('DELETE', req, res, next);
      });
    };

    GapiSparql.prototype.start = function(callback) {
      return this.server.listen(this.options.listenPort, this.options.host, (function(_this) {
        return function() {
          if (_this.options.debug > 0) {
            console.log('%s listening at %s', _this.server.name, _this.server.url);
          }
          if (callback) {
            return callback();
          }
        };
      })(this));
    };

    GapiSparql.prototype.stop = function(callback) {
      return this.server.close(function() {
        if (callback) {
          return callback();
        }
      });
    };

    GapiSparql.prototype.query = function(method, req, res, next) {
      var accept;
      console.log(method + ': ' + req.url);
      accept = req.accepts(this.options.accept);
      if (accept === void 0) {
        (new (require('../lib/formatter_error'))(this.options)).output(req, res);
      } else {
        res.send(404, new restify.ResourceNotFoundError());
      }
      return next();
    };

    GapiSparql.prototype.use = function(pluginName) {};

    return GapiSparql;

  })();

  module.exports = GapiSparql;

}).call(this);
