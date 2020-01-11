import React, { Component } from "react";
import { View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import Decks from "./components/decks";

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View>
          <Decks />
        </View>
      </Provider>
    );
  }
}
