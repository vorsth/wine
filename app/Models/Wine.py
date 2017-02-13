from app.Models import db

class Wine(db.Model):
    __table_args__ = {"schema":"Data"}
    __tablename__ = 'Wines'
    WineId = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(100))
    Year = db.Column(db.Integer)
    Type = db.Column(db.String(100))
    Region = db.Column(db.String(100))
    Comments = db.Column(db.String)
    ImageUrl = db.Column(db.String(250))
    Rating = db.Column(db.Integer)

    def __init__(self, Name, Year, Type, Region, Comments, ImageUrl, Rating):
        self.Name = Name
        self.Year = Year
        self.Type = Type
        self.Region = Region
        self.Comments = Comments
        self.ImageUrl = ImageUrl
        self.Rating = Rating

    def __repr__(self):
        return '<Wine %r>' % self.Name
