import { useEffect, useState } from 'react'
import { FirebaseApp, initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {
  get,
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from 'firebase/database'
import { User } from '../models'
import { firebaseConfig, transformEmailIntoUsername } from '../utils/constants'

const useFirebase = () => {
  const [app, setApp] = useState<FirebaseApp>()
  const [auth, setAuth] = useState<Auth | undefined>()
  const navigate = useNavigate()

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

  const loginWithGoogle = () => {
    if (app) {
      const provider = new GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
      const auth = getAuth(app)
      auth.useDeviceLanguage()
      signInWithPopup(auth, provider)
        .then((result) => {
          // The signed-in user info.
          const user = result.user
          const userName: string = transformEmailIntoUsername(
            user?.email ?? user.uid,
          )
          addUserOnDDBB(userName, user?.photoURL ?? undefined)
          toast.success(`Welcome ${user?.displayName ?? user?.email}!`)
          localStorage.setItem('username', userName)
          localStorage.setItem('uid', user.uid ?? '')
          navigate('/')
        })
        .catch((error) => {
          toast.error(`${error?.code}: ${error?.message}`)
        })
    }
  }

  const findUser = async (username: string) => {
    const database = getDatabase()
    const mySnapshot = await get(ref(database, `users/${username}`))
    return mySnapshot.val()
  }

  const getUser = async (): Promise<User | undefined> => {
    const username = localStorage.getItem('username')
    if (username) {
      const user = await findUser(username)
      return user
    } else {
      return undefined
    }
  }

  const listenFriendsChange = (callback: (snapshot: any) => void) => {
    const database = getDatabase()
    const username = localStorage.getItem('username')
    const myUserRef = ref(database, `users/${username}`)
    onValue(myUserRef, callback)
  }

  const addUserOnDDBB = async (username: string, avatar?: string) => {
    try {
      const database = getDatabase()
      //first check if the user registered before
      const user = await findUser(username)
      //create a new user if not registered
      if (!user) {
        const newUserObj = {
          username,
          avatar: `${
            avatar ? avatar : 'https://i.pravatar.cc/150?u=' + Date.now()
          }`,
        }
        set(ref(database, `users/${username}`), newUserObj)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onAddFriend = async (email: string) => {
    try {
      // Find user and add it to my friends and also add me to his friends
      const database = getDatabase()
      const userData = await getUser()
      const user = await findUser(transformEmailIntoUsername(email))
      if (!userData) return toast.error('Please log in.')
      if (!user) return toast.error('No user found!')
      if (user.username === userData?.username) {
        return toast.error('You cant add yourself!')
      }

      if (
        userData?.friends &&
        userData?.friends.findIndex((f: User) => f.username === user.username) >
          0
      ) {
        return toast.error('Friend already added!')
      }

      // Create a chatroom and store the chatroom id
      const newChatroomRef = push(ref(database, 'chatrooms'), {
        firstUser: userData?.username,
        secondUser: user.username,
        messages: [],
      })

      const newChatroomId = newChatroomRef.key

      const userFriends = user.friends || []
      // Join myself to this user friend list
      update(ref(database, `users/${user.username}`), {
        friends: [
          ...userFriends,
          {
            username: userData?.username,
            avatar: userData?.avatar,
            chatroomId: newChatroomId,
          },
        ],
      })

      const myFriends = userData?.friends || []
      // Add this user to my friend list
      update(ref(database, `users/${userData?.username}`), {
        friends: [
          ...myFriends,
          {
            username: user.username,
            avatar: user.avatar,
            chatroomId: newChatroomId,
          },
        ],
      })
    } catch (error) {
      console.error(error)
    }
  }

  return {
    auth,
    getUser,
    addUserOnDDBB,
    loginWithGoogle,
    onAddFriend,
    listenFriendsChange,
  }
}

export default useFirebase
