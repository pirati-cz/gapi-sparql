    'use strict'
    
    should = require('should')
    
    describe('GapiSparql', () ->
        GapiSparql = require('../../lib/gapi_sparql')
        gapisparql = new GapiSparql()
        
        it('should create gapi-sparql server', (done) ->
            gapisparql.should.be.instanceof(GapiSparql)
            done()
        )
        
        after ->
            gapisparql.stop()
    )