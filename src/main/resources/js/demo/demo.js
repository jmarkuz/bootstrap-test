;
(function () {
        // left tree nodes
        var node_11 = document.getElementById("ch11_anchor");
        var node_12 = document.getElementById("ch12_anchor");
        var node_13 = document.getElementById("ch13_anchor");
        var node_14 = document.getElementById("ch14_anchor");
        var node_15 = document.getElementById("ch15_anchor");
        var node_16 = document.getElementById("ch16_anchor");
        var node_17 = document.getElementById("ch17_anchor");
        var node_18 = document.getElementById("ch18_anchor");

        // right tree nodes
        var node_21 = document.getElementById("ch21_anchor");
        var node_22 = document.getElementById("ch22_anchor");
        var node_23 = document.getElementById("ch23_anchor");
        var node_24 = document.getElementById("ch24_anchor");
        var node_25 = document.getElementById("ch25_anchor");
        var node_26 = document.getElementById("ch26_anchor");
        var node_27 = document.getElementById("ch27_anchor");
        var node_28 = document.getElementById("ch28_anchor");

        // node list: node_1*-left tree, node_2*- right tree nodes
        var listDiv = {node_11, node_12, node_13, node_14, node_15, node_16, node_17, node_18,
                       node_21, node_22, node_23, node_24, node_25, node_26, node_27, node_28},

        showConnectionInfo = function (s) {
            listDiv.innerHTML = s;
            listDiv.style.display = "block";
        },
        hideConnectionInfo = function () {
            listDiv.style.display = "none";
        },
        connections = [],
        updateConnections = function (conn, remove) {
            if (!remove) {
                connections.push(conn);
            } else {
                var idx = -1;
                for (var i = 0; i < connections.length; i++) {
                    if (connections[i] == conn) {
                        idx = i;
                        break;
                    }
                }
                if (idx != -1) connections.splice(idx, 1);
            }
            if (connections.length > 0) {
                var s = "<span><strong>Connections</strong></span><br/><br/><table><tr><th>Scope</th><th>Source</th><th>Target</th></tr>";
                for (var j = 0; j < connections.length; j++) {
                    s = s + "<tr><td>" + connections[j].scope + "</td>" + "<td>" + connections[j].sourceId + "</td><td>" + connections[j].targetId + "</td></tr>";
                }
                showConnectionInfo(s);
            } else
                hideConnectionInfo();
        };

    jsPlumb.ready(function () {

        var instance = jsPlumb.getInstance({
            DragOptions: {cursor: 'pointer', zIndex: 2000},
            ConnectionOverlays: [
                ["Arrow", {
                    location: 1,
                    visible: true,
                    width: 11,
                    length: 11,
                    id: "ARROW",
                    events: {
                        click: function () {
                            alert("clicked on the arrow overlay")
                        }
                    }
                }],
                ["Label", {
                    location: 0.1,
                    id: "label",
                    cssClass: "aLabel",
                    events: {
                        tap: function () {
                            alert("mapping label");
                        }
                    }
                }]
            ],
            Container: "canvas"
        });

        var basicType = {
            connector: "StateMachine",
            paintStyle: {stroke: "red", strokeWidth: 4},
            hoverPaintStyle: {stroke: "blue"},
            overlays: [
                "Arrow"
            ]
        };

        instance.registerConnectionType("basic", basicType);

        // suspend drawing and initialise.
        instance.batch(function () {

            // bind to connection/connectionDetached events, and update the list of connections on screen.
            instance.bind("connection", function (info, originalEvent) {
                updateConnections(info.connection);
                alert("connection!")
            });

            instance.bind("connectionDetached", function (info, originalEvent) {
                updateConnections(info.connection, true);
                alert("connectionDetached!")
            });

            instance.bind("connectionMoved", function (info, originalEvent) {
                updateConnections(info.connection, true);
                alert("connectionMoved")
            });

            instance.bind("click", function (component, originalEvent) {
                alert("click!")
            });

            // configure some drop options for use by all endpoints.
            var exampleDropOptions = {
                tolerance: "touch",
                hoverClass: "dropHover",
                activeClass: "dragActive"
            };

            var example3Color = "rgba(229,219,61,0.5)";
            var exampleEndpoint3 = {
                endpoint: ["Dot", {radius: 7}],
                anchor: "BottomLeft",
                paintStyle: {fill: example3Color, opacity: 0},
                isSource: true,
                scope: 'yellow',
                connectorStyle: {
                    stroke: example3Color,
                    strokeWidth: 5
                },
                connector: "Straight",
                isTarget: true,
                dropOptions: exampleDropOptions,
                beforeDetach: function (conn) {
                    return confirm("Detach connection?");
                },
                onMaxConnections: function (info) {
                    alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
                }
            };

            // setup some DynamicAnchors for use and maxConnections callback.
            var anchors = [
                    [1, 0.2, 1, 0],
                    [0.8, 1, 0, 1],
                    [0, 0.8, -1, 0],
                    [0.2, 0, 0, -1]
                ],
                maxConnectionsCallback = function (info) {
                    alert("Cannot drop connection " + info.connection.id + " : maxConnections has been reached on Endpoint " + info.endpoint.id);
                };

            // can bind for a maxConnections callback using a standard bind call, but can also supply 'onMaxConnections' in an Endpoint definition - see exampleEndpoint3 above.
            // left hand tree anchors
            var e11 = instance.addEndpoint("ch11_anchor", {anchor: "RightMiddle"}, exampleEndpoint3);
            e11.bind("maxConnections", maxConnectionsCallback);

            var e12 = instance.addEndpoint("ch12_anchor", {anchor: "RightMiddle"}, exampleEndpoint3);
            e12.bind("maxConnections", maxConnectionsCallback);

            var e13 = instance.addEndpoint("ch13_anchor", {anchor: "RightMiddle"}, exampleEndpoint3);
            e13.bind("maxConnections", maxConnectionsCallback);

            var e14 = instance.addEndpoint("ch14_anchor", {anchor: "RightMiddle"}, exampleEndpoint3);
            e14.bind("maxConnections", maxConnectionsCallback);

            var e15 = instance.addEndpoint("ch15_anchor", {anchor: "RightMiddle"}, exampleEndpoint3);
            e15.bind("maxConnections", maxConnectionsCallback);

            var e16 = instance.addEndpoint("ch16_anchor", {anchor: "RightMiddle"}, exampleEndpoint3);
            e16.bind("maxConnections", maxConnectionsCallback);

            var e17 = instance.addEndpoint("ch17_anchor", {anchor: "RightMiddle"}, exampleEndpoint3);
            e17.bind("maxConnections", maxConnectionsCallback);

            var e18 = instance.addEndpoint("ch18_anchor", {anchor: "RightMiddle"}, exampleEndpoint3);
            e18.bind("maxConnections", maxConnectionsCallback);


            // right hand tree anchors
            var e21 = instance.addEndpoint('ch21_anchor', {anchor: "LeftMiddle"}, exampleEndpoint3);
            e21.bind("maxConnections", maxConnectionsCallback);

            var e22 = instance.addEndpoint('ch22_anchor', {anchor: "LeftMiddle"}, exampleEndpoint3);
            e22.bind("maxConnections", maxConnectionsCallback);

            var e23 = instance.addEndpoint('ch23_anchor', {anchor: "LeftMiddle"}, exampleEndpoint3);
            e23.bind("maxConnections", maxConnectionsCallback);

            var e24 = instance.addEndpoint('ch24_anchor', {anchor: "LeftMiddle"}, exampleEndpoint3);
            e24.bind("maxConnections", maxConnectionsCallback);

            var e25 = instance.addEndpoint('ch25_anchor', {anchor: "LeftMiddle"}, exampleEndpoint3);
            e25.bind("maxConnections", maxConnectionsCallback);

            var e26 = instance.addEndpoint('ch26_anchor', {anchor: "LeftMiddle"}, exampleEndpoint3);
            e26.bind("maxConnections", maxConnectionsCallback);

            var e27 = instance.addEndpoint('ch27_anchor', {anchor: "LeftMiddle"}, exampleEndpoint3);
            e27.bind("maxConnections", maxConnectionsCallback);

            var e28 = instance.addEndpoint('ch28_anchor', {anchor: "LeftMiddle"}, exampleEndpoint3);
            e28.bind("maxConnections", maxConnectionsCallback);

            // make .window divs draggable
            instance.draggable(jsPlumb.getSelector(".drag-drop-demo .window"));

            var hideLinks = jsPlumb.getSelector(".drag-drop-demo .hide");
            instance.on(hideLinks, "click", function (e) {
                instance.toggleVisible(this.getAttribute("rel"));
                jsPlumbUtil.consume(e);
            });

            var dragLinks = jsPlumb.getSelector(".drag-drop-demo .drag");
            instance.on(dragLinks, "click", function (e) {
                var s = instance.toggleDraggable(this.getAttribute("rel"));
                this.innerHTML = (s ? 'disable dragging' : 'enable dragging');
                jsPlumbUtil.consume(e);
            });

            var detachLinks = jsPlumb.getSelector(".drag-drop-demo .detach");
            instance.on(detachLinks, "click", function (e) {
                instance.detachAllConnections(this.getAttribute("rel"));
                jsPlumbUtil.consume(e);
            });

            instance.on(document.getElementById("clear"), "click", function (e) {
                instance.detachEveryConnection();
                showConnectionInfo("");
                jsPlumbUtil.consume(e);
            });
        });

        jsPlumb.fire("jsPlumbDemoLoaded", instance);
    });

})();