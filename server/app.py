from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import time

app = Flask(__name__)
CORS(app)

@app.route('/analyze-url', methods=['POST'])
def analyze_url():
    API_KEY = os.environ.get('VIRUSTOTAL_API_KEY')
    data = request.get_json()
    submitted_url = data.get('url')
    
    headers = {
        "accept": "application/json",
        "x-apikey": API_KEY,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    
    # Submit URL for analysis
    submit_response = requests.post("https://www.virustotal.com/api/v3/urls", headers=headers, data={"url": submitted_url})
    if submit_response.status_code != 200:
        return jsonify({"error": "Failed to submit URL"}), 500
    
    # Extract analysis ID and fetch results
    analysis_id = submit_response.json()["data"]["id"]
    fetch_response = requests.get(f"https://www.virustotal.com/api/v3/analyses/{analysis_id}", headers=headers)
    
    if fetch_response.status_code == 200:
        response_json = fetch_response.json()
        stats = response_json["data"]["attributes"]["stats"]
        
        malicious_count = stats.get("malicious", 0)
        harmless_count = stats.get("harmless", 0)
        suspicious_count = stats.get("suspicious", 0)
        
        return jsonify({
            "malicious": malicious_count,
            "harmless": harmless_count,
            "suspicious": suspicious_count
        })
    else:
        return jsonify({"error": "Failed to fetch analysis results"}), 500

if __name__ == '__main__':
    app.run(debug=True)
