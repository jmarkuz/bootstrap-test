// load data from json file
$(function () {
    $('#container, #container2').jstree({
        'core': {
            'data': {
                "url": "large-test-data.json",
                "dataType": "json" // needed only if you do not supply JSON headers
            }
        }
    });
});

// tree configuration
$("#tree").jstree({
    "core": {
        "multiple": false,
        "themes": {
            "dots": false
        }
    },
    "plugins": ["state", "dnd"] // "checkbox" switched off
});

// drag and drop
$("#container, #container2").jstree({
    "core": {"check_callback": true},
    "plugins": ["dnd"] // "checkbox" switched off
});
