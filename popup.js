document.addEventListener('DOMContentLoaded', function() {
    var checkButton = document.getElementById('checkButton');
    checkButton.addEventListener('click', function() {
        const url = document.getElementById('linkInput').value;
        if(linkInput){
            checklink(url);
        } else {
            document.getElementById('result').textContent = "Enter a URL";
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
        .then(response => {
            if (response.status === 429) {
                throw new Error('Rate limit exceeded. Please try again later.');
            }
            response.json()})
        .then(data => {
            if (data && data.data && data.data.attributes && data.data.attributes.last_analysis_stats) {
                const stats = data.data.attributes.last_analysis_stats;
                const maliciousCount = stats.malicious;
            
                const resultElement = document.getElementById('result');

                if (maliciousCount > 0) {
                    resultElement.innerHTML = `<p style="color: red;">Warning: This URL has been flagged as harmful by ${maliciousCount} sources.</p>`;
                } else if (harmlessCount > 0 && undetectedCount > 0) {
                    resultElement.innerHTML = `<p style="color: green;">This URL appears to be safe, but always stay vigilant.</p>`;
                } else {
                    resultElement.textContent = 'This URL appears to be safe.';
                }
            } else {
                document.getElementById('result').textContent = 'No data available.';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById('result').textContent = 'Error';
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