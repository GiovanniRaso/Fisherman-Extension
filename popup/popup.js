document.getElementById('checkButton').addEventListener('click', function() {
    const url = document.getElementById('linkInput').value;
    if(url) {
        fetch('http://localhost:8000/check-url', { // Adjust as necessary
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const resultElement = document.getElementById('result');
            // Ensure you clear previous styles with each check
            resultElement.style.backgroundColor = ''; 
            resultElement.style.color = '';
            // Update based on hypothetical response handling
            if (data.safe) {
                resultElement.textContent = 'The URL is safe.';
                resultElement.className = 'url-safe';
            } else {
                resultElement.textContent = 'Caution: This URL may be harmful.';
                resultElement.className = 'url-unsafe';
            }
        })
        .catch(error => console.error('Error:', error));
    }
});


    

document.addEventListener('DOMContentLoaded', function() {
    const toggleThemeButton = document.getElementById('toggleTheme');
    toggleThemeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        // Toggle the theme directly without needing to call updateTheme()
    });
});