import os
import gensim

def load_model():
    try:
        if not os.path.exists('../data/GoogleNews-vectors-negative300.bin.gz'):
            raise ValueError("SKIP: You need to download the google news model")

        model =gensim.models.KeyedVectors.load_word2vec_format('../data/GoogleNews-vectors-negative300.bin.gz', binary=True)
        return model
    except MemoryError as memerror:
        print("You do not have enough RAM")
    

