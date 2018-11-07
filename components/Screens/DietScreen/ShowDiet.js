import React from 'react';
import axios from 'axios';

import { 
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  Alert,
} from 'react-native';

import { BASE_API_URL } from '../../../constants';

class ShowDiet extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('description', 'Dieta'),
    };
  }

  state = {
    diet: null,
    json: 'null'
  }

  async componentDidMount() {

    const dietId = this.props.navigation.getParam('dietId', '');
    const diet = await this.getFullDiet( dietId );
    this.setState({ json: JSON.stringify(diet, null, '  ') })

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
        <Text>Cambia id: { this.state.json }</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default ShowDiet;