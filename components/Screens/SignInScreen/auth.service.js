import { BASE_API_URL } from '../../../constants'

export function requestToken( email, password ) {
  return fetch(`${BASE_API_URL}/Customers/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password
    }),
  })
  .then(response => response.json())
  .catch(err => { throw err; });
}