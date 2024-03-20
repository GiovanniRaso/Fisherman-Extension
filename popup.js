document.getElementById('checkButton').addEventListener('click', function() {
    const url = document.getElementById('linkInput').value;
    if(url){
        chrome.runtime.sendMessage({action: "checkURL", url: url}, function(response) {
            document.getElementById('result').textContent = response.message;
        });
    } else {
        document.getElementById('result').textContent = 'Please enter a URL';
    }
});

    

document.addEventListener('DOMContentLoaded', function() {
    const toggleThemeButton = document.getElementById('toggleTheme');
    toggleThemeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        // Toggle the theme directly without needing to call updateTheme()
    });
});