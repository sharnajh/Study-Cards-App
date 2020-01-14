import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated
} from "react-native";
import { setLocalNotification, clearLocalNotification } from "../utils/helpers";
import { Button } from "react-native-elements";
import { connect } from "react-redux";

class DeckView extends Component {
  state = {
    springValue: new Animated.Value(0.3)
  };
  spring = () => {
    this.state.springValue.setValue(0.3);
    Animated.spring(this.state.springValue, {
      toValue: 1,
      bounciness: 17,
      velocity: 30
    }).start();
  };
  componentDidMount() {
    this.spring();
  }
  renderAddCard = () => {
    const { navigation, deck } = this.props;
    navigation.navigate("AddCard", { deck });
  };
  renderQuiz = () => {
    clearLocalNotification().then(setLocalNotification());
    const { navigation, deck } = this.props;
    navigation.navigate("Quiz", { deck });
  };
  render() {
    const { deck } = this.props;
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.card,
            { transform: [{ scale: this.state.springValue }] }
          ]}
        >
          <Text style={{ fontSize: 50 }}>{deck.title}</Text>
          <Text style={{ fontSize: 30 }}>{deck.questions.length} Cards</Text>
          <Button title="Add Card" onPress={this.renderAddCard} />
          {deck.questions.length > 0 && (
            <Button title="Take Quiz" onPress={this.renderQuiz} />
          )}
        </Animated.View>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  }
});

const mapStateToProps = (decks, { navigation }) => {
  const { deck, title } = navigation.state.params;
  let selectedDeck;
  if (title) {
    selectedDeck = Object.values(decks).filter(d => d.title === title);
    selectedDeck = selectedDeck[0];
  } else {
    selectedDeck = deck;
  }
  return {
    deck: selectedDeck
  };
};

export default connect(mapStateToProps)(DeckView);
