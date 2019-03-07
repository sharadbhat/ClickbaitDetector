import numpy as np
from sklearn.decomposition import PCA


def preprocess_embeddings(embedding_dimension, vocabulary):
    """
    Reads GloVe file and returns weights for each word in vocabulary.
    """
    embeddings = {}
    with open("models/glove.6B.50d.txt", encoding="utf8") as glove_file:
        for line in glove_file:
            start = line.find(" ")
            word = line[:start]
            embeddings[word] = np.fromstring(
                line[start:], sep=" ", dtype=np.float32)

    weights = np.zeros((len(vocabulary), 50))  # Glove 50 D
    for i, word in enumerate(vocabulary):
        if word in embeddings:
            weights[i] = embeddings[word]

    pca = PCA(n_components=embedding_dimension)
    weights = pca.fit_transform(weights)
    return weights


if __name__ == "__main__":
    """
    Preprocesses the GloVe embeddings.
    """
    EMBEDDING_DIMENSION = 30
    vocabulary = open("data/vocabulary.txt").read().split("\n")
    weights = preprocess_embeddings(EMBEDDING_DIMENSION, vocabulary)
    np.save("models/embeddings.npy", weights)
