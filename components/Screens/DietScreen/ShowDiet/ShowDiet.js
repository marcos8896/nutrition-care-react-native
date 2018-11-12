import React from 'react';
import axios from 'axios';

import DietGeneralInfo from './components/DietGeneralInfo';
import Divider from '../../../shared/Divider/Divider';

import { View, AsyncStorage, StyleSheet, Alert, Text } from 'react-native';

import { BASE_API_URL } from '../../../../constants';

class ShowDiet extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('description', 'Dieta'),
    };
  }

  state = {
    diet: {},
    dietFoodDetails: [],
    json: 'null'
  }

  async componentDidMount() {

    const dietId = this.props.navigation.getParam('dietId', '');
    const diet = await this.getFullDiet( dietId );
    diet.date = new Date(diet.createdAt).toLocaleDateString();

    this.setState({
      diet,
      json: JSON.stringify(diet, null, '  ') 
    })

  }

  getFullDiet = async ( dietId ) => {

    const [ userToken, userId ] = await Promise.all([
      AsyncStorage.getItem('@app:userToken'),
      AsyncStorage.getItem('@app:userId'),
    ]);
    

    const filter = {
      where: { id: dietId },
      include: ['dietFoodDetails'],
    };

    return axios.get(`${BASE_API_URL}/Customers/${userId}/diets/`, { 
      params: { filter: filter },
      headers: { 'Authorization': userToken }
    })
    .then( response => response.data )
    .then( ( [diet] ) => diet )
    .catch( err => {
      console.log('err: ', err);
      Alert.alert(
        'Error',
        'Hubo un error al tratar de obtener la dieta completa :(',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    });

  }

  render() {
    return (
      <View style={styles.paper}>
        <DietGeneralInfo diet={this.state.diet}/>
        <Divider/>
        <Text>Creado el: {this.state.diet.date}</Text>
        <Divider/>

        {/* <Text>Cambia id: { this.state.json }</Text> */}
        
      </View>
    );
  }
};

const styles = StyleSheet.create({
  paper: {
    backgroundColor: '#FFF',
    borderColor: '#DCDCDC',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    marginHorizontal: 10,
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5,
    padding: 8,
  }
});

export default ShowDiet;