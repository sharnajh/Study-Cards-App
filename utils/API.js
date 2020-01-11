import { _getDecks, _getCards, _saveCard, _saveDeck } from "./_DATA";

export function getInitialData() {
  return Promise.all([_getCards(), _getDecks()]).then(([cards, decks]) => ({
    cards,
    decks
  }));
}

export function saveCard(deckID, card) {
    return _saveCard(deckID, card)
}

export function saveDeck(title) {
    return _saveDeck(title)
}