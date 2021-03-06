import React, { Component } from "react";
import { connect } from "react-redux";
import { getDecks } from "../utils/API";
import { loadDecks } from "../actions";
import {
  View,
  FlatList,
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
      
        <View>
        <FlatList
          data={Object.values(decks)}
          renderItem={({ item }) => (
            <DeckItem navigation={this.props.navigation} deck={item} />
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
