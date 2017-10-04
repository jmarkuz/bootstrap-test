// ------------ JqTree dnd --------------

$(function () {
    var targetDiv = $("#targetDiv, #targetDiv1");

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

    $("#tree1, #tree2").tree({
        dragAndDrop: true,
        onDragMove: handleMove,
        onDragStop: handleStop
    });
});

// handle move in my way
/*function handle_drag_move(node, event) {
    console.log("dnd: handle_drag_move");
    alert("dnd: handle_drag_move");
}

function handle_drag_stop(node, event) {
    console.log("dnd: handle_drag_stop");
    alert("dnd: handle_drag_stop");
}

$('#tree1, #tree2').tree({
    onDragMove: handle_drag_move,
    onDragStop: handle_drag_stop
});*/

// todo: need to verify how to load data from out json file
$('#tree1').tree({
    // data: data,
    autoOpen: true,
    dragAndDrop: true
});

$('#tree2').tree({
    // data: data,
    autoOpen: true,
    dragAndDrop: true
});

// variant hove to add data
$('#tree1, #tree2').tree();

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