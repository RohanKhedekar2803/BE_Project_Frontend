
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Cards from './Cards';
import axios from 'axios';
import Pagination from './Pagination';
import ChallengeCard from './ChallengeCard';
import CreateChallenge from './CreateChallenge';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NoDataSVG from './NoDataSvg';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}


const ManageChallenges = ({setShowCreateChallenge}) => {

    const [repos, setRepos] = useState([]);
    // const [showCreateChallenge, setShowCreateChallenge] = useState(false);
    const { user } = useSelector((state) => state.auth)
    const isFromManage = true;
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:9005/challenges/getOrganizationsChallenges/${user.username}`);
            console.log('Response:', response.data);
            const res = response.data;
            setRepos(res);
            console.log('data: ', repos);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();

    }, [user]);

  return (
    <>
    <div >
 

        <div style={{ position: 'fixed', left: '200px', width: 'calc(100% - 200px)', height: '100vh', overflowY: 'auto', paddingBottom:"50px", borderRadius: "25px" }} >
        
            <>
                <div  style={{ padding: "50px", background: "#ebc9e1", borderRadius: "25px"}} >
                {repos.length === 0 ? (
                                <div style={{ paddingLeft:"100px", maxWidth:"850px"}}>
                                   <NoDataSVG  />
                                </div>
                               
                            ) : (
                                repos.map((item, index) => (
                                    <div key={index} className="mb-4">
                                        <ChallengeCard setShowCreateChallenge={setShowCreateChallenge} isFromManage={isFromManage} data={item} />
                                    </div>
                                ))
                            )}


                </div>
            </>


        </div>
        
    </div>
</>
  )
}

export default ManageChallenges
