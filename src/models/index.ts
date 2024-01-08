export interface User {
  username: string
  avatar: string
  chatroomId?: number | undefined
  friends?: [] | undefined
}

export interface Messages {
  text: string
  sender: string
  createdAt: Date
}

export interface Chatroom {
  messages: Messages[]
  firstUser: string
  secondUser: string
}
