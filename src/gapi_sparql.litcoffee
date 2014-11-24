
GapiSparql - Main class for GAPI SPARQL component


    restify = require('restify')
    sparql = require('../lib/sparql')
    #FormatterHtml = require('../lib/formatter_html')
    self = null

    class GapiSparql

        constructor: (options) ->
            self = @
            @options = options || {}
            @options.debug ?= options.debug || 1
            @options.mode = options.mode || 'simple' # simple | strict
            @options.name = 'gapi-sparql'
            @options.version = '0.0.1'
            @options.host ?= options.host || 'localhost'
            @options.listenPort ?= process.env.PORT || options.port || 5000
            @options.accept = [
                'text/html',
                'text/csv',
                'text/tab-separated-values',
                'application/sparql-results+xml',
                'application/sparql-results+json'
            ]
            
            @options.formatters = {
                # defaults
                #'text/plain': (new (require('../lib/formatter_csv'))(@options)).output,
                #'application/javascript': @errorFormat,
                #'application/json': @errorFormat,
                #'application/octet-stream': @errorFormat,
                ##'*/*': @errorFormat,
                # supported output
                'text/html': (new (require('../lib/formatter_html'))(@options)).output,
                'text/csv': (new (require('../lib/formatter_csv'))(@options)).output,
                'text/tab-separated-values': (new (require('../lib/formatter_tab'))(@options)).output,
                'application/sparql-results+xml': (new (require('../lib/formatter_xml'))(@options)).output,
                'application/sparql-results+json': (new (require('../lib/formatter_json'))(@options)).output,
                # unsupported output
                '*/*': (new (require('../lib/formatter_error'))(@options)).output
            }

            server = restify.createServer(@options)
            #server.use(restify.acceptParser(server.acceptable));
            #server.pre(restify.pre.sanitizePath())
            server.use(restify.bodyParser())
            server.use(restify.queryParser())
            server.use(restify.urlEncodedBodyParser())
            @server = server

        @run: (@argv, @exit) ->
            gapisparql = new GapiSparql(@argv)
            gapisparql.start()
            gapisparql.server.get('/.*/', (req, res, next) -> return gapisparql.query('GET', req, res, next))
            gapisparql.server.post('/.*/', (req, res, next) -> return gapisparql.query('POST', req, res, next))
            gapisparql.server.put('/.*/', (req, res, next) -> return gapisparql.query('PUT', req, res, next))
            gapisparql.server.del('/.*/', (req, res, next) -> return gapisparql.query('DELETE', req, res, next))
        
        start: (callback) ->
            @server.listen(@options.listenPort, @options.host, () =>
                console.log('%s listening at %s', @server.name, @server.url) if @options.debug>0
                callback() if callback
            )
        
        stop: (callback) ->
            @server.close( () ->
                callback() if callback
            )
        
        query: (method, req, res, next) ->
            console.log(method+': '+req.url)
            accept = req.accepts(@options.accept)
            if(accept == undefined)
                (new (require('../lib/formatter_error'))(@options)).output(req, res)
            else
                # sparql_query = sparql.parser(@options)
                res.send(404, new restify.ResourceNotFoundError())
            return next()
        
        use: (pluginName) ->      
      
    module.exports = GapiSparql