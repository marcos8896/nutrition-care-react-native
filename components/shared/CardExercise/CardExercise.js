import React from 'react';
import { Button, View, Image, Text } from 'react-native'
const CardExercise = ({ image, header, body, series, reps }) => {
  return (
    <View style={{
      backgroundColor: '#FFF',
      borderBottomColor: '#DCDCDC',
      borderLeftColor: '#DCDCDC',
      borderBottomWidth: 1.5,
      borderLeftWidth: 1.5,
      marginHorizontal: 8,
      marginVertical: 8,
      borderRadius: 10,
    }}>
      <Image
        style={{
          height: 200,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10
        }}
        source={{uri: image}}
      />
      <View>
        <View style={{
          padding: 5,
          paddingBottom: 15
        }}>
          <View style={{marginBottom: 5}}>
            <Text style={{
              fontSize: 16,
              fontWeight: '600'
            }}>
              {header}
            </Text>
            <Text>
              {body}
            </Text>
            <Text>
                Series: {series}
            </Text>
            <Text>
              Repeticiones: {reps}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CardExercise;