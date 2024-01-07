import { useEffect, useState } from 'react'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  getAuth,
  onAuthStateChanged,
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { toast } from 'react-toastify'

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
        console.log("onAuthStateChanged: ",user)
        // ...
      } else {
        // User is signed out
        localStorage.setItem("name", "");
      }
    })
  }, [])

  const loginWithGoogle = () => {
    if(app){
      const provider = new GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
      const auth = getAuth(app)
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result)
          console.log('loginWithGoogle')
          console.log('credential', credential)
          const token = credential?.accessToken
          // The signed-in user info.
          const user = result.user
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          console.log('user', user)
        })
        .catch((error) => {
          toast.error(`${error?.code}: ${error?.message}`)
        })
      }
  }

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
    auth,
    user: auth?.currentUser,
    loginWithGoogle
  }
}

export default useFirebase
