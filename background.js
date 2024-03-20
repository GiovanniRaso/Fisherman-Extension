chrome.runtime.onMessage.addlistener(
    function(request, sender, sendResponse){
        if(request.action === "checkURL"){
            checklink(request.url);
            sendResponse({message: "Checking URL"});
        }
    }
)

function checklink(url){
    const apiKey = "857c3dfb1ef7451b3f6c0c7e1782a137831a02d18be34b123c7d3bf495c7236b";
    const requestUrl = 'https://www.virustotal.com/api/v3/urls';
    const urlEncoded = encodeURIComponent(url);

    const bodyData = new URLSearchParams();
    bodyData.append('url', urlEncoded);

    fetch(requestUrl, {
        method: 'POST',
        headers: {'x-apikey': apiKey, 'Content-Type': 'application/x-www-form-urlencoded'},
        body: bodyData
    })
    .then(response => response.json())
    .then(data => {
        if (data.data){
            sendResponse({message: "URL anaylyzed successfully"});
        } else {
            sendResponse({message: "No data found for URL"});
        }
    })
    .catch(error => {
        sendResponse({message: "Error analyzing URL"});
    });

    return true;
    
    }