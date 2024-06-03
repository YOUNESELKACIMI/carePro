import json
from nltk_utils import tokenize, stem

def preprocess_data(json_file):
    with open(json_file, 'r') as f:
        intents = json.load(f)

    all_words = []
    tags = []
    xy = []
    ignore_words = ['?', '.', '!',',']

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
