import React from 'react';
import styles from '../../../globalStyles';

import { StatusBar, View, Text } from 'react-native';

class RoutinesListScreen extends React.Component {
  static navigationOptions = {
    title: 'Rutinas',
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <Text>Routines list</Text>
      </View>
    );
  }
};

export default RoutinesListScreen;