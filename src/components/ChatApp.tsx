import React, { useState } from 'react'
import ChatIcon from './ChatIcon'
import MyChat from './Chat'
import ChatList from './ChatList'
import useRealTimeDB from '../hooks/useRealTimeDB'
import useFirebase from '../hooks/useFirebase'
import { User } from '../models'

const ChatApp = () => {
  const [currentView, setCurrentView] = useState<string>("")
  const [selectedUserChat, setSelectedUserChat] = useState<User>();
  const [userToAdd, setUserToAdd] = useState<string>("");
  const { onAddFriend } = useRealTimeDB();
  const { userData } = useFirebase();

  const onClickUser = (user: User) => {
    setCurrentView('chat');
    setSelectedUserChat(user);
  };

  const onBack = () => {
    setCurrentView('friends');
  };
  const handleonAddFriend = (friend: string) => {
    setUserToAdd("");
    onAddFriend(friend);
  }

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end z-40">
      {currentView && (
        <div className="w-80 mb-4 h-96 bg-white shadow-2xl rounded-xl border-none">
          {
            currentView === "friends" &&
            <ChatList 
              onClickUser={onClickUser}
              userToAdd={userToAdd}
              setUserToAdd={setUserToAdd}
              onAddFriend={handleonAddFriend}
            />
          }
          {
            currentView === "chat" && selectedUserChat &&
            <MyChat 
              userData={userData} 
              selectedUser={selectedUserChat} 
              onBack={onBack} 
            />
          }
        </div>
      )}

      {/* Chat Widget */}
      <div
        className="bg-white p-4 rounded-full shadow-2xl w-20 z-50"
        onClick={() => {
          if(currentView === "friends"){
            setCurrentView("")
          }else{
            setCurrentView("friends")
          }
        }}
      >
        <ChatIcon />
      </div>
    </div>
  );
}

export default ChatApp
