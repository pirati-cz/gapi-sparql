    'use strict'
    
    should = require('should')
    http = require('http')
    
    describe('GapiSparql class', () ->
        
        GapiSparql = require('../../lib/gapi_sparql')
        gapisparql = new GapiSparql({ debug: 0 })
        
        it('create server object', (done) ->
            gapisparql.should.be.instanceof(GapiSparql)
            done()
        )
        
        describe('Server testing', () ->

            before (done) ->
                gapisparql.start( () ->
                    done()
                )

            it('server GET */* request', (done) ->
                r = http.request({
                    host: gapisparql.server.address().address,
                    port: gapisparql.server.address().port,
                    method: 'GET',
                    path: '/'
                }, (res) ->
                    res.statusCode.should.equal(406)
                    done()
                ).end('Nothing...')
            )

            it('server GET text/html request', (done) ->
                r = http.request({
                    host: gapisparql.server.address().address,
                    port: gapisparql.server.address().port,
                    method: 'GET',
                    path: '/',
                    headers: {
                        accept: 'text/html'
                    }
                }, (res) ->
                    res.statusCode.should.equal(200)
                    done()
                ).end('Nothing...')
            )
            
            after (done) ->
                gapisparql.stop( () -> done() )
        )
    )