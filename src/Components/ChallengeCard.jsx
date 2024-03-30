import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";


const ChallengeCard = ({ data }) => {

    const navigate = useNavigate();
    // const initalData = data;
    const navigation = [
        { name: 'See More', href: data?.githubUrl },
        { name: 'Update', }

    ]

    const updateCard = () => {
        navigate('/updatechallenge', { state : { initialData : data} });
    }


    const deleteCard = async (e) => {
        // http://localhost:9005/challenges/${formData.id}
        e.preventDefault();
        try {
          await axios.delete(`http://localhost:9005/challenges/${data.id}`);
          console.log('Deleted resource');
          window.location.reload();
          // Handle success, update UI or show notification
        } catch (error) {
          console.error('Error updating data:', error);
          // Handle error, show error message
        }
    }

    return (
        <Card style={{ maxWidth: '60rem', marginLeft: '15rem' }}>
            {/* <CardHeader
  shadow={false}
  floated={false}
  className="m-0 w-2/5 shrink-0 rounded-r-none"
>
  <img
    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
    alt="card-image"
    className="h-full w-full object-cover"
  />
</CardHeader> */}


            <div className="bg-blue-400 pl-3 pt-3 rounded-tl-md rounded-tr-md">
                <Typography variant="h5" color="gray" className="mb-4 uppercase font-bold font-sans-serif">
                    {data?.nameChallenge}
                </Typography>
            </div>
            <CardBody className="p-4 bg-white rounded-br-md rounded-bl-md">

                <Typography variant="h5" color="blue-gray" className="mb-2 font-bold font-sans-serif">
                    {data?.description}
                </Typography>
                <Typography variant="h5" color="blue-gray" className="mb-2 font-bold font-sans-serif">
                    {data?.problemStatement}
                </Typography>

                <div className="w-full flex space-x-4">
                    <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
                        Organization : {data?.nameOfOrganization}
                    </Typography>
                    <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
                        Language : {data?.language}
                    </Typography>
                    <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
                        Prize Amount : {data?.prize}
                    </Typography>
                </div>

                <div className="w-full flex space-x-4">
                    <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
                        Max People Allowed: {data?.maxPeopleinTeam}
                    </Typography>
                    <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
                        Min People Allowed : {data?.minPeopleinTeam}
                    </Typography>
                    <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
                        {
                            data?.isBounty ? 'Bounties on winning' : data?.isHiring ? 'Hiring chances on winning' : null
                        }
                    </Typography>
                </div>


                <div className="w-full flex space-x-4">
                    <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
                        Starting on : {data?.startDateAndTime}
                    </Typography>
                    <Typography color="gray" className="mb-2 font-bold font-sans-serif flex-grow">
                        Ending on : {data?.endDateAndTime}
                    </Typography>
                </div>

                <div className="w-full flex space-x-4">
                    <a href={data?.githubUrl} target="_blank" className="">
                        <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            See More
                        </button>
                    </a>
                    <a onClick={updateCard} target="_blank" className="">
                        <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Update
                        </button>
                    </a>
                    <a onClick={deleteCard} target="_blank" className="">
                        <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </a>
                </div>

            </CardBody>


        </Card>
    )
}

export default ChallengeCard
