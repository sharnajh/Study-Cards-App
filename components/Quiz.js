import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

class Quiz extends Component {
  state = {
    questionIndex: 0,
    score: 0,
    questionAnswered: false,
    showAnswer: false,
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
    const { questionIndex, questionAnswered, score, showAnswer } = this.state;
    if (
      questionAnswered === true &&
      questionIndex + 1 === deck.questions.length
    ) {
      return (
        <View style={styles.container}>
          <View
            style={[styles.card]}
            
          >
            <Text>{`You got ${score} out of ${deck.questions.length} cards correct.`}</Text>
            <View>
              <Button title="Retake Quiz" onPress={this.onReset} />
              <Button title="Return to Deck" onPress={this.onRenderDeck} />
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View
          style={[styles.card]}
        >
          <Text>
            {showAnswer === false
              ? `Question ${questionIndex + 1} of ${questions.length}`
              : "Answer"}
          </Text>
          <View>
            {showAnswer === false ? (
              <View>
                <Text style={{ fontSize: 50, textAlign: "center" }}>
                  {questions[questionIndex].question}
                </Text>
              </View>
            ) : (
              <View>
                <Text style={{ fontSize: 35, textAlign: "center" }}>
                  {questions[questionIndex].answer}
                </Text>
              </View>
            )}
          </View>
          <View>
            {showAnswer === false ? (
              <Button
                title="Show Answer"
                onPress={() => this.setState({ showAnswer: true })}
              />
            ) : (
              <View>
                <Text style={{ textAlign: "center" }}>
                  Did you get it right?
                </Text>
                <Button title="Correct" onPress={this.onCorrect} />
                <Button title="Incorrect" onPress={this.onIncorrect} />
              </View>
            )}
          </View>
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
    height: "70%",
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20
  }
});

export default Quiz;
