#--web true
#--kind python:default

import doc_assistant

def main(args):
    return { 
        "body": doc_assistant.main(args)
    }




