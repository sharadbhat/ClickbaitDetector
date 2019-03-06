import string
from collections import Counter
import tqdm
import nltk
import re

MATCH_MULTIPLE_SPACES = re.compile(r"\ {2,}")
VOCABULARY_SIZE = 6500
UNK = "<UNK>" # Placeholder for unknown words
PAD = "<PAD>"

def clean(text):
    """
    To clean text data:
        - Add space around punctuations.
        - Add space around numbers.
        - Reduce multiple spaces to one space.
    """
    text = str(text.lower())
    for punctuation in string.punctuation:
        text = text.replace(punctuation, " " + punctuation + " ")
    for i in range(10):
        text = text.replace(str(i), " " + str(i) + " ")
    text = MATCH_MULTIPLE_SPACES.sub(" ", text)
    return "\n".join(line.strip() for line in text.split("\n"))

def remove_unknown(vocabulary, sentence):
    """
    To replace unknown words with <UNK>
    """
    return " ".join(word if word in vocabulary else UNK for word in sentence.split(" "))

def preprocess_text(genuine, clickbait):
    """
    To preprocess genuine and clickbait text.
    """
    genuine = clean(genuine)
    clickbait = clean(clickbait)

    words = nltk.word_tokenize(genuine) + nltk.word_tokenize(clickbait)
    glove_vocabulary = open("data/vocabulary.glove.txt").read().split("\n")
    counts = Counter(word for word in words if word in glove_vocabulary)

    vocabulary = [PAD, UNK] + [word for word, count in counts.most_common(VOCABULARY_SIZE-2)]
    genuine = [remove_unknown(vocabulary, sentence)  for sentence in tqdm.tqdm(genuine.split("\n"), desc="genuine")]
    clickbait = [remove_unknown(vocabulary, sentence) for sentence in tqdm.tqdm(clickbait.split("\n"), desc="clickbait")]

    return (vocabulary, "\n".join(genuine), "\n".join(clickbait))

if __name__ == "__main__":
    genuine = open("data/genuine.txt").read()
    clickbait = open("data/clickbait.txt").read()
    vocabulary, genuine_preprocessed, clickbait_preprocessed = preprocess_text(genuine, clickbait)
    open("data/vocabulary.txt", "w").write("\n".join(vocabulary))
    open("data/genuine.preprocessed.txt", "w").write(genuine_preprocessed)
    open("data/clickbait.preprocessed.txt", "w").write(clickbait_preprocessed)
