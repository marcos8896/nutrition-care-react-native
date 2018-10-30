import React from 'react';
import styles from '../../../globalStyles';

import { StatusBar, View, Text } from 'react-native';

class DietScreen extends React.Component {
  static navigationOptions = {
    title: 'Dietas',
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <Text>Diet content</Text>
      </View>
    );
  }
};

export default DietScreen;