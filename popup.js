document.addEventListener('DOMContentLoaded', function() {
    var checkButton = document.getElementById('checkButton');
    checkButton.addEventListener('click', function() {
        const url = document.getElementById('linkInput').value;
        if(linkInput){
            checklink(url);
        } else {
            document.getElementById('result').innerHTML = "Enter a URL";
        }
    });
});
function checklink(url){
    const apiKey = "Your API Key";
    const safeBrowsingURL = "" ;
    
}


document.addEventListener('DOMContentLoaded', function() {
    const toggleThemeButton = document.getElementById('toggleTheme');
    toggleThemeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        // Toggle the theme directly without needing to call updateTheme()
    });
});