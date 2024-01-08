import React, { useState } from 'react'
import ChatIcon from '../icon/ChatIcon'
import MyChat from './Chat'
import ChatList from './ChatList'
import { User } from '../models'
import useFirebase from '../hooks/useFirebase'

const ChatApp = () => {
  const [currentView, setCurrentView] = useState<string>('')
  const [selectedUserChat, setSelectedUserChat] = useState<User>()
  const [userToAdd, setUserToAdd] = useState<string>('')
  const { onAddFriend } = useFirebase()

  const onClickUser = (user: User) => {
    setCurrentView('chat')
    setSelectedUserChat(user)
  }

  const onBack = () => {
    setCurrentView('friends')
  }
  const handleonAddFriend = (friend: string) => {
    setUserToAdd('')
    onAddFriend(friend)
  }

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end z-40">
      {currentView && (
        <div className="w-80 mb-4 h-96 bg-white shadow-2xl rounded-xl border-none relative">
          {currentView === 'friends' && (
            <ChatList
              onClickUser={onClickUser}
              userToAdd={userToAdd}
              setUserToAdd={setUserToAdd}
              onAddFriend={handleonAddFriend}
            />
          )}
          {currentView === 'chat' && selectedUserChat && (
            <MyChat
              selectedUser={selectedUserChat}
              onBack={onBack}
            />
          )}
        </div>
      )}

      {/* Chat Widget */}
      <div
        className="bg-white p-4 rounded-full shadow-2xl w-20 z-50 hover:cursor-pointer"
        onClick={() => {
          if (currentView !== "") {
            setCurrentView('')
          } else {
            setCurrentView('friends')
          }
        }}
      >
        <ChatIcon />
      </div>
    </div>
  )
}

export default ChatApp
