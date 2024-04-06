import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { stompClient, isStompConnected } from '../Constants/StompClient';
import { toast } from 'react-toastify'
import Navbar from './Navbar';
import Cards from './Cards';
import Sidebar from './Sidebar';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Pagination from './Pagination';
import Spinner from './Spinner';
import SearchBar from './SearchBar'
import { logout , reset } from '../features/auth/authSlice'


const Dashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)
    const [repos, setRepos] = useState([]);
    const [page, setPage] = useState(0);
    const [languagesfilter, setLanguages] = useState([])
    const [topicsfilter, setTopics] = useState([])
    const [filterBy, setFilterBy] = useState("")


    const nextPage = () => {
        setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleSelectlanguageChange = async (event) => {
        const selectedOption = event.target.value;
        const seleted = selectedOption.substring(1, selectedOption.length - 1);
        console.log(seleted)


        try {
            const response = await axios.post(`http://localhost:9005/repo/getbyprofile/?username=${user.username}&pageNo=${page}`, {
                hasLanguage: seleted,
                hasTopic: "",
            });
            // Process the API response as needed
            const dataArray = response.data.content;
            setRepos(dataArray);
            console.log("data", dataArray)
        } catch (error) {
            console.error('Error calling API:', error);
        }
    };

    const handleSelecttopicChange = async (event) => {
        const selectedOption = event.target.value;
        const seleted = selectedOption.substring(1, selectedOption.length - 1);
        console.log(seleted)


        try {
            const response = await axios.post(`http://localhost:9005/repo/getbyprofile/?username=${user.username}&pageNo=${page}`, {
                hasLanguage: "",
                hasTopic: seleted,
            });
            // Process the API response as needed
            const dataArray = response.data.content;
            setRepos(dataArray);
            console.log("data", dataArray)
        } catch (error) {
            console.error('Error calling API:', error);
        }
    };

    const handleFilterChange = (event) => {
        const val = event.target.value;

        setFilterBy(val);

    }

    //   useEffect(() => {

    //   }, [repos])

    useEffect(() => {

        if(!user){
            toast.error(message)
            navigate('/')
        }
        
        const fetchData = async (page) => {
            try {

                const languages = await axios.get(`http://localhost:9005/utils/getlang`)
                setLanguages(languages.data)
                console.log(languages.data)

                const topics = await axios.get(`http://localhost:9005/utils/gettopics`);
                setTopics(topics.data)
                console.log(topics.data)


                const response = await axios.post(`http://localhost:9005/repo/getbyprofile/?username=${user.username}&pageNo=${page}`, {
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
    }, [page, user]);


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

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

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
                            <Navbar />

                            <header className="bg-blue-100 shadow">
                                <div className="max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Recommended Projects</h1>
                                </div>
                            </header>
                            <button onClick={onLogout} >Logout</button>
                            <label className='text-black'>Filter By</label>
                            <select className='text-black' onChange={handleFilterChange}>
                                <option value="">Select an option</option>
                                <option value="Languages" className='text-black'>Languages</option>
                                <option value="Topics" className='text-black'>Topics</option>
                            </select>

                            {
                                filterBy === "Languages"

                                    ?

                                    <div>
                                        <label className='text-black'>Filter by language</label>
                                        <select id="mySelect" onChange={handleSelectlanguageChange} className='text-black'>
                                            <option value="">Select an option</option>
                                            {languagesfilter.map((option, index) => (
                                                <option key={index} value={option.languageName}>
                                                    {option.languageName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    : null
                            }

                            {
                                filterBy === "Topics" ?
                                    <div>
                                        <label className='text-black'>Filter by topic</label>
                                        <select id="mySelect" onChange={handleSelecttopicChange} className='text-black'>
                                            <option value="">Select an option</option>
                                            {topicsfilter.map((option, index) => (
                                                <option key={index} value={option.topicName}>
                                                    {option.topicName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    :

                                    null
                            }


                            {/* <label className='text-black'>Filter by language</label>
                            <select id="mySelect" onChange={handleSelectlanguageChange} className='text-black'>
                                <option value="">Select an option</option>
                                {languagesfilter.map((option, index) => (
                                    <option key={index} value={option.languageName}>
                                        {option.languageName}
                                    </option>
                                ))}
                            </select>

                            <label className='text-black'>Filter by topic</label>
                            <select id="mySelect" onChange={handleSelecttopicChange} className='text-black'>
                                <option value="">Select an option</option>
                                {topicsfilter.map((option, index) => (
                                    <option key={index} value={option.topicName}>
                                        {option.topicName}
                                    </option>
                                ))}
                            </select> */}

                            <div className="bg-blue-100">
                                {repos.map((item, index) => (
                                    <div key={index} className="mb-4">
                                        <Cards data={item} />
                                    </div>
                                ))}
                            </div>
                            <Pagination nextPage={nextPage} prevPage={prevPage} />

                        </div>
                    ) : <Spinner />
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
