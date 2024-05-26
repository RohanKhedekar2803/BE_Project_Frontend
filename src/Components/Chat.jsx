import React, { useState, useEffect,useContext } from 'react';
import { stompClient, isStompConnected } from '../Constants/StompClient';
import ChatWindow from './ChatWindow';
import { UsernameContext } from '../Context/UsernameContext';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const usercontext= useContext(UsernameContext)
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friendsList, setFriendsList] = useState([]);
  const [newMessages, setNewMessages] = useState([]);

  const getTime=()=>{
    const currentDate = new Date();
    const indiaDateTime = currentDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const time = indiaDateTime.substring(10);
    console.log('Current date and time in India:', time);
    return time;
  }

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  const handleBack = () => {
    setSelectedFriend(null);
  };

  // const addNewMessage = (message) => {
  //   // Check if the message with the same id already exists
  //   const messageExists = newMessages.some((existingMessage) => existingMessage.messageId === message.messageId);

  //   if (!messageExists) {
  //     setNewMessages((prevMessages) => [...prevMessages, message]);
  //   }
  // };
  const addNewMessage = (message) => {
    // Extract all message IDs
    const existingMessageIds = newMessages.map((existingMessage) => existingMessage.messageId);
  
    // Check if the new message's ID already exists in the array
    if (!existingMessageIds.includes(message.messageId)) {
      setNewMessages((prevMessages) => [...prevMessages, message]);
    }
  };
  


  useEffect(() => {

    if(!user){
      navigate('/')
    }
    const getFriendsList = async () => {
      try {
        const response = await fetch('http://localhost:9005/getActiveUsers');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        const usernames = data.map((item) => item.username).filter(username => username !== user.username);
        setFriendsList(usernames);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const setupStompClient = () => {
      if (isStompConnected) {
        
        var username = user.username
        console.log(username)
        stompClient.subscribe(`/users/${username}/queue/messages`, (frame) => {
          console.log(`Message received from ${username}/queue/messages:`, frame);
          
          try {
            const message = JSON.parse(frame.body);
            console.log('Parsed JSON:', message);
            message.timeStamp = getTime()
            addNewMessage(message);
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
          
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
  }, [isStompConnected]);



  // return (
  //   <div>
  //     <header style={{padding:"5px", display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
  //     <div className={` p-4 ${selectedFriend ? 'hidden lg:block' : 'block'}`}>
  //     <h1 style={{ paddingLeft:"20px"}} className="text-2xl tracking-tight text-pink-200">Friends</h1>
  //       <ul className="friends-list overflow-auto max-h-96">
  //         {friendsList.map((friend, index) => (
  //           <li
  //             key={index}
  //             className="friend-item text-purple-300 hover:text-blue-300 cursor-pointer"
  //             onClick={() => handleFriendClick(friend)}
  //           >
  //             {friend}
  //           </li>
  //         ))}
  //       </ul>
  //     </div>       
  //     </header>
     

  //    <div style={{  left: '200px', width: 'calc(100% - 200px)', paddingBottom:"40px", borderRadius: "25px", padding: "30px", background: "#ebc9e1"}}>
  //       {selectedFriend && (
  //         <ChatWindow selectedFriend={selectedFriend} messages={newMessages} handleBack={handleBack}
  //         setMessages={setNewMessages} />
  //       )}
  //     </div>
  //   </div>
  //);
    return (
    <div style={{ display: 'flex', minHeight: '100vh'}}>
      <div style={{ flex: '0 0 30%', backgroundColor: '#43244f', padding: '20px' }}>
        <h1 className="text-2xl tracking-tight p-2 m-1 text-pink-200" style={{ borderBottom: '2px solid pink' }}>Friends</h1>
        <ul className="friends-list overflow-auto max-h-96">
          {friendsList.map((friend, index) => (
            <li
              key={index}
              className="friend-item p-2 text-pink-100 hover:text-blue-300 cursor-pointer"
              onClick={() => handleFriendClick(friend)}
            >
              <img src={`https://github.com/${friend}.png`} className="inline-block w-8 h-8 mr-2 bg-white rounded-full" alt={`${friend}'s avatar`} />
              {friend}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: '1', padding: '20px', background: '#6c3d77', borderRadius: '25px' }}>
        {selectedFriend && (
          <ChatWindow
            selectedFriend={selectedFriend}
            messages={newMessages}
            handleBack={handleBack}
            setMessages={setNewMessages}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import ChatWindow from './ChatWindow';

// const Chat = () => {
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);
//   const [selectedFriend, setSelectedFriend] = useState(null);
//   const [friendsList, setFriendsList] = useState([]);
//   const [newMessages, setNewMessages] = useState([]);

//   useEffect(() => {
//     if (!user) {
//       navigate('/');
//     }

//     const getFriendsList = async () => {
//       try {
//         const response = await fetch('http://localhost:9005/getActiveUsers');
//         if (!response.ok) {
//           throw new Error('Network response was not ok.');
//         }
//         const data = await response.json();
//         const usernames = data.map((item) => item.username).filter(username => username !== user.username);
//         setFriendsList(usernames);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     getFriendsList();
//   }, [user, navigate]);

//   const handleFriendClick = (friend) => {
//     setSelectedFriend(friend);
//   };

//   const handleBack = () => {
//     setSelectedFriend(null);
//   };

//   return (
//     <div style={{ display: 'flex', minHeight: '100vh'}}>
//       <div style={{ flex: '0 0 30%', backgroundColor: '#43244f', padding: '20px' }}>
//         <h1 className="text-2xl tracking-tight p-2 m-1 text-pink-200" style={{ borderBottom: '2px solid pink' }}>Friends</h1>
//         <ul className="friends-list overflow-auto max-h-96">
//           {friendsList.map((friend, index) => (
//             <li
//               key={index}
//               className="friend-item p-2 text-pink-100 hover:text-blue-300 cursor-pointer"
//               onClick={() => handleFriendClick(friend)}
//             >
//               <img src={`https://github.com/${friend}.png`} className="inline-block w-8 h-8 mr-2 bg-white rounded-full" alt={`${friend}'s avatar`} />
//               {friend}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div style={{ flex: '1', padding: '20px', background: '#6c3d77', borderRadius: '25px' }}>
//         {selectedFriend && (
//           <ChatWindow
//             selectedFriend={selectedFriend}
//             messages={newMessages}
//             handleBack={handleBack}
//             setMessages={setNewMessages}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;
