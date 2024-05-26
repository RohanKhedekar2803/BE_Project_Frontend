// import React, { useContext,useState } from 'react';
// import { UsernameContext } from '../Context/UsernameContext';
// import { stompClient} from '../Constants/StompClient';
// import { useSelector, useDispatch } from 'react-redux'

// const ChatWindow = ({ selectedFriend, messages, handleBack, setMessages }) => {

//   // const usercontext= useContext(UsernameContext)
//   const [draftMessage,setDraftMessage]=useState('draft');
//   const { user } = useSelector((state) => state.auth)

//   const sendMessage= () =>{

//     // var user=usercontext.username
//     const userObject = {
//       senderId: user?.username,
//       receiverId: selectedFriend,
//       content: draftMessage,

//   };
//   const getTime=()=>{
//     const currentDate = new Date();
//     const indiaDateTime = currentDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
//     const time = indiaDateTime.substring(10);
//     console.log('Current date and time in India:', time);
//     return time;
//   }
//   stompClient.send(
//       `/app/chat`,
//       JSON.stringify(userObject),
//       {});
//       userObject.timeStamp = getTime()
//       setMessages((prevMessages) => [...prevMessages, userObject]);
//       console.log(userObject)
//   }
//   return (
//     <>
//      <div style={{  borderRadius: "25px", padding: "30px", background: "#dcadde", height: "100%"}}>
//         <h2 style={{ color: "Purple", fontSize: "20px"}}>{selectedFriend}</h2>
//         <div className="p-4 h-80 overflow-y-auto">
//           {messages.map((message) => (
            
//             (
//               <div
//                 key={message.id}
//                 className={message.senderId === user.username ? 'flex items-end justify-end' : 'flex items-start'}
//               >
//                 <div
//                   className={message.senderId === user.username ? 'bg-purple-200 rounded-lg p-2' : 'bg-pink-200 rounded-lg p-2'}
//                 >
//                   <p className="text-sm">{message.content}</p>
//                   <p className="text-xs bg-violet-200  text-violet-500 text-right">{`${message.senderId === user.username ? 'You' : message.senderId}, ${message.timeStamp}`}</p>
//                 </div>
//               </div>
//             )
//           ))}
//         </div>
//         <div className=' flex'>
//           <button className=" px-4 py-2 m-4 mx-2  bg-purple-500 text-white rounded-md " onClick={handleBack}>
//             Back
//           </button>
//           <div className='m-2 p-2'style={{ bottom: 0 }} >
//                 <input
//                   value={draftMessage}
//                   onChange={(e) => setDraftMessage(e.target.value)}
//                   autoComplete="off"
//                   id="Nickname"
//                   name="Nickname"
//                   type="text"
//                   className="peer bg-pink-200 h-10 w-full border border-gray-400 text-gray-900 focus:outline-none focus:border-rose-600"
//                   placeholder="Nickname"
//                 />
//                 <label
//                   htmlFor="Nickname"
//                   className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                 >
//                   Nickname
//                 </label>
//           </div>
//           <button className=" px-4 py-2 m-4 mx-2  bg-purple-500 text-white rounded-md " onClick={sendMessage}>
//             Send
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChatWindow;


import React, { useContext, useState , useEffect, useRef } from 'react';
import { UsernameContext } from '../Context/UsernameContext';
import { stompClient } from '../Constants/StompClient';
import { useSelector, useDispatch } from 'react-redux';

