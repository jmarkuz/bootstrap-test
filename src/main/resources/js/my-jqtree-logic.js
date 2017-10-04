// -------- test data for JqTree ---------
var data = [
    {
        name: 'node1', id: 1,
        children: [
            {name: 'child1', id: 2},
            {name: 'child2', id: 3}
        ]
    }, {
        name: 'node2', id: 4,
        children: [
            {name: 'child3', id: 5}
        ]
    }
];

// ------------ JqTree dnd --------------

$(function () {
    var targetDiv = $("#targetDiv");

    function isOverTarget(e) {
        console.log("dnd: isOverTarget() called");
        return ( e.clientX > targetDiv.position().left &&
            e.clientX < targetDiv.position().left + targetDiv.width() &&
            e.clientY > targetDiv.position().top &&
            e.clientY < targetDiv.position().top + targetDiv.height());
    }

    function handleMove(node, e) {
        alert("dnd: handleMove() called");
        console.log("handleMove() called");
        if (isOverTarget(e)) {
            console.log("the node is over the target div");
        }
    }

    function handleStop(node, e) {
        alert("dnd: handleStop() called");
        console.log("dnd: handleStop() called");
        console.log("dnd: stopped over target: ", isOverTarget(e));
    }
});

$("#tree1").tree({
    dragAndDrop: true,
    onDragMove: handleMove,
    onDragStop: handleStop
});

$("#tree2").tree({
    dragAndDrop: true,
    onDragMove: handleMove,
    onDragStop: handleStop
});

$('#tree1').tree({
    data: data,
    autoOpen: true,
    dragAndDrop: true
});

$('#tree2').tree({
    data: data,
    autoOpen: true,
    dragAndDrop: true
});

$('.tree-toggle').click(function () {
    alert("tree-toggle");
    $(this).parent().children('ul.tree').toggle(200);
});

$(function () {
    $('.tree-toggle').parent().children('ul.tree').toggle(200);
});

// --------- Tree select handlers ----------
$('#tree1, #tree2').bind(
    'tree.select',
    function (event) {
        if (event.node) {
            var selectedNode = event.node;
            console.log("select: selected node: " + selectedNode);
            // todo: add handling of selecting node
        }
    }
);

$('#tree1, #tree2').bind(
    'tree.contextmenu',
    function (event) {
        var clickedNode = event.node;
        console.log("select: contextmenu: " + clickedNode);
        // todo: add handling of clickedNode context menu
    }
);