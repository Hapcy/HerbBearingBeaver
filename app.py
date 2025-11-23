from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Serve HTML page
@app.route("/")
def home():
    return render_template("index.html")

# REST API endpoint
@app.route("/api/message")
def api_message():
    return jsonify({"message": "Hello from the API!"})

if __name__ == "__main__":
    app.run(debug=True)