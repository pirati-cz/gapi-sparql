    'use strict'
    
    should = require('should')
    GapiSparql = require('../../lib/gapi_sparql')
    
    describe('GapiSparql', () ->
        it('should create gapi-sparql server', (done) ->
            gapisparql = new GapiSparql()
            gapisparql.should.be.instanceof(GapiSparql)
            done()
        )
    )