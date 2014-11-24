(function() {
  'use strict';
  var http, should;

  should = require('should');

  http = require('http');

  describe('GapiSparql class', function() {
    var GapiSparql, gapisparql;
    GapiSparql = require('../../lib/gapi_sparql');
    gapisparql = new GapiSparql({
      debug: 0
    });
    it('create server object', function(done) {
      gapisparql.should.be["instanceof"](GapiSparql);
      return done();
    });
    return describe('Server testing', function() {
      before(function(done) {
        return gapisparql.start(function() {
          return done();
        });
      });
      it('server GET */* request', function(done) {
        var r;
        return r = http.request({
          host: gapisparql.server.address().address,
          port: gapisparql.server.address().port,
          method: 'GET',
          path: '/'
        }, function(res) {
          res.statusCode.should.equal(406);
          return done();
        }).end('Nothing...');
      });
      it('server GET text/html request', function(done) {
        var r;
        return r = http.request({
          host: gapisparql.server.address().address,
          port: gapisparql.server.address().port,
          method: 'GET',
          path: '/',
          headers: {
            accept: 'text/html'
          }
        }, function(res) {
          res.statusCode.should.equal(200);
          return done();
        }).end('Nothing...');
      });
      return after(function(done) {
        return gapisparql.stop(function() {
          return done();
        });
      });
    });
  });

}).call(this);
