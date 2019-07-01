import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, Button, Text } from 'react-native-elements';
import { getDeck } from '../utils/api';
import { blue, darkBlue } from '../utils/colors';

export default class QuizView extends React.Component {
  state = {
    questions: null,
    correct: 0,
    index: 0,
    answer: false,
  };

  showAnswer = () => {
    this.setState(prevState => ({
      answer: true,
    }));
  };

  setcorrect = () => {
    this.setState(prevState => ({
      correct: prevState.correct + 1,
      index: prevState.index + 1,
      answer: false,
    }));
  };

  next = () => {
    this.setState(prevState => ({
      index: prevState.index + 1,
      answer: false,
    }));
  };

  componentDidMount() {
    const { navigation } = this.props;
    const deckID = navigation.getParam('deckID', '');
    getDeck(deckID).then(deck => {
      const questions = JSON.parse(deck).questions;
      this.setState({ questions });
    });
  }

  render() {
    const { navigation } = this.props;
    const { questions, correct, index, answer } = this.state;

    if (!questions) {
      return (
        <View>
          <Text>Something went wrong</Text>
        </View>
      );
    } else if (questions.length === 0) {
      return (
        <View style={styles.viewpadding}>
          <Text h3>There are no questions in this deck.</Text>
        </View>
      );
    } else if (questions.length !== index) {
      const question = questions[index];
      return (
        <View style={styles.viewpadding}>
          <Text style={{ textAlign: 'right' }}>
            {`${index + 1} of ${questions.length}`}
          </Text>
          <Divider style={styles.divider} />
          <Text h4 h5style={styles.questions}>
            {question.question}
          </Text>
          <Text h5 h5style={styles.questions}>
            {answer === true ? question.answer : null}
          </Text>
          {answer === false ? (
            <Button
              title={'Show Answer'}
              buttonStyle={styles.button}
              onPress={this.showAnswer}
            />
          ) : null}
          <Button
            title={'Correct'}
            buttonStyle={[styles.button, styles.margins]}
            onPress={this.setcorrect}
          />
          <Button
            title={'Incorrect'}
            buttonStyle={styles.button}
            onPress={this.next}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.viewpadding}>
          <Text h3 h3Style={styles.titles}>
            Done!
          </Text>
          <Text h4 h4Style={styles.titles}>
            {`You answered ${Math.round(
              (correct / questions.length) * 100
            )}% Correct!`}
          </Text>
          <Button
            title={'Back to Deck'}
            buttonStyle={styles.button}
            onPress={() => {
              navigation.navigate('DeckView', {
                deckID: navigation.getParam('deckID', ''),
              });
            }}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: darkBlue,
    marginBottom: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: blue,
  },
  margins: {
    marginBottom: 10,
    marginTop: 10,
  },
  questions: {
    marginBottom: 15,
  },
  viewpadding: {
    padding: 15,
  },
  titles: {
    textAlign: 'center',
  },
});
