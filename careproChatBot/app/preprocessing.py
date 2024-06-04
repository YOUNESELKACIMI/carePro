import json
import nltk
from nltk_utils import tokenize, stem
import nltk
from nltk.corpus import stopwords

nltk.download('stopwords')

def preprocess_data(json_file):
    with open(json_file, 'r') as f:
        intents = json.load(f)

    all_words = []
    tags = []
    xy = []
    #stop words
    ignore_words = [
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves',
    'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their',
    'theirs', 'themselves', 'this', 'that', 'these', 'those',
    'a', 'an', 'the',
    '?', '.', '!', ',', ':', ';', '(', ')', '[', ']', '{', '}', '``', '’', '“', '”', '--', '-', '...'
]

    
    # print(ignore_words)

    # Loop through each sentence in our intents patterns
    for intent in intents['intents']:
        tag = intent['tag']
        # Add to tag list
        tags.append(tag)
        for pattern in intent['patterns']:
            # Tokenize each word in the sentence
            w = tokenize(pattern)
            # Add to our words list
            all_words.extend(w)
            # Add to xy pair
            xy.append((w, tag))

    # Stem and lower each word
    all_words = [stem(w).lower() for w in all_words if w not in ignore_words]
    # Remove duplicates and sort
    all_words = sorted(set(all_words))
    tags = sorted(set(tags))

    return all_words, tags, xy

if __name__ == "__main__":
    all_words, tags, xy = preprocess_data('intents.json')
    print(len(xy), "patterns")
    print(len(tags), "tags:", tags)
    print(len(all_words), "unique stemmed words:", all_words)
