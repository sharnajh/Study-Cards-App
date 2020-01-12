import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

class Deck extends Component {
  renderDeckView = () => {
    
  }
  render() {
    const { title, questions } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={this.renderDeckView()}>
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
