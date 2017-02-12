from app import app
from flask import render_template
from Models import WineBottle, db
from sqlalchemy import func

@app.route('/')
@app.route('/index')
def index():

    bottleCount = db.session.query(func.count(WineBottle.id)).scalar()

    return render_template("index.html", bottleCount=bottleCount)


@app.route('/viewAllWines')
def viewAllWines():
    bottles = WineBottle.query.all()
    return render_template("viewAllWines.html", bottles=bottles)

@app.route('/newWine')
def newWine():
    return render_template("newWine.html")
