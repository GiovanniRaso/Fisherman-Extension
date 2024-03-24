chrome.runtime.onMessage.addlistener(
    function(request, sender, sendResponse){
        if(request.action === "checkURL"){
            checklink(request.url);
            sendResponse({message: "Checking URL"});
        }
        return true;
    }
)


    function checklink(url) {
    const apiKey = "857c3dfb1ef7451b3f6c0c7e1782a137831a02d18be34b123c7d3bf495c7236b"; // Replace with your actual VirusTotal API key
    // Ensure the URL is properly encoded
    const urlEncoded = encodeURIComponent(url);

    const bodyData = `url=${urlEncoded}`;

    fetch('https://www.virustotal.com/api/v3/urls', {
        method: 'POST',
        headers: {
            'x-apikey': apiKey,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        body: bodyData
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);
        if (data.data && data.data.attributes && data.data.attributes.last_analysis_stats) {
            const stats = data.data.attributes.last_analysis_stats;
            const resultElement = document.getElementById('result');
            const { malicious, suspicious, harmless } = stats;

            if (malicious > 0 || suspicious > 0) {
                resultElement.innerHTML = `<p style="color: red;">Warning: This URL has been flagged as harmful.</p>`;
            } else if (harmless > 0) {
                resultElement.innerHTML = `<p style="color: green;">This URL appears to be safe.</p>`;
            } else {
                resultElement.textContent = 'Analysis inconclusive. Please proceed with caution.';
            }
        } else {
            document.getElementById('result').textContent = 'No data available. Please ensure the URL is correct and try again.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'Error checking the URL.';
    });
}
