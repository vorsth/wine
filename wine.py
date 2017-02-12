from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://hans:1T5qpn00@MSSQLWine'
db = SQLAlchemy(app)


class WineBottle(db.Model):
    __table_args__ = {"schema":"Data"}
    __tablename__ = 'WineBottles'
    id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100))
    Year = db.Column(db.Integer)

    def __init__(self, Name, Year):
        self.Name = Name
        self.Year = Year

    def __repr__(self):
        return '<User %r>' % self.username

@app.route("/")
def hello():

    wines = WineBottle.query.all();

    x = "";

    for row in wines:
        x += row.Name + "<br>"

    return "Hello World" + x

if __name__ == "__main__":
	app.run()
