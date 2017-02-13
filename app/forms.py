from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired

class NewWineForm(FlaskForm):
    Name = StringField('name', validators=[DataRequired()])
    Year = IntegerField('year', validators=[DataRequired()])
    Type = StringField('type', validators=[DataRequired()]) 
    Region = StringField('region', validators=[DataRequired()]) 
    Comments = StringField('comments') 
    ImageUrl = StringField('imageurl')
    Rating = IntegerField('rating', validators=[DataRequired()])
