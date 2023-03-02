import socket
import json

import pandas as pd
import numpy as np
import re
import string

import nltk
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import stopwords


from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
import joblib
import pickle 

def tokenize(text):
        '''
        Tokenize text and return a non-unique list of tokenized words found in the text. 
        Normalize to lowercase, strip punctuation, remove stop words, filter non-ascii characters.
        Lemmatize the words and lastly drop words of length < 3.
        '''
        text = text.lower()
        regex = re.compile('[' + re.escape(string.punctuation) + '0-9\\r\\t\\n]')
        nopunct = regex.sub(" ", text)
        words = nopunct.split(' ')
        # remove any non ascii
        words = [word.encode('ascii', 'ignore').decode('ascii') for word in words]
        lmtzr = WordNetLemmatizer()
        words = [lmtzr.lemmatize(w) for w in words]
        words = [w for w in words if len(w) > 2]
        return words

classifier = joblib.load('toxic_model_largest.sav')
vectorizer = pickle.load(open('vectorizer.pickle', 'rb'))

HOST=''
PORT=8000

if __name__=="__main__":

    with socket.socket(socket.AF_INET,socket.SOCK_STREAM) as s:
        s.bind((HOST,PORT))
        s.listen()

        print(f"Listeing on Port {PORT}")
        
        while True:
            try:
                conn, addr = s.accept()

                with conn:

                    data=conn.recv(1024)

                    if data:
                        data_str= data.decode()
                        request_type=data_str.split(' ')[0]
                        request_path=data_str.split('/')[1].split(" ")[0]
                        
                        
                        content = data_str.split('\r\n\r\n')[1]
                        # print(type(content))
                        # print (content)
                        new=eval(content)
                        # print(new['content'])
                        content_text = new['content']

                        check_txt = vectorizer.transform([content_text])#Put question/answer here
                        print(check_txt.toarray())
                        prediction_arr = classifier.predict(check_txt).toarray()
                        print(prediction_arr)
                        response_partial=b'HTTP/1.1 200 OK\nContent-Type: application/json\n\n'
                        if sum(prediction_arr[0]) != 0:
                        # send message back to the front end for re
                            response={'status':'success',"safe":False}
                        else:
                            response={'status':'success',"safe":True}

                        json_response=json.dumps(response)
                        conn.sendall(response_partial+json_response.encode('utf-8'))
            except:
                continue          
                    
#api= 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