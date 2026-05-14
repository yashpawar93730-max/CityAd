from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello World from Flask + Google App Engine!"

@app.route('/about')
def about():
    return "Cloud Computing Practical"

if __name__ == '__main__':
    app.run(debug=True)