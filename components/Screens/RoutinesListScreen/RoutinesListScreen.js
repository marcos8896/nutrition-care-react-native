import React from 'react';

import {
  ScrollView,
} from 'react-native';
import ListItem from '../../shared/ListItem/ListItem';
import { getRoutines } from '../../../api/routines';

class RoutinesListScreen extends React.Component {
  static navigationOptions = {
    title: 'Rutinas',
  };
  constructor(props) {
    super(props);
    this.state = {
      routines: [],
      error: null
    }
    this.renderItems = this.renderItems.bind(this);
  }
  componentDidMount() {
    getRoutines()
      .then(response => this.setState({ routines: response }))
      .catch(error => {
        Alert.alert(
          'Error',
          'Ha ocurrido un error inesperado :( \n' + error.toString(),
          [{ text: 'OK' }],
          { cancelable: false }
        );
      })
  }

  renderItems() {
    return this.state.routines.map(
      item => <ListItem key={item.id} title={item.description}/>
    )
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '#FFF'}}>
        {this.renderItems()}
      </ScrollView>
    );
  }
};

export default RoutinesListScreen;