
GapiSparql - Main class for GAPI SPARQL component

    restify = require('restify')
    self = null

    class GapiSparql

        constructor: (options) ->
            console.log('GapiSparql construct...')
            self = @
            @options = options or {}
            
            @options.name = 'gapi-sparql'
            @options.version = '0.0.1'
            @options.accept = 
            @options.formatters = {}
            @options.formatters['application/sparql-query'] = @sparqlQuery
            @options.listenPort ?= 8008
            # @options.accept 
            
            server = restify.createServer(@options)
            server.pre( (req, res, next) ->
                req.headers.accept = 'application/sparql-query'
                return next()
            )
            server.listen(@options.listenPort, () ->
                console.log('%s listening at %s', server.name, server.url)
            )
            @server = server

        @run: (argv, exit) ->
            console.log('GapiSparql @run()')
            gapisparql = new GapiSparql()
            
        sparqlQuery: (req, res, body) ->
            console.log('GapiSparql @sparqlQuery()')
            if body instanceof Error
                # res.statusCode = body.statusCode || 500
                return "err"
            else
                return "aaa"
            console.log(req)
            console.log(res)
            console.log(body)
        
        use: (pluginName) ->
            
      
    module.exports = GapiSparql