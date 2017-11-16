    // simple linking of two divs
    /*$(document).ready(function () {

        jsPlumb.DEFAULT_DRAG_OPTIONS = {
            cursor: 'move',
            zIndex: 2000
        };

        // Соединяем блок id="block1" c блоком id="block2"
        $("#block1").plumb({
            target: 'block2',
            connector: new jsPlumb.Connectors.Straight(),
            anchors: [jsPlumb.Anchors.RightMiddle, jsPlumb.Anchors.LeftMiddle],
            paintStyle: {
                gradient: {
                    stops: [[0, '#8843cb'], [1, '#f0ce00']]
                },
                lineWidth: 5
            },
            endpointStyles: [{
                gradient: {stops: [[0, '#8843cb']]},
                radius: 6
            }, {
                gradient: {stops: [[0, '#f0ce00']]},
                radius: 6
            }]
        });
    });*/

    // static drag and draw support
    (function dragAndDraw() {
        var sourceEndPoint = $("#block1");
        var targetEndPoint = $("#block2");

        //Setting up drop options
        var targetDropOptions = {
            tolerance: 'touch',
            hoverClass: 'dropHover',
            activeClass: 'dragActive'
        };

        //Setting up a Target endPoint
        var targetColor = "#316b31";
        var targetEndpoint = {
            endpoint: ["Dot", {radius: 8}],
            paintStyle: {fillStyle: targetColor},
            isSource: false,
            scope: "green dot",
            connectorStyle: {strokeStyle: targetColor, lineWidth: 8},
            connector: ["Flowchart"],
            maxConnections: 3,
            isTarget: true,
            dropOptions: targetDropOptions
        };

        //Setting up a Source endPoint
        var sourceColor = "#ff9696";
        var sourceEndpoint = {
            endpoint: ["Dot", {radius: 8}],
            paintStyle: {fillStyle: sourceColor},
            isSource: true,
            scope: "green dot",
            connectorStyle: {strokeStyle: sourceColor, lineWidth: 8},
            connector: ["Flowchart", {curviness: 63}],
            maxConnections: 3,
            isTarget: false
            //dropOptions : targetDropOptions
        };

        //Set up endpoints on the divs
//        jsPlumb.addEndpoint($(".window"), {anchor: "LeftMiddle"}, targetEndpoint);
//        jsPlumb.addEndpoint($(".window"), {anchor: "RightMiddle"}, sourceEndpoint);
//
//        jsPlumb.draggable($(".window"));
//        jsPlumb.animate($("#block1"), {"left": 50, "top": 100}, {duration: "slow"});
    })();