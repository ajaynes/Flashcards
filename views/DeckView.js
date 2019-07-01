import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { getDeck } from '../utils/api';
import { clearNotification, setNotification } from '../utils/helpers';
import { blue } from '../utils/colors';

export default class DeckView extends React.Component {
  state = {
    deck: null,
  };

  componentDidMount() {
    const { navigation } = this.props;
    const deckID = navigation.getParam('deckID', '');
    getDeck(deckID).then(deck => {
      this.setState({ deck: JSON.parse(deck) });
    });
  }

  resetNotification = () => {
    clearNotification().then(setNotification);
  };

  render() {
    const { navigation } = this.props;
    const { deck } = this.state;
    const deckID = navigation.getParam('deckID', '');
    if (deck) {
      return (
        <View style={styles.viewpadding}>
          <Text h3 h3Style={styles.titles}>
            {deck.title}
          </Text>
          <Text h4 h4Style={styles.titles}>{`${
            deck.questions.length
          } Card(s)`}</Text>
          <Button
            title={'Add Cards'}
            buttonStyle={styles.button}
            onPress={() => {
              navigation.navigate('NewQuestionView', {
                deckID: deckID,
              });
            }}
          />
          <Button
            title={'Start Quiz'}
            buttonStyle={styles.button}
            onPress={() => {
              navigation.navigate('QuizView', {
                deckID: deckID,
              });
              this.resetNotification();
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.viewpadding}>
          <Text>Something went wrong</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: blue,
    margin: 10,
  },
  viewpadding: {
    padding: 15,
  },
  titles: {
    textAlign: 'center',
    marginBottom: 10,
  },
});
