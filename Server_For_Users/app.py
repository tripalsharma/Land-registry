from flask import Flask, request, jsonify, render_template, redirect, url_for, session
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your-secret-key'
CORS(app)

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client['land_registry']
users = db['users']

@app.route('/')
def home():
    return redirect('/login-page')

@app.route('/login-page')
def login_page():
    return render_template('login.html')

@app.route('/signup-page')
def signup_page():
    return render_template('signup.html')

@app.route('/forgot-password-page')
def forgot_password_page():
    return render_template('forgot_password.html')

@app.route('/signup', methods=['POST'])
def signup():
    # Accepts both form and JSON (for flexibility)
    data = request.form if request.form else request.get_json()
    username = data.get('username')
    phone = data.get('phone')
    email = data.get('email')
    dob = data.get('dob')
    address = data.get('address')
    password = data.get('password')
    role = data.get('role')

    if users.find_one({'username': username}):
        return "Username exists", 400

    hashed_pw = generate_password_hash(password)
    user_data = {
        'username': username,
        'phone': phone,
        'email': email,
        'dob': dob,
        'address': address,
        'password': hashed_pw,
        'role': role
    }

    users.insert_one(user_data)
    print("✅ User registered:", user_data)
    return redirect('/login-page')

@app.route('/login', methods=['POST'])
def login():
    # Try JSON first, fallback to form data
    data = request.get_json(silent=True)
    if data:
        username = data.get('username')
        password = data.get('password')
    else:
        username = request.form.get('username')
        password = request.form.get('password')

    print(f"Login attempt: username={username}")

    if not username or not password:
        return "Missing credentials", 400

    user = users.find_one({'username': username})
    if not user or not check_password_hash(user['password'], password):
        return "Invalid credentials", 401

    session['username'] = username
    session['role'] = user['role']
    return jsonify({'message': 'Login successful'}), 200



@app.route('/logout')
def logout():
    session.clear()
    return jsonify({'status': 'success'})

@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    # Accepts both form and JSON
    data = request.form if request.form else request.get_json()
    username = data.get('username')
    phone = data.get('phone')
    new_password = data.get('new_password')

    user = users.find_one({'username': username, 'phone': phone})
    if not user:
        return "User not found", 404

    hashed_pw = generate_password_hash(new_password)
    users.update_one({'username': username}, {'$set': {'password': hashed_pw}})
    return redirect('/login-page')

@app.route('/dashboard')
def dashboard():
    if 'username' not in session:
        return redirect('/login-page')
    return render_template('dashboard.html')

@app.route('/user-info')
def user_info():
    if 'username' not in session:
        return jsonify({})
    return jsonify({
        'username': session['username'],
        'role': session['role']
    })

if __name__ == '__main__':
    app.run(debug=True)
