import React, { useState, useEffect } from 'react';
import { stompClient, isStompConnected } from '../Constants/StompClient';

const Chat = () => {
  const [username, setUsername] = useState('rohan');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friendsList, setFriendsList] = useState([]);
  const [connectedToStomp, setConnectedToStomp] = useState(false);

  const messages = {
    'Friend 1': [
      { id: 1, sender: 'Friend 1', text: 'Hello there!', age: 25 },
      { id: 2, sender: 'You', text: 'Hi! How can I help you?', age: 30 },
      { id: 3, sender: 'Friend 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', age: 25 },
    ],
    'Friend 2': [
      { id: 1, sender: 'Friend 2', text: 'Hey!', age: 28 },
      { id: 2, sender: 'You', text: 'Hi Friend 2!', age: 30 },
    ],
    // Add messages for other friends
  };

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  const handleBack = () => {
    setSelectedFriend(null);
  };

  async function getFriendsList() {
    try {
      const response = await fetch('http://localhost:8080/getActiveUsers', {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      const usernames = data.map(item => item.username);
      setFriendsList(usernames);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getFriendsList();
    console.log('value');

    if (isStompConnected) {
      // Stomp connection is ready
      stompClient.subscribe(`/user/${username}/queue/messages`, (message) => {
        console.log(`Message received from /user/${username}/queue/messages:`, message); // Log the received message
      });

      stompClient.subscribe(`/users/topic`, (message) => {
        console.log('Message received from /user/topic:', message); // Log the received message
      });

      stompClient.onreceipt = (frame) => {
        console.log('Message received', frame);
      };

      setConnectedToStomp(true); // Set state to indicate connection to Stomp
    } else {
      console.log('Waiting for Stomp connection...');
    }
  }, [username,stompClient]); // Add username to the dependency array if necessary

  var send = () => {
    // Your send function logic
  };

    return (
        <div className="bg-gray-100 flex flex-col lg:flex-row">
            <div className={`w-full lg:w-1/4 bg-gray-200 p-4 ${selectedFriend ? 'hidden lg:block' : 'block'}`}>
            <h2 className="text-lg font-semibold mb-4">Friends</h2>
            <ul className="friends-list overflow-auto max-h-96">
                {friendsList.map((friend, index) => (
                    <li
                        key={index} // Ensure to provide a unique key when mapping arrays
                        className="friend-item text-blue-500 hover:text-blue-700 py-2 px-3 rounded-md transition duration-300 ease-in-out cursor-pointer"
                        onClick={() => handleFriendClick(friend)} // Pass the friend's name to the click handler
                    >
                        {friend}
                    </li>
                ))}
            </ul>
        </div>

            <div className={`flex-1 p-4 ${selectedFriend ? 'w-full lg:w-3/4' : 'hidden lg:block'}`}>
                {selectedFriend && messages[selectedFriend] && (
                    <div className="bg-white shadow-md rounded-lg">
                        <h2 className="text-lg font-semibold p-4">{selectedFriend}</h2>
                        <div className="p-4 h-80 overflow-y-auto">
                            {messages[selectedFriend].map((message) => (
                                <div
                                    key={message.id}
                                    className={message.sender === 'You' ? 'flex items-end justify-end' : 'flex items-start'}
                                >
                                    <div className={message.sender === 'You' ? 'bg-blue-500 text-white rounded-lg p-2' : 'bg-gray-200 rounded-lg p-2'}>
                                        <p className="text-sm">{message.text}</p>
                                        <p className="text-xs text-gray-500">{`${message.sender}, ${message.age}`}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4" onClick={handleBack}>
                            Go Back
                        </button>
                        <button className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4" onClick={send}>
                            send
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
