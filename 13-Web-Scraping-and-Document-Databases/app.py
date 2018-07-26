from flask import Flask, render_template, redirect
import pymongo
import flask_pymongo 
import scrape_mars

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_db"
mongo = PyMongo(app)

@app.route("/scrape")
def scrape():
    mars = scrape_mars.scrape()
