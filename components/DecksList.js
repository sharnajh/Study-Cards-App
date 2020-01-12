import React, { Component } from "react";
import { connect } from "react-redux";
import { getDecks } from "../utils/API";
import { loadDecks } from "../actions";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Deck from "./Deck";

class DecksList extends Component {
  componentDidMount() {
    const { loadDecks } = this.props;
    getDecks().then(decks => loadDecks(decks));
  }
  render() {
    const { decks } = this.props;
    return (
      <View>
        <FlatList
          data={Object.values(decks)}
          renderItem={({ item }) => (
            <Deck
              id={item.title}
              title={item.title}
              questions={item.questions}
              navigation={this.props.navigation}
            />
          )}
          keyExtractor={item => item.title}
        />
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return { decks };
}
export default connect(mapStateToProps, { loadDecks })(DecksList);
