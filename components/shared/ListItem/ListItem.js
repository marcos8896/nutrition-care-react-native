import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  listItem: {
    fontSize: 20,
    backgroundColor: '#FFF',
    borderColor: '#E8E8E8',
    borderWidth: 0.3,
    paddingVertical: 12,
    paddingHorizontal: 10
  },
});

const ListItem = ({ routineId, title, onPress }) => {
  const handlePress = () => onPress( routineId )
  return (
    <TouchableOpacity style={{backgroundColor: '#DCDCDC'}} onPress={handlePress}>
      <Text style={styles.listItem}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default ListItem;