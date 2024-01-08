import React from 'react'

interface Chat {
  title: string
}

interface Props {
  chats: Chat[]
}

const ChatList = ({ chats }: Props) => {
  return (
    <div className="">
      <div className="h-12 flex items-center font-bold pl-6 ">
        <p className="text-xl m-0">Your Chats</p>
      </div>
      {chats.map((chat) => (
        <div className="h-12 border border-gray-100 flex items-center pl-6 ">
          <p className="text-base m-0">{chat.title}</p>
        </div>
      ))}
    </div>
  )
}

export default ChatList
