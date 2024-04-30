document.addEventListener('DOMContentLoaded', function() {
    // Event listener for checking the URL when the "checkButton" is clicked
    document.getElementById('checkButton').addEventListener('click', function() {
        const url = document.getElementById('linkInput').value;
        if (url) {
            // Prepare the fetch requests
            const fetchAPI = fetch('http://localhost:8000/analyze-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: url })
            });

            const fetchDB = fetch(`http://localhost:8000/check-url/?url=${encodeURIComponent(url)}`);

            // Execute both requests concurrently
            Promise.all([fetchAPI, fetchDB])
                .then(responses => Promise.all(responses.map(res => res.json())))
                .then(([apiData, dbData]) => {
                    const resultElement = document.getElementById('result');
                    resultElement.textContent = '';
                    resultElement.removeAttribute('style');

                    // Handle API response
                    if (apiData.malicious > 0) {
                        resultElement.textContent = 'Caution: This URL is malicious.';
                        resultElement.style.color = 'white';
                        resultElement.style.backgroundColor = 'red';
                    } else if (apiData.suspicious > 0) {
                        resultElement.textContent = 'Warning: This URL is suspicious.';
                        resultElement.style.color = 'black';
                        resultElement.style.backgroundColor = 'yellow';
                    } else if (apiData.harmless > 0) {
                        resultElement.textContent = 'This URL is safe.';
                        resultElement.style.color = 'white';
                        resultElement.style.backgroundColor = 'green';
                    } else {
                        resultElement.textContent = 'Analysis inconclusive.';
                        resultElement.style.color = 'black';
                        resultElement.style.backgroundColor = 'grey';
                    }

                    // Optionally handle DB response (you can adjust based on what you want to show)
                    console.log('Database check:', dbData);

                    // Here you can also update the UI based on dbData if needed
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('result').textContent = 'Error retrieving analysis.';
                    document.getElementById('result').style.color = 'red';
                });
        }
    });

    // Event listener for toggling the theme
    const toggleThemeButton = document.getElementById('toggleTheme');
    toggleThemeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });
});
