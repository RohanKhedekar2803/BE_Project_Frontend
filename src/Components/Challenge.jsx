// import React from 'react'
// import Navbar from './Navbar'
// import { useEffect, useState } from 'react'
// import Cards from './Cards';
// import axios from 'axios';
// import Pagination from './Pagination';
// import ChallengeCard from './ChallengeCard';
// import CreateChallenge from './CreateChallenge';

// const navigation = [
//     {name : 'Create Challenge', href : 'http://localhost:3000/createchallenge', current : false},
//     {name : 'All challenges', href : '#', current : false},
//     {name : 'Recommended Challenges', href : 'http://localhost:3000/challenge', current : false},

// ]

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }
// const Challenge = () => {

//     const [repos, setRepos] = useState([]);
//     const [page, setPage] = useState(0);
//     const [showCreateChallenge, setShowCreateChallenge] = useState(false)

//     const nextPage = () => {
//         setPage(page + 1);
//     };

//     const prevPage = () => {
//         if (page > 1) {
//             setPage(page - 1);
//         }
//     };

//     const fetchData = async (page) => {
//         try {
//             const response = await axios.post(`http://localhost:9005/challenges/getbyprofile/?username=vk17-starlord&pageNo=${page}`, {
//                 hasLanguage: "",
//                 hasTopic: "",
//             });
//             console.log('Response:', response.data);
//             const res = response.data;
//             setRepos(res);
//             console.log("data: ", repos)
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(()=> {
//         fetchData(page)
//     }, [page])


//     return (

//         <>
//         <div className="min-h-full bg-blue-100">
//             {/* <Navbar /> */}

//             <header className="bg-blue-300 shadow h-15">
//                 {/* <div className="flex max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-x-4">
//                         <p>Create Challenge</p>
//                         <p>All challenges</p>
//                         <p>Recommended Challenges</p>
//                     </div> */}
//                 <div className="hidden md:block h-16 pt-3">
//                     <div className="ml-10 flex items-baseline space-x-4">
//                         {navigation.map((item) => (
//                             <a
//                                 key={item.name}
//                                 // href={item.href}
//                                 onClick={()=>{ setShowCreateChallenge(true) }}

//                                 className={classNames(
//                                     item.current
//                                         ? 'bg-blue-500 text-white'
//                                         : 'text-white hover:bg-blue-400 hover:text-white',
//                                     'rounded-md px-3 py-2 font-sans-serif font-bold text-lg'
//                                 )}
//                                 aria-current={item.current ? 'page' : undefined}
//                             >
//                                 {item.name}
//                             </a>
//                         ))}
//                     </div>
//                 </div>
//             </header>
            
//             {
//                 !showCreateChallenge ? <>
//                     <div className="bg-blue-100 pt-6">
//                         {repos.map((item, index) => ( 
//                             <div key={index} className="mb-4">
//                                 <ChallengeCard data={item} />
//                             </div>
//                         ))}
//                     </div>
//                     <Pagination nextPage={nextPage} prevPage={prevPage} /> 
//                 </> : <CreateChallenge />
//             }

            

//         </div>
//         </>
//     )
// }

// export default Challenge

// import React, { useEffect, useState } from 'react';
// import { Layout, Menu } from 'antd';
// import Navbar from './Navbar';
// import Cards from './Cards';
// import axios from 'axios';
// import Pagination from './Pagination';
// import ChallengeCard from './ChallengeCard';
// import CreateChallenge from './CreateChallenge';

// const { Header } = Layout;

// const navigation = [
//     { name: 'Create Challenge', href: 'http://localhost:3000/createchallenge', current: false },
//     { name: 'All challenges', href: '#', current: false },
//     { name: 'Recommended Challenges', href: 'http://localhost:3000/challenge', current: false },
// ];

// const Challenge = () => {
//     const [repos, setRepos] = useState([]);
//     const [page, setPage] = useState(0);
//     const [showCreateChallenge, setShowCreateChallenge] = useState(false);

//     const nextPage = () => {
//         setPage(page + 1);
//     };

//     const prevPage = () => {
//         if (page > 1) {
//             setPage(page - 1);
//         }
//     };

//     const fetchData = async (page) => {
//         try {
//             const response = await axios.post(`http://localhost:9005/challenges/getbyprofile/?username=vk17-starlord&pageNo=${page}`, {
//                 hasLanguage: '',
//                 hasTopic: '',
//             });
//             console.log('Response:', response.data);
//             const res = response.data;
//             setRepos(res);
//             console.log('data: ', repos);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchData(page);
//     }, [page]);

//     return (
//         <>
//             <Layout className="min-h-full bg-blue-100">
//                 <Navbar />
//                 <Header className="bg-blue-300 shadow">
//                     <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
//                         {navigation.map((item, index) => (
//                             <Menu.Item key={index} onClick={() => setShowCreateChallenge(true)}>
//                                 {item.name}
//                             </Menu.Item>
//                         ))}
//                     </Menu>
//                 </Header>
//                 {!showCreateChallenge ? (
//                     <>
//                         <div className="bg-blue-100 pt-6">
//                             {repos.map((item, index) => (
//                                 <div key={index} className="mb-4">
//                                     <ChallengeCard data={item} />
//                                 </div>
//                             ))}
//                         </div>
//                         <Pagination nextPage={nextPage} prevPage={prevPage} />
//                     </>
//                 ) : (
//                     <CreateChallenge />
//                 )}
//             </Layout>
//         </>
//     );
// };

// export default Challenge;








import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Cards from './Cards';
import axios from 'axios';
import Pagination from './Pagination';
import ChallengeCard from './ChallengeCard';
import CreateChallenge from './CreateChallenge';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Challenge = () => {
    const [repos, setRepos] = useState([]);
    const [page, setPage] = useState(0);
    const [showCreateChallenge, setShowCreateChallenge] = useState(false);
    const [languagesfilter, setLanguages] = useState([]);
    const [topicsfilter, setTopics] = useState([]);
    const [filterBy, setFilterBy] = useState('');


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
            const response = await axios.post(`http://localhost:9005/challenges/getbyprofile/?username=vk17-starlord&pageNo=${page}`, {
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
            const topics = await axios.get(`http://localhost:9005/utils/gettopics`);
            setTopics(topics.data);
        } catch (error) {
            console.error('Error fetching languages or topics:', error);
        }
    };
    const handleSelectlanguageChange = async (event) => {
        const selectedOption = event.target.value;
        const selectedLanguage = selectedOption.substring(1, selectedOption.length - 1);
        setFilterBy(''); // Clear any previous filter
        await fetchData(1, selectedLanguage); // Reset page to 1 when filtering
    };

    const handleSelecttopicChange = async (event) => {
        const selectedOption = event.target.value;
        const selectedTopic = selectedOption.substring(1, selectedOption.length - 1);
        setFilterBy(''); // Clear any previous filter
        await fetchData(1, '', selectedTopic); // Reset page to 1 when filtering
    };

    const handleFilterChange = (event) => {
        const val = event.target.value;
        setFilterBy(val);
    };

    return (
        <>
            <div >
                <header  >
                    <div className="hidden md:block h-16 pt-3">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a style={{ color: "pink"}}
                                onClick={() => setShowCreateChallenge(true)}
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
                            {/* <a style={{ color: "pink"}}
                            onClick={() => setShowCreateChallenge(false)}
                                className={classNames(
                                    'text-white hover:bg-blue-400 hover:text-white',
                                    'rounded-md px-3 py-2 font-sans-serif font-bold text-lg'
                                )}
                            >
                                Recommended Challenges
                            </a> */}
                        </div>
                    </div>
                </header>

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
                    <CreateChallenge />
                )}

                </div>
                
            </div>
        </>
    );
};

export default Challenge;
