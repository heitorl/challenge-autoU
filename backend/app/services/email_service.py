import os
import re
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
gemini_model = None

def initialize_gemini():
    """Inicializa o modelo Gemini"""
    global gemini_model
    
    try:
        if not GEMINI_API_KEY:
            raise ValueError("GEMINI_API_KEY não encontrada. Configure no arquivo .env")
        
        genai.configure(api_key=GEMINI_API_KEY)
        gemini_model = genai.GenerativeModel("gemini-1.5-flash")
        
        print("✅ Gemini inicializado com sucesso!")
        
    except Exception as e:
        print(f"❌ Erro ao inicializar Gemini: {e}")
        raise

def classify_with_gemini(email_content):
   
    try:
        # Primeiro verificar padrões conhecidos (mais rápido)
        category = hybrid_classification_pt(email_content)
        if category:
            return category
        
        prompt = f"""
        CLASSIFIQUE este email em APENAS UMA destas categorias: 
        - "produtivo": se requer ação, resposta, solução de problema, solicitação técnica
        - "improdutivo": se for saudação, felicitação, agradecimento genérico, mensagem social

        REGRAS ESPECÍFICAS:
        CONSIDERAR COMO PRODUTIVO:
        - Problemas técnicos, erros, bugs
        - Solicitações de suporte, ajuda técnica
        - questões financeiras, faturas, pagamentos
        - Pedidos de informação, documentos, relatórios
        - Urgências, prioridades, prazos

        CONSIDERAR COMO IMPRODUTIVO:
        - Felicitações (natal, ano novo, aniversário)
        - Agradecimentos genéricos sem solicitação específica
        - Saudações rotineiras (bom dia, boa tarde)
        - Mensagens sociais, cumprimentos
        - Newsletter, comunicados massivos

        Email para classificar: "{email_content}"

        Responda APENAS com: "produtivo" ou "improdutivo"
        """
        
        response = gemini_model.generate_content(prompt)
        print(response)
        result = response.text.strip().lower()
        # Parse da resposta
        if result == "produtivo":
            return "produtivo"
        elif result == "improdutivo":
            return "improdutivo"
        else:
            return hybrid_classification_pt(email_content)
            
    except Exception as e:
        print(f"❌ Erro no Gemini: {e}")
        return hybrid_classification_pt(email_content)

def hybrid_classification_pt(text):

    """Classificação híbrida com regex para padrões conhecidos em português"""
    text_lower = text.lower()
    print("ENTROU", text_lower)
    
    # Padrões FORTES para IMPRODUTIVO
    strong_unproductive_pt = [
        r'feliz\s+natal', r'ano\s+novo', r'boas\s+festas', 
        r'parab[ée]ns', r'anivers[áa]rio', r'comemora[çc][ãa]o',
        r'natalino', r'confraterniza[çc][ãa]o', r'felicidades',
        r'sa[úu]de', r'prosperidade', r'cumprimentos', r'sauda[çc][õo]es',
        r'lembran[çc]as', r'presente', r'convite', r'festividade',
        r'comemora', r'celebra', r'brinde', r'feliz\s+anivers[áa]rio',
        r'boas\s+vindas', r'bem\s+vindo', r'^(ol[áa]|oi)[!,. ]*$', r'hello',
        r'aguardando\s+contato', r'abraço', r'beijo', r'carinhosamente'
    ]
    
    # Padrões FORTES para PRODUTIVO
    strong_productive_pt = [
        r'chamado\s*n[º°]?\s*\d+', r'protocolo\s*n[º°]?\s*\d+',
        r'problema\s+[cn]o?\s+sistema', r'erro\s+[cn]o?\s+login',
        r'n[ãa]o\s+consigo\s+acessar', r'acesso\s+bloqueado',
        r'senha\s+expirada', r'conta\s+bloqueada', r'urgente',
        r'cr[íi]tico', r'prioridade', r'emerg[êe]ncia', r'solicito',
        r'preciso\s+de\s+ajuda', r'suporte\s+t[ée]cnico', r'relat[óo]rio',
        r'fatura', r'pagamento', r'cobran[çc]a', r'contrato',
        r'documento', r'extrato', r'boleto', r'transfer[êe]ncia',
        r'bug', r'falha', r'defeito', r'quebrado', r'travando',
        r'lento', r'atualiza[çc][ãa]o', r'backup', r'restaura[çc][ãa]o'
    ]
    
    # Verificar padrões fortes primeiro
    for pattern in strong_unproductive_pt:
        if re.search(pattern, text_lower):
            return "improdutivo"
    
    for pattern in strong_productive_pt:
        if re.search(pattern, text_lower):
            return "produtivo"
    
    return None

def classify_email_service(email_content):
    """Serviço principal de classificação"""
    category= classify_with_gemini(email_content)
  
    return {
        'category': category,        
    }



initialize_gemini()