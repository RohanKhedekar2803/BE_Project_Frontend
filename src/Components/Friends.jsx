import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

const Friends = () => {

    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)

    const fetchLanguagesAndTopics = async () => {
        try {
            const response = await axios.get(`http://localhost:9005/user/getRecommendedFriends/${user.username}`);
            setFriends(response.data)
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching languages or topics:', error);
        }
    };
    
    useEffect(() => {
        fetchLanguagesAndTopics();

    }, [])

  return (
    <div>
    Hello
    </div>
  )
}

export default Friends
