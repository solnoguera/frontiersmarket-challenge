import React, { MouseEvent, MouseEventHandler, useEffect, useState } from 'react'
import { User } from '../models'
import { regexEmail, transformUsernameIntoEmail } from '../utils/constants'
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
      const data = snapshot.val()
      setFriends(data?.friends ?? [])
    })
  }, [])

  const handleAddFriend = () => {
    if (!regexEmail.test(userToAdd)) {
      toast.error("Please, enter a valid email.")
    } else {
      onAddFriend(userToAdd)
    }
  }

  return (
    <div className="">
      <div className="h-12 flex items-center font-bold pl-6">
        <p className="text-xl m-0">Your Chats</p>
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onAddFriend(userToAdd)
          }}
        >
          <input
            type="email"
            onChange={(e) => setUserToAdd(e.target.value)}
            value={userToAdd}
            className="bg-gray-200 p-2 w-10/12"
            placeholder="Add friend by email"
          />
          <button
            type="submit"
            onClick={handleAddFriend}
            className="w-10 bg-blueFM h-10 w-2/12 text-white disabled:bg-gray-400"
            disabled={!userToAdd || userToAdd === ''}
          >
            Add
          </button>
        </form>
      </div>
      <div className="overflow-y-scroll max-h-72 min-h-72">
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
    </div>
  )
}

export default ChatList
