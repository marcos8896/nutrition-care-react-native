import React from 'react';

import { 
  View,
  Text,
  AsyncStorage,
  StyleSheet,
} from 'react-native';

import { BASE_API_URL } from '../../../constants';

class ShowDiet extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('description', 'Dieta'),
    };
  }

  state = {
    diet: null
  }

  componentDidMount() {
  }

  getFullDiet = async () => {

    const [ userToken, userId ] = await Promise.all([
      AsyncStorage.getItem('@app:userToken'),
      AsyncStorage.getItem('@app:userId'),
    ]);

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Show diet content</Text>
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

export default ShowDiet;