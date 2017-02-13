from app.Models import db
from sqlalchemy import func

class User(db.Model):
    __table_args__ = {'schema': 'Admin'}
    __tablename__ = 'Users'
    UserId = db.Column(db.Integer, primary_key=True)
    FirstName = db.Column(db.String(50), nullable=False)
    LastName = db.Column(db.String(50), nullable=False)
    CreationDate = db.Column(db.Date, nullable=False, default=func.now())

    def __init__(self, FirstName, LastName):
        self.FirstName = FirstName
        self.LastName = LastName

    def __repr(self):
        return '<User %r %r>' % (self.FirstName, self.LastName)
