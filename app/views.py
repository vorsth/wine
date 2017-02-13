from app import app
from flask import render_template, flash, redirect
from forms import NewWineForm, NewUserForm
from Models import Wine, User, db
from sqlalchemy import func

@app.route('/')
@app.route('/index')
def index():

    bottleCount = db.session.query(func.count(Wine.WineId)).scalar()

    return render_template("index.html", bottleCount=bottleCount)


@app.route('/viewAllWines')
def viewAllWines():
    bottles = Wine.query.all()
    return render_template("viewAllWines.html", bottles=bottles)

@app.route('/newWine', methods=['GET', 'POST'])
def newWine():
    form = NewWineForm()
    if form.validate_on_submit():
        newWine = Wine(form.Name.data, form.Year.data, form.Type.data, form.Region.data, form.Comments.data, form.ImageUrl.data, form.Rating.data)
        db.session.add(newWine)
        db.session.commit()

        flash("'%s' added to database" % (form.Name.data), 'success');

        return redirect('/index')

    return render_template("newWine.html", form=form)


@app.route("/manageUsers", methods=['GET', 'POST'])
def manageUsers():
    form = NewUserForm()
    if form.validate_on_submit():
        newUser = User(form.FirstName.data,form.LastName.data)
        db.session.add(newUser)
        db.session.commit()

        flash("'%s %s' added to database" % (form.FirstName.data, form.LastName.data), 'success');

        return redirect('/manageUsers')

    users = User.query.all()
    return render_template("Users/manageUsers.html", users=users, form=form)
