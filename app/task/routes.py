from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extension import db
from app.task import taskBp
from app.models.task import Tasks

# route GET all tasks
@taskBp.route("", methods=['GET'], strict_slashes = False)
@jwt_required(locations=["headers"])
def get_all_task():
    """
    Fungsi untuk mendapatkan semua task

    args:
        -

    return
        response (json object): pesan response
    """
    
    # mendapatkan argumen limit
    limit = request.args.get('limit', 10)
    if type(limit) is not int:
        return jsonify({'message': 'invalid parameter'}), 400

    # query untuk mendapatkan data task
    tasks = db.session.execute(
        db.select(Tasks).limit(limit)
    ).scalars()

    # mengubah object tasks menjadi dictionary
    result = []
    for tweet in tasks:
        result.append(tweet.serialize())

    # membuat response
    response = jsonify(
        success = True,
        data = result
    )
    
    return response, 200
    

# route GET tasks/<id>
@taskBp.route("<int:id>", methods=['GET'], strict_slashes = False)
@jwt_required(locations=["headers"])
def get_one_task(id):
    """
    Fungsi untuk mendapatkan task berdasarkan id

    args:
        id (int): id task

    return
        response (json object): pesan response
    """
    
    # mendapatkan task berdasarkan id
    tasks = Tasks.query.filter_by(id=id).first()

    # cek apakah variable hasil query kosong
    if not tasks:
        return jsonify({'error': 'task not found'}), 422
    
    # mendapatkan task dalam bentuk dictionary
    task = tasks.serialize()

    # membuat response dalam bentuk object json
    response = jsonify(
        success = True,
        data = task)
    
    return response, 200

# route POST /tasks
@taskBp.route("", methods=['POST'], strict_slashes = False)
@jwt_required(locations=["headers"])
def create_task():
    """
    Fungsi untuk membuat task baru

    args:
        -

    return
        response (json object): pesan response
    """
    
    # mendapatkan request json dari client
    data = request.get_json()
    title = data.get("title")
    description = data.get("description")
    user_id = get_jwt_identity()

    # Validasi input
    if not title or not description or not user_id:
        return jsonify({'message': 'incomplete data'}),422

    # menambahkan task baru
    new_task = Tasks(title = title,
                     description = description,
                     user_id = user_id)
    
    # menambahkan data ke database
    db.session.add(new_task)
    db.session.commit()

    # membuat response
    response = jsonify(
        success = True,
        data = new_task.serialize(),
    )

    return response, 200

# route PUT tasks/<id>
@taskBp.route("<int:id>", methods=['PUT'], strict_slashes = False)
@jwt_required(locations=["headers"])
def edit_task(id):
    """
    Fungsi untuk edit seluruh detail task

    args:
        id (int) : id task

    return
        response (json object): pesan response
    """
    
    # mendapatkan current user yang login
    current_user = get_jwt_identity()

    # mendapatkan user yang create task
    task = Tasks.query.filter_by(id=id).first()
    
    # cek apakah variable hasil query kosong
    if not task:
        return jsonify({'error': 'task not found'}), 422

    # cek apakah current user sama dengan user yang membuat task
    if current_user != task.user_id :
        return jsonify(
            message = 'You do not have permission to edit this task'
        ), 403

    # mendapatkan request json dari client
    data = request.get_json()
    title = data.get("title")
    description = data.get("description")
    
    # cek apakah data request dari user ada yang kosong
    if not title or not description:
        return jsonify({'message': 'incomplete data'}), 422
    else:
        # melakukan overwrite description dan title
        task.title = title
        task.description = description
        
    # melakukan commit ke database
    db.session.commit()
    
    # membuat response
    response = jsonify({
        "success" : True,
        "message" : "task update successfully",
    })

    return response, 200

# route PUT tasks/<id>
@taskBp.route("/status/<int:id>", methods=['PUT'], strict_slashes = False)
@jwt_required(locations=["headers"])
def edit_status(id):
    """
    Fungsi untuk edit seluruh detail task

    args:
        id (int) : id task

    return
        response (json object): pesan response
    """
    
    # mendapatkan current user yang login
    current_user = get_jwt_identity()

    # mendapatkan user yang create task
    task = Tasks.query.filter_by(id=id).first()
    
    # cek apakah variable hasil query kosong
    if not task:
        return jsonify({'error': 'task not found'}), 422

    # cek apakah current user sama dengan user yang membuat task
    if current_user != task.user_id :
        return jsonify(
            message = 'You do not have permission to edit this task'
        ), 403

    # mendapatkan request json dari client
    data = request.get_json()
    status = data.get("status")    
    # melakukan overwrite description dan title
    task.status = status
        
    # melakukan commit ke database
    db.session.commit()
    
    # membuat response
    response = jsonify({
        "success" : True,
        "message" : "status update successfully",
    })

    return response, 200

# route DELETE tasks/id
@taskBp.route("<int:id>", methods=['DELETE'], strict_slashes = False)
@jwt_required(locations=["headers"])
def delete_task(id):
    """
    Fungsi untuk hapus task berdasarkan id

    args:
        id (int) : id task

    return
        response (json object): pesan response
    """
    # mendapatkan current user yang login
    current_user = get_jwt_identity()

    # mendapatkan user yang create task
    task = Tasks.query.filter_by(id=id).first()
    
    # cek apakah variable hasil query kosong
    if not task:
        return jsonify({'error': 'task not found'}), 422

    # cek apakah current user sama dengan user yang membuat task
    if current_user != task.user_id :
        return jsonify(
            message = 'You do not have permission to edit this task'
        ), 403

    db.session.delete(task)
    db.session.commit()
    
    # membuat response
    response = jsonify({
        "success" : True,
        "message" : "data delete successfully",
    })

    return response, 200