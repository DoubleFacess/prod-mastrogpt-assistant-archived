class Config:
    MODEL = "gpt-35-turbo"
    NUV_SITE = "https://nuvolaris.github.io/nuvolaris/3.1.0/"    
    SITE = "critical-work.com"
    #SITE = "https://nuvolaris.github.io"
    START_PAGE = "about"
    WELCOME = "Benenuti nell'assistente virtuale di Nuvolaris"
    ROLE = """
           ROLE: Nuvolaris Documentation Advisor
           You are an employee of the startup Nuvolaris. 
           You consistently advise users about Nuvolaris documentation.
           When a user requests information, you will review the available 
           page and formulate a valid answer.
           If the page content exceeds 3000 characters, you will attempt to 
           summarize the content you have, ensuring logical coherence with 
           the page's content.
        """
    EMAIL = "info@nuvolaris.io"
    THANKS = "Grazie di avermi fornito la tua email, ti contatterò presto."
    ERROR = "Purtroppo sembra che ci sia qualche problema a registrare la tua email."
    OUT_OF_SERVICE = "Ciao, purtroppo per oggi le batterie sono esaurite e quindi sono andato a ricaricarmi. Per oggi non posso più risponderti, torna domani."
    INAPPROPRIATE = "Temo che la tua richiesta possa essere fraintesa. Puoi riformularla in maniera più appropriata?"
    DICTIONARY = {                
                "Nuvolaris": START_PAGE + ".html",
                "MastroGpt": "mastrogpt/index.html"
            }

import re, json, os
import requests
from bs4 import BeautifulSoup
import traceback, random
from openai import AzureOpenAI, BadRequestError
from html_sanitizer import Sanitizer
from urllib.parse import urlparse
from difflib import SequenceMatcher

class ChatBot:
    def __init__(self, args):
        OPENAI_API_KEY = '89773db3-7863-460c-ad3c-6abd0db43f1c'
        OPENAI_API_HOST = 'https://openai.nuvolaris.io'
        print('init chatbot()')
        #self.key = args.get("OPENAI_API_KEY", os.environ.get("OPENAI_API_KEY"))
        #self.host = args.get("OPENAI_API_HOST", os.environ.get("OPENAI_API_HOST"))
        self.key = OPENAI_API_KEY
        self.host = OPENAI_API_HOST
        self.ai =  AzureOpenAI(api_version="2023-12-01-preview", 
                               api_key=self.key, 
                               azure_endpoint=self.host
                            )
    def ask(self, input, role=Config.ROLE):
        print('asking chatbot')
        req = [ {"role": "system", "content": role}, 
                {"role": "user", "content": input}]
        #print(f'request:{req}')              
        try:
            comp = self.ai.chat.completions.create(model=Config.MODEL, messages=req)
            if len(comp.choices) > 0:
                content = comp.choices[0].message.content
                return content
        except BadRequestError as e:
            return Config.INAPPROPRIATE
        except Exception as e:
            return Config.OUT_OF_SERVICE
        return None

    def identify_topic(self, topics, input):
        print('topics', topics)
        print('input: ', input)
        role = """You are identifying the topic of a request in italian among one and only one of those: %s. 
                  You only reply italian, traslating contents that you find, with the name of the topic.
               """ % topics
        request = "Request: %s. What is the topic?" % input
        print(request)
        return self.ask(request, role=role)


