
Restify formatter - text/html


    restify = require('restify')
    fs = require('fs')
    self = null

    class FormatterHtml

        constructor: (options) ->
            self = @
            @options = options
            @static_page_temp = null
            @resources_path = 'resources/formatter_html'
            
        output= (req, res, body) =>
            console.log("htmlFormat")
            title = 'GAPI'
            if body instanceof restify.ResourceNotFoundError
                res.statusCode = 200
                if @static_page_temp == null
                    # css
                    style = fs.readFileSync(@resources_path+'/style.min.css',{'encoding': 'utf-8'})
                    # javascripts
                    d3 = fs.readFileSync(@resources_path+'/d3.v3.min.js',{'encoding': 'utf-8'})
                    jquery = fs.readFileSync(@resources_path+'/jquery.min.js',{'encoding': 'utf-8'})
                    script = fs.readFileSync(@resources_path+'/script.min.js',{'encoding': 'utf-8'})
                    # page
                    static_page_temp = fs.readFileSync(@resources_path+'/index.html',{'encoding': 'utf-8'})
                    static_page_temp = static_page_temp.replace('{% style %}',style)
                    static_page_temp = static_page_temp.replace('{% d3 %}',d3)
                    static_page_temp = static_page_temp.replace('{% jquery %}',jquery)
                    static_page_temp = static_page_temp.replace('{% script %}',script)
                    @static_page_temp = static_page_temp
                    
            return @static_page_temp
            
    module.exports = FormatterHtml