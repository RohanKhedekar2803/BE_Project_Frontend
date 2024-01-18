import React, { useState, useEffect } from 'react';
import { stompClient, isStompConnected } from '../Constants/StompClient';
import ChatWindow from './ChatWindow';

const Chat = () => {
  const [username, setUsername] = useState('rohan');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friendsList, setFriendsList] = useState([]);
  const [connectedToStomp, setConnectedToStomp] = useState(false);
  const [newMessages, setNewMessages] = useState([{"id":9,"chatId":null,"senderId":"jk","receiverId":"ALL","content":"user jk have joined the chat","timeStamp":1705600492696}

]);

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  const handleBack = () => {
    setSelectedFriend(null);
  };

  const addNewMessage = (message) => {
    setNewMessages((prevMessages) => [...prevMessages, message]);
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
        stompClient.subscribe(`/user/${username}/queue/messages`, (message) => {
          console.log(`Message received from /user/${username}/queue/messages:`, message);
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
  }, [username, stompClient, isStompConnected]);

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
          <ChatWindow selectedFriend={selectedFriend} messages={newMessages} handleBack={handleBack} />
        )}
      </div>
    </div>
  );
};

export default Chat;
