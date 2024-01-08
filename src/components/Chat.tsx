import Chat, { Bubble, MessageProps, useMessages } from '@chatui/core'
import '@chatui/core/dist/index.css'
import { get, getDatabase, off, onValue, ref, update } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import ArrowIcon from '../icon/ArrowIcon';
import { Chatroom, Messages, User } from '../models';

interface Props {
  onBack: React.MouseEventHandler<HTMLDivElement>;
  userData: User;
  selectedUser: User;
}

const MyChat = ({ onBack, userData, selectedUser } : Props) => {
  const { messages: messagesChatui, appendMsg, setTyping } = useMessages([]);
  console.log("mychat userData", userData)
  console.log("selectedUser userData", selectedUser)
  const [messages, setMessages] = useState([]);

  const fetchMessages = useCallback(async () : Promise<Chatroom> => {
    const database = getDatabase();

    const snapshot = await get(
      ref(database, `chatrooms/${selectedUser.chatroomId}`),
    );

    return snapshot.val();
  }, [selectedUser.chatroomId]);

  const onSend = useCallback(
    async (msg : string) => {
      //send the msg[0] to the other user
      const database = getDatabase();

      //fetch fresh messages from server
      const currentChatroom = await fetchMessages();
      console.log("currentChatroom", currentChatroom);
      const lastMessages = currentChatroom.messages || [];

      update(ref(database, `chatrooms/${selectedUser.chatroomId}`), {
        messages: [
          ...lastMessages,
          {
            text: msg,
            sender: userData.username,
            createdAt: new Date(),
          },
        ],
      });

    },
    [fetchMessages, userData.username, selectedUser.chatroomId],
  );

  const renderMessages = useCallback(
    (msgs: Messages[]) => {
        if (!msgs) return;
        const messagesOrdered = msgs.reverse();
        messagesOrdered.forEach(msg=>{
          const userSentIt =  msg.sender === userData.username;
          const friendSentIt =  !userSentIt;
          if(userSentIt){
            appendMsg({
              type: 'text',
              content: { text: msg.text },
              position: 'right',
            })
          }
          if(friendSentIt){
            appendMsg({
              type: 'text',
              content: { text: msg.text },
            })
          }
        });
    },
    [
      userData.avatar,
      userData.username,
      selectedUser.avatar,
      selectedUser.username,
    ],
  );

  useEffect(() => {
    //load old messages
    const loadData = async () => {
      const myChatroom = await fetchMessages();
      
      // setMessages(
        renderMessages(myChatroom.messages)
        // );
    };

    loadData();

    // set chatroom change listener
    const database = getDatabase();
    const chatroomRef = ref(database, `chatrooms/${selectedUser.chatroomId}`);
    onValue(chatroomRef, snapshot => {
      const data = snapshot.val();
      // setMessages(
      renderMessages(data.messages)
        // );
    });

    return () => {
      //remove chatroom listener
      off(chatroomRef);
    };
  }, [fetchMessages, renderMessages, selectedUser.chatroomId]);



  const handleSend = (type: string, val: string) => {
    if (type === 'text' && val.trim()) {
      // appendMsg({
      //   type: 'text',
      //   content: { text: val },
      //   position: 'right',
      // })

      setTyping(true)

    //   setTimeout(() => {
    //     appendMsg({
    //       type: 'text',
    //       content: { text: 'Bala bala' },
    //     })
    //   }, 1000)
      onSend(val);
    }
  }

  const renderMessageContent = (msg: MessageProps) => {
    const { content } = msg
    return <Bubble content={content.text} />
  }

  return (
    <div className='max-h-96'>
      <div onClick={onBack}>
        <ArrowIcon />
      </div>
      <Chat
        navbar={{ title: 'Assistant', logo: 'assets/logo.svg' }}
        //messages
        messages={messagesChatui}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
        placeholder="Send Message"
        locale="us"
        />
    </div>
  )
}

export default MyChat
