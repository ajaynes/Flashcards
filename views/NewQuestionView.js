import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { addCard } from '../utils/api';
import { blue } from '../utils/colors';

export default class NewQuestionView extends React.Component {
  state = {
    question: '',
    answer: '',
  };

  render() {
    const { navigation } = this.props;
    const { question, answer } = this.state;
    const deckID = navigation.getParam('deckID', '');
    return (
      <View style={styles.viewpadding}>
        <Text h3 h3Style={styles.titles}>
          Add Your Question
        </Text>
        <Input
          label="Question"
          onChangeText={text => this.setState({ question: text })}
          value={question}
          editable={true}
        />
        <Input
          label="Answer"
          onChangeText={text => this.setState({ answer: text })}
          value={answer}
          editable={true}
          containerStyle={styles.margins}
        />
        <Button
          title={'Submit'}
          disabled={answer === '' || question === ''}
          onPress={() => {
            addCard(deckID, {
              question: question,
              answer: answer,
            });
            navigation.navigate('Home');
          }}
          buttonStyle={styles.button}
        />
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
  margins: {
    marginTop: 15,
    marginBottom: 25,
  },
});
