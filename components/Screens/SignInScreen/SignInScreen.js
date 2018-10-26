import React from 'react';
import {
  AsyncStorage,
  Button,
  View,
} from 'react-native';

import styles from '../../../globalStyles';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign In',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'placeholde');
    this.props.navigation.navigate('App');
  };
};



export default SignInScreen;