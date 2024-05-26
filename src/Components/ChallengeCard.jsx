// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

// import { useSelector, useDispatch } from 'react-redux'
// import axios from 'axios'
// import {
//     Card,
//     CardHeader,
//     CardBody,
//     Typography,
//     Button,
// } from "@material-tailwind/react";


// const ChallengeCard = ({ data }) => {

//     const navigate = useNavigate();
//     const { user } = useSelector((state) => state.auth)
//     // const initalData = data;
//     const navigation = [
//         { name: 'See More', href: data?.githubUrl },
//         { name: 'Update', }

//     ]

//     const updateCard = () => {
//         navigate('/updatechallenge', { state: { initialData: data } });
//     }


//     const deleteCard = async (e) => {
//         // http://localhost:9005/challenges/${formData.id}
//         e.preventDefault();
//         try {
//             await axios.delete(`http://localhost:9005/challenges/${data.id}`);
//             console.log('Deleted resource');
//             window.location.reload();
//             // Handle success, update UI or show notification
//         } catch (error) {
//             console.error('Error updating data:', error);
//             // Handle error, show error message
//         }
//     }

//     return (
//         <Card style={{ maxWidth: '60rem', marginLeft: '50px' }}>

//             {data !=[] ?<>
//                 <div style={{ background: "#bb6583"}} className=" pl-3 pt-3 rounded-tl-xl rounded-tr-xl">
//                 <Typography variant="h5" color="white" className="mb-4 uppercase font-bold font-sans-serif">
//                     {data?.nameChallenge}
//                 </Typography>
//             </div>
//             <CardBody style={{ background: "rgb(235 171 193)", color: "#713d71"}}  className="p-4 rounded-br-md rounded-bl-md">

//                 <Typography variant="h5" color="blue-gray" className="mb-2 font-bold font-sans-serif">
//                     {data?.description}
//                 </Typography>
//                 <Typography variant="h5" color="blue-gray" className="mb-2 font-bold font-sans-serif">
//                     {data?.problemStatement}
//                 </Typography>

//                 <div style={{color:"#8b3a56" }} className="w-full flex space-x-4">
//                     <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
//                         Organization : {data?.nameOfOrganization}
//                     </Typography>
//                     <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
//                         Language : {data?.language}
//                     </Typography>
//                     <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
//                         Prize Amount : {data?.prize}
//                     </Typography>
//                 </div>

//                 <div className="w-full flex space-x-4">
//                     <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
//                         Max People Allowed: {data?.maxPeopleinTeam}
//                     </Typography>
//                     <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
//                         Min People Allowed : {data?.minPeopleinTeam}
//                     </Typography>
//                     <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
//                         {
//                             data?.isBounty ? 'Bounties on winning' : data?.isHiring ? 'Hiring chances on winning' : null
//                         }
//                     </Typography>
//                 </div>


//                 <div className="w-full flex space-x-4">
//                     <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
//                         Starting on : {data?.startDateAndTime}
//                     </Typography>
//                     <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
//                         Ending on : {data?.endDateAndTime}
//                     </Typography>
//                 </div>

//                 <div   className="w-full flex space-x-4">
//                     <a href={data?.githubUrl} target="_blank" className="">
//                         <button  style={{ background: "#bb6583"}} className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                             See More
//                         </button>
//                     </a>

//                     {
//                         user.isOrganization
//                             ?
//                             <div>
//                                 {/* <a onClick={updateCard} target="_blank" className="" >
//                                     <button  style={{ background: "#bb6583"}} className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                                         Update
//                                     </button>
//                                 </a>
//                                 <a onClick={deleteCard} target="_blank" className="">
//                                     <button  style={{ background: "red"}} className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                                         Delete
//                                     </button>
//                                 </a> */}
//                             </div>
//                             :
//                             null

//                     }
//                 </div>

//             </CardBody>
            
//             </> :
//                             <div style={{ textAlign: 'center', padding: '50px', width:"300px", height:"500px",background:"black", color: 'white' }}>No challenges here</div>

//             }
           


//         </Card>
//     )
// }

// export default ChallengeCard

//--------------

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
    Card,
    Typography,
    CardBody,
    Button,
} from "@material-tailwind/react";

