export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  authDomain: 'frontiersmarket-challenge.firebaseapp.com',
  projectId: 'frontiersmarket-challenge',
  storageBucket: 'frontiersmarket-challenge.appspot.com',
  messagingSenderId: '884925322336',
  appId: '1:884925322336:web:2673c4f678ed8c8efc5f05',
  measurementId: 'G-3W68RJ07PP',
}

export const regexEmail =
  /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/

export const regexPassword = /^(?=.*[0-9!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/

export const transformEmailIntoUsername = (email: string): string => {
  let username = email.replaceAll('.', '<1>;')
  username = username.replaceAll('#', '<2>;')
  username = username.replaceAll('$', '<3>;')
  username = username.replaceAll('[', '<4>;')
  username = username.replaceAll(']', '<5>;')
  username = username.replaceAll('@', '<6>;')
  return username
}

export const transformUsernameIntoEmail = (username: string): string => {
  let email = username.replaceAll('<1>;', '.')
  email = email.replaceAll('<2>;', '#')
  email = email.replaceAll('<3>;', '$')
  email = email.replaceAll('<4>;', '[')
  email = email.replaceAll('<5>;', ']')
  email = email.replaceAll('<6>;', '@')
  return email
}
