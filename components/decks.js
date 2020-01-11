import React, { Component } from "react";
import { connect } from "react-redux";
import { getDecks } from "../utils/API";
import { loadDecks } from "../actions";
import { StyleSheet, Text, View } from "react-native";

class Decks extends Component {
  componentDidMount() {
    const { loadDecks } = this.props;
    getDecks()
      .then(decks => loadDecks(decks))
      .then(() => this.setState(() => ({ ready: true })));
  }
  render() {
    const { decks } = this.props;
    return (
      <View>
        <Text style={{ fontSize: 30 }}>{JSON.stringify(decks)}</Text>
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return { decks };
}
export default connect(mapStateToProps, { loadDecks })(Decks);
