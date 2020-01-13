import React, { Component } from "react";
import { View, Text } from "react-native";
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
        <View>
          <Card
            title={`You got ${score} out of ${deck.questions.length} cards correct.`}
          >
            <Button title="Retake Quiz" onPress={this.onReset} />
            <Button title="Return to Deck" onPress={this.onRenderDeck} />
          </Card>
        </View>
      );
    }
    return (
      <View>
        <Card title={`Question ${questionIndex + 1} / ${questions.length}`}>
          <Text style={{ fontSize: 50, textAlign: "center" }}>
            {questions[questionIndex].question}
          </Text>

          {this.state.showAnswer ? (
            <View>
              <Text style={{ fontSize: 35, textAlign: "center" }}>
                {questions[questionIndex].answer}
              </Text>
              <View>
                <Button title="Correct" onPress={this.onCorrect} />
                <Button title="Incorrect" onPress={this.onIncorrect} />
              </View>
            </View>
          ) : (
            <Button
              title="Show Answer"
              onPress={() => this.setState({ showAnswer: true })}
            />
          )}
          {/* <Text>{JSON.stringify(questions)}</Text>
        <Text>Score: {score}</Text>
        <Text>questionAnswered: {JSON.stringify(questionAnswered)}</Text> */}
        </Card>
      </View>
    );
  }
}

export default Quiz;
