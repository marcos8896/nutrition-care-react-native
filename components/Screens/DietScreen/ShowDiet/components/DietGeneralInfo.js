import React from 'react';

import { 
  View,
  Text,
  StyleSheet,
} from 'react-native';

const DietGeneralInfo = ({ diet }) => (
  <View style={styles.container}>
    <Text style={styles.description}>
      {diet.description}
    </Text>
    
    <View style={styles.quantities}>
      <View>
        <Text style={styles.textMargin}> Calorías: {diet.totalCarbohydrates}</Text>
        <Text style={styles.textMargin}> Proteínas: {diet.totalProteins}</Text>
      </View>
      <View>
        <Text style={styles.textMargin}> Grasas: {diet.totalFats}</Text>
        <Text style={styles.textMargin}> Calorias: {diet.totalCalories}</Text>
      </View>
    </View>

  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'italic'
  },
  quantities: {
    flexDirection: 'row',
    flexWrap: "wrap"
  },
  textMargin: {
    marginLeft: 5,
    marginRight: 5,
  },
  date: {
    alignSelf: 'center',
  }
});

export default DietGeneralInfo;