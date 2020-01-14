import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Button } from "react-native-elements";

class Quiz extends Component {
  state = {
    questionIndex: 0,
    score: 0,
    questionAnswered: false,
    showAnswer: false
  };
  next = () => {
    const { deck } = this.props.navigation.state.params;
    if (this.state.questionIndex + 1 < deck.questions.length) {
      this.setState(prev => ({
        questionIndex: prev.questionIndex + 1,
        questionAnswered: false
      }));
    }
  };
  onCorrect = () => {
    if (this.state.questionAnswered === false) {
      this.setState(prev => ({
        score: prev.score + 1
      }));
    }
    this.setState({ questionAnswered: true, showAnswer: false });
    this.next();
  };
  onIncorrect = () => {
    this.setState({ questionAnswered: true, showAnswer: false });
    this.next();
  };
  onReset = () => {
    this.setState({
      questionIndex: 0,
      score: 0,
      questionAnswered: false
    });
  };
  onRenderDeck = () => {
    const { navigation } = this.props;
    const { deck } = this.props.navigation.state.params;
    navigation.navigate("DeckView", { deck });
  };
  render() {
    const { deck } = this.props.navigation.state.params;
    const questions = deck.questions;
    const { questionIndex, questionAnswered, score } = this.state;
    if (
      questionAnswered === true &&
      questionIndex + 1 === deck.questions.length
    ) {
      return (
        <View style={styles.container}>
          <Card
            containerStyle={styles.card}
            title={`You got ${score} out of ${deck.questions.length} cards correct.`}
          >
            <View style={styles.cardStyle}>
              <Button title="Retake Quiz" onPress={this.onReset} />
              <Button title="Return to Deck" onPress={this.onRenderDeck} />
            </View>
          </Card>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Card
          containerStyle={styles.card}
          title={
            this.state.showAnswer === false
              ? `Question ${questionIndex + 1} of ${questions.length}`
              : "Answer"
          }
        >
          <View style={styles.cardStyle}>
            {this.state.showAnswer === false ? (
              <View>
                <Text style={{ fontSize: 50, textAlign: "center" }}>
                  {questions[questionIndex].question}
                </Text>
                <Button
                  title="Show Answer"
                  onPress={() => this.setState({ showAnswer: true })}
                />
              </View>
            ) : (
              <View>
                <Text style={{ fontSize: 35, textAlign: "center" }}>
                  {questions[questionIndex].answer}
                </Text>
                <View>
                  <Text style={{ textAlign: "center" }}>
                    Did you get it right?
                  </Text>
                  <Button title="Correct" onPress={this.onCorrect} />
                  <Button title="Incorrect" onPress={this.onIncorrect} />
                </View>
              </View>
            )}
          </View>
        </Card>
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
    height: "70%",
    borderRadius: 15
  },
  cardStyle: {
    height: "90%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Quiz;
