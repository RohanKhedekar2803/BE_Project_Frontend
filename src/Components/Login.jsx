import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stompClient, isStompConnected } from '../Constants/StompClient';
import { UsernameContext } from '../Context/UsernameContext';
import { useSelector, useDispatch } from 'react-redux'

const Login = () => {
    const navigate = useNavigate();
    const usercontext = useContext(UsernameContext)

    // const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

    const submitdata = (e) => {
        e.preventDefault();
        // var user=usercontext.username
        var username = user.nickname
        const userObject = {
            senderId: username,
            content: `user ${username} have joined the chat`
        };

        stompClient.send(
            '/app/user.addUser',
            JSON.stringify(userObject),
            {});
        navigate('/chat');
    };


    return (
        <div>

            <button className="bg-blue-500 text-white rounded-md px-2 py-1 border border-blue-700" onClick={submitdata}>
                Submit
            </button>
        </div>
    );
};

export default Login;
