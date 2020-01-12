import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

class DeckView extends Component {
  renderAddCard = title => {
    const { navigation } = this.props;
    navigation.navigate("AddCard", { title });
  };
  renderQuiz = title => {
    const { navigation } = this.props;
    navigation.navigate("Quiz", { title });
  };
  render() {
    const title = this.props.navigation.state.params.title;
    return (
      <View>
        <Text>{title}</Text>
        <TouchableOpacity onPress={() => this.renderAddCard(title)}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.renderQuiz(title)}>
          <Text>Take Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DeckView;
