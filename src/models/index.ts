export interface User {
    username: string;
    avatar: string;
    chatroomId?: number | undefined;
    friends?: [] | undefined;
}

export interface Messages {
    sender: string;
    _id: string;
    user: {
      avatar: string;
      name: string;
      _id: string
    },
    text: string;
}

export interface Chatroom {
   messages: Messages[];
}