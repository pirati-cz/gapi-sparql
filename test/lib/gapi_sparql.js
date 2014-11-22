(function() {
  'use strict';
  var should;

  should = require('should');

  describe('GapiSparql', function() {
    var GapiSparql, gapisparql;
    GapiSparql = require('../../lib/gapi_sparql');
    gapisparql = new GapiSparql();
    it('should create gapi-sparql server', function(done) {
      gapisparql.should.be["instanceof"](GapiSparql);
      return done();
    });
    return after(function() {});
  });

}).call(this);
