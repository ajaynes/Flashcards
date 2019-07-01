import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { addDeck } from '../utils/api';
import { blue } from '../utils/colors';

class NewDeckView extends Component {
  state = {
    title: '',
  };
  render() {
    const { title } = this.state;
    return (
      <View style={styles.viewpadding}>
        <Text h3 h3Style={styles.title}>
          Enter a Deck Title
        </Text>
        <Input
          label="Deck Title"
          onChangeText={text => this.setState({ title: text })}
          value={title}
          editable={true}
          clearButtonMode="always"
          containerStyle={styles.margins}
        />
        <Button
          title={'Submit'}
          disabled={title === ''}
          onPress={() => {
            addDeck(title);
            this.props.navigation.navigate('Decks', {
              deckID: title,
            });
          }}
          buttonStyle={styles.button}
        />
      </View>
    );
  }
}

export default NewDeckView;

const styles = StyleSheet.create({
  button: {
    backgroundColor: blue,
    marginRight: 10,
    marginLeft: 10,
  },
  margins: {
    marginBottom: 25,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  viewpadding: {
    padding: 15,
  },
});
