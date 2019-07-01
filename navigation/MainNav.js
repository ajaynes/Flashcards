import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DeckListView from '../views/DeckListView';
import DeckView from '../views/DeckView';
import NewDeckView from '../views/NewDeckView';
import NewQuestionView from '../views/NewQuestionView';
import QuizView from '../views/QuizView';
import { darkBlue, blue, white, lightGray } from '../utils/colors';

const Stack = createStackNavigator({
  StackHome: {
    screen: DeckListView,
    navigationOptions: {
      title: 'Your Decks',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkBlue,
      },
    },
  },
});

const NewDeck = createStackNavigator({
  NewDeckStack: {
    screen: NewDeckView,
    navigationOptions: {
      title: 'New Deck',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkBlue,
      },
    },
  },
});

const TabNavigator = createBottomTabNavigator(
  {
    Decks: {
      screen: Stack,
      navigationOptions: {
        tabBarLabel: 'Your Decks',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="cards-outline"
            size={30}
            color={tintColor}
          />
        ),
      },
    },
    AddDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'Add a Deck',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="plus-circle-outline"
            size={30}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 15,
      },
      activeTintColor: darkBlue,
      inactiveTintColor: lightGray,
      style: {
        height: 60,
        padding: 5,
        backgroundColor: white,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  }
);

TabNavigator.navigationOptions = {
  header: null,
};

const MainNavigator = createStackNavigator({
  Home: TabNavigator,
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      title: 'Deck',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkBlue,
      },
    },
  },
  NewQuestionView: {
    screen: NewQuestionView,
    navigationOptions: {
      title: 'Add a New Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkBlue,
      },
    },
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      title: 'Quiz Yourself',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkBlue,
      },
    },
  },
});

export default MainNavigator;
