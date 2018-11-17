import { AsyncStorage } from 'react-native';
import { BASE_API_URL } from '../constants';

export const getRoutines = async () => {
  try {
    // Aveda, que dijo? alv es un hook :o pos no :'v
    const [ userId, userToken ] = await useCredentials();
    
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


export const getRoutine = async routineId => {
  // params filter
  const urlParams = 'filter[include][exerciseRoutineDetails]=exercise'
  const url = `${BASE_API_URL}/Routines/${routineId}?${urlParams}`

  try {
    const [ , userToken ] = await useCredentials();

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': userToken
      },
    })
    .then(response => response.json())
    .catch(err => { throw err; })
  } catch ( err ) {
    throw err;
  }
}

// Dejame ser :'v
const useCredentials = async () => [
  userId = await AsyncStorage.getItem('@app:userId'),
  userToken = await AsyncStorage.getItem('@app:userToken')
]

