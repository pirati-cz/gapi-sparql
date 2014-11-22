$(document).ready(function () {
    var graph;
    function myGraph() {

        // Add and remove elements on the graph object
        this.addNode = function (id) {
            nodes.push({"id": id});
            update();
        };

        this.removeNode = function (id) {
            var i = 0;
            var n = findNode(id);
            while (i < links.length) {
                if ((links[i]['source'] == n) || (links[i]['target'] == n)) {
                    links.splice(i, 1);
                }
                else
                    i++;
            }
            nodes.splice(findNodeIndex(id), 1);
            update();
        };

        this.removeLink = function (source, target) {
            for (var i = 0; i < links.length; i++) {
                if (links[i].source.id == source && links[i].target.id == target) {
                    links.splice(i, 1);
                    break;
                }
            }
            update();
        };

        this.removeallLinks = function () {
            links.splice(0, links.length);
            update();
        };

        this.removeAllNodes = function () {
            nodes.splice(0, links.length);
            update();
        };

        this.addLink = function (source, target, value) {
            links.push({"source": findNode(source), "target": findNode(target), "value": value});
            update();
        };

        var findNode = function (id) {
            for (var i in nodes) {
                if (nodes[i]["id"] === id)
                    return nodes[i];
            }
            ;
        };

        var findNodeIndex = function (id) {
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].id == id) {
                    return i;
                }
            }
            ;
        };

        // set up the D3 visualisation in the specified element
        var w = $(window).width(),
                h = $(window).height();

        var color = d3.scale.category10();

        var vis = d3.select("body")
                .append("svg:svg")
                .attr("width", w)
                .attr("height", h)
                .attr("id", "svg")
                .attr("pointer-events", "all")
                .attr("viewBox", "0 0 " + w + " " + h)
                .attr("perserveAspectRatio", "xMinYMid")
                .append('svg:g');

        var force = d3.layout.force();

        var nodes = force.nodes(),
                links = force.links();

        var update = function () {
            var link = vis.selectAll("line")
                    .data(links, function (d) {
                        return d.source.id + "-" + d.target.id;
                    });

            link.enter().append("line")
                    .attr("id", function (d) {
                        return d.source.id + "-" + d.target.id;
                    })
                    .attr("stroke-width", function (d) {
                        return d.value / 10;
                    })
                    .attr("class", "link");
            link.append("title")
                    .text(function (d) {
                        return d.value;
                    });
            link.exit().remove();

            var node = vis.selectAll("g.node")
                    .data(nodes, function (d) {
                        return d.id;
                    });

            var nodeEnter = node.enter().append("g")
                    .attr("class", "node")
                    .call(force.drag);

            nodeEnter.append("svg:circle")
                    .attr("r", Math.floor((Math.random() * 12) + 6)/*12*/)
                    .attr("id", function (d) {
                        return "Node;" + d.id;
                    })
                    .attr("class", "nodeStrokeClass")
                    .attr("fill", function (d) {
                        return color(d.id);
                    });
            /*
             nodeEnter.append("svg:text")
             .attr("class", "textClass")
             .attr("x", 14)
             .attr("y", ".31em")
             .text(function (d) {
             return d.id;
             });
             */
            node.exit().remove();

            force.on("tick", function () {

                node.attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });

                link.attr("x1", function (d) {
                    return d.source.x;
                })
                        .attr("y1", function (d) {
                            return d.source.y;
                        })
                        .attr("x2", function (d) {
                            return d.target.x;
                        })
                        .attr("y2", function (d) {
                            return d.target.y;
                        });
            });

            // Restart the force layout.
            force
                    .gravity(.01)
                    .charge(-40000) // - 80000
                    .friction(0.001)
                    .linkDistance(function (d) {
                        return d.value * 10
                    })
                    .size([w, h])
                    .start();
        };


        // Make it all go
        update();
    }

    function drawGraph() {
        graph = new myGraph("#svgdiv");
        keepNodesOnTop();
    }
    drawGraph();

    function keepNodesOnTop() {
        $(".nodeStrokeClass").each(function (index) {
            var gnode = this.parentNode;
            gnode.parentNode.appendChild(gnode);
        });
    }
    function addNodes() {
        d3.select("svg")
                .remove();
        drawGraph();
    }

    var nodes = [];
    var node_links = [];
    var node_link_cnt = [];
    var rand = 0;
    var nodeGenerator = setInterval(function () {
        if (nodes.length > 300) clearInterval(nodeGenerator);
            do {
                rand = Math.floor((Math.random() * 15000) + 5000);
            } while (!$.inArray(rand, nodes));
            //console.log("new node:"+rand+" ("+nodes.length+")");
            graph.addNode(rand);
            nodes.push(rand);
        
    }, 2); // Math.floor((Math.random() * 5000) + 1000));

    var links = 0;
    var max_node_links = 1;
    var max_links = 300;
    var linkGenerator = setInterval(function () {
        if(links+1>=max_links) clearInterval(linkGenerator);
        do {
            rand1 = Math.floor((Math.random() * nodes.length) + 0);
            rand2 = Math.floor((Math.random() * nodes.length) + 0);
            if (node_link_cnt[rand1] === undefined)
                node_link_cnt[rand1] = 0;
            if (node_link_cnt[rand2] === undefined)
                node_link_cnt[rand2] = 0;
            
            // console.log('po gen: '+node_link_cnt[rand1]+'|'+node_link_cnt[rand2]);
        } while (
                !$.inArray(rand1 + "-" + rand2, node_links) &&
                !$.inArray(rand2 + "-" + rand1, node_links)
        );

        if (rand1 > 0 && rand2 > 0) {
            node_link_cnt[rand1]++;
            node_link_cnt[rand2]++;
            links++;
            graph.addLink(nodes[rand1], nodes[rand2], Math.floor((Math.random() * 50) + 5));
            node_links.push(rand1 + "-" + rand2);
            node_links.push(rand2 + "-" + rand1);
            keepNodesOnTop();

            var r1 = node_link_cnt[rand1];
            if (r1 <= max_node_links)
                r1 = "*" + node_link_cnt[rand1] + "*";
            var r2 = node_link_cnt[rand2];
            if (r2 <= max_node_links)
                r2 = "*" + node_link_cnt[rand2] + "*";
            //console.log("new link: " + rand1 + "<->" + rand2 + " [" + r1 + "/" + r2 + "] (" + links + ")");
        }
    }, 200);// Math.floor((Math.random() * 5000) + 1000));

    /*
     setInterval(function () {
     //do {
     rand1 = Math.floor((Math.random() * nodes.length) + 0);
     rand2 = Math.floor((Math.random() * nodes.length) + 0);
     if(nodes[rand1] !== undefined && nodes[rand2] !== undefined)
     graph.removeLink(nodes[rand1],nodes[rand2]);
     //} while (!$.inArray(rand, nodes));
     //alert("Hello")
     }, Math.floor((Math.random() * 15000) + 1000));
     */
});