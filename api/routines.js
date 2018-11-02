import { AsyncStorage } from 'react-native';
import { BASE_API_URL } from '../constants';

export const getRoutines = async () => {
  try {
    const userId = await AsyncStorage.getItem('@app:userId');
    const userToken = await AsyncStorage.getItem('@app:userToken');
    return fetch(`${BASE_API_URL}/Customers/${userId}/routines`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': userToken
      },
    })
      .then(response => response.json())
      .catch(err => { throw err; });
  } catch( err ) {
    throw err;
  }
}