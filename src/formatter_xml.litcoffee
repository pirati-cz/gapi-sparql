
Restify formatter - application/sparql-results+xml


    self = null

    class FormatterXml
    
        constructor: (options) ->
            self = @
            @options = options
        
        output: (req, res, body) =>
            console.log("xmlFormat")
        
    module.exports = FormatterXml