class Website:

    def __init__(self):
        self.name2id = {}
        self.sanitizer = Sanitizer()        
        print('init website()')
        try:
            url = Config.NUV_SITE
            content = requests.get(url).content.decode("UTF-8")
            soup = BeautifulSoup(content, 'html.parser') # Inizializza il parser HTML
            nav_links = soup.find_all(class_="nav-link")            
            #print('get links', nav_links)            
            page_id = 0
            for link in nav_links:
                page_name = link.text.strip()
                url = link.get('href')
                if url.endswith('.html'):
                    page_id += 1
                    url_path = urlparse(url).path # Rimuovi query parameters dall'URL, se presenti
                    #print('url paths', url_path)
                    page_file_name = url_path.split('/')[-1].split('.')[0]
                    page_names = page_file_name.replace("-", " ") # toglie il trattino e meette uno spazio
                    self.name2id[page_names] = url_path  # crea dizionario                                                           
            #print(self.name2id) 
            self.name2id.update(Config.DICTIONARY) # aggiungo i termini da configurazione       
        except:
            traceback.print_exc()
            
    
    def find_partial_matches(self, input_phrase, threshold=0.8):
        matches = []
        words = input_phrase.split()
        for key, value in self.name2id.items():
            for word in words:
                if word in key:
                    matches.append((key, value))
                else:
                    similarity = SequenceMatcher(None, word, key).ratio()
                    if similarity >= threshold:
                        matches.append((key, value))
        return matches    
    
    def get_page_content_by_name(self, name):
        print('get_page_content_by_name: name: ', name)        
        matches = self.find_partial_matches(name)
        print("ricorrenze: ", matches)        
        #returned_match = max(matches, key=lambda x: len(x[0]))
        returned_match = random.choice(matches)
        page_url = self.name2id[returned_match[0]]
        print(page_url)  # URL of the match with the longest key
        if page_url == -1:
            print(f"cannot find page {name}")
            page_url = self.name2id[Config.START_PAGE]
        try:  
            url = f"https://nuvolaris.github.io/nuvolaris/3.1.0/{page_url}"
            print('selected url: ' + url)            
            content = requests.get(url).content            
            soup = BeautifulSoup(content, 'html.parser')            
            article_tag = soup.find('article')
            if article_tag:
                # Trova e rimuove il tag con il contenuto indesiderato
                for unwanted_tag in article_tag.find_all('strong'):
                    if 'work in progress' in unwanted_tag.get_text().lower():
                        unwanted_tag.decompose()
                # Estrarre il contenuto del tag <article>
                html = article_tag.prettify()
                return html
            else:
                return None            
        except:
            traceback.print_exc()
            return None
        """
            try:  
            url = f"https://nuvolaris.github.io/nuvolaris/3.1.0/{page_url}"
            print('selected url: ' + url)            
            content = requests.get(url).content            
            soup = BeautifulSoup(content, 'html.parser')            
            # Ad esempio, per estrarre il testo dell'elemento con la classe 'content':            
            html = soup.prettify()  # Solo un esempio, qui restituisci l'HTML "pulito" o "formattato"
            #html = soup.find(class_='content').get_text()
            return html
        """

    def topics(self):
        #print(f"name2id keys{self.name2id.keys()}")
        return ", ".join(self.name2id.keys())

AI = None
Web = None

def main(args):
    global AI, Web    
    if AI is None: AI = ChatBot(args)    
    if Web is None: Web = Website()
    print('into main')
    res = {"output": Config.WELCOME}
    input_text = args.get("input", "")    
    # start conversation
    if input_text == "":
        html = Web.get_page_content_by_name(Config.START_PAGE)
        if html:
            res['html'] = html
        else:
            res['title'] = "Benvenuto."
            res['message'] = f"Impossibile ottenere il contenuto della pagina di inizio."
        return {"body": res}
    print('input exists, go!', input_text)   
    #print(Web.topics())
    #print('IMPORTANTE!: input', input)
    page = AI.identify_topic(Web.topics(), input)
    #print("topic identified ", page)
    role = Config.ROLE

    #html = Web.get_page_content_by_name(page)
    html = Web.get_page_content_by_name(input_text)
    if html:
        res['html'] = html
        from bs4 import BeautifulSoup
        role += BeautifulSoup(page, 'html.parser').get_text()
        print('role', role)
        
    output = AI.ask(input, role=role)
    if output is None:
        output = "Non posso rispondere a questa domanda... Forse può essere fraintesa. Puoi riformularla?"
    res['output'] = output
    return {"body": res }

"""
%cd packages/doc_assistant/assistant
from assistant import *
Web = Website()
page = Web.get_page_content_by_name("mission") ; 
print(page)
from html_sanitizer import Sanitizer
sanitizer = Sanitizer()
Web.topics()
"""
"""
    def partial_input(self, input_parziale):
        pattern = '.*'.join(re.escape(word) for word in input_parziale.split('-'))
        print("Items in self.name2id:", self.name2id.items())
        matches = {nome: url for nome, 
                   url in self.name2id.items() if re.match(pattern, nome)
                }
        return matches
"""

"""
    def get_page_content_by_name_copy(self, name):
        print('control name', name)
        page_url = self.name2id.get(name, -1)
        print('url: ', page_url)
        matches = self.partial_input(name)
        print(matches)
        if page_url == -1:
            print(f"cannot find page {name}")
            page_url = self.name2id[Config.START_PAGE]            
        try:  
            url = f"https://nuvolaris.github.io/nuvolaris/3.1.0/{page_url}"
            print('selected url: ' + url)            
            content = requests.get(url).content            
            soup = BeautifulSoup(content, 'html.parser')            
            # Ad esempio, per estrarre il testo dell'elemento con la classe 'content':            
            #html = soup.prettify()  # Solo un esempio, qui restituisci l'HTML "pulito" o "formattato"
            html = soup.find(class_='content').get_text()
            return html
        except:
            traceback.print_exc()
            return None
"""
"""
    def find_partial_matches(self, partial_key, threshold=0.8):
        matches = []
        for key, value in self.name2id.items():
            if partial_key in key:
                matches.append((key, value))
            else:
                similarity = SequenceMatcher(None, partial_key, key).ratio()
                if similarity >= threshold:                    
                    matches.append((key, value))            
        return matches
    """        

