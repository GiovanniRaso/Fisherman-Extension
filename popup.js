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
    const apiKey = "857c3dfb1ef7451b3f6c0c7e1782a137831a02d18be34b123c7d3bf495c7236b";
    const urlEncoded = "encodeURICompent(url)"; 
    const requestUrl = 'https://www.virustotal.com/api/v3/urls';

    const urlBase64 = btoa(urlEncoded).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

    fetch(requestUrl, {
        method: 'POST',
        headers: {
            'x-apikey': apiKey,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            "url": urlBase64
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById('result').innerHTML = 'URL check complete';
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById('result').innerHTML = 'Error';
        })
    })
    
}


document.addEventListener('DOMContentLoaded', function() {
    const toggleThemeButton = document.getElementById('toggleTheme');
    toggleThemeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        // Toggle the theme directly without needing to call updateTheme()
    });
});