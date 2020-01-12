import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

class Deck extends Component {
  renderDeckView = (title) => {
    const { navigation } = this.props
    navigation.navigate("DeckView", {title})
  }
  render() {
    const { title, questions } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={() => this.renderDeckView(title)}>
          <View>
            <Text>{title}</Text>
            <Text>{questions.length} Cards</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Deck;
