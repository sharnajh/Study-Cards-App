import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
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
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={{fontSize: 25}}>Add Card to {deck.title} Deck</Text>
          <TextInput
            placeholder="Type the question here"
            onChangeText={question => this.setState({ question })}
            value={this.state.question}
            style={styles.input}
          />
          <TextInput
            placeholder="Type the answer here"
            onChangeText={answer => this.setState({ answer })}
            value={this.state.answer}
            style={styles.input}
          />
          <Button
            title="Create Card"
            onPress={this.submitCard}
            disabled={this.state.question === "" || this.state.answer === ""}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: "90%",
    height: "50%",
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20
  },
  input: {
    padding: 10,
    fontSize: 20,
    borderBottomWidth: 3,
    width: "100%"
  }
});

const mapStateToProps = ({ decks }, { navigation }) => {
  const { deck } = navigation.state.params;
  return {
    deck
  };
};

export default connect(mapStateToProps, { addCard })(AddCard);
