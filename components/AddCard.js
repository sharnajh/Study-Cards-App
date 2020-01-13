import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { addCardToDeck } from "../utils/API";
import { addCard } from "../actions";

// Cannot be blank

class AddCard extends Component {
  state = {
    question: "",
    answer: ""
  };
  submitCard = () => {
    const { addCard, navigation, deck } = this.props;
    const { question, answer } = this.state;
    addCardToDeck(deck.title, { question, answer });
    addCard(deck.title, { question, answer });
    this.setState({ question: "", answer: "" });
    navigation.navigate("DeckView", { deck });
  };
  render() {
    const { deck } = this.props;
    return (
      <View>
        <Text>{deck.title}</Text>
        <TextInput
          placeholder="Type the question here"
          onChangeText={question => this.setState({ question })}
          value={this.state.question}
        />
         <TextInput
          placeholder="Type the answer here"
          onChangeText={answer => this.setState({ answer })}
          value={this.state.answer}
        />
        <TouchableOpacity onPress={this.submitCard}>
          <Text>Add Card to Deck</Text>
        </TouchableOpacity>
        <Text>{JSON.stringify(this.state)}</Text>
      </View>
    );
  }
}

const mapStateToProps = ({ decks }, { navigation }) => {
  const { deck } = navigation.state.params;
  return {
    deck
  };
};

export default connect(mapStateToProps, { addCard })(AddCard);
