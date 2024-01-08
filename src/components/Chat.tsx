import { get, getDatabase, off, onValue, ref, update } from 'firebase/database'
import { useCallback, useEffect, useState } from 'react'
import ArrowIcon from '../icon/ArrowIcon'
import { Chatroom, Messages, User } from '../models'
import { transformUsernameIntoEmail } from '../utils/constants'

interface Props {
  onBack: React.MouseEventHandler<HTMLDivElement>
  userData: User
  selectedUser: User
}

const MyChat = ({ onBack, userData, selectedUser }: Props) => {
  console.log('mychat userData', userData)
  console.log('selectedUser userData', selectedUser)
  const [message, setMessage] = useState<string>()
  const [allMessages, setAllMessages] = useState<Messages[] | undefined>()

  const fetchMessages = useCallback(async (): Promise<Chatroom> => {
    const database = getDatabase()

    const snapshot = await get(
      ref(database, `chatrooms/${selectedUser.chatroomId}`),
    )

    return snapshot.val()
  }, [selectedUser])

  const onSend = useCallback(
    async (msg: string) => {
      //send the msg[0] to the other user
      const database = getDatabase()

      //fetch fresh messages from server
      const currentChatroom = await fetchMessages()
      console.log('currentChatroom', currentChatroom)
      const lastMessages = currentChatroom.messages || []

      update(ref(database, `chatrooms/${selectedUser.chatroomId}`), {
        messages: [
          ...lastMessages,
          {
            text: msg,
            sender: userData.username,
            createdAt: new Date(),
          },
        ],
      })
    },
    [selectedUser],
  )


  useEffect(() => {
    //load old messages
    const loadData = async () => {
      const myChatroom = await fetchMessages()
      console.log('myChatroom', myChatroom)
      setAllMessages(myChatroom?.messages)
    }

    loadData()

    // set chatroom change listener
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

  const handleSend = () => {
    // appendMsg({
    //   type: 'text',
    //   content: { text: val },
    //   position: 'right',
    // })
    //   setTimeout(() => {
    //     appendMsg({
    //       type: 'text',
    //       content: { text: 'Bala bala' },
    //     })
    //   }, 1000)
  }

  console.log('allMessages', allMessages)
  return (
    <div className="max-h-96">
      <div className="h-12 flex items-center font-bold pl-2 gap-2">
        <div onClick={onBack}>
          <ArrowIcon />
        </div>
        <p className="text-xl m-0">
          {transformUsernameIntoEmail(selectedUser.username)}
        </p>
      </div>
      {allMessages &&
        allMessages?.map((msg, index) => {
          const userSentIt = msg.sender === localStorage.getItem('username')
          console.log(msg)
          return (
            <p
              className={`scroll absolute bg-blue-200 p-2 rounded-2xl mx-2 ${
                userSentIt ? 'right-0' : 'left-0'
              } ${index !== 0 ? 'mt-10' : 'mt-2'}`}
            >
              {msg.text}
            </p>
          )
        })}
      <div className="bottom-0 absolute w-full">
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="bg-gray-200 p-2 w-10/12"
          placeholder="Send message"
        />
        <button
          onClick={handleSend}
          className="w-10 bg-blueFM h-10 w-2/12 text-white"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default MyChat
