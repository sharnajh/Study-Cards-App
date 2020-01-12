import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { addCardToDeck } from "../utils/API";
import { addCard } from "../actions";

class AddCard extends Component {
  state = {
    question: "",
    answer: ""
  };
  submitCard = () => {
    const { question, answer } = this.state;
    const { addCard, deck } = this.props;
    addCard(deck.title, { question, answer }); 
    addCardToDeck(deck.title, { question, answer }); 
  };
  render() {
    return (
      <View>
        <Text>Add Card</Text>
        <TextInput
          placeholder="Type the question here"
          onChangeText={question => this.setState({ question })}
          value={this.state.question}
        />
        <TextInput
          placeholder="Type the answer here"
          onChange={answer => this.setState({ answer })}
          value={this.state.answer}
        />
        <TouchableOpacity onPress={this.submitCard}>
          <Text>Add Card to Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(decks, { navigation }) {
  const { deckTitle } = navigation.state.params;
  return {
    deck: decks[deckTitle] || {}
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { deckTitle } = navigation.state.params;

  return {
    goBack: () => navigation.goBack(),
    addCard: (deckTitle, card) => dispatch(addCard(deckTitle, card))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
