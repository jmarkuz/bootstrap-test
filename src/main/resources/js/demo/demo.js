;
(function () {

    var listDiv = document.getElementById("list"),
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
                    s = s + "<tr><td>" + connections[j].scope + "</td>" + "<td>" + connections[j].sourceId + "->" + "</td><td>" + connections[j].targetId + "</td></tr>";
                }
                showConnectionInfo(s);
                console.log("showConnectionInfo: " + s)
            } else {
                hideConnectionInfo();
                console.log("hideConnectionInfo:")
            }
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
            paintStyle: {stroke: "rgba(23, 246, 168, 0.83)", strokeWidth: 4},
            hoverPaintStyle: {stroke: "green"},
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
                //todo: handler for mapping nodes
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
                //todo: handler for click action
            });

            // configure some drop options for use by all endpoints.
            var exampleDropOptions = {
                tolerance: "touch",
                hoverClass: "dropHover",
                activeClass: "dragActive"
            };

            // RGB - endpoint colors
            var redArrowColor = "rgb(247, 3, 3)"; //todo: alternative rgba(63, 191, 63, 0.5)
            var redEndpointColor = {
                endpoint: ["Dot", {radius: 7}],
                anchor: "BottomLeft",
                paintStyle: {fill: redArrowColor, opacity: 0},
                isSource: true,
                scope: 'all',
                connectorStyle: {
                    stroke: redArrowColor,
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

            var greenArrowColor = "rgb(63, 191, 63)";
            var greenEndpointColor = {
                endpoint: ["Dot", {radius: 7}],
                anchor: "BottomLeft",
                paintStyle: {fill: greenArrowColor, opacity: 0},
                isSource: true,
                scope: 'all',
                connectorStyle: {
                    stroke: greenArrowColor,
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

            var blueArrowColor = "rgb(3, 132, 247)";
            var blueEndpointColor = {
                endpoint: ["Dot", {radius: 7}],
                anchor: "BottomLeft",
                paintStyle: {fill: blueArrowColor, opacity: 0},
                isSource: true,
                scope: 'all',
                connectorStyle: {
                    stroke: blueArrowColor,
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

            // Rectangle anchor type
            var rectTestColor = "rgba(252, 252, 40, 0.3)";
            var rectangleTestEndpoint = {
                endpoint: "Rectangle",
                paintStyle: { width: 100, height: 24, fill: rectTestColor },
                isSource: true,
                reattach: true,
                scope: "all",
                connectorStyle: {
                    gradient: {stops: [
                        [0, rectTestColor],
                        [0.5, "rgb(252, 252, 40)"],
                        [1, rectTestColor]
                    ]},
                    strokeWidth: 5,
                    stroke: rectTestColor
                },
                isTarget: true,
                beforeDrop: function (params) {
                    return true; //todo: add handler confirm("Connect " + params.sourceId + " to " + params.targetId + "?");
                },
                dropOptions: exampleDropOptions
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
            var e11 = instance.addEndpoint("ch11_anchor", {anchor: "RightMiddle"}, redEndpointColor);
            e11.bind("maxConnections", maxConnectionsCallback);

            var e12 = instance.addEndpoint("ch12_anchor", {anchor: "RightMiddle"}, redEndpointColor);
            e12.bind("maxConnections", maxConnectionsCallback);

            var e13 = instance.addEndpoint("ch13_anchor", {anchor: "RightMiddle"}, greenEndpointColor);
            e13.bind("maxConnections", maxConnectionsCallback);

            var e14 = instance.addEndpoint("ch14_anchor", {anchor: "RightMiddle"}, greenEndpointColor);
            e14.bind("maxConnections", maxConnectionsCallback);

            var e15 = instance.addEndpoint("ch15_anchor", {anchor: "RightMiddle"}, blueEndpointColor);
            e15.bind("maxConnections", maxConnectionsCallback);

            var e16 = instance.addEndpoint("ch16_anchor", {anchor: "RightMiddle"}, blueEndpointColor);
            e16.bind("maxConnections", maxConnectionsCallback);

            // right hand tree anchors
            var e21 = instance.addEndpoint('ch21_anchor', {anchor: "LeftMiddle"}, redEndpointColor);
            e21.bind("maxConnections", maxConnectionsCallback);

            var e22 = instance.addEndpoint('ch22_anchor', {anchor: "LeftMiddle"}, redEndpointColor);
            e22.bind("maxConnections", maxConnectionsCallback);

            var e23 = instance.addEndpoint('ch23_anchor', {anchor: "LeftMiddle"}, greenEndpointColor);
            e23.bind("maxConnections", maxConnectionsCallback);

            var e24 = instance.addEndpoint('ch24_anchor', {anchor: "LeftMiddle"}, greenEndpointColor);
            e24.bind("maxConnections", maxConnectionsCallback);

            var e25 = instance.addEndpoint('ch25_anchor', {anchor: "LeftMiddle"}, blueEndpointColor);
            e25.bind("maxConnections", maxConnectionsCallback);

            var e26 = instance.addEndpoint('ch26_anchor', {anchor: "LeftMiddle"}, blueEndpointColor);
            e26.bind("maxConnections", maxConnectionsCallback);

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