import React from 'react';
import styles from '../../../globalStyles';

import { StatusBar, View, Text } from 'react-native';
import { getRoutine } from '../../../api/routines';

class RoutineScreen extends React.Component {
  static navigationOptions = {
    title: 'Rutina',
  };
  state = {
    routine: {}
  }
  componentDidMount() {
    const { navigation } = this.props
    const routineId = navigation.getParam('routineId')
    getRoutine( routineId )
      .then(routine => this.setState({ routine }))
      .catch(err => console.log('Agh', err))
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <Text>{JSON.stringify(this.state.routine)}</Text>
      </View>
    );
  }
};

export default RoutineScreen;