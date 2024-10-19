from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    words = ["but", "because", "hello", "why", "there", "not", "perhaps"]
    return render_template("index.html", words=words)

if __name__ == '__main__':
    app.run()