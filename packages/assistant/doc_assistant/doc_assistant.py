class Config:
    MODEL = "gpt-35-turbo"
    SITE = "critical-work.com"
    #SITE = "https://nuvolaris.github.io"
    START_PAGE = "about"
    WELCOME = "Benenuti nell'assistente virtuale di Nuvolaris"
    ROLE = """
        You are an employer of the startup Nuvolaris
        You always advice users about Nuvolaris documentation.
        The user ask a information, you will check in the disposable documents and elaborate a valid answear.
    """
    EMAIL = "info@nuvolaris.io"
    THANKS = "Grazie di avermi fornito la tua email, ti contatterò presto."
    ERROR = "Purtroppo sembra che ci sia qualche problema a registrare la tua email."
    OUT_OF_SERVICE = "Ciao, purtroppo per oggi le batterie sono esaurite e quindi sono andato a ricaricarmi. Per oggi non posso più risponderti, torna domani."
    INAPPROPRIATE = "Temo che la tua richiesta possa essere fraintesa. Puoi riformularla in maniera più appropriata?"

import re, json, os
import requests
from bs4 import BeautifulSoup
import traceback
from openai import AzureOpenAI, BadRequestError
from html_sanitizer import Sanitizer

class ChatBot:
    def __init__(self, args):
        OPENAI_API_KEY = '89773db3-7863-460c-ad3c-6abd0db43f1c'
        OPENAI_API_HOST = 'https://openai.nuvolaris.io'
        #self.key = args.get("OPENAI_API_KEY", os.environ.get("OPENAI_API_KEY"))
        #self.host = args.get("OPENAI_API_HOST", os.environ.get("OPENAI_API_HOST"))
        self.key = OPENAI_API_KEY
        self.host = OPENAI_API_HOST
        self.ai =  AzureOpenAI(api_version="2023-12-01-preview", 
                                api_key=self.key, 
                                azure_endpoint=self.host
                            )
    def ask(self, input, role=Config.ROLE):
        req = [ {"role": "system", "content": role}, 
                {"role": "user", "content": input}]
        print('request')
        print(req)        
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
        role = """You are identifying the topic of a request in italian
                among one and only one of those:  %s You only reply with the name of the topic.
            """ % topics
        request = "Request: %s. What is the topic?" % input
        return self.ask(request, role=role)


class Website:

    def __init__(self):
        self.name2id = {}
        self.sanitizer = Sanitizer()
        print('init')
        try:
            url = "https://nuvolaris.github.io/nuvolaris/3.1.0/"
            content = requests.get(url).content.decode("UTF-8")
            # Inizializza il parser HTML
            soup = BeautifulSoup(content, 'html.parser')
            nav_links = soup.find_all(class_="nav-link")
            print('links grabbed')
            #print(nav_links)
            # Per ogni link, associa il nome della pagina al suo ID
            page_id = 0
            for link in nav_links:
                page_name = link.text.strip()
                file_path = link.get('href')
                if file_path.endswith('.html'):
                    page_file_name = file_path.split('/')[-1].split('.')[0]
                    # Associa il nome della pagina al suo ID nel dizionario 'name2id'
                    page_id += 1 
                    #self.name2id = { page_id: page_file_name}
                    #self.name2id[page_file_name] = page_id
                    #self.name2id = { nav_links[page_id]: page_file_name }
                    self.name2id[page_file_name] = page_id
                    
            #print(self.name2id)
            print('self.name2id formed')                    
        except:
            traceback.print_exc()        
    
    def get_page_content_by_name(self, name):
        id = self.name2id.get(name, -1)
        print('page id')
        print(id)
        if id == -1:
            print(f"cannot find page {name}")
            id = self.name2id[Config.START_PAGE]    
        try:  
            url = "https://nuvolaris.github.io/nuvolaris/3.1.0/" + Config.START_PAGE + ".html"
            print('url')
            print(url)
            content = requests.get(url).content
            soup = BeautifulSoup(content, 'html.parser')
            # Esegui le operazioni desiderate sul documento HTML, ad esempio estrarre il testo o trovare determinati elementi
            # Ad esempio, per estrarre il testo dell'elemento con la classe 'content':
            # html = soup.find(class_='content').get_text()
            html = soup.prettify()  # Solo un esempio, qui restituisci l'HTML "pulito" o "formattato"
            return html
        except:
            traceback.print_exc()
            return None

    def topics(self):
        return ", ".join(self.name2id.keys())



AI = None
Web = None

def main(args):
    global AI, Web, Email
    global AI, Web, Email
    if AI is None: AI = ChatBot(args)    
    if Web is None: Web = Website()

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

    page = AI.identify_topic(Web.topics(), input)
    print("topic ", page)
    role = Config.ROLE

    html = Web.get_page_content_by_name(page)
    if html:
        res['html'] = html
        from bs4 import BeautifulSoup
        role += BeautifulSoup(page, 'html.parser').get_text()
        
    output = AI.ask(input, role=role)
    if output is None:
        output = "Non posso rispondere a questa domanda... Forse può essere fraintesa. Puoi riformularla?"
    res['output'] = output
    return {"body": res }

"""
%cd packages/doc_assistant/assistant
from assistant import *

Web = Website()
page = Web.get_page_content_by_name("mission") ; print(page)
from html_sanitizer import Sanitizer
sanitizer = Sanitizer()

Web.topics()

"""

