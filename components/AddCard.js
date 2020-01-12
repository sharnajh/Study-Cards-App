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
    const { addCard, navigation, title } = this.props;
    const { question, answer } = this.state;
    addCardToDeck(title, { question, answer });
    addCard(title, { question, answer });
    this.setState({ question: "", answer: "" });
    navigation.navigate("DeckView", { title });
  };
  render() {
    const { title } = this.props;
    return (
      <View>
        <Text>{title}</Text>
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

const mapStateToProps = ({ decks }, { navigation }) => {
  const { title } = navigation.state.params;
  return {
    title
  };
};

export default connect(mapStateToProps, { addCard })(AddCard);
