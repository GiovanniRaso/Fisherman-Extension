document.addEventListener('DOMContentLoaded', function() {
    var checkButton = document.getElementById('checkButton');
    checkButton.addEventListener('click', function() {
        var url = document.getElementById('url').value;
        checkLink(url);
    }, false);
});
// make checkLink function