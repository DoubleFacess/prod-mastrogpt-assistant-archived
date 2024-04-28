#--web true
#--kind python:default

import assistant

def main(args):
    return { 
        "body": assistant.hello(args)
    }