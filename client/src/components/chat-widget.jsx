import {Widget} from "react-chat-widget"
import React from "react"
import ReactDOM from "react-dom"
import 'react-chat-widget/lib/styles.css';
;(function () {
  // const React = window.React;
  // const ReactDOM = window.ReactDOM;
  // const { Widget } = window.ReactChatWidget;  // Assuming 'react-chat-widget' is available in the global window
  console.log("Createing div")

  const widgetContainer = document.createElement("div")
  widgetContainer.id = "chat-widget-container"
  widgetContainer.style.position = "fixed"
  widgetContainer.style.bottom = "20px"
  widgetContainer.style.right = "20px"
  widgetContainer.style.width = "300px"
  widgetContainer.style.height = "400px"
  widgetContainer.style.zIndex = 1000
  console.log("Div created successfully")

  const ChatWidget = () => {
    const handleNewUserMessage = newMessage => {
      console.log("New message incoming:", newMessage)
    }

    return (
      <div>
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          title="Chat with us"
          subtitle="We are here to help"
        />
      </div>
    )
  }

  // window.TestWidget = window.TestWidget || {};
  // window.TestWidget.init = function() {
  //   const widgetContainer = document.createElement('div');
  //   widgetContainer.id = 'chat-widget-container';
  //   widgetContainer.style.position = 'fixed';
  //   widgetContainer.style.bottom = '20px';
  //   widgetContainer.style.right = '20px';
  //   widgetContainer.style.width = '300px';
  //   widgetContainer.style.height = '400px';
  //   widgetContainer.style.zIndex = 1000;

  //   TestWidget = TestWidget || {};
  // TestWidget.init = function() {

  // };
  console.log("appending child to div")
  document.body.appendChild(widgetContainer)
  console.log("rendering...")
  ReactDOM.render(<ChatWidget />, widgetContainer)
})()
