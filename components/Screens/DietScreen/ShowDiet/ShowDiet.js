import React from 'react';
import axios from 'axios';

import DietGeneralInfo from './components/DietGeneralInfo';
import Divider from '../../../shared/Divider/Divider';

import { 
 View, 
 AsyncStorage, 
 StyleSheet, 
 Alert, 
 Text,
 FlatList,
 TouchableOpacity,
} from 'react-native';

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
  }

  async componentDidMount() {

    const dietId = this.props.navigation.getParam('dietId', '');
    const diet = await this.getFullDiet( dietId );
    diet.date = new Date(diet.createdAt).toLocaleDateString();

    this.setState({
      diet,
      dietFoodDetails: diet.dietFoodDetails,
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
    .then( ( [diet] ) => {
      diet.dietFoodDetails = this.calculateNutrientValues(diet.dietFoodDetails);
      return diet;
    })
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

/**
 * 
 * Rounded decimals from float numbers and only allows them to have two decimals.
 * @author Marcos Barrera del Río <elyomarcos@gmail.com>
 * @param num - Number to round.
 * @returns number - Rounded number.
 */
  roundNumber = ( num ) => Math.round( num * 100 ) / 100;

  calculateNutrientValues = ( dietFoodDetails ) => {
    dietFoodDetails.forEach( (food, index) => {
      
      //Calculate food nutrients.
      food.calculatedCalories = this.roundNumber(food.calories * food.desiredGrams);
      food.calculatedProteins = this.roundNumber(food.proteins * food.desiredGrams);
      food.calculatedFats = this.roundNumber(food.fats * food.desiredGrams);
      food.calculatedCarbs = this.roundNumber(food.carbohydrates * food.desiredGrams);

      //Set key for the List uniquess
      food.key = `${food.dietId}-${food.foodId}-${index}`;

    });

    return dietFoodDetails;
  }

  renderDetailItem = ({ item, index }) => {

    let rowStyles;

    if(index % 2 !== 0)
      rowStyles = [styles.row, styles.oddRow];
    else
      rowStyles = styles.row;

    return (
      <TouchableOpacity 
        style={rowStyles}
      >

        <Text style={styles.description}>
          {item.description}:
        </Text>

        <View>

          <Text> 
            Por cada {item.desiredGrams} gramos, incluye:
          </Text>

          <Text> Calorías - {item.calculatedCalories} </Text>
          <Text> Proteínas - {item.calculatedProteins} </Text>
          <Text> Grasas - {item.calculatedFats} </Text>
          <Text> Carbohidratos - {item.calculatedCarbs} </Text>
          <Text> Key - {item.key} </Text>

        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.paper}>
        <DietGeneralInfo diet={this.state.diet}/>
        <Divider/>
        <Text>Creado el: {this.state.diet.date}</Text>
        <Divider/>
        <View style={styles.listContainer}>
          <FlatList
            data={this.state.dietFoodDetails}
            renderItem={this.renderDetailItem}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  paper: {
    flex: 1,
    backgroundColor: '#FFF',
    borderColor: '#DCDCDC',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    marginHorizontal: 10,
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5,
    padding: 8,
  },
  row: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
  },
  oddRow: {
    backgroundColor: '#fcfcfc',
  },
  listContainer: { 
    alignSelf: 'stretch',
    marginBottom: 150,
  }
});

export default ShowDiet;