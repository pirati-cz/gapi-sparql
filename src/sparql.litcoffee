
GAPI Sparql class

    rdfstore = require('rdfstore')
    self = null

    class Sparql
    
        constructor: (options) ->
            console.log('Sparql');
            self = @
            
            @store = new rdfstore.Store({
                engine: 'mongodb',
                name: 'gapi',
                overwrite: true,
                mongoDomain: 'localhost',
                mongoPort: 27017
            }, (store) -> )
        
        query: (query, callback = null) ->
            @store.execute(query, (success, results) ->
                if callback == null
                    callback()
                return results
            )
            
    module.exports = Sparql
    
    #store = @store
    ###
            query = "PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX : <http://example.org/people/> INSERT DATA { :milan rdf:type    foaf:Person ; foaf:name   'Milan' ; . }";
            # query = 'INSERT DATA {  <http://example/book3> <http://example.com/vocab#title> <http://test.com/example> }'
            store.execute(query, (suc, res) ->
                console.log(suc)
                store.execute('SELECT * { ?s ?p ?o }', (success, results) ->
                    console.log(success)
                    if success
                        console.log('success')
                        if results[0].s.token == 'uri'
                            console.log(results[0].s.value)
                            console.log(results[0].p.value)
                            console.log(results[0].o.value)
                )
            )
    ###