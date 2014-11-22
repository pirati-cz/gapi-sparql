
Restify formatter - application/sparql-results+json


    self = null

    class FormatterJson
    
        constructor: (options) ->
            self = @
            @options = options
        
        output: (req, res, body) =>
            console.log("jsonFormat")
            return JSON.stringify(body, null, '  ')
        
    module.exports = FormatterJson