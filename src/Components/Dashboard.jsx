import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { stompClient, isStompConnected } from '../Constants/StompClient';
import Navbar from './Navbar';
import Cards from './Cards';
import Sidebar from './Sidebar';


const Dashboard = () => {

    const navigate = useNavigate();
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
            <h1>Hello</h1>
            {/* <div>
                <Sidebar/>
            </div>
            <div>
                <Navbar />
            </div> */}
            {/* <div>
                <Cards />
            </div> */}
            {/* <div className="flex items-center justify-center h-screen">
                <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                    <div className="p-6">
                        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            UI/UX Review Check
                        </h5>
                        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                            The place is close to Barceloneta Beach and bus stop just 2 min by walk
                            and near to "Naviglio" where you can enjoy the main night life in
                            Barcelona.
                        </p>
                    </div>
                    <div className="p-6 pt-0">
                        <button
                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                            type="button">
                            Read More
                        </button>
                    </div>
                </div>
            </div> */}


        </div>
    )
}

export default Dashboard
