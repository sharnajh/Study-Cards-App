import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { saveDeckTitle } from "../utils/API";
import { addDeck } from "../actions";

class NewDeck extends Component {
  state = {
    title: ""
  };
  submitDeck = () => {
    const { addDeck, navigation } = this.props;
    const { title } = this.state;
    saveDeckTitle(title);
    addDeck(title);
    this.setState({ title: "" });
    navigation.navigate("DeckView", { title });
  };
  render() {
    const { decks } = this.props;
    const { title } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={{ fontSize: 30 }}>New Deck</Text>
          <TextInput
            onChangeText={title => this.setState({ title })}
            placeholder="Type the deck's title here"
            value={title}
            style={{
              padding: 10,
              fontSize: 20,
              borderBottomWidth: 3,
              width: "100%"
            }}
          />
          {Object.keys(decks).includes(title) && (
            <Text style={{ color: "red" }}>
              A deck with this title already exists.
            </Text>
          )}
          <Button
            title="Create New Deck"
            onPress={this.submitDeck}
            disabled={title === "" || Object.keys(decks).includes(title)}
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
  }
});

const mapStateToProps = decks => {
  return {
    decks
  };
};

export default connect(mapStateToProps, { addDeck })(NewDeck);
