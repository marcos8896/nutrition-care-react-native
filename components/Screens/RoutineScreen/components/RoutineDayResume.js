import React from 'react';
import { View } from 'react-native';
import { IMAGES_API_URL } from '../../../../constants';
import CardExercise from '../../../shared/CardExercise/CardExercise';
import Paper from '../../../shared/Paper/Paper';

const RoutineDayResume = ({ name, exercises }) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <View>
        <Paper text={name.toUpperCase()} />
      </View>
      {
        exercises.map((exerciseData, index) => {
          const { description, reps, series } = exerciseData;
          const { name, imageName } = exerciseData.exercise;
          return (
            <CardExercise
              key={index}
              image={`${IMAGES_API_URL}/${imageName}`}
              header={name}
              body={description}
              series={series}
              reps={reps}
            />
          )
        })
      }
    </View>
  )
}

export default RoutineDayResume;