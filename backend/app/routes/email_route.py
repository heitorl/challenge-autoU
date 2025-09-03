from flask import Blueprint, request, jsonify
from app.controllers.email_controller import classify_email_controller, process_file_upload_controller
import uuid

bp_email = Blueprint("bp_email", __name__)

@bp_email.route("/classify", methods=["POST"])
def process_email():
    try:
        data = request.get_json()
        
        if not data or 'email_content' not in data:
            return jsonify({
                'success': False,
                'error': 'Email content is required'
            }), 400
        
        email_content = data['email_content']
        
        result = classify_email_controller(email_content)
        
        if result['success']:
            return jsonify({
                'success': True,
                'data': result['data']
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': result['error']
            }), 500
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Internal server error: {str(e)}'
        }), 500

@bp_email.route("/upload", methods=["POST"])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({
                'success': False,
                'error': 'Nenhum arquivo enviado'
            }), 400
        
        file = request.files['file']
        
        result = process_file_upload_controller(file)
        
        if result['success']:
            return jsonify(result), 200
        else:
            return jsonify(result), 400
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Erro interno: {str(e)}'
        }), 500