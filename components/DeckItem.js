import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

class DeckItem extends Component {
  renderDeckView = () => {
    const { navigation, deck } = this.props;
    navigation.navigate("DeckView", { deck });
  };
  render() {
    const { deck } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={this.renderDeckView}>
          <View>
            <Text>{deck.title}</Text>
            <Text>{deck.questions.length} Cards</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DeckItem;
