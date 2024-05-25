// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import axios from 'axios';

// const Friends = () => {

//     const [friends, setFriends] = useState([]);
//     const navigate = useNavigate();
//     const { user } = useSelector((state) => state.auth)

//     const fetchLanguagesAndTopics = async () => {
//         try {
//             const response = await axios.get(`http://localhost:9005/user/getRecommendedFriends/${user.username}`);
//             setFriends(response.data)
//             console.log(response.data)
//         } catch (error) {
//             console.error('Error fetching languages or topics:', error);
//         }
//     };
    
//     useEffect(() => {
//         fetchLanguagesAndTopics();

//     }, [])

//   return (
//     <div>
//     Hello
//     </div>
//   )
// }

// export default Friends
//


//===-=0=0=0=0=0===0=0=0=0=0=0=0=0=0=0=0=0=0=0=0=0=0=0=0=


// import React, { useState, useEffect } from 'react';
// import { Table, Col, Card, Row } from 'antd';
// import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux'

// const Friends = () => {
//   const [recommendedFriends, setRecommendedFriends] = useState([]);
//   const { user } = useSelector((state) => state.auth)

//   useEffect(() => {
//     const fetchRecommendedFriends = async () => {
//       try {
//         const response = await axios.get(`http://localhost:9005/user/getRecommendedFriends/${user.username}`);
//         setRecommendedFriends(response.data);
//       } catch (error) {
//         console.error('Error fetching recommended friends:', error);
//       }
//     };

//     fetchRecommendedFriends();
//   }, []); // Empty dependency array to only run once on component mount

//   const renderCards = () => {
//     return recommendedFriends.map((item, index) => (
//       <Col key={index} span={10} style={{ marginBottom: '16px' }}>
//         <Card title={item.username}>
//           <p>Nickname: {item.nickname}</p>
//           <p>Favourite Languages: {item.favouriteLanguages}</p>
//           <p>Favourite Topic: {item.favouriteTopic}</p>
//           <p>Is Organization: {item.isOrganization ? 'Yes' : 'No'}</p>
//         </Card>
//       </Col>
//     ));
//   };

//   return (
//     <div style={{ padding: '20px', paddingRight: '60px' }}>
//       <h1 className="text-2xl tracking-tight text-pink-200">Recommended Friends</h1>
//       <Row gutter={[16, 16]}>{renderCards()}</Row>
//     </div>
//   );
// };

// export default Friends;


// import React, { useState, useEffect } from 'react';
// import { Table, Col, Card, Row } from 'antd';
// import axios from 'axios';

// const Friends = () => {
//   const dummyData = [
//     {
//       "username": "VaishnavGhenge",
//       "nickname": "stringsss",
//       "favouriteLanguages": null,
//       "favouriteTopic": null,
//       "isOrganization": true
//     }
//   ];

//   const [userImages, setUserImages] = useState({});

//   useEffect(() => {
//     const fetchUserImages = async () => {
//       try {
//         const images = await Promise.all(
//           dummyData.map(async (item) => {
//             const response = await axios.get(`https://api.github.com/users/${item.username}`);
//             return { username: item.username, image: response.data.avatar_url };
//           })
//         );
//         const userImageMap = images.reduce((acc, curr) => {
//           acc[curr.username] = curr.image;
//           return acc;
//         }, {});
//         setUserImages(userImageMap);
//       } catch (error) {
//         console.error('Error fetching user images:', error);
//       }
//     };

//     fetchUserImages();
//   }, []); // Empty dependency array to only run once on component mount

//   const renderCards = () => {
//     return dummyData.map((item, index) => (
//       <Col key={index} span={8} style={{ marginBottom: '16px' }}>
//         <a href={`https://github.com/${item.username}`} target="_blank" rel="noopener noreferrer">
//           <Card
//             // cover={}
//             title={item.username}
//             style={{ cursor: 'pointer', backgroundColor:"rgb(141 108 141)" , width:"330px", borderRadius:"25px"}}
//           >
//             <img src={userImages[item.username]} alt={`${item.username}'s GitHub profile`} style={{ borderRadius: "25px", display: "flex", justifySelf: "center" }} />
          
//           </Card>
//         </a>
//       </Col>
//     ));
//   };

