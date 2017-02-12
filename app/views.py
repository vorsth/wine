from app import app
from flask import render_template
from Models import WineBottle, db

@app.route('/')
@app.route('/index')
def index():
    x = "";
    bottles = WineBottle.query.all()
    for row in bottles:
        x += "<br>" + row.Name

    return render_template("index.html", bottles=bottles)


@app.route('/viewAllWines')
def viewAllWines():
    bottles = WineBottle.query.all()
    return render_template("viewAllWines.html", bottles=bottles)
