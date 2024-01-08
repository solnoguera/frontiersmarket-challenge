import React, { useState } from 'react'
import ChatIcon from './ChatIcon';
import MyChat from './Chat';
import ChatList from './ChatList';

const ChatWidget = () => {
    const [showChatList, setShowChatList] = useState<boolean>(false);
    return (
        <div className="fixed bottom-4 right-4 flex flex-col items-end">
            {
                showChatList && 
                <div className='w-80 mb-4 h-96 bg-white shadow-2xl rounded-xl border-none'  >
                    <ChatList chats={[{title: "luca"}, {title: "norma"}]}/>
                    {/* <MyChat /> */}
                </div>
            }
            <div className='bg-white p-4 rounded-full shadow-2xl w-20' onClick={()=>setShowChatList(!showChatList)}>
                <ChatIcon />
            </div>
        </div>
      );
}

export default ChatWidget