import Chat, { Bubble, MessageProps, useMessages } from '@chatui/core'
import '@chatui/core/dist/index.css'

const MyChat = () => {
  const { messages, appendMsg, setTyping } = useMessages([])

  const handleSend = (type: string, val: string) => {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      })

      setTyping(true)

      setTimeout(() => {
        appendMsg({
          type: 'text',
          content: { text: 'Bala bala' },
        })
      }, 1000)
    }
  }

  const renderMessageContent = (msg: MessageProps) => {
    const { content } = msg
    return <Bubble content={content.text} />
  }

  return (
    <Chat
      navbar={{ title: 'Assistant', logo: 'assets/logo.svg' }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
      placeholder="Send Message"
      locale="us"
    />
  )
}

export default MyChat
