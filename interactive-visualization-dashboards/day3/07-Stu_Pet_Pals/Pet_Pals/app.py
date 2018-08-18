# import necessary libraries
import numpy as np

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
# @TODO: Setup your database here
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.pets.sqlite'

db = SQLAlchemy(app)

class Pet(db.Model):
    __tablename__ = 'pets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    type = db.Column(db.String)
    age = db.Column(db.Integer)

    def __repr__(self):
        return '<Pet %r>' % (self.name)

@app.before_first_request
def setup():
    db.create_all()

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

# Query the database and send the jsonified results
# @TODO: Create a route to accept your form data and
# save it to your database
@app.route('/send'. methods=["GET", "POST"])
def send():
    if request.method == "POST":
        name = request.form["petName"]
        pet_type = request.form["petTYpe"]
        age = request.form["petAge"]

        pet = Pet(name=name, type=pet_type, age=age)
        db.Session.add(pet)
        db.Session.commit()
        return redirect('/', code = 302)
    return render_template('form.html')

# @TODO: Create a route to send the data needed for your plots
@app.route('/api/pals')
def pals():
    results = db.Session.Query(Pet.type, func.count(Pet.type)).group_by(Pet.type).all()
    pet_type = [result[0] for result in results]
    age = [result[1] for result in results]
    pet_data = {
        "x": pet_type,
        "y": age,
        "type": "bar"
    }
    return jsonify(pet_data)

@app.route('/api/names')
def pets():
    results = db.Session.query(Pet.name).all()
    print(results)
    all_pets = list(np.ravel(results))
    return jsonify(all_pets)


if __name__ == "__main__":
    app.run()
