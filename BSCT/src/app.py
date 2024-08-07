from flask import Flask, session, render_template
from flask_cors import CORS
from waitress import serve
import os
import uuid

#todo/info
# later handle session in user class
# when db is built will add user class
# build class for route funcs

app = Flask(__name__)
CORS(app)

app.secret_key = os.urandom(24)

@app.route('/')
def index():
    if 'curr_user' not in session:
        session["curr_user"] = str(uuid.uuid4())
    return render_template("calorie_tracker_home.html")

def setup():
    from server.api.meals_api import meals_bp
    app.register_blueprint(meals_bp)

    if __name__ == '__main__':
        serve(app, host='0.0.0.0', port=8000)

setup()