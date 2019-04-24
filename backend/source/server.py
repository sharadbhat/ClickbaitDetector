from flask import Flask, request, abort
import requests
import tldextract
from bs4 import BeautifulSoup
import json
from subprocess import check_output

from utils.get_news import get_news_from_headlines
from utils.similarity import Similarity

app = Flask(__name__)


@app.route("/", methods=["GET"])
def main_page():
    """
        - Handles incoming request from extension.
        - Retrieves URL from JSON and gets HTML content of page.
        - Cleans up HTML using Python Readability.
        - Sends headlines and summary to model.
    """
    url = request.args.get("url")

    if 'facebook' in tldextract.extract(url).domain.lower():
        response = app.response_class(
            response=json.dumps({"error": "Detector does not handle Facebook links."}),
            status=200,
            mimetype="application/json"
        )
    else:
        response = requests.get(url, allow_redirects=True)
        soup = BeautifulSoup(response.text, "lxml")
        headline = str(soup.title.string)

        percentage = run_model(headline)

        response = app.response_class(
            response=json.dumps({"headline": headline, "percentage": percentage}),
            status=200,
            mimetype="application/json"
        )
    return response


def run_model(headline):
    """
        - Run trained model on new article.
        - Passes headlines and summary to model.
    """
    val = check_output("python source\predict.py \"{}\"".format(headline))
    val = float(val.decode("utf8").replace("\r\n", ""))
    print(val)
    if val > 60.0 or val < 30.0:
        return val
    else:
        similarity_score = compare_similar_news(headline)
        print(similarity_score)
        return val


def compare_similar_news(headline):
    """
        - Calls utility function to get similar articles from Google News.
        - Compares news to check how similar the articles are.
        - Only used if clickabit detected percentage is low.
    """
    similar_articles = get_news_from_headlines(headline)
    similarity_score = Similarity().make_document(headline, similar_articles)
    return similarity_score


if __name__ == "__main__":
    app.run(port=5000, debug=True)
