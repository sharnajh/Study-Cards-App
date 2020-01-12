import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

class DeckView extends Component {
  renderAddCard = () => {
    const { navigation, deck } = this.props;
    navigation.navigate("AddCard", { deck });
  };
  renderQuiz = () => {
    const { navigation, deck } = this.props;
    navigation.navigate("Quiz", { deck });
  };
  render() {
    const { deck } = this.props;
    return (
      <View>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length} Cards</Text>
        <TouchableOpacity onPress={this.renderAddCard}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.renderQuiz}>
          <Text>Take Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ( decks, { navigation }) => {
  const { deck, title } = navigation.state.params
  let selectedDeck;
  if (title) {
    selectedDeck = Object.values(decks).filter((d) => d.title === title )
    selectedDeck = selectedDeck[0]
  } else {
    selectedDeck = deck;
  }
  return {
    deck: selectedDeck
  }
}


export default connect(mapStateToProps)(DeckView);
