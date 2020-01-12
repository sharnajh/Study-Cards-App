import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

// Use Card Animation to do flips.
// YOU GOT THIS! I'm so proud of you.

class Quiz extends Component {
  state = {
    questionIndex: 0,
    score: 0
  };
  render() {
    const { deck } = this.props.navigation.state.params;
    const questions = deck.questions;
    return (
      <View>
        <Text>Quiz</Text>
        <Text>{questions[this.state.questionIndex].question}</Text>
        <Text>Check Answer</Text>
        <Text>{questions[this.state.questionIndex].answer}</Text>
        <TouchableOpacity
          onPress={() => this.setState((prev) => ({ questionIndex: prev.questionIndex + 1 }))}
        >
          <Text>Next Question</Text>
        </TouchableOpacity>
        <Text>{JSON.stringify(deck.questions)}</Text>
      </View>
    );
  }
}

export default Quiz;
