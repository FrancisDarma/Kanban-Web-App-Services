from flask import request, jsonify
from app.extension import db

from app.user import userBp
from app.models.user import Users
from app.models.task import Tasks

# route GET all user
@userBp.route("", methods=['GET'], strict_slashes = False)
def get_all_user():
    """
    Fungsi untuk mendapatkan semua user

    args:
        -

    return
        response (json object): pesan response
    """
    
    # mendapatkan argumen limit
    limit = request.args.get('limit', 10)
    if type(limit) is not int:
        return jsonify({'message': 'invalid parameter'}), 400

    # query untuk mendapatkan data user
    users = db.session.execute(
        db.select(Users).limit(limit)
    ).scalars()

    # mengubah object hasil query menjadi dictionary
    result = []
    for user in users:
        result.append(user.serialize())

    # membuat response
    response = jsonify(
        success = True,
        data = result
    )

    return response, 200

# route POST user
@userBp.route("", methods=['POST'], strict_slashes = False)
def create_user():
    """
    Fungsi untuk membuat user baru

    args:
        -

    return
        response (json object): pesan response
    """
    
    # mendapatkan request json dari client
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Validasi input
    if not name or not email or not password:
        return jsonify({'message': 'incomplete data'}), 422

    # membuat user baru
    new_user = Users(
        name = name,
        email = email,
        password = password)
    
    # menambahkan data ke database
    db.session.add(new_user)
    db.session.commit()

    # membuat response
    response = jsonify(
        success = True,
        data = new_user.serialize()
    )

    return response, 200

# route PUT user/<id>
@userBp.route("<int:id>", methods=['PUT'], strict_slashes = False)
def edit_user(id):
    """
    Fungsi untuk edit seluruh detail user

    args:
        id (int) : id user

    return
        response (json object): pesan response
    """
    
    # mendapatkan request json dari client
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    
    # mendapatkan data berdasarkan id user
    user = Users.query.filter_by(id=id).first()
    
    # cek apakah variable hasil query kosong
    if not user:
        return jsonify({'error': 'user not found'}), 422
    
    # cek apakah data request dari user ada yang kosong
    if not name or not email or not password:
        return jsonify({'message': 'incomplete data'}), 422
    else:
        # melakukan overwrite data
        user.name = name
        user.email = email
        user.password = password
        db.session.commit()
    
    # membuat response
    response = jsonify({
        "success" : True,
        "message" : "user update successfully",
    })

    return response, 200

# route DELETE users/id
@userBp.route("<int:id>", methods=['DELETE'], strict_slashes = False)
def delete_user(id):
    """
    Fungsi untuk hapus user berdasarkan id

    args:
        id (int) : id user

    return
        response (json object): pesan response
    """
    
    # mendapatkan user berdasarkan id user
    user = Users.query.filter_by(id=id).first()

    # cek apakah variable hasil query kosong
    if not user:
        return jsonify({'error': 'user not found'}), 422
    else:
        db.session.delete(user)
        db.session.commit()
    
    # membuat response
    response = jsonify({
        "success" : True,
        "message" : "user delete successfully",
    })

    return response, 200

# get user task
@userBp.route("<int:id>/tasks", methods=['GET'], strict_slashes = False)
def get_user_task(id):
    """
    Fungsi untuk mendapatkan daftar task user

    args:
        id (int) : id user

    return
        response (json object): pesan response
    """
    
    limit = request.args.get('limit', 10)
    if type(limit) is not int:
        return jsonify({'message': 'invalid parameter'}), 400

    # mendapatkan daftar task berdasarkan user id
    tasks = Tasks.query.filter_by(user_id=id).limit(limit).all()

    # cek apakah variable hasil query kosong
    if not tasks:
        return jsonify({'error': 'tasks not found'}), 422
    
    # mengubah object tasks menjadi dictionary
    result = []
    for task in tasks:
        result.append(task.serialize())

    # membuat response
    response = jsonify(
        success = True,
        data = result
    )

    return response, 200