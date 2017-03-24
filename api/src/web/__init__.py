from flask import Blueprint, render_template

web = Blueprint('web', __name__)


@web.route('/admin')
def get_admin_page():
    return render_template('index.html')
