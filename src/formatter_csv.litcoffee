
Restify formatter - text/csv


    self = null

    class FormatterCsv
    
        constructor: (options) ->
            self = @
            @options = options
        
        output: (req, res, body) =>
            console.log("csvFormat")
        
    module.exports = FormatterCsv