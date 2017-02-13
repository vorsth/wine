from app.Models import db

class Image(db.Model):
    __table_args__ = {'schema': 'Data'}
    __tablename__ = 'Images'
    ImageId = db.Column(db.Integer, primary_key=True)
    WineId = db.Column(db.Integer)
    FileName = db.Column(db.String(250))
    ImageTypeId = db.Column(db.Integer)

    def __init__(self, WineId, FileName, ImageTypeId):
        self.WineId = WineId
        self.FileName = FileName
        self.ImageTypeId = ImageTypeId

    def __repr__(self):
        return '<Image %r %r>' % (self.WineId, self.FileName)
