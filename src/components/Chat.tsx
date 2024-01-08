import { get, getDatabase, off, onValue, ref, update } from 'firebase/database'
import { useCallback, useEffect, useState } from 'react'
import { Chatroom, Messages, User } from '../models'
import { transformUsernameIntoEmail } from '../utils/constants'
import ChatMessage from './ChatMessage'
import BackIcon from '../icon/BackIcon'

interface Props {
  onBack: React.MouseEventHandler<HTMLDivElement>
  selectedUser: User
}

const MyChat = ({ onBack, selectedUser }: Props) => {
  const [message, setMessage] = useState<string>()
  const [allMessages, setAllMessages] = useState<Messages[] | undefined>()

  useEffect(() => {
    //load old messages
    const loadData = async () => {
      const myChatroom = await fetchMessages()
      setAllMessages(myChatroom?.messages)
    }
    loadData()

    // set messages change listener
    const database = getDatabase()
    const chatroomRef = ref(database, `chatrooms/${selectedUser.chatroomId}`)
    onValue(chatroomRef, (snapshot) => {
      const data = snapshot.val()
      setAllMessages(data?.messages)
    })

    return () => {
      //remove chatroom listener
      off(chatroomRef)
    }
  }, [selectedUser])


  const fetchMessages = useCallback(async (): Promise<Chatroom> => {
    const database = getDatabase()
    const snapshot = await get(
      ref(database, `chatrooms/${selectedUser.chatroomId}`),
    )
    return snapshot.val()
  }, [selectedUser])

  const onSend = useCallback(
    async (message: string | undefined) => {
      if(!message?.trim()) return;
      const database = getDatabase()

      //fetch fresh messages from server
      const currentChatroom = await fetchMessages()
      const lastMessages = currentChatroom.messages || []
      update(ref(database, `chatrooms/${selectedUser.chatroomId}`), {
        messages: [
          ...lastMessages,
          {
            text: message?.trim(),
            sender: localStorage.getItem("username"),
            createdAt: new Date(),
          },
        ],
      })
    },
    [selectedUser],
  )

  const handleSend = (message: string | undefined) => {
    onSend(message);
    setMessage("");
  }

  return (
    <div className="max-h-96 rounded-lg">
      <div className="h-12 flex items-center font-bold pl-2 gap-2 bg-gray-100 rounded-t-lg">
        <div onClick={onBack}>
          <BackIcon />
        </div>
        <p className="text-md m-0 ">
          {transformUsernameIntoEmail(selectedUser.username)}
        </p>
      </div>
      <div className='container mx-auto bg-white rounded-lg shadow-md overflow-y-scroll max-h-80 min-h-80'>
        <div className='flex flex-col'>
          {allMessages &&
            allMessages?.map(msg => 
            <ChatMessage text={msg.text} userSentIt={msg.sender === localStorage.getItem('username')} />
            )}
            <div className='h-12'/>
          </div>
      </div>
              
      <div className="bottom-0 absolute w-full">
        <form onSubmit={()=>handleSend(message)}>
          <input
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="bg-gray-200 p-2 w-10/12 rounded-bl-lg focus:outline-none"
            placeholder="Send message"
          />
          <button
            onClick={()=>handleSend(message)}
            className="w-10 bg-blueFM h-10 w-2/12 text-white disabled:bg-gray-400 rounded-br-lg"
            disabled={!message || message === ""}
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default MyChat
