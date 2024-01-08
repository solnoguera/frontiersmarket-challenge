import { useEffect, useState } from 'react'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  getAuth,
  onAuthStateChanged,
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Database, get, getDatabase, onValue, ref, set } from 'firebase/database'
import { User } from '../models'
import { firebaseConfig, transformEmailIntoUsername } from '../utils/constants'

const useFirebase = () => {
  const [app, setApp] = useState<FirebaseApp>()
  const [auth, setAuth] = useState<Auth | undefined>()
  const [userData, setUserData] = useState<User>({ username: "", avatar: "" });
  const [fetchUser, setFetchUser] = useState<boolean>(false);
  const navigate = useNavigate()
  console.log({userData})
  useEffect(() => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig)
    setApp(app)
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app)
    setAuth(auth)
    auth.useDeviceLanguage()

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // User is signed out
        localStorage.setItem('username', '')
        localStorage.setItem('uid', '')
      }
    })

    
  }, [])

  // useEffect(()=>{
  //   const username = localStorage.getItem("username");
  //   if(username){
  //     findUser(username).then((user)=>{
  //       setUserData(user);
  //     })
  //   }
  // }, [fetchUser])

  const loginWithGoogle = () => {
    if (app) {
      const provider = new GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
      const auth = getAuth(app)
      auth.useDeviceLanguage()
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential?.accessToken
          // The signed-in user info.
          const user = result.user
          console.log(user)
          const userName: string = transformEmailIntoUsername(user?.email ?? user.uid);
          console.log({userName})
          onLogin(userName, user?.photoURL ?? undefined);
          toast.success(`Welcome ${user?.displayName ?? user?.email}!`)
          localStorage.setItem('username', userName )
          localStorage.setItem('uid', user.uid ?? '')
          navigate('/')
          // setFetchUser(!fetchUser);
        })
        .catch((error) => {
          toast.error(`${error?.code}: ${error?.message}`)
        })
    }
  }

  const findUser = async (username: string) => {
    const database = getDatabase();

    const mySnapshot = await get(ref(database, `users/${username}`));

    return mySnapshot.val();
  };

  const getUser = async () : Promise<User | undefined> => {
    const username = localStorage.getItem("username");
    console.log(username)
    if(username){
      const user = await findUser(username);
      return user;
    }else{
      return undefined
    }
  }
  // const getUser = () => {
  //   if (auth && db) {
  //     const userId = auth.currentUser?.uid
  //     return onValue(
  //       ref(db, '/users/' + userId),
  //       (snapshot) => {
  //         const username =
  //           (snapshot.val() && snapshot.val().username) || 'Anonymous'
  //         // ...
  //       },
  //       {
  //         onlyOnce: true,
  //       },
  //     )
  //   }
  // }

  const listenFriendsChange = (callback : (snapshot:any)=>void) => {
      const database = getDatabase()
      const username = localStorage.getItem("username")
      const myUserRef = ref(database, `users/${username}`);
      onValue(myUserRef, callback);
  }

  const onLogin = async (username: string, avatar?: string) => {
    try {
      const database = getDatabase();
      //first check if the user registered before
      const user = await findUser(username);

      //create a new user if not registered
      if (user) {
        setUserData(user);
      } else {
        const newUserObj = {
          username,
          avatar: `${avatar ? avatar : "https://i.pravatar.cc/150?u=" + Date.now()}`,
        };

        set(ref(database, `users/${username}`), newUserObj);
        setUserData(newUserObj);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onRegister = async (username: string) => {
    try {
      const database = getDatabase();
      //first check if the user registered before
      const user = await findUser(username);

      //create a new user if not registered
      if (user) {
        setUserData(user);
        return false;
      } else {
        const newUserObj = {
          username,
          avatar: 'https://i.pravatar.cc/150?u=' + Date.now(),
        };

        set(ref(database, `users/${username}`), newUserObj);
        setUserData(newUserObj);
      }
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    app,
    auth,
    user: auth?.currentUser,
    loginWithGoogle,
    onRegister,
    onLogin,
    userData,
    listenFriendsChange,
    getUser
  }
}

export default useFirebase
