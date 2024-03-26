document.getElementById('checkButton').addEventListener('click', function() {
    const url = document.getElementById('linkInput').value;
    if (url) {
        fetch('http://localhost:8000/check-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url })
        })
        .then(response => response.json())
        .then(data => {
            const resultElement = document.getElementById('result');
            // Reset previous styles
            resultElement.className = ''; 

            if (data.overall_result === "malicious") {
                resultElement.textContent = 'Caution: This URL may be harmful.';
                resultElement.className = 'url-unsafe'; // Apply styling for malicious URLs
            } else {
                resultElement.textContent = 'The URL is safe.';
                resultElement.className = 'url-safe'; // Apply styling for safe URLs
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').textContent = 'Error retrieving analysis.';
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