import React, { useState, useEffect,useContext } from 'react';
import { stompClient, isStompConnected } from '../Constants/StompClient';
import ChatWindow from './ChatWindow';
import { UsernameContext } from '../Context/UsernameContext';

const Chat = () => {
  const usercontext= useContext(UsernameContext)
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friendsList, setFriendsList] = useState([]);
  const [newMessages, setNewMessages] = useState([
    {
      "id": 9,
      "chatId": null,
      "senderId": "jk",
      "receiverId": "ALL",
      "content": "user jk has joined the chat",
      "timeStamp": 1705600492696
    }
  ]);

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  const handleBack = () => {
    setSelectedFriend(null);
  };

  const addNewMessage = (message) => {
    // Check if the message with the same id already exists
    const messageExists = newMessages.some((existingMessage) => existingMessage.id === message.id);

    if (!messageExists) {
      setNewMessages((prevMessages) => [...prevMessages, message]);
    }
  };


  useEffect(() => {
    const getFriendsList = async () => {
      try {
        const response = await fetch('http://localhost:8080/getActiveUsers');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        const usernames = data.map(item => item.username);
        setFriendsList(usernames);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const setupStompClient = () => {
      if (isStompConnected) {
        
        var user=usercontext.username
        console.log(user)
        stompClient.subscribe(`/users/${user}/queue/messages`, (frame) => {
          console.log(`Message received from ${user}/queue/messages:`, frame);
          
          try {
            const message = JSON.parse(frame.body);
            console.log('Parsed JSON:', message);
            addNewMessage(message);
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
          
        });

        stompClient.subscribe(`/users/topic`, (frame) => {
          console.log('Message received from /user/topic:', frame);
          const message = JSON.parse(frame.body);
          addNewMessage(message);
        });

        stompClient.onreceipt = (frame) => {
          console.log('Message received', frame);
        };

      } else {
        console.log('Waiting for Stomp connection...');
      }
    };

    getFriendsList();
    setupStompClient();
  }, [ stompClient, isStompConnected]);

  // Convert Set to Array for rendering purposes
  const messagesArray = [...newMessages];

  return (
    <div className="bg-gray-100 flex flex-col lg:flex-row">
      <div className={`w-full lg:w-1/4 bg-gray-200 p-4 ${selectedFriend ? 'hidden lg:block' : 'block'}`}>
        <h2 className="text-lg font-semibold mb-4">Friends</h2>
        <ul className="friends-list overflow-auto max-h-96">
          {friendsList.map((friend, index) => (
            <li
              key={index}
              className="friend-item text-blue-500 hover:text-blue-700 py-2 px-3 rounded-md transition duration-300 ease-in-out cursor-pointer"
              onClick={() => handleFriendClick(friend)}
            >
              {friend}
            </li>
          ))}
        </ul>
      </div>

      <div className={`flex-1 p-4 ${selectedFriend ? 'w-full lg:w-3/4' : 'hidden lg:block'}`}>
        {selectedFriend && (
          <ChatWindow selectedFriend={selectedFriend} messages={messagesArray} handleBack={handleBack} />
        )}
      </div>
    </div>
  );
};

export default Chat;
