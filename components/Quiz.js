import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

// Use Card Animation to do flips.
// YOU GOT THIS! I'm so proud of you.

class Quiz extends Component {
  state = {
    questionIndex: 0,
    score: 0
  };
  nextQuestion = () => {
    const { deck } = this.props.navigation.state.params;
    if (this.state.questionIndex + 1 <= deck.questions.length) {
      this.setState(prev => ({ questionIndex: prev.questionIndex + 1 }));
    } 
  };
  checkAnswer = () => {};
  renderResults = () => {};
  render() {
    const { deck } = this.props.navigation.state.params;
    const questions = deck.questions;
    const { questionIndex } = this.state;
    return (
      <View>
        <Text>Quiz</Text>
        <Text>
          {questionIndex + 1} / {questions.length}
        </Text>
        <Text>{questions[questionIndex].question}</Text>
        <TouchableOpacity>
          <Text>Check Answer</Text>
        </TouchableOpacity>
        <Text>{questions[questionIndex].answer}</Text>
        {questionIndex + 1 < questions.length ? (
          <TouchableOpacity onPress={this.nextQuestion}>
            <Text>Next Question</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={this.renderResults}>
            <Text>Show Results</Text>
          </TouchableOpacity>
        )}
        <Text>{JSON.stringify(questions)}</Text>
        <Text>{JSON.stringify(questionIndex + 1)}</Text>
      </View>
    );
  }
}

export default Quiz;
