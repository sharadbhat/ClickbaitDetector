from similarity import get_similarity


sentence_obama = 'Obama speaks to the media in Illinois'
sentence_president = 'The president greets the press in Chicago'
sentence_orange = 'Oranges are my favorite fruit'


print(get_similarity(sentence_obama, sentence_president))

print(get_similarity(sentence_obama, sentence_orange))
