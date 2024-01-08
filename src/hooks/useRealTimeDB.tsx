import React, { useEffect, useState } from 'react'
import useFirebase from './useFirebase'
import {
  Database,
  getDatabase,
  ref,
  push,
  update,
  get,
} from 'firebase/database'
import { User } from '../models'
import { toast } from 'react-toastify'
import { transformEmailIntoUsername } from '../utils/constants'

const useRealTimeDB = () => {
  const [db, setDb] = useState<Database | undefined>()
  const { app, getUser } = useFirebase()

  useEffect(() => {
    if (app) {
      // Initialize Realtime Database and get a reference to the service
      const database = getDatabase(app)
      setDb(database)
    }
  }, [app])

  const findUser = async (username: string) => {
    const database = getDatabase()
    const mySnapshot = await get(ref(database, `users/${username}`))
    return mySnapshot.val()
  }

  const onAddFriend = async (email: string) => {
    try {
      //find user and add it to my friends and also add me to his friends
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

      // create a chatroom and store the chatroom id
      const newChatroomRef = push(ref(database, 'chatrooms'), {
        firstUser: userData?.username,
        secondUser: user.username,
        messages: [],
      })

      const newChatroomId = newChatroomRef.key

      const userFriends = user.friends || []
      //join myself to this user friend list
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
      //add this user to my friend list
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

  return { db, onAddFriend }
}

export default useRealTimeDB
