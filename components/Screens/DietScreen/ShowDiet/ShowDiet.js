import React from 'react';
import axios from 'axios';

import { 
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  Alert,
} from 'react-native';

import { BASE_API_URL } from '../../../../constants';

class ShowDiet extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('description', 'Dieta'),
    };
  }

  state = {
    diet: null,
    dietFoodDetails: [],
    json: 'null'
  }

  async componentDidMount() {

    const dietId = this.props.navigation.getParam('dietId', '');
    const diet = await this.getFullDiet( dietId );
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
      
      <View style={styles.container}>
        <View style={styles.paper}>
          <Text>Cambia id: { this.state.json }</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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