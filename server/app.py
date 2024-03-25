from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

@app.route('/check-url', methods=['POST'])
def check_url():
    API_KEY = os.environ.get('VIRUSTOTAL_API_KEY')
    headers = {
        "x-apikey": API_KEY,
        "Content-Type": "application/json",
    }
    url_to_check = request.json['url']
    response = requests.post('https://www.virustotal.com/api/v3/urls', headers=headers, json={"url": url_to_check})
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)
