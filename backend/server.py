from flask import Flask, request
import requests
from readability import Document
import json

app = Flask(__name__)

@app.route("/", methods=["POST"])
def main_page():
    response = app.response_class(
        response=json.dumps("Hello"),
        status=200,
        mimetype="application/json"
    )
    url = request.get_json()["url"]
    page_content = requests.get(url).text
    cleaned_page_content = Document(page_content)
    headlines = cleaned_page_content.title()
    summary = cleaned_page_content.summary()

    # run_model(headlines, summary)
    return response

def run_model():
    # Run trained model on new article
    pass

if __name__ == "__main__":
    app.run(port=5000, debug=True)