//   return (
//     <div style={{ padding: '10px'   }}>
//       {/* <h1 className="text-2xl tracking-tight text-pink-200">Recommended Friends</h1> */}
//         <header style={{padding:"5px", display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
//             <h1 style={{ paddingLeft:"20px"}} className="text-2xl tracking-tight text-pink-200">Recommended Friends</h1>
//         </header>
//      <div style={{ position: 'fixed', left: '200px', width: 'calc(100% - 200px)', height: '100vh', overflowY: 'auto', paddingBottom:"50px", borderRadius: "25px", padding: "50px", background: "#ebc9e1"}}>
//         <Row gutter={[16, 16]}>{renderCards()}</Row>
//       </div>
//     </div>
//   );
// };

// export default Friends;


//=0=0=0=0=0=0=0=0=0=0=0=0=0=0=0=0=0=0=0=0=

// import React, { useState, useEffect } from 'react';
// import { Col, Card, Row } from 'antd';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const Friends = () => {
//   const [recommendedFriends, setRecommendedFriends] = useState([]);
//   const { user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const fetchRecommendedFriends = async () => {
//       try {
//         const response = await axios.get(`http://localhost:9005/user/getRecommendedFriends/${user.username}`);
//         setRecommendedFriends(response.data);
//       } catch (error) {
//         console.error('Error fetching recommended friends:', error);
//       }
//     };

//     fetchRecommendedFriends();
//   }, [user.username]); // Dependency array with user.username to re-fetch data when the username changes

//   const renderCards = () => {
//     return recommendedFriends.map((item, index) => (
//       <Col key={index} span={10} style={{ marginBottom: '16px' }}>
//         <Card title={item.username}>
//           <p>Nickname: {item.nickname}</p>
//           <p>Favourite Languages: {item.favouriteLanguages}</p>
//           <p>Favourite Topic: {item.favouriteTopic}</p>
//           <p>Is Organization: {item.isOrganization ? 'Yes' : 'No'}</p>
//         </Card>
//       </Col>
//     ));
//   };

//   return (
//     <div style={{ padding: '20px', paddingRight: '60px' }}>
//       <h1 className="text-2xl tracking-tight text-pink-200">Recommended Friends</h1>
//       <Row gutter={[16, 16]}>{renderCards()}</Row>
//     </div>
//   );
// };

// export default Friends;


import React, { useState, useEffect } from 'react';
import { Table, Col, Card, Row } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Friends = () => {
  const [recommendedFriends, setRecommendedFriends] = useState([]);
  const [userImages, setUserImages] = useState({});
  const { user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    const fetchRecommendedFriends = async () => {
      try {
        const response = await axios.get(`http://localhost:9005/user/getRecommendedFriends/${user.username}`);
        setRecommendedFriends(response.data);

        // Fetch user images for recommended friends
        const images = await Promise.all(
          response.data.map(async (friend) => {
            const imageResponse = await axios.get(`https://api.github.com/users/${friend.username}`);
            return { username: friend.username, image: imageResponse.data.avatar_url };
          })
        );
        const userImageMap = images.reduce((acc, curr) => {
          acc[curr.username] = curr.image;
          return acc;
        }, {});
        setUserImages(userImageMap);
      } catch (error) {
        console.error('Error fetching recommended friends:', error);
      }
    };

    fetchRecommendedFriends();
  }, []); // Empty dependency array to only run once on component mount

  const renderCards = () => {
    return recommendedFriends.map((friend, index) => (
      <Col key={index} span={8} style={{ marginBottom: '16px' }}>
        <a href={`https://github.com/${friend.username}`} target="_blank" rel="noopener noreferrer">
          <Card
            style={{ cursor: 'pointer', backgroundColor: "rgb(141 108 141)", width: "330px", borderRadius: "25px", textAlign: "center" }}
          >            
          <img src={userImages[friend.username]} alt={`${friend.username}'s GitHub profile`} style={{ borderRadius: "25px", display: "flex", justifySelf: "center" }} />
            <p style={{ color: 'white', fontSize: "17px", paddingTop:"10px" }}>{friend.username}</p>
          </Card>
        </a>
      </Col>
    ));
  };

  return (
    <div style={{ padding: '10px' }}>
      <header style={{ padding: "5px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ paddingLeft: "20px" }} className="text-2xl tracking-tight text-pink-200">Recommended Friends</h1>
      </header>
      <div style={{ position: 'fixed', left: '200px', width: 'calc(100% - 200px)', height: '100vh', overflowY: 'auto', paddingBottom: "250px", borderRadius: "25px", padding: "50px", background: "#ebc9e1" }}>
        <Row gutter={[16, 16]}>{renderCards()}</Row>
      </div>
    </div>
  );
};

export default Friends;