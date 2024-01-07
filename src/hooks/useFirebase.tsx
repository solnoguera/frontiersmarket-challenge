import { useEffect, useState } from 'react'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  Auth,
} from 'firebase/auth'

const useFirebase = () => {
  const [app, setApp] = useState<FirebaseApp>()
  const [auth, setAuth] = useState<Auth | undefined>()
  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyDkZVTFbvbFYV-CBjdLNlv6JoKqBYiHS8o',
      authDomain: 'frontiersmarket-challenge.firebaseapp.com',
      projectId: 'frontiersmarket-challenge',
      storageBucket: 'frontiersmarket-challenge.appspot.com',
      messagingSenderId: '884925322336',
      appId: '1:884925322336:web:2673c4f678ed8c8efc5f05',
      measurementId: 'G-3W68RJ07PP',
    }

    // Initialize Firebase
    const app = initializeApp(firebaseConfig)
    console.log('app', app)
    setApp(app)
    const analytics = getAnalytics(app)
    console.log('analytics', analytics)
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app)
    setAuth(auth)
    auth.useDeviceLanguage()
    console.log('auth', auth)

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid
        alert(`New user signed in ${uid}`)
        console.log(user)
        // ...
      } else {
        // User is signed out
      }
    })
  }, [])

  // return { formData, handleChange, resetForm };
  /**
     * .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
     */
  //currentUser.providerData
  return {
    app,
    user: auth?.currentUser,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  }
}

export default useFirebase
