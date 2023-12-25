from flask import Blueprint

# membuat bluprint untuk user
userBp = Blueprint("user", __name__)

from app.user import routes