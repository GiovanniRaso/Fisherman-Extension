document.addEventListener('DOMContentLoaded', function() {
    var checkButton = document.getElementById('checkButton');
    checkButton.addEventListener('click', function() {
        var url = document.getElementById('linkInput').value;

        checkLink(url);
    }, false);
});
// make checkLink function

document.addEventListener('DOMContentLoaded', function() {
    const toggleThemeButton = document.getElementById('toggleTheme');
    toggleThemeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        // Toggle the theme directly without needing to call updateTheme()
    });
});