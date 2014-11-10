
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
            #@options.formatters = {}
            #@options.formatters['application/sparql-query'] = @sparqlQuery
            @options.listenPort ?= 80
            # @options.accept 
            
            server = restify.createServer(@options)
            #server.pre( (req, res, next) ->
            #    req.headers.accept = 'application/sparql-query'
            #    return next()
            #)
            server.listen(@options.listenPort, () ->
                console.log('%s listening at %s', server.name, server.url)
            )
            server.get('/.*/', (req, res, next) -> 
                # console.log(res)
                d = "ahoj svete"
                res.writeHead(200, {
                    'Content-Length': Buffer.byteLength(d),
                    'Content-Type': 'text/plain'
                })
                res.write(d)
                res.end()
                next()
            )
            @server = server

        @run: (argv, exit) ->
            console.log('GapiSparql @run()')
            gapisparql = new GapiSparql()
            
        sparqlQuery: (req, res, body) ->
            console.log('GapiSparql @sparqlQuery()')
            body = "ahok"
            #console.log(body)
            #console.log('----- GapiSparql @sparqlQuery() -----');
            ###
            if body instanceof Error
                res.statusCode = body.statusCode || 500
                if body.body
                    #console.log('dada');
                    #body = body.body.message
                    body = "ttt"
                else
                    #body = message: body.message
                    body = "fifif"
                data = "err"
            else
                body = "body pyco"
                data = "aaa"
            console.log(body)
            #console.log(req)
            #console.log(res)
            #console.log(body)
            res.setHeader('Content-Length', Buffer.byteLength(body))
            return body
            ###
            return body
        
        use: (pluginName) ->
            
      
    module.exports = GapiSparql