import React, { Component } from "react";
import { View, Text } from "react-native";

class Quiz extends Component {
  state = {
    score: 0
  }
  render() {
    const { deck } = this.props.navigation.state.params
    return (
      <View>
        <Text>Quiz</Text>
        <Text>{deck.questions.length}</Text>
      </View>
    );
  }
}

export default Quiz;