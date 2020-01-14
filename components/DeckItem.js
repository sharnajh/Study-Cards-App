import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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
          <View style={styles.deck}>
            <Text style={{ fontSize: 20, margin: 10 }}>{deck.title}</Text>
            <Text style={{ fontSize: 15 }}>{deck.questions.length} Cards</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    height: 150,
    padding: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
  }
})

export default DeckItem;
