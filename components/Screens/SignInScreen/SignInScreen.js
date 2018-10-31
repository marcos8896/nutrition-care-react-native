import React from 'react';
import {
  Alert,
  AsyncStorage,
  Text,
  TextInput,
  Button,
  View,
} from 'react-native';

import { requestToken } from './auth.service';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign In',
  };

  state = {
    userCredentials: {
      email: '',
      password: ''
    }
  };

  handleOnChange = ( key, text ) => {
    const userCredentials = this.state.userCredentials;
    this.setState({ userCredentials: { 
      ...userCredentials,
      [key]: text
    }})
  };

  displayAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK' }],
      { cancelable: false }
    );
  };

  signInAsync = async () => {
    try {
      const { email, password } = this.state.userCredentials;
      const data = await requestToken( email, password );
      if ( data.error ) {
        this.displayAlert('Sesión invalida', data.error.message);
      } else {
        await AsyncStorage.setItem('@app:userToken', data.id);
        this.props.navigation.navigate('App');
      }
    } catch(error) {
      this.displayAlert('Error', 'Ha ocurrido un error inesperado. ' + error);
    }
  };

  render() {
    const { email, password } = this.state.userCredentials;
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 26, textAlign: 'center'}}>
            Iniciar Sesión
          </Text>
        </View>
        <View style={{
          flex: 2,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          marginHorizontal: 10
        }}>
          <View style={{paddingVertical: 5}}>
            <Text>Correo electrónico</Text>
            <TextInput
              style={{height: 40, fontSize: 18}}
              placeholder="tu-correo@ejemplo.com"
              value={email}
              keyboardType="email-address"
              onChangeText={(text) => this.handleOnChange('email', text)}
            />
          </View>
          <View>
            <Text>Contraseña</Text>
            <TextInput
              style={{height: 40, fontSize: 18}}
              value={password}
              secureTextEntry
              onChangeText={(text) => this.handleOnChange('password', text)}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Button title="Iniciar sesión" onPress={this.signInAsync} />
          </View>
        </View>
      </View>
    );
  }
};



export default SignInScreen;