const ChatWindow = ({ selectedFriend, messages, handleBack, setMessages }) => {
  const [draftMessage, setDraftMessage] = useState('');
  const { user } = useSelector((state) => state.auth);
  const [messageCounter, setMessageCounter] = useState(0); // Counter to alternate message display


  const sendMessage = () => {
    const userObject = {
      senderId: user?.username,
      receiverId: selectedFriend,
      content: draftMessage,
    };

    const getTime = () => {
      const currentDate = new Date();
      const indiaDateTime = currentDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      const time = indiaDateTime.substring(10);
      console.log('Current date and time in India:', time);
      return time;
    };
    var username = user.username
    userObject.timeStamp = getTime();
    setMessages((prevMessages) => [...prevMessages, userObject]);
    stompClient.send(`/users/${selectedFriend}/queue/messages`, JSON.stringify(userObject), {})
    setDraftMessage('')
    console.log(userObject);
        setMessageCounter(messageCounter + 1);

  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  //
  useEffect(() => {

  
    const getFriendsList = async () => {
      try {
        const response = await fetch(`http://localhost:9005/user/chats/${user.username}/${selectedFriend}`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        for(let i=0;i<data.length;i++){
          setMessages((prevMessages) => [...prevMessages,data[i]]);
        }
        console.log(`chats btn ${user.username}/${selectedFriend} are`+ data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getFriendsList()
   
  },);
  //

  return (
    <>
      <div
        style={{
          borderRadius: '25px',
          padding: '30px',
          background: '#dcadde',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position:'fixed',
          width:"800px",
        }}
      >

        <div className='flex mb-1'>
        <div className='flex items-center justify-center'>
        { (
                          <img
                            src={`https://github.com/${selectedFriend}.png`}
                            alt={`${selectedFriend}'s avatar`}
                            className="w-8 h-8 mr-2 rounded-full "
                          />
          )}
        </div>
          <h1 className="text-2xl ml-1 tracking-tight pb-1 mb-1 text-violet-500" >{selectedFriend}</h1>
        </div>
        <hr style={{ color: 'black' }} />

            <div className="p-4 flex-grow overflow-y-auto mb-40">
          {messages.map((message, index) => {
            const messageCounter = index + 1;
            if( (message.senderId === user.username && message.receiverId === selectedFriend) || 
            (message.senderId === selectedFriend && message.receiverId === user.username) ){

              if (message.senderId !== user.username &&   messageCounter % 2 === 0) {
                return (
                  <div
                    key={message.id}
                    className={message.senderId === user.username ? 'flex items-end justify-end' : 'flex items-start'}
                  >   {message.senderId !== user.username && (
                          <img
                            src={`https://github.com/${message.senderId}.png`}
                            alt={`${message.senderId}'s avatar`}
                            className="w-8 h-8 mr-2 rounded-full"
                          />
                        )}
                    <div
                      className={message.senderId === user.username ? 'bg-purple-400 rounded-lg p-2 m-1' : 'bg-pink-200 rounded-lg p-2 m-1'}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs bg-violet-200 text-black text-right">{`${message.senderId === user.username ? 'You' : message.senderId}, ${message.timeStamp}`}</p>
                    </div>
                  </div>
                );
              } else {
                return(
                
                      <div
                        key={message.id}
                        className={message.senderId === user.username ? 'flex items-end justify-end' : 'flex items-start'}
                      >
                        <div
                          className={message.senderId === user.username ? 'bg-purple-400 rounded-lg p-2 m-1' : 'hidden'}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs bg-violet-200 text-black text-right">{`${message.senderId === user.username ? 'You' : message.senderId}, ${message.timeStamp}`}</p>
                        </div>
                        {message.senderId === user.username && (
                          <img
                            src={`https://github.com/${user.username}.png`}
                            alt={`${user.username}'s avatar`}
                            className="w-8 h-8 ml-2 mr-10 rounded-full"
                          />
                        )}
                      
                    
                    </div>
                ) 
              }
            }else{
              console.log(message.senderId +'   '+ message.receiverId)
            }

          })}
        </div>

        <div style={{ position: 'fixed', bottom: '0', width: '100%', background: '#dcadde', padding: '10px', display: 'flex', alignItems: 'center' }}>
        <button className="px-4 py-2 m-1 bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-white rounded-md" onClick={handleBack}>
            Back
          </button>
            <input
              value={draftMessage}
              onChange={(e) => setDraftMessage(e.target.value)}
              autoComplete="off"
              id="Nickname"
              name="Nickname"
              type="text"
              style={{ width:"530px"}}
              className="peer bg-pink-200 h-10 border border-gray-400 text-gray-900 focus:outline-none  rounded-md focus:border-rose-600"
              placeholder=" Enter message"
              onKeyPress={handleKeyPress}
            />
            
            <button className="px-4 py-2 m-1 bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-white rounded-md" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
