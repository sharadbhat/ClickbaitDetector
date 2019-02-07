from flask import Flask, request
import json

app = Flask(__name__)

# @app.route("/", methods=["POST"])
@app.route("/")
def main_page():
    response = app.response_class(
        response=json.dumps("Hello"),
        status=200,
        mimetype="application/json"
    )
    # data = request.get_json()
    # print(data["headlines"])
    # run_model(data["headlines"])
    return response

def run_model():
    # Run trained model on new article
    pass

if __name__ == "__main__":
    app.run(port=5000, debug=True)