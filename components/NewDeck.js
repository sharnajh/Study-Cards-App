import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
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
    return (
      <View>
        <Text>New Deck</Text>
        <TextInput
          onChangeText={title => this.setState({ title })}
          placeholder="Type the deck's title here"
          value={this.state.title}
        />
        <TouchableOpacity onPress={this.submitDeck}>
          <Text>Create New Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({ decks }) => {
  return {
    decks
  };
};

export default connect(mapStateToProps, { addDeck })(NewDeck);
