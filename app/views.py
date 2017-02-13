from app import app
from flask import render_template, flash, redirect
from forms import NewWineForm
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

@app.route('/newWine', methods=['GET', 'POST'])
def newWine():
    form = NewWineForm()
    print("Validating form")
    if form.validate_on_submit():
        print("Form Validated")
        newBottle = WineBottle(form.Name.data, form.Year.data, form.Type.data, form.Region.data, form.Comments.data, form.ImageUrl.data, form.Rating.data)
        db.session.add(newBottle)
        db.session.commit()

        flash("'%s' added to database" % (form.Name.data), 'success');

        return redirect('/index')

    print("Form not Valid")
    return render_template("newWine.html", form=form)
