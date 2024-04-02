document.getElementById('checkButton').addEventListener('click', function() {
    const url = document.getElementById('linkInput').value;
    if (url) {
        fetch('http://localhost:8000/analyze-url', { // Make sure this URL matches your Flask app's URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url })
        })
        .then(response => response.json())
        .then(data => {
            const resultElement = document.getElementById('result');
            
            // Reset previous message and styling
            resultElement.textContent = '';
            resultElement.removeAttribute('style');

            // Determine the message and styling based on the analysis counts
            if (data.malicious > 0) {
                resultElement.textContent = 'Caution: This URL is malicious.';
                resultElement.style.color = 'white';
                resultElement.style.backgroundColor = 'red';
            } else if (data.suspicious > 0) {
                resultElement.textContent = 'Warning: This URL is suspicious.';
                resultElement.style.color = 'black';
                resultElement.style.backgroundColor = 'yellow';
            } else if (data.harmless > 0) {
                resultElement.textContent = 'This URL is safe.';
                resultElement.style.color = 'white';
                resultElement.style.backgroundColor = 'green';
            } else {
                resultElement.textContent = 'Analysis inconclusive.';
                resultElement.style.color = 'black';
                resultElement.style.backgroundColor = 'grey';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').textContent = 'Error retrieving analysis.';
            document.getElementById('result').style.color = 'red';
        });
    }
});

    

document.addEventListener('DOMContentLoaded', function() {
    const toggleThemeButton = document.getElementById('toggleTheme');
    toggleThemeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        // Toggle the theme directly without needing to call updateTheme()
    });
});