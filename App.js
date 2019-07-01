import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import MainNavigator from './navigation/MainNav';
import { setNotification } from './utils/helpers';

const AppContainer = createAppContainer(MainNavigator);
class App extends React.Component {
  componentDidMount() {
    setNotification();
  }
  render() {
    return <AppContainer />;
  }
}
export default App;
