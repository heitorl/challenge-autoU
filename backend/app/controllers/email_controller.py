from app.services.email_service import classify_email_service
from app.services.file_service import process_uploaded_file, allowed_file


def classify_email_controller(email_content):
    try:
        if not email_content or not isinstance(email_content, str):
            raise ValueError("Email content must be a non-empty string")
        
        # Chamar o serviço para classificar
        classification_result = classify_email_service(email_content)   

        print(classification_result, 'FINAL')  
        
        return {
            'success': True,
            'data': classification_result
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }


def process_file_upload_controller(file):
    try:
        if not file or file.filename == '':
            return {
                'success': False,
                'error': 'Nenhum arquivo selecionado'
            }
        
        if not allowed_file(file.filename):
            return {
                'success': False,
                'error': 'Tipo de arquivo não suportado. Use .eml ou .pdf'
            }
        
        # Processar arquivo e extrair texto
        text_content, error = process_uploaded_file(file)
        
        if error:
            return {
                'success': False,
                'error': error
            }        
      
        classification_result = classify_email_service(text_content)  
       
          
        return {
            'success': True,
            'data': classification_result
        }
        
        
    except Exception as e:
        return {
            'success': False,
            'error': f'Erro interno: {str(e)}'
        }