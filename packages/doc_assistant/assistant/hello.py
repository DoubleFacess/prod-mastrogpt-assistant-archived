class Config:
    MODEL = "gpt-35-turbo"
    SITE = "critical-work.com"
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

def assistant(args):
    name = args.get("name", "world")
    return "Hello, f{name}."