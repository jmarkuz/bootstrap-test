// dropdown button handler
$('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrainWidth: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: 'left', // Displays dropdown with edge aligned to the left of button
    stopPropagation: false // Stops event propagation
});


// ----------Buttons handlers -----------

$('.modalBtn').click(function () {
    $('.modal').modal();
});

$('.btn .btn-info .btn-fill .pull-right').click(function () {
    console.log("Save click");
});

$('.modal-trigger').click(function () {
    console.log("Learn more clicked");
});

$('#modalPopupCloseBtn').click(function () {
    console.log("Close clicked");
});

$('#modalPopupSaveBtn').click(function () {
    console.log("Save changes clicked");
});

$('#navBarFormSearchBtn').click(function () {
    console.log("Save central panel clicked");
});

$('#someId').click(function () {
    console.log("some message");
});

// ---------- TextArea_select_using -----------

function sendToArea() {
    document.getElementById("xRulesTextArea").value = "stub"; //document.getElementById("textboxId").value
}

// jQuery code to populate the textBox based on selection:
$(document).ready(function () {
    // apply a change event
    $('#xRulesDropdown').change(function () {
        alert("xRulesDropdown called");
        // update textArea with the currently selected value
        $('#xRulesTextArea').val($(this).val());
    });
});

$('#xRulesDropdown').change(function () {
    alert("xRulesDropdown");
    $('#xRulesTextArea').attr('val', $('#xRulesDropdown').val());
});

$(document).ready(function () {
    $('#xRulesDropdown').change(function () {
        $('#xRulesTextArea').html($("#selectMe option:selected").text());
    })
});

$('#centralPanelProcessBtn').click(function () {
    // todo: process existing x-rules
});

$('.dropdown-content li a').click(function () {
    // console.log("click on button: " + $(this).text());
    // concatenate with whitespace
    // $('#xRulesTextArea').append(" ");
    $('#xRulesTextArea').empty();
    $('#xRulesTextArea').append($(this).text());
});

// todo: load Rules from file
$('.chips').material_chip();

$('.chips-initial').material_chip({
    data: [{
        tag: 'Rule1'
    }, {
        tag: 'Rule2'
    }, {
        tag: 'Rule3'
    }]
});

// chips xRules handlers
$('.chips').on('chip.add', function (e, chip) {
    console.log("1");
});

$('.chips').on('chip.delete', function (e, chip) {
    console.log("2");
});

$('.chips').on('chip.select', function (e, chip) {
    console.log("3");
});