import { useEffect, useState } from 'react'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  getAuth,
  onAuthStateChanged,
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider 
} from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const useFirebase = () => {
  const [app, setApp] = useState<FirebaseApp>()
  const [auth, setAuth] = useState<Auth | undefined>()
  const navigate = useNavigate();

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
    setApp(app)
    const analytics = getAnalytics(app)
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app)
    setAuth(auth)
    auth.useDeviceLanguage()

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
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      const auth = getAuth(app);
      auth.useDeviceLanguage();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          console.log('loginWithGoogle');
          console.log('credential', credential);
          const token = credential?.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          console.log('user', user);
          toast.success(`Welcome ${user?.displayName ?? user?.email}!`);
          localStorage.setItem("name", user?.displayName ?? "");
          navigate("/");
        })
        .catch((error) => {
          toast.error(`${error?.code}: ${error?.message}`)
        })
      }
  }

  const loginWithFacebook = () => {
    if(app){
      const provider = new FacebookAuthProvider();
      const auth = getAuth(app);
      auth.useDeviceLanguage();
      signInWithPopup(auth, provider)
        .then((result) => {
          // Google Access Token to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result)
          console.log('loginWithFacebook')
          console.log('credential', credential)
          const token = credential?.accessToken
          // The signed-in user info.
          const user = result.user
          console.log('user', user)
          toast.success(`Welcome ${user?.displayName ?? user?.email}!`);
          localStorage.setItem("name", user?.displayName ?? "");
          navigate("/");
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
    loginWithGoogle,
    loginWithFacebook
  }
}

export default useFirebase
