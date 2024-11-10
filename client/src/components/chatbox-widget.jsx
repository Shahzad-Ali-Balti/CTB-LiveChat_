// Agent side (AgentChatBox.jsx)
import React, {useEffect, useState} from "react"
import ReactDOM from 'react-dom';
import socket from "../services/socket.js" // Make sure socket is correctly imported
import {widget} from "react-chat-widget"

const ChatBoxWidget = () => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const chatId = "672b67eb90e9888b6c677b54" // Use actual chat ID
  const userId = "672a843279fda2dec2e25d2e"
  const agentId = "672bc17eb241c6f80e59e48b"
  const senderId = "672a843279fda2dec2e25d2e"

  const token = localStorage.getItem('authToken');

  // Join the chat room when the component mounts
  useEffect(() => {
    socket.emit("joinChat", chatId) // Emit join event for the specific chat

    socket.on("receiveMessage", message => {
      console.log("Received message:", message)
      setMessages(prevMessages => [...prevMessages, message])
    })

    return () => {
      socket.off("receiveMessage") // Clean up on unmount
    }
  }, [chatId])

  // Emit the message to the backend
  const sendMessage = () => {
    if (inputMessage.trim()) {
      const messageData = {
        chatId: chatId,
        agentId: agentId, // Replace with actual agent ID
        userId : userId,
        senderId: senderId,
        content: inputMessage,
        status: "sent",
      }

      socket.emit("sendMessage", messageData) // Send message to server
      setMessages(prevMessages => [...prevMessages, messageData])
      setInputMessage("")
    }
  }

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map(msg => {
          // Ensure you're accessing the correct timestamp field (e.g., `msg.timestamp` or `msg.createdAt`)
          const messageTime = new Date(msg.timestamp || msg.createdAt)

          // Validate that the message time is a valid Date
          const timeString =
            messageTime instanceof Date && !isNaN(messageTime)
              ? messageTime.toLocaleTimeString() // Format the time in a readable format
              : "Invalid Time" // Handle invalid date (if any)

          return (
            <div key={msg._id || msg.timestamp} className="message">
              <p>{msg.content}</p>
              <small>{timeString}</small>
            </div>
          )
        })}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={e => setInputMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={sendMessage}>Send</button>
      <div>Welcome to CTB</div>
    </div>
  )
}

export default ChatBoxWidget

function init() {
    const widgetId = window.ChatBoxWidget?.config?.widgetId || 'default-id';
    ReactDOM.render(
      <ChatBoxWidget widgetId={widgetId} />,
      document.getElementById('chat-widget-container') || document.body.appendChild(document.createElement('div'))
    );
  }
  
  export { init };
