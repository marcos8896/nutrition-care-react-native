import React from 'react';
import styles from '../../../globalStyles';

import { ScrollView, Text } from 'react-native';
import { getRoutine } from '../../../api/routines';
import RoutineDayResume from './components/RoutineDayResume';

class RoutineScreen extends React.Component {
  static navigationOptions = {
    title: 'Rutina',
  };
  state = {
    description: '',
    routine: {}
  }
  componentDidMount() {
    const { navigation } = this.props
    const routineId = navigation.getParam('routineId')
    getRoutine( routineId )
      .then(data => this.setState({
        description: data.description,
        routine: this.mapRoutine( data.exerciseRoutineDetails )
      }))
      .catch(err => { throw err; })
  }
  
  mapRoutine = exerciseRoutineDetails => {
    return exerciseRoutineDetails.reduce( ( routine, item ) => {
      const prevExercises = routine[item.day] || {}; // To avoid spread over undefined
      return {
        ...routine,
        [item.day]: [
          ...prevExercises,
          item
        ]
      };
    }, {});
  }

  render() {
    const { routine } = this.state;
    return (
      <ScrollView>
        {
          Object.keys(routine).map((key, index) => {
            return (
              <RoutineDayResume
                key={index}
                name={key}
                exercises={routine[key]}
              />
            );
          })
        }
      </ScrollView>
    );
  }
};

export default RoutineScreen;