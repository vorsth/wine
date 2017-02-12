from app.Models import db

class WineBottle(db.Model):
    __table_args__ = {"schema":"Data"}
    __tablename__ = 'WineBottles'
    id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100))
    Year = db.Column(db.Integer)
    Type = db.Column(db.String(100))
    Region = db.Column(db.String(100))
    Comments = db.Column(db.String)
    ImageURL = db.Column(db.String(250))
    Rating = db.Column(db.Integer)

    def __init__(self, Name, Year, Type, Region, Comments, ImageURL, Rating):
        self.Name = Name
        self.Year = Year
        self.Type = Type
        self.Region = Region
        self.Comments = Comments
        self.ImageURL = ImageURL
        self.Rating = Rating

    def __repr__(self):
        return '<User %r>' % self.username
