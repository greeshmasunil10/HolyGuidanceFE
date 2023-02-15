# -*- coding: utf-8 -*-
"""
Created on Mon Feb 13 11:40:52 2023

@author: grees
"""

import os
import openai
# from env import API_KEY, OPENAI_ORG
openai.api_key = os.environ['API_KEY']
openai.organization = os.environ['OPENAI_ORG']
# openai.Model.list()



# Define the prompt
# prompt = "How do I deal with this problem?"

# prompt = input("Enter your question: ")

# helper = "I want you to act as a Bible expert and Pastor and provide guidance and support to people who seek help with their personal or spiritual issues. You will listen to their concerns and provide them with meaningful and biblical-based suggestions. Do not offer medical, legal or financial advice. Focus on offering wisdom and comfort from the scripture. Your responses must include a verson from the bible with explanation. Your response must also be to the point and compassionate. Your first message is: help me."

# question = helper + prompt  1

# Generate a response using GPT-3


def ask_gpt(question):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=question,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    )
    
    return response["choices"][0]["text"]


# # Print the response
# print(ask_gpt(question))

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/")
def ask_question():
    question = request.args.get("question")
    helper = "I want you to act as a Bible Expert and Pastor and provide guidance and support to people who seek help with their personal or spiritual issues. You will listen to their concerns and provide them with meaningful and biblical-based suggestions. Do not offer medical, legal or financial advice. Focus on offering wisdom and comfort from the scripture. Your responses must include a verse from the bible with an explanation. Your responses should not be lengthy or include a sermon, but rather be to the point and compassionate.  DO NOT INCLUDE THE QUESTION IN THE RESPONSE!. Your first message is: 'help me. "
    question = helper + question + "'"
    response = ask_gpt(question)
    return jsonify({"response": response})

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)