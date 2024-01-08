import React from 'react'

interface Props {
  userSentIt: boolean
  text: string
}

const ChatMessage = ({ userSentIt, text }: Props) => {
  return (
    <p
      className={`break-words shadow-xl max-w-72 bg-blue-200 my-1 p-2 rounded-2xl mx-2 w-fit ${
        userSentIt ? 'self-end' : 'left-0'
      }`}
    >
      {text}
    </p>
  )
}

export default ChatMessage
