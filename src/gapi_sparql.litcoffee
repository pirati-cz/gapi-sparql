
GapiSparql - Main class for GAPI SPARQL component

    restify = require('restify')
    fs = require('fs')
    self = null

    class GapiSparql

        constructor: (options) ->
            self = @
            @static_page_temp = null
            @options = options or {}
            
            @options.name = 'gapi-sparql'
            @options.version = '0.0.1'
            @options.listenPort ?= process.env.PORT || 5000
            @options.accept = [
                'text/html',
                'text/csv',
                'text/tab-separated-values',
                'application/sparql-results+xml',
                'application/sparql-results+json'
            ]
            @options.formatters = {
                # defaults
                #'text/plain': @errorFormat,
                #'application/javascript': @errorFormat,
                #'application/json': @errorFormat,
                #'application/octet-stream': @errorFormat,
                ##'*/*': @errorFormat,
                # supported output
                'text/html': @htmlFormat,
                'text/csv': @csvFormat,
                'text/tab-separated-values': @tabFormat,
                'application/sparql-results+xml': @xmlFormat
                'application/sparql-results+json': @jsonFormat
            }

            server = restify.createServer(@options)
            #server.use(restify.acceptParser(server.acceptable));
            #server.pre(restify.pre.sanitizePath())
            server.use(restify.bodyParser())
            server.use(restify.queryParser())
            server.use(restify.urlEncodedBodyParser())
            server.listen(@options.listenPort, () ->
                console.log('%s listening at %s', server.name, server.url)
            )
            @server = server

        @run: (argv, exit) ->
            gapisparql = new GapiSparql()
            gapisparql.server.get('/.*/', (req, res, next) -> return gapisparql.query('GET', req, res, next))
            gapisparql.server.post('/.*/', (req, res, next) -> return gapisparql.query('POST', req, res, next))
            gapisparql.server.put('/.*/', (req, res, next) -> return gapisparql.query('PUT', req, res, next))
            gapisparql.server.del('/.*/', (req, res, next) -> return gapisparql.query('DELETE', req, res, next))
            
        query: (method, req, res, next) ->
            console.log(method+': '+req.url)
            accept = req.accepts(@options.accept)
            if(accept == undefined)
                body = "Not Acceptable. Supported Accepts: "+@options.accept
                res.writeHead(406, {
                    'Content-Length': Buffer.byteLength(body),
                    'Content-Type': 'text/plain'
                })
                res.write(body)
                res.end()
            else
                res.send(404, new restify.ResourceNotFoundError())
            return next()
        
        jsonFormat: (req, res, body) ->
            console.log("jsonFormat")
            return JSON.stringify(body, null, '  ')
        
        xmlFormat: (req, res, body) ->
            console.log("xmlFormat")
        
        csvFormat: (req, res, body) ->
            console.log("csvFormat")
        
        tabFormat: (req, res, body) ->
            console.log("tabFormat")

        htmlFormat: (req, res, body) =>
            console.log("htmlFormat")
            title = 'GAPI'
            if body instanceof restify.ResourceNotFoundError
                res.statusCode = 200
                if @static_page_temp == null
                    # css
                    style = fs.readFileSync('resources/style.min.css',{'encoding': 'utf-8'})
                    # javascripts
                    d3 = fs.readFileSync('resources/d3.v3.min.js',{'encoding': 'utf-8'})
                    jquery = fs.readFileSync('resources/jquery.min.js',{'encoding': 'utf-8'})
                    script = fs.readFileSync('resources/script.min.js',{'encoding': 'utf-8'})
                    # page
                    static_page_temp = fs.readFileSync('resources/index.html',{'encoding': 'utf-8'})
                    static_page_temp = static_page_temp.replace('{% style %}',style)
                    static_page_temp = static_page_temp.replace('{% d3 %}',d3)
                    static_page_temp = static_page_temp.replace('{% jquery %}',jquery)
                    static_page_temp = static_page_temp.replace('{% script %}',script)
                    @static_page_temp = static_page_temp
                    
            return @static_page_temp
        
        use: (pluginName) ->      
      
    module.exports = GapiSparql