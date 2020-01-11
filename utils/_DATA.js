import { _generateUID } from "./helpers";

let decks = {
  "6ni6ok3ym7mf1p33lnez": {
    id: "6ni6ok3ym7mf1p33lnez",
    title: "Tutorial Deck",
    cards: ["am8ehyc8byjqgar0jgpub9", "loxhs1bqm25b708cmbf3g"]
  }
};

let cards = {
  am8ehyc8byjqgar0jgpub9: {
    id: "am8ehyc8byjqgar0jgpub9",
    question: "How do you create a new deck?",
    answer: "Click on Add New Deck."
  },
  loxhs1bqm25b708cmbf3g: {
    id: "loxhs1bqm25b708cmbf3g",
    question: "How do I add a new card to a deck?",
    answer: "Click on Add New Card."
  }
};

export function _getDecks() {
  return new Promise(res => {
    setTimeout(() => res({ ...decks }), 1000);
  });
}

export function _getCards() {
  return new Promise(res => {
    setTimeout(() => res({ ...cards }), 1000);
  });
}

function formatDeck(title) {
  return {
    id: _generateUID(),
    title,
    cards: []
  };
}

export function _saveDeck(title) {
  return new Promise(res => {
    const formattedDeck = formatDeck(title);
    setTimeout(() => {
      decks = {
        ...decks,
        [formatDeck.id]: formattedDeck
      };
      res(formattedDeck);
    }, 1000);
  });
}

function formatCard({ question, answer }) {
  return {
    id: _generateUID(),
    question,
    answer
  };
}

export function _saveCard(deckID, card) {
  return new Promise(res => {
    const formattedCard = formatCard(card);
    setTimeout(() => {
      decks = {
        ...decks,
        [deckID]: {
          ...deckID,
          cards: [...cards, formattedCard.id]
        }
      };
      cards = {
        ...cards,
        [formattedCard.id]: formattedCard
      };
    }, 1000);
  });
}
