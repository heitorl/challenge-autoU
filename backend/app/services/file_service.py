import os
from email import policy
from email.parser import BytesParser
import pdfplumber
import tempfile
from werkzeug.utils import secure_filename
ALLOWED_EXTENSIONS = { 'pdf'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



def extract_text_from_pdf(file_path):
    """Extrai texto de arquivos PDF"""
    try:
        text_content = ""
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text_content += page_text + "\n"
        
        return text_content[:10000]  # Limitar tamanho
    
    except Exception as e:
        print(f"Erro ao processar PDF: {e}")
        return ""
    



def process_uploaded_file(file):
    """Processa arquivo enviado e extrai o texto"""
    if not file or not allowed_file(file.filename):
        return None, "Tipo de arquivo não suportado. Use .pdf ou .eml"
    
    try:
        # Criar arquivo temporário
        with tempfile.NamedTemporaryFile(delete=False, suffix=secure_filename(file.filename)) as tmp_file:
            file.save(tmp_file.name)
            tmp_path = tmp_file.name
        
      
        
        text_content = extract_text_from_pdf(tmp_path)
    
        
        # Limpar arquivo temporário
        os.unlink(tmp_path)
        
        if not text_content.strip():
            return None, "Não foi possível extrair texto do arquivo ou o arquivo está vazio"
        
        return text_content, None
        
    except Exception as e:
        # Garantir que o arquivo temporário seja removido em caso de erro
        if 'tmp_path' in locals() and os.path.exists(tmp_path):
            try:
                os.unlink(tmp_path)
            except:
                pass
        return None, f"Erro ao processar arquivo: {str(e)}"