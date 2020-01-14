import React, { Component } from "react";
import { connect } from "react-redux";
import { getDecks } from "../utils/API";
import { loadDecks } from "../actions";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native";
import DeckItem from "./DeckItem";

class DecksList extends Component {
  componentDidMount() {
    const { loadDecks } = this.props;
    getDecks().then(decks => loadDecks(decks));
  }
  render() {
    const { decks } = this.props;
    return (
      <ScrollView>
        <FlatList
          data={Object.values(decks)}
          renderItem={({ item }) => (
            <DeckItem navigation={this.props.navigation} deck={item} />
          )}
          keyExtractor={item => item.title}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(decks) {
  return { decks };
}
export default connect(mapStateToProps, { loadDecks })(DecksList);
