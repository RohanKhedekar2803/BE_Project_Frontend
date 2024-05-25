import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Cards from './Cards';
import axios from 'axios';
import Pagination from './Pagination';
import ChallengeCard from './ChallengeCard';
import CreateChallenge from './CreateChallenge';
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import ManageChallenges from './ManageChallenges';
import Friends from './Friends';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const SoloByProfile = () => {
    const [repos, setRepos] = useState([]);
    const [page, setPage] = useState(0);
    const [showCreateChallenge, setShowCreateChallenge] = useState(false);
    const [languagesfilter, setLanguages] = useState([]);
    const [topicsfilter, setTopics] = useState([]);
    const [filterBy, setFilterBy] = useState('');
    
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
            const response = await axios.post(`http://localhost:9005/challenges/getAllSoloChallengeByProfile/?username=${user.username}&pageNo=${page}`, {
                hasLanguage: '',
                hasTopic: '',
            });
            console.log('Response:', response.data);
            const res = response.data;
            setRepos(res);
            console.log('data: ', repos);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // useEffect(() => {
    //     fetchData(page);
    // }, [page]);
    useEffect(() => {
        fetchData(page);
        fetchLanguagesAndTopics();
    }, [page]);

    const fetchLanguagesAndTopics = async () => {
        try {
            const languages = await axios.get(`http://localhost:9005/utils/getlang`);
            setLanguages(languages.data);
            console.log(languages.data)
            const topics = await axios.get(`http://localhost:9005/utils/gettopics`);
            setTopics(topics.data)
            // setTopics(topics.data);
//             const inputString = topics.data[0].topicname;
//             console.log(inputString)
// const tokens = inputString.slice(1, -1).split(", ").map(token => token.slice(1, -1));
// console.log(tokens);
//             setTopics(tokens)
            console.log(topics.data)
        } catch (error) {
            console.error('Error fetching languages or topics:', error);
        }
    };

    const handleSelectlanguageChange = async (event) => {
        const selectedOption = event.target.value;
        const seleted = selectedOption.substring(1, selectedOption.length - 1);
        console.log(seleted)


        try {
            const response = await axios.post(`http://localhost:9005/challenges/getAllSoloChallengeByProfile/?username=${user.username}&pageNo=${page}`, {
                hasLanguage: seleted,
                hasTopic: "",
            });
            // Process the API response as needed
            const dataArray = response.data

            if(seleted==='java' || seleted==='Java'){
                console.log("in ")
                let filteredArray =[]
                for (let i = 0; i < dataArray.length; i++) {
                    if (!dataArray[i].language.toLowerCase().includes('JavaScript'.toLowerCase())) {
                      filteredArray.push(dataArray[i]);
                    }
                  }
               
                setRepos(filteredArray);
                console.log(filteredArray)
            }else{
                setRepos(dataArray);
                console.log("data", dataArray)
            }

        } catch (error) {
            console.error('Error calling API:', error);
        }
    };

    const handleSelecttopicChange = async (event) => {
        const selectedOption = event.target.value;
        const seleted = selectedOption.substring(1, selectedOption.length - 1);
        console.log(seleted)


        try {
            const response = await axios.post(`http://localhost:9005/challenges/getAllSoloChallengeByProfile/?username=${user.username}&pageNo=${page}`, {
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
    };

    return (
        <>
            <div >
                {/* <header  >
                    <div className="hidden md:block h-16 pt-3">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a style={{ color: "pink"}}
                                onClick={() => setShowCreateChallenge(false)}
                                className={classNames(
                                    'text-white hover:bg-blue-400 hover:text-white',
                                    'rounded-md px-3 py-2 font-sans-serif font-bold text-lg'
                                )}
                            >
                                Create Challenge
                            </a>
                            <a style={{ color: "pink"}}
                            onClick={() => setShowCreateChallenge(false)}
                                className={classNames(
                                    'text-white hover:bg-blue-400 hover:text-white',
                                    'rounded-md px-3 py-2 font-sans-serif font-bold text-lg'
                                )}
                            >
                                All challenges
                            </a>
                            <a style={{ color: "pink"}}
                            onClick={() => setShowCreateChallenge(false)}
                                className={classNames(
                                    'text-white hover:bg-blue-400 hover:text-white',
                                    'rounded-md px-3 py-2 font-sans-serif font-bold text-lg'
                                )}
                            >
                                Manage Challenges
                            </a>
                            <a style={{ color: "pink"}}
                            onClick={() => setShowCreateChallenge(true)}
                                className={classNames(
                                    'text-white hover:bg-blue-400 hover:text-white',
                                    'rounded-md px-3 py-2 font-sans-serif font-bold text-lg'
                                )}
                            >
                                Hackathons
                            </a>
                        </div>
                    </div>
                </header> */}

                <div style={{ position: 'fixed', left: '200px', width: 'calc(100% - 200px)', height: '100vh', overflowY: 'auto', paddingBottom:"50px", borderRadius: "25px" }} >
                {!showCreateChallenge ? (
                    <>
                    <div style={{ paddingLeft:"20px"}} >
                    <label style={{ color:"pink" }}>Filter By  :</label>
                            <select style={{ color:"pink", background:"#2a1433" }} onChange={handleFilterChange}>
                                <option value="" style={{ color:"pink", background:"#2a1433" }} >Select an option</option>
                                <option value="Languages" style={{ color:"pink", background:"#2a1433" }}>Languages</option>
                                <option value="Topics" style={{ color:"pink", background:"#2a1433" }}>Topics</option>
                            </select>
                    </div>
                    
                            {
                                filterBy === "Languages"

                                    ?

                                    <div style={{ paddingLeft:"20px"}}>
                                        <label style={{ color:"pink" }}>Filter by language   :</label>
                                        <select style={{ color:"pink", background:"#2a1433" }} id="mySelect" onChange={handleSelectlanguageChange} >
                                            <option style={{ color:"pink", background:"#2a1433" }} value="">Select an option</option>
                                            {languagesfilter.map((option, index) => (
                                                <option style={{ color:"pink", background:"#2a1433" }} key={index} value={option.languageName}>
                                                    {option.languageName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    : null
                            }

                            {
                                filterBy === "Topics" ?
                                    // <div>
                                    //     <label >Filter by topic</label>
                                    //     <select id="mySelect" onChange={handleSelecttopicChange} className='text-black'>
                                    //         <option value="">Select an option</option>
                                    //         {topicsfilter.map((option, index) => (
                                    //             <option style key={index} value={option.topicName}>
                                    //                 {option.topicName}
                                    //             </option>
                                    //         ))}
                                    //     </select>
                                    // </div>

                                    <div style={{ paddingLeft:"20px"}}>
                                    <label style={{ color:"pink" }}>Filter by Topic   :</label>
                                    <select style={{ color:"pink", background:"#2a1433" }} id="mySelect" onChange={handleSelecttopicChange} >
                                        <option style={{ color:"pink", background:"#2a1433" }} value="">Select an option</option>
                                        {topicsfilter.map((option, index) => (
                                            <option style={{ color:"pink", background:"#2a1433" }} key={index} value={option.topicname}>
                                                {option.topicname}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                    :

                                    null
                            }
                        <div  style={{ padding: "50px", background: "#ebc9e1", borderRadius: "25px"}} >
                            {repos.map((item, index) => (
                                <div key={index} className="mb-4">
                                    <ChallengeCard data={item} />
                                </div>
                            ))}

                        <Pagination nextPage={nextPage} prevPage={prevPage} />

                        </div>
                    </>
                ) : (
                    <SoloByProfile />
                )}

                </div>
                
            </div>
        </>
    );
};

export default SoloByProfile;
