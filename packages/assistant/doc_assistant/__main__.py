#--web true
#--kind python:default

import doc_assistant

def main(args):
    print('hello from main')
    return { 
        "body": doc_assistant.main(args)
    }
args = {}
main(args)





