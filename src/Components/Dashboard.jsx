import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { stompClient, isStompConnected } from '../Constants/StompClient';

import Navbar from './Navbar';
import Cards from './Cards';
import Sidebar from './Sidebar';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Pagination from './Pagination';
import Spinner from './Spinner';





const Dashboard = () => {

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)
    const [repos, setRepos] = useState([]);
    const [page, setPage] = useState(1);

    const nextPage = () => {
        setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    useEffect(() => {
        const fetchData = async (page) => {
            try {
                const response = await axios.post(`http://localhost:9005/repo/getbyprofile/?username=vk17-starlord&pageNo=${page}`, {
                    hasLanguage: "",
                    hasTopic: "",
                });
                console.log('Response:', response.data);
                const dataArray = response.data.content;
                setRepos(dataArray);
                console.log("data: ", dataArray)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(page);
    }, [page]);


    // const submitdata = (e) => {
    //     e.preventDefault();
    //     // var user=usercontext.username
    //     var username = user.nickname
    //     const userObject = {
    //         senderId: username,
    //         content: `user ${username} have joined the chat`
    //     };

    //     stompClient.send(
    //         '/app/user.addUser',
    //         JSON.stringify(userObject),
    //         {});
    //     navigate('/chat');
    // };

    return (
        <>
            {/*
            This example requires updating your template:
    
            ```
            <html class="h-full bg-gray-100">
            <body class="h-full">
            ```
          */}
            <div className="min-h-full bg-blue-100">



                {
                    repos ? (
                    <div>
                        <Navbar/>
                        
                <header className="bg-blue-100 shadow">
                    <div className="max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Recommended Projects</h1>
                    </div>
                </header>
                    <div className="bg-blue-100">
                        {repos.map((item, index) => ( 
                            <div key={index} className="mb-4">
                                <Cards data={item} />
                            </div>
                        ))}
                    </div>
                    <Pagination nextPage={nextPage} prevPage={prevPage} /> 
 
                    </div>
                     ) : <Spinner/>
                }
                {/* <div className="bg-blue-100">
                    {repos.map((item, index) => (
                        <div key={index} className="mb-4">
                            <Cards data={item} />
                        </div>
                    ))}
                </div> */}

                {/* <div className="flex justify-between mt-4">
                    <button onClick={prevPage}>Previous Page</button>
                    <button onClick={nextPage}>Next Page</button>
                </div> */}
                
            </div>
        </>
    )
}

export default Dashboard
