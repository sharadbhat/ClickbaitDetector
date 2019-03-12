from model import load_model
from nltk.corpus import stopwords
from nltk import download
download('stopwords')  # Download stopwords list.

def preprocess(s1,s2):
    s1 = s1.lower().split()
    s2 = s2.lower().split()
    stop_words = stopwords.words('english')
    s1 = [w for w in s1 if w not in stop_words]
    s2 = [w for w in s2 if w not in stop_words]
    return s1,s2

def get_similarity(s1,s2):
    s1,s2 = preprocess(s1,s2)
    model = load_model()
    if not model:
        print("error loading model")
        exit()

    distance = model.wmdistance(s1, s2)
    return distance

