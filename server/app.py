from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

@app.route('/check-url', methods=['POST'])
def check_url():
    API_KEY = os.environ.get('VIRUSTOTAL_API_KEY')
    headers = {
        "x-apikey": API_KEY,
        "Content-Type": "application/json",
    }
    data = request.get_json()
    
    if not data or 'url' not in data:
        return jsonify({"error": "Missing 'url' in request"}), 400

    url_to_check = data['url']
    response = requests.post('https://www.virustotal.com/api/v3/urls', headers=headers, json={"url": url_to_check})
    submission_data = response.json()

    stats = submission_data.get('data', {}).get('attributes', {}).get('stats', {})
    malicious_count = stats.get('malicious', 0)
    
    # Simple overall result based on the presence of any malicious detections
    overall_result = "malicious" if malicious_count > 0 else "safe"

    return jsonify({"overall_result": overall_result})

if __name__ == '__main__':
    app.run(debug=True, port=8000)

