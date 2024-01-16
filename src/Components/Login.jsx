import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stompClient, isStompConnected } from '../Constants/StompClient';
import { UsernameContext } from '../Context/UsernameContext';

const Login = () => {
    const navigate = useNavigate();
    const usercontext= useContext(UsernameContext)
    console.log(usercontext.username)
    const submitdata = (e) => {
        e.preventDefault();
        
        const userObject = {
            nickname: usercontext.nickname,
            username: usercontext.username
        };

        stompClient.send(
            '/app/user.addUser',
            JSON.stringify(userObject),
            {});
        navigate('/chat');
    };

    
    return (
        <div>
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Welcome</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input
                                            autoComplete="off"
                                            id="Username"
                                            name="Username"
                                            type="text"
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                            placeholder="Email address"
                                            value={usercontext.username}
                                            onChange={(e)=>usercontext.setUsername(e.target.value)}
                                        />
                                        <label
                                            htmlFor="Username"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            Username
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            value={usercontext.nickname}
                                            onChange={(e)=>usercontext.setNickname(e.target.value)}
                                            autoComplete="off"
                                            id="Nickname"
                                            name="Nickname"
                                            type="text"
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                            placeholder="Nickname"
                                        />
                                        <label
                                            htmlFor="Nickname"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            Nickname
                                        </label>
                                    </div>

                                    <div className="relative">
                                        <button className="bg-blue-500 text-white rounded-md px-2 py-1 border border-blue-700" onClick={submitdata}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
