import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, ListItem, Button, Text } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDecks, loadInitialDecks } from '../utils/api';
import { blue } from '../utils/colors';

export default class DeckListView extends React.Component {
  state = {
    decks: null,
  };

  componentDidMount() {
    loadInitialDecks();
    getDecks().then(decks => {
      this.setState({ decks: decks });
    });
  }

  componentDidUpdate() {
    getDecks().then(decks => {
      this.setState({ decks: decks });
    });
  }

  addDeck = ({ deck }) => {
    return (
      <Card style={{ marginBottom: 15 }}>
        <ListItem
          key={deck.title}
          title={deck.title}
          titleStyle={[styles.maintitle, styles.titles]}
          subtitle={`${deck.questions.length} card(s)`}
          subtitleStyle={[styles.titles, styles.subtitle]}
          onPress={() =>
            this.props.navigation.navigate('DeckView', {
              deckID: deck.title,
            })
          }
        />
      </Card>
    );
  };

  render() {
    const decksOverview = [];
    if (this.state.decks) {
      Object.keys(this.state.decks).forEach((key, index) => {
        decksOverview.push(this.addDeck({ deck: this.state.decks[key] }));
      });
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.viewpadding}>
            <Text h3 h3Style={styles.titles}>
              Here are your decks
            </Text>
            {decksOverview}
            <Button
              title={'Add Deck'}
              onPress={() => this.props.navigation.navigate('AddDeck')}
              buttonStyle={[styles.button, styles.topmargin]}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: blue,
    marginRight: 15,
    marginLeft: 15,
  },
  viewpadding: {
    padding: 15,
  },
  titles: {
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
  },
  maintitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  topmargin: {
    marginTop: 15,
  },
});
