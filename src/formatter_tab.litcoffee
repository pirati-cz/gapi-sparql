
Restify formatter - text/tab-separated-values


    self = null

    class FormatterTab
    
        constructor: (options) ->
            self = @
            @options = options
        
        output: (req, res, body) =>
            console.log("tabFormat")
        
    module.exports = FormatterTab