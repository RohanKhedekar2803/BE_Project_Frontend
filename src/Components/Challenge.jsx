import React from 'react'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import Cards from './Cards';
import axios from 'axios';
import Pagination from './Pagination';
import ChallengeCard from './ChallengeCard';

const navigation = [
    {name : 'Create Challenge', href : '#', current : false},
    {name : 'All challenges', href : '#', current : false},
    {name : 'Recommended Challenges', href : 'http://localhost:3000/userchallenges', current : false},

]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Challenge = () => {



    const [repos, setRepos] = useState([]);
    const [page, setPage] = useState(0);
    const [languagesfilter, setLanguages] = useState([])
    const [topicsfilter, setTopics] = useState([])
    const [filterBy, setFilterBy] = useState("")

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)

    const nextPage = () => {
        setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const fetchData = async (page) => {
        try {
            
            const languages = await axios.get(`http://localhost:9005/utils/getlang`)
            setLanguages(languages.data)
            console.log(languages.data)

            const topics = await axios.get(`http://localhost:9005/utils/gettopics`);
            setTopics(topics.data)
            console.log(topics.data)
            const response = await axios.post(`http://localhost:9005/challenges/getbyprofile/?username=${user.username}&pageNo=${page}`, {
                hasLanguage: "",
                hasTopic: "",
            });
            console.log('Response:', response.data);
            const res = response.data;
            setRepos(res);
            console.log("data: ", repos)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(()=> {
        if(!user){
            navigate('/')
        }
        fetchData(page)
    }, [page, user])

    const handleSelectlanguageChange = async (event) => {
        const selectedOption = event.target.value;
        const seleted = selectedOption.substring(1, selectedOption.length - 1);
        console.log(seleted)


        try {
            const response = await axios.post(`http://localhost:9005/challenges/getbyprofile/?username=${user.username}&pageNo=${page}`, {
                hasLanguage: seleted,
                hasTopic: "",
            });
            // Process the API response as needed
            const dataArray = response.data;
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
            const response = await axios.post(`http://localhost:9005/challenges/getbyprofile/?username=${user.username}&pageNo=${page}`, {
                hasLanguage: "",
                hasTopic: seleted,
            });
            // Process the API response as needed
            const dataArray = response.data;
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
    return (

        <>
        <div className="min-h-full bg-blue-100">
            <Navbar />

            {/* <header className="bg-blue-300 shadow h-15">
                {/* <div className="flex max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-x-4">
                        <p>Create Challenge</p>
                        <p>All challenges</p>
                        <p>Recommended Challenges</p>
                    </div> */}
                {/* <div className="hidden md:block h-16 pt-3">
                    <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}

                                className={classNames(
                                    item.current
                                        ? 'bg-blue-500 text-white'
                                        : 'text-white hover:bg-blue-400 hover:text-white',
                                    'rounded-md px-3 py-2 font-sans-serif font-bold text-lg'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            </header> */}

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

            <div className="bg-blue-100 pt-6">
                        {repos.map((item, index) => ( 
                            <div key={index} className="mb-4">
                                <ChallengeCard data={item} />
                            </div>
                        ))}
                    </div>
                    <Pagination nextPage={nextPage} prevPage={prevPage} /> 

        </div>
        </>
    )
}

export default Challenge
