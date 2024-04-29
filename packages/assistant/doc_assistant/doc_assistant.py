class Config:
    MODEL = "gpt-35-turbo"
    # SITE = "critical-work.com"
    SITE = "https://nuvolaris.github.io"
    START_PAGE = "mission"
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
import bs4
import traceback
from openai import AzureOpenAI, BadRequestError
from html_sanitizer import Sanitizer

class ChatBot:
    def __init__(self, args):
        self.key = args.get("OPENAI_API_KEY", os.environ.get("OPENAI_API_KEY"))
        self.host = args.get("OPENAI_API_HOST", os.environ.get("OPENAI_API_HOST"))
        self.ai =  AzureOpenAI(api_version="2023-12-01-preview", 
                                api_key=self.key, 
                                azure_endpoint=self.host
                            )
    def ask(self, input, role=Config.ROLE):
        req = [ {"role": "system", "content": role}, 
                {"role": "user", "content": input}]
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
        role = """
                You are identifying the topic of a request in italian
                among one and only one of those:  %s 
                You only reply with the name of the topic.
            """ % topics
        request = "Request: %s. What is the topic?" % input
        return self.ask(request, role=role)


class Website:
    def __init__(self):
        self.name2id = {}
        self.sanitizer = Sanitizer()
        try: 
            #url = f"https://{Config.SITE}/wp-json/wp/v2/pages"
            url = Config.SITE
            content = requests.get(url).content.decode("UTF-8")
            self.name2id = { p['slug']: p['id'] for p in json.loads(content)  }
        except:
            traceback.print_exc()
    def get_page_content_by_name(self, name):    
        id = self.name2id.get(name, -1)
        if id == -1:
            print(f"cannot find page {name}")
            id = self.name2id[Config.START_PAGE]    
        try:  
            #url = f"https://{Config.SITE}/wp-json/wp/v2/pages/{id}"
            url = Config.SITE
            print(url)
            content = requests.get(url).content
            #print(content)
            page = json.loads(content)
            html =  page['content']['rendered']
            html = self.sanitizer.sanitize(html)
            return html
        except:
            traceback.print_exc()
            return None
    
    def topics(self):
        return ", ".join(self.name2id.keys())

AI = None
Web = None
Email = None
   
def main(args):
    global AI, Web, Email
    if AI is None: AI = ChatBot(args)    
    if Web is None: Web = Website()

    res = { "output": Config.WELCOME }
    input = args.get("input", "")

    #name = args.get("name", "world")
    #return res

    # start conversation
    if input == "":      
        html = Web.get_page_content_by_name(Config.START_PAGE)
        if html:
            res['html'] = html
        else:
            res['title'] = "Benvenuto."
            res['message'] =  "https://{Config.SITE}/wp-json/wp/v2/pages"
            #res['message'] =  Config.WELCOME
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

