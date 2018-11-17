import React from 'react';

import { 
  View,
  TouchableOpacity, 
  Text,
  AsyncStorage,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';

import { BASE_API_URL } from '../../../constants';

class DietScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Dietas',
  };

  state = {
    diets: []
  }

  componentDidMount() {
    this.getDiets().then( diets => {

      diets.forEach( diet => {
        diet.key = `${diet.id}`
        diet.date = new Date(diet.createdAt).toLocaleDateString();
      });

      this.setState({ diets: diets });
      
    })
    .catch( err => {
      Alert.alert(
        'Error',
        'Hubo un error al tratar de obtener las dietas :(',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    });
  }

  getDiets = async () => {

    const [ userToken, userId ] = await Promise.all([
      AsyncStorage.getItem('@app:userToken'),
      AsyncStorage.getItem('@app:userId'),
    ]);

    return fetch(`${BASE_API_URL}/Customers/${userId}/diets`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': userToken,
      },
    })
    .then(response => response.json())
  }

  onPressItem({ dietId, description }) {
    this.props.navigation.navigate('ShowDiet', { 
      dietId,
      description,
    });
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.row}
        onPress={this.onPressItem.bind(this, {
          dietId: item.id,
          description: item.description,
        })}  
      >

        <Text style={styles.description}>
          {item.description}
        </Text>

        <View style={styles.infoContainer}>

          <View style={styles.nutrients}>
            <Text> Calorías: {item.totalCarbohydrates} </Text>
            <Text> Proteínas: {item.totalProteins} </Text>
            <Text> Grasas: {item.totalFats} </Text>
            <Text> Calorias: {item.totalCalories} </Text>
          </View>

          <View>
            <Text> Fecha:</Text>
            <Text> {item.date} </Text>
          </View>

        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.diets}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  nutrients: {
    flex: 1
  },
  description: {
    fontSize: 18
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default DietScreen;