const ChallengeCard = ({ data, setShowCreateChallenge, isFromManage }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const updateCard = () => {
        navigate('/dashboard', { state: { initialData: data } });
        setShowCreateChallenge("update")
    }

    const deleteCard = async (e) => {
        e.preventDefault();
        const userConfirmed = window.confirm("Are you sure you want to delete?");
        if (userConfirmed) {
          try {
            await axios.delete(`http://localhost:9005/challenges/${data.id}`);
            console.log('Deleted resource');
            setShowCreateChallenge("manage");
          } catch (error) {
            console.error('Error deleting data:', error);
          }
        }
      };

    if (!data || Object.keys(data).length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', width: "300px", height: "500px", background: "black", color: 'white' }}>
                No challenges here
            </div>
        );
    }

    return (
        <Card style={{ maxWidth: '60rem', marginLeft: '50px' }}>
            <div style={{ background: "#bb6583" }} className="pl-3 pt-3 rounded-tl-xl rounded-tr-xl">
                <Typography variant="h5" color="white" className="mb-4 uppercase font-bold font-sans-serif">
                    {data.nameChallenge}
                </Typography>
            </div>
            <CardBody style={{ background: "rgb(235 171 193)", color: "#713d71" }} className="p-4 rounded-br-md rounded-bl-md">
                <Typography variant="h5" color="blue-gray" className="mb-2 font-bold font-sans-serif">
                    {data.description}
                </Typography>
                <Typography variant="h5" color="blue-gray" className="mb-2 font-bold font-sans-serif">
                    {data.problemStatement}
                </Typography>
                <div style={{ color: "#8b3a56" }} className="w-full flex space-x-4">
                    <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
                        Organization: {data.nameOfOrganization}
                    </Typography>
                    <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
                        Language: {data.language}
                    </Typography>
                    <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
                        Prize Amount: {data.prize}
                    </Typography>
                </div>
                <div className="w-full flex space-x-4">
                    <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
                        Max People Allowed: {data.maxPeopleinTeam}
                    </Typography>
                    <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
                        Min People Allowed: {data.minPeopleinTeam}
                    </Typography>
                    <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
                        {data.isBounty ? 'Bounties on winning' : data.isHiring ? 'Hiring chances on winning' : null}
                    </Typography>
                </div>
                <div className="w-full flex space-x-4">
                    <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
                        Starting on: {data.startDateAndTime}
                    </Typography>
                    <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
                        Ending on: {data.endDateAndTime}
                    </Typography>
                </div>
                <div className="w-full flex space-x-4">
                    <a href={data.githubUrl} target="_blank" rel="noopener noreferrer">
                        <button style={{ background: "#bb6583" }} className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            See More
                        </button>
                    </a>
                    {isFromManage && (
                        <>
                            <button onClick={updateCard} style={{ background: "rgb(251 140 16)" }} className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Update
                            </button>
                            <button onClick={deleteCard} style={{ background: "red" }} className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}

export default ChallengeCard;


//'''''''''''''''''''''''''''''''''''

// import React from 'react';
// import {useNavigate} from 'react-router-dom'
// import { Card, Typography, Button } from 'antd';
// import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
// import axios from 'axios';

// const { Meta } = Card;

// const ChallengeCard = ({ data }) => {
//     const navigate = useNavigate();

//     const deleteCard = async () => {
//         try {
//             await axios.delete(`http://localhost:9005/challenges/${data.id}`);
//             console.log('Deleted resource');
//             window.location.reload();
//             // Handle success, update UI or show notification
//         } catch (error) {
//             console.error('Error updating data:', error);
//             // Handle error, show error message
//         }
//     }
//         const updateCard = () => {
//         navigate('/updatechallenge', { state : { initialData : data} });
//     }

//     return (
//         <Card
//             style={{ maxWidth: '60rem', marginLeft: '15rem' }}
//             cover={
//                 <img
//                     alt="example"
//                     src="https://example.com"
//                 />
//             }
//             actions={[
//                 <Button type="link" icon={<EyeOutlined />} href={data?.githubUrl} target="_blank">See More</Button>,
//                 <Button type="link" icon={<EditOutlined />} onClick={updateCard}>Update</Button>,
//                 <Button type="link" icon={<DeleteOutlined />} onClick={deleteCard}>Delete</Button>,
//             ]}
//         >
//             <Meta
//                 title={data?.nameChallenge}
//                 description={
//                     <>
//                         <Typography.Paragraph>{data?.description}</Typography.Paragraph>
//                         <Typography.Paragraph>{data?.problemStatement}</Typography.Paragraph>
//                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                             <Typography.Text>Organization: {data?.nameOfOrganization}</Typography.Text>
//                             <Typography.Text>Language: {data?.language}</Typography.Text>
//                             <Typography.Text>Prize Amount: {data?.prize}</Typography.Text>
//                         </div>
//                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                             <Typography.Text>Max People Allowed: {data?.maxPeopleinTeam}</Typography.Text>
//                             <Typography.Text>Min People Allowed: {data?.minPeopleinTeam}</Typography.Text>
//                             <Typography.Text>
//                                 {data?.isBounty ? 'Bounties on winning' : data?.isHiring ? 'Hiring chances on winning' : null}
//                             </Typography.Text>
//                         </div>
//                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                             <Typography.Text>Starting on: {data?.startDateAndTime}</Typography.Text>
//                             <Typography.Text>Ending on: {data?.endDateAndTime}</Typography.Text>
//                         </div>
//                     </>
//                 }
//             />
//         </Card>
//     );
// }

// export default ChallengeCard;
