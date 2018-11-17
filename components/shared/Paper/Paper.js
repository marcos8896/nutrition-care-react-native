import React from 'react';
import { View, Text } from 'react-native';

const Paper = ({ text }) => {
  return (
    <View style={{
      backgroundColor: '#FFF',
      borderBottomColor: '#DCDCDC',
      borderLeftColor: '#DCDCDC',
      borderBottomWidth: 1.5,
      borderLeftWidth: 1.5,
      marginHorizontal: 8,
      alignItems: 'center',
      marginVertical: 8,
      borderRadius: 5,
      padding: 10,
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: '600'
      }}>
        {text}
      </Text>
    </View>
  )
}

export default Paper;