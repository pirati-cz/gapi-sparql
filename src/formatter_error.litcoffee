
Restify formatter - */*


    self = null

    class FormatterError
    
        constructor: (options) ->
            self = @
            @options = options
        
        output: (req, res, body) =>
            console.log("errorFormat")
            body = "Not Acceptable. Supported Accepts: "+@options.accept
            res.writeHead(406, {
                'Content-Length': Buffer.byteLength(body),
                'Content-Type': 'text/plain'
            })
            res.write(body)
            res.end()
        
    module.exports = FormatterError