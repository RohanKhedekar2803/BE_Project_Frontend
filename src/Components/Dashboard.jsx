// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { stompClient, isStompConnected } from '../Constants/StompClient';

// import Navbar from './Navbar';
// import Cards from './Cards';
// import Sidebar from './Sidebar';
// import { Fragment } from 'react'
// import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import Pagination from './Pagination';
// import Spinner from './Spinner';





// const Dashboard = () => {

//     const navigate = useNavigate();
//     const { user } = useSelector((state) => state.auth)
//     const [repos, setRepos] = useState([]);
//     const [page, setPage] = useState(0);

//     const nextPage = () => {
//         setPage(page + 1);
//     };

//     const prevPage = () => {
//         if (page > 1) {
//             setPage(page - 1);
//         }
//     };

//     useEffect(() => {
//         const fetchData = async (page) => {
//             try {
//                 const response = await axios.post(`http://localhost:9005/repo/getbyprofile/?username=${user.username}&pageNo=${page}`, {
//                     hasLanguage: "",
//                     hasTopic: "",
//                 });
//                 console.log('Response:', response.data);
//                 const dataArray = response.data.content;
//                 setRepos(dataArray);
//                 console.log("data: ", dataArray)
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData(page);
//     }, [page, user]);


//     // const submitdata = (e) => {
//     //     e.preventDefault();
//     //     // var user=usercontext.username
//     //     var username = user.nickname
//     //     const userObject = {
//     //         senderId: username,
//     //         content: `user ${username} have joined the chat`
//     //     };

//     //     stompClient.send(
//     //         '/app/user.addUser',
//     //         JSON.stringify(userObject),
//     //         {});
//     //     navigate('/chat');
//     // };

//     return (
//         <>
//             {/*
//             This example requires updating your template:
    
//             ```
//             <html class="h-full bg-gray-100">
//             <body class="h-full">
//             ```
//           */}
//             <div className="min-h-full bg-blue-100">



//                 {
//                     repos ? (
//                     <div>
//                         {/* <Navbar/> */}
                        
//                 <header className="bg-blue-100 shadow">
//                     <div className="max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//                         <h1 className="text-2xl font-bold tracking-tight text-gray-900">Recommended Projects</h1>
//                     </div>
//                 </header>
//                     <div className="bg-blue-100">
//                         {repos.map((item, index) => ( 
//                             <div key={index} className="mb-4">
//                                 <Cards data={item} />
//                             </div>
//                         ))}
//                     </div>
//                     <Pagination nextPage={nextPage} prevPage={prevPage} /> 
 
//                     </div>
//                      ) : <Spinner/>
//                 }
//                 {/* <div className="bg-blue-100">
//                     {repos.map((item, index) => (
//                         <div key={index} className="mb-4">
//                             <Cards data={item} />
//                         </div>
//                     ))}
//                 </div> */}

//                 {/* <div className="flex justify-between mt-4">
//                     <button onClick={prevPage}>Previous Page</button>
//                     <button onClick={nextPage}>Next Page</button>
//                 </div> */}
                
//             </div>
//         </>
//     )
// }

// export default Dashboard


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
import { Modal, Typography } from 'antd'; // Import the Modal component from Ant Design

const Dashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)
    const [repos, setRepos] = useState([]);
    const [page, setPage] = useState(0);
    const [languagesfilter, setLanguages] = useState([])
    const [topicsfilter, setTopics] = useState([])
    const [filterBy, setFilterBy] = useState("")
    const [sortBy, setSortBy] = useState("recommended")
    const [topic, setTopic] = useState("")
    const [lang, setLang] = useState("")
    const [isLang, setIsLang] = useState(false)
    const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility
    const [cardData, setCardData] = useState(null); // State to store selected card data

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
        setLang(seleted)
        setIsLang(true)
        console.log(seleted)


        try {
            const response = await axios.post(`http://localhost:9005/repo/getbyprofile/?username=${user.username}&pageNo=${page}&sortBy=${sortBy}`, {
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
        // const seleted = selectedOption.substring(1, selectedOption.length - 1);
        setTopic(selectedOption)
        setIsLang(false)
        console.log(selectedOption)

        try {
            const response = await axios.post(`http://localhost:9005/repo/getbyprofile/?username=${user.username}&pageNo=${page}&sortBy=${sortBy}`, {
                hasLanguage: "",
                hasTopic: selectedOption,
            });
            // Process the API response as needed
            const dataArray = response.data.content;
            setRepos(dataArray);
            console.log("data", dataArray)
        } catch (error) {
            console.error('Error calling API:', error);
        }
    };

    const handleSortChange = async (event) => {
        setSortBy(event.target.value)
        console.log(sortBy)
        
        
        try {
            
            if(isLang){
                console.log(lang)
                const response = await axios.post(`http://localhost:9005/repo/getbyprofile/?username=${user.username}&pageNo=${page}&sortBy=${event.target.value}`, {
                    hasLanguage: lang,
                    hasTopic: "",
                });
                // Process the API response as needed
                const dataArray = response.data.content;
                setRepos(dataArray);
                console.log("data", dataArray)

            }else if(!isLang){
                const response = await axios.post(`http://localhost:9005/repo/getbyprofile/?username=${user.username}&pageNo=${page}&sortBy=${event.target.value}`, {
                    hasLanguage: "",
                    hasTopic: topic,
                });
                // Process the API response as needed
                const dataArray = response.data.content;
                setRepos(dataArray);
                console.log("data", dataArray)

            }else{
                console.log("lang", lang)
                console.log("topic", topic)
                const response = await axios.post(`http://localhost:9005/repo/getbyprofile/?username=${user.username}&pageNo=${page}&sortBy=${event.target.value}`, {
                    hasLanguage: "",
                    hasTopic: "",
                });
                // Process the API response as needed
                const dataArray = response.data.content;
                setRepos(dataArray);
                console.log("data", dataArray)

            }

        } catch (error) {
            console.error('Error calling API:', error);
        }

    }

    const handleFilterChange = (event) => {
        const val = event.target.value;
        if(val == "Languages"){
            setIsLang(true)
        }else{
            setIsLang(false)
        }

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


                const response = await axios.post(`http://localhost:9005/repo/getbyprofile/?username=${user.username}&pageNo=${page}&sortBy=${sortBy}`, {
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

    useEffect(() => {

    }, [lang])

    const handleCardClick = (cardData) => {
        setCardData(cardData); // Set the selected card data
        setModalVisible(true); // Open the modal
    };

    return (
        <>           
            <div >
                {
                    repos ? (
                        <div>
                          
                          <header style={{ padding: "5px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h1 style={{ paddingLeft: "20px" }} className="text-2xl tracking-tight text-pink-200">Recommended Projects</h1>
                            <div style={{ paddingRight: "20px" }}>
                                <label style={{ color: "pink" }}>Filter By:</label>
                                <select style={{ color: "pink", background: "#2a1433" }} onChange={handleFilterChange}>
                                <option value="" style={{ color: "pink", background: "#2a1433" }}>Select an option</option>
                                <option value="Languages" style={{ color: "pink", background: "#2a1433" }}>Languages</option>
                                <option value="Topics" style={{ color: "pink", background: "#2a1433" }}>Topics</option>
                                </select>
                                {filterBy === "Languages" && (
                                <div>
                                    <label style={{ color: "pink" }}>Filter by language  :</label>
                                    <select style={{ color: "pink", background: "#2a1433" }} id="mySelect" onChange={handleSelectlanguageChange}>
                                    <option style={{ color: "pink", background: "#2a1433" }} value="">Select an option</option>
                                    {languagesfilter.map((option, index) => (
                                        <option style={{ color: "pink", background: "#2a1433" }} key={index} value={option.languageName}>
                                        {option.languageName}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                                )}
                                {filterBy === "Topics" && (
                                <div>
                                    <label style={{ color: "pink", background: "#2a1433" }}  className="text-pink-200">Filter by Topic</label>  {/* Style changed to match "Recommended Projects" */}
                                    <select style={{ color: "pink", background: "#2a1433" }} id="mySelect" onChange={handleSelecttopicChange} className="text-pink-200">  {/* Style changed to match "Recommended Projects" */}
                                    <option style={{ color: "pink", background: "#2a1433" }} value="">Select an option</option>
                                    {topicsfilter.map((option, index) => (
                                        <option key={index} value={option.topicname}>
                                        {option.topicname}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                                )}
                            </div>

                            <div>
                                <label style={{ color: "pink", background: "#2a1433" }} className="text-pink-200">Sort By</label>  {/* Style changed to match "Recommended Projects" */}
                                <select style={{ color: "pink", background: "#2a1433" }}  id="mySelect" onChange={handleSortChange} className="text-pink-200">  {/* Style changed to match "Recommended Projects" */}
                                <option style={{ color: "pink", background: "#2a1433" }} value="">Select an option</option>
                                <option style={{ color: "pink", background: "#2a1433" }} value="stars">by popularity</option>
                                <option style={{ color: "pink", background: "#2a1433" }} value="size">by size</option>
                                <option style={{ color: "pink", background: "#2a1433" }}  value="forks">most contributed</option>
                                <option style={{ color: "pink", background: "#2a1433" }}  value="createdAt">newestFirst</option>
                                </select>
                            </div>
                            </header>


                            <div style={{ position: 'fixed', left: '200px', width: 'calc(100% - 200px)', height: '100vh', overflowY: 'auto', paddingBottom:"50px", borderRadius: "25px", padding: "50px",paddingRight:"300px", background: "#ebc9e1"}}>
                                {/* {repos.map((item, index) => (
                                    <div onClick={handleCardClick} key={index} className="mb-4">
                                        <Cards data={item} />
                                    </div>
                                ))} */}
                                {repos.map((item, index) => (
                                    <div key={index} className="mb-4">
                                        <div onClick={() => handleCardClick(item)}>
                                            <Cards data={item} />
                                        </div>
                                    </div>
                                ))}

                            <Pagination nextPage={nextPage} prevPage={prevPage} />

                            </div>

                        </div>
                    ) : <Spinner />
                }

                <Modal
                    title={
                        <div style={{ background: "#ab5781"}} >
                            <Typography variant="h5" style={{ color:"white"}}className="mb-4 uppercase font-bold font-sans-serif">
                                {cardData?.name}
                            </Typography>
                        </div>
                    }
                    visible={modalVisible} // Visibility controlled by modalVisible state
                    onCancel={() => setModalVisible(false)} // Function to handle modal closing
                    footer={null} // Hide the footer
                >          
                <div style={{ background: "rgb(235 171 193)", color: "#713d71", borderRadius: "10px"}}  className="p-4" >
                <Typography style={{fontSize:"17px", color:"rgb(147 0 86 / 88%)"}}  className="mb-2 font-bold font-sans-serif">
                        {cardData?.description}
                    </Typography>
                    <Typography color="#8b3a56" className="mb-2 font-bold font-sans-serif">
                        Language : {cardData?.language}
                    </Typography>

                    <div style={{color:"#8b3a56" }} className="w-full flex space-x-4">
                        <Typography color="#8b3a56" className="mb-2 font-bold font-sans-serif flex-grow">
                            Stars : {cardData?.stars}
                        </Typography>
                        <Typography color="#8b3a56" className="mb-2 font-bold font-sans-serif flex-grow">
                            Forks : {cardData?.forks}
                        </Typography>
                        <Typography color="#8b3a56" className="mb-2 font-bold font-sans-serif flex-grow">
                            Size : {cardData?.size}
                        </Typography>
                    </div>

                    <Typography color="#8b3a56" className="mb-2 font-bold font-sans-serif">
                        Website :<a href={cardData?.homepage} target="_blank" rel="noopener noreferrer">
            {cardData?.homepage}
          </a>
                    </Typography>
                    
                    <Typography color="#8b3a56" className="mb-2 font-bold font-sans-serif">
                        Topics:
                        <ul>
                            {cardData?.topics.match(/'([^']+)'/g).map((topic, index) => (
                                <li key={index}>{topic.replace(/'/g, '')}</li>
                            ))}
                        </ul>
                    </Typography>


                    <a href={cardData?.url} target="_blank" className="">
                        <button style={{ background: "#bb6583"}} className=" hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            See More
                        </button>
                    </a>
                    </div>          
                        
                </Modal>
            </div>
        </>
    )
}

export default Dashboard
