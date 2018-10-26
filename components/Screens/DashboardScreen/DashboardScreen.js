import React from 'react';
import { Button, View, AsyncStorage } from 'react-native';

import styles from '../../../globalStyles';

class DashboardScreen extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Go to diet screen example" onPress={this._goToDiet} />
        <Button title="Sign out example" onPress={this._signOutAsync} />
      </View>
    );
  }

  _goToDiet = () => {
    this.props.navigation.navigate('Diet');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
};

export default DashboardScreen;