import React from 'react'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import Cards from './Cards';
import axios from 'axios';
import Pagination from './Pagination';
import ChallengeCard from './ChallengeCard';

const AllChallenge = () => {



    const [repos, setRepos] = useState([]);
    const [page, setPage] = useState(0);
    const [languagesfilter, setLanguages] = useState([])
    const [topicsfilter, setTopics] = useState([])
    const [filterBy, setFilterBy] = useState("")
    
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

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
            const response = await axios.post(`http://localhost:9005/challenges/get/?pageNo=${page}`, {
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
            const response = await axios.post(`http://localhost:9005/challenges/get/?pageNo=${page}`, {
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
            const response = await axios.post(`http://localhost:9005/challenges/get/?pageNo=${page}`, {
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

          
                <label style={{ color:"pink" }}>Filter By  :</label>
                <select style={{ color:"pink", background:"#2a1433" }} onChange={handleFilterChange}>
                    <option value="" style={{ color:"pink", background:"#2a1433" }} >Select an option</option>
                    <option value="Languages" style={{ color:"pink", background:"#2a1433" }}>Languages</option>
                    <option value="Topics" style={{ color:"pink", background:"#2a1433" }}>Topics</option>
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

            <div >
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

export default AllChallenge
