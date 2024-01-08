import React, { useEffect, useState } from 'react'
import { User } from '../models'
import { transformUsernameIntoEmail } from '../utils/constants'
import useFirebase from '../hooks/useFirebase'
import { toast } from 'react-toastify'

interface Props {
  onClickUser: (user: User) => void
  userToAdd: string
  setUserToAdd: React.Dispatch<React.SetStateAction<string>>
  onAddFriend: (friend: string) => void
}

const ChatList = ({
  onClickUser,
  userToAdd,
  setUserToAdd,
  onAddFriend,
}: Props) => {
  const { listenFriendsChange } = useFirebase()
  const [friends, setFriends] = useState<User[]>([])

  useEffect(() => {
    listenFriendsChange((snapshot) => {
      console.log('listenFriendsChange')
      const data = snapshot.val()
      console.log(data)
      setFriends(data?.friends ?? [])
    })
  }, [])

  return (
    <div className="">
      <div className="h-12 flex items-center font-bold pl-6">
        <p className="text-xl m-0">Your Chats</p>
      </div>
      <div>
        <form onSubmit={(e) => {
            e.preventDefault();
            onAddFriend(userToAdd);
          }}>
          <input
            type="text"
            onChange={(e) => setUserToAdd(e.target.value)}
            value={userToAdd}
            className="bg-gray-200 p-2 w-10/12"
            placeholder="Type user email"
          />
          <button
            type='submit'
            onClick={() => onAddFriend(userToAdd)}
            className="w-10 bg-blueFM h-10 w-2/12 text-white"
          >
            Add
          </button>
        </form>
      </div>
      {friends.map((friend) => (
        <div
          className="h-12 border border-gray-100 flex items-center pl-6"
          onClick={() => onClickUser(friend)}
        >
          <p className="text-base m-0">
            {transformUsernameIntoEmail(friend?.username)}
          </p>
        </div>
      ))}
    </div>
  )
}

export default ChatList
