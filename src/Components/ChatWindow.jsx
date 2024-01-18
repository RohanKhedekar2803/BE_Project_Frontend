import React from 'react';

const ChatWindow = ({ selectedFriend, messages, handleBack }) => {
  return (
    <>
      <div className="bg-white shadow-md rounded-lg">
        <h2 className="text-lg font-semibold p-4">{selectedFriend}</h2>
        <div className="p-4 h-80 overflow-y-auto">
          {messages.map((message) => (
            
            (
              <div
                key={message.id}
                className={message.senderId === 'You' ? 'flex items-end justify-end' : 'flex items-start'}
              >
                <div
                  className={message.senderId === 'You' ? 'bg-blue-500 text-white rounded-lg p-2' : 'bg-gray-200 rounded-lg p-2'}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-gray-500">{`${message.senderId}, ${message.timeStamp}`}</p>
                </div>
              </div>
            )
          ))}
        </div>
        <button className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4" onClick={handleBack}>
          Go Back
        </button>
      </div>
    </>
  );
};

export default ChatWindow;
