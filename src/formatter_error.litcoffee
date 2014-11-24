
Restify formatter - */*


    self = null

    class FormatterError
    
        constructor: (options) ->
            self = @
            @options = options
        
        output: (req, res, body) =>
            console.log("htmlFormat") if @options.debug>1
            res.statusCode = 406
            body = "Not Acceptable. Supported Accepts: "+@options.accept
            res.setHeader('content-type', 'text/plain')
            res.setHeader('content-length', Buffer.byteLength(body))
            return body
        
    module.exports = FormatterError