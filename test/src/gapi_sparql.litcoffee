    'use strict'
    
    should = require('should')
    gapisparql = require('../../lib/gapi_sparql')
    
    describe('GapiSparql', () ->
        describe('server test', () ->
            it('should create gapi-sparql server', (done) ->
                gapisparql = new GapiSparql()
                gapisparql.should.be.instanceof(should)
                done()
            )
        )
    )