import React, { useState } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios'
const UpdateChallenge = ({setShowCreateChallenge}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState(location?.state?.initialData)
    const [topicsfilter, setTopics] = useState([]);


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleCheckBox = (e) => {
        const { name, checked } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: checked
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`http://localhost:9005/challenges/${formData.id}`, formData);
          console.log('Updated data:', response.data);
         setShowCreateChallenge("manage")
         alert("Successfully updated the Challenge")
        } catch (error) {
          console.error('Error updating data:', error);
          alert("Error while updating the challenge. Please try again")
        }

    }
    
    // const data = location.state?.data

    const handleSelecttopicChange = async (e) => {
        console.log("value", e.target.value);
        setFormData((prevState) => {
            const updatedTopics = Array.isArray(prevState.topics) ? 
                [...prevState.topics, e.target.value] : 
                [e.target.value];
            console.log("Updated topics:", updatedTopics);
            return {
                ...prevState,
                topics: updatedTopics
            };
        });
    };
    

  return (
    <form onSubmit={handleSubmit}
    >   <div style={{ padding: "50px", background: "rgb(165 113 177)", color:"white",borderRadius: "25px" }} >


    <div className="border-b border-gray-900/10 pb-12 text-base">
        <h2 className="text-3xl font-semibold leading-7 text-white">Update Your Challenge</h2>
        <p className="mt-2 text-xl leading-6 text-gray-200">Change the details below to update your challenge</p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
                <label htmlFor="nameOfOrganization" className="block text-md font-medium leading-6 text-white">
                    Name of Organization
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="nameOfOrganization"
                        id="nameOfOrganization"
                        value={formData.nameOfOrganization}
                        onChange={onChange}
                        autoComplete="given-name"
                        className="block text-purple-600  w-full rounded-md border-0 py-1.5 px-2 text-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-md sm:leading-6"
                    />
                </div>
            </div>

            <div className="sm:col-span-3">
                <label htmlFor="nameChallenge" className="block text-md font-medium leading-6 text-white">
                    Name of Challenge
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="nameChallenge"
                        id="nameChallenge"
                        value={formData.nameChallenge}
                        onChange={onChange}

                        autoComplete="family-name"
                        className="block w-full text-purple-600 rounded-md border-0 py-1.5 px-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="col-span-full">
                <label htmlFor="problemStatement" className="block text-md font-medium leading-6 text-white">
                    Problem Statement
                </label>
                <div className="mt-2">
                    <textarea
                        id="problemStatement"
                        name="problemStatement"
                        value={formData.problemStatement}
                        onChange={onChange}

                        rows={2}
                        className="block w-full text-purple-600  rounded-md border-0 py-1.5 px-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                    />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-200">Write a few sentences about your problem statement.</p>
            </div>

            <div className="col-span-full">
                <label htmlFor="description" className="block text-md font-medium leading-6 text-white">
                    Description
                </label>
                <div className="mt-2">
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={onChange}

                        rows={3}
                        className="block w-full text-purple-600 rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                    />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-200">Write a few sentences about yourself.</p>
            </div>

            <div className="sm:col-span-4">
                <label htmlFor="githubUrl" className="block text-md font-medium leading-6 text-white">
                    Github URL
                </label>
                <div className="mt-2">
                    <input
                        id="githubUrl"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={onChange}

                        type="githubUrl"
                        autoComplete="email"
                        className="block w-full text-purple-600 rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>



            <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="language" className="block text-md font-medium leading-6 text-white">
                    Language
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="language"
                        value={formData.language}
                        onChange={onChange}

                        id="language"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-purple-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="sm:col-span-2">
                <label htmlFor="startDateAndTime" className="block text-md font-medium leading-6 text-white">
                    Start Date & Time
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="startDateAndTime"
                        value={formData.startDateAndTime}
                        onChange={onChange}

                        id="startDateAndTime"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-purple-600  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="sm:col-span-2">
                <label htmlFor="endDateAndTime" className="block text-md font-medium leading-6 text-white">
                    End Date & Time
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="endDateAndTime"
                        value={formData.endDateAndTime}
                        onChange={onChange}

                        id="endDateAndTime"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-purple-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                    />
                </div>
            </div>



        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="maxPeopleinTeam" className="block text-md font-medium leading-6 text-white">
                    Maximum people
                </label>
                <div className="mt-2">
                    <input
                        type="number"
                        name="maxPeopleinTeam"
                        value={formData.maxPeopleinTeam}
                        onChange={onChange}

                        id="maxPeopleinTeam"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 px-2 text-purple-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="sm:col-span-2">
                <label htmlFor="minPeopleinTeam" className="block text-mdfont-medium leading-6 text-white">
                    Minimum people
                </label>
                <div className="mt-2">
                    <input
                        type="number"
                        name="minPeopleinTeam"
                        value={formData.minPeopleinTeam}
                        onChange={onChange}

                        id="minPeopleinTeam"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-purple-600  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="sm:col-span-2">
                <label htmlFor="salaryPerYear" className="block text-md font-medium leading-6 text-white">
                    Salary Per Year
                </label>
                <div className="mt-2">
                    <input
                        type="number"
                        name="salaryPerYear"
                        value={formData.salaryPerYear}
                        onChange={onChange}

                        id="salaryPerYear"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-purple-600  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="theme" className="block text-md font-medium leading-6 text-white">
                    Theme
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="theme"
                        value={formData.theme}
                        onChange={onChange}

                        id="theme"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-purple-600  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="sm:col-span-2">
                <label htmlFor="prize" className="block text-md font-medium leading-6 text-white">
                    Prize Money
                </label>
                <div className="mt-2">
                    <input
                        type="number"
                        name="prize"
                        value={formData.prize}
                        onChange={onChange}

                        id="prize"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-purple-600  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="sm:col-span-2">
                <label htmlFor="topics" className="block text-md font-medium leading-6 text-white">
                    Topics
                </label>
                <div className="mt-2">
                    {/* <input
                        type="text"
                        name="topics"
                        value={formData.topics}
                        onChange={onChange}
                        id="topics"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    /> */}
                    <div style={{ }}>
                        <label style={{ color:"white" }}>Filter by Topic   :</label>
                        <select style={{ color:"pink", background:"#2a1433" }} id="mySelect" onChange={handleSelecttopicChange} >
                            <option style={{ color:"pink", background:"#2a1433" }} value="">Select an option</option>
                            {topicsfilter.map((option, index) => (
                                <option style={{ color:"pink", background:"#2a1433" }} key={index} value={option.topicname}>
                                    {option.topicname}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-white mt-2">Other Details</h2>
     

        <div className="mt-4 space-y-10">
            <fieldset>
                <div className="mt-4 space-y-6">
                    <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input
                                id="isBounty"
                                name="isBounty"
                                checked={formData.isBounty}
                                
                                onChange={handleCheckBox}

                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="isBounty" className="font-medium text-white text-md">
                                Bounty
                            </label>
                        </div>
                    </div>
                    <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input
                                id="isHiring"
                                name="isHiring"
                                checked={formData.isHiring}
                                onChange={handleCheckBox}

                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="isHiring" className="font-medium text-white text-md">
                                Hiring
                            </label>
                            
                        </div>
                    </div>
                    <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input
                                id="isHackathon"
                                name="isHackathon"
                                checked={formData.isHackathon}
                                onChange={handleCheckBox}

                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="isHackathon" className="font-medium text-white text-md">
                                Hackathon
                            </label>
                        </div>
                    </div>
                    <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input
                                id="isSolo"
                                name="isSolo"
                                checked={formData.isSolo}
                                onChange={handleCheckBox}

                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="isSolo" className="font-medium text-white text-md">
                                Solo Challenge
                            </label>
                        </div>
                    </div>
                </div>
            </fieldset>
         
        </div>
    </div> */}

    <div>
        <label style={{ color: "white" }}>Select type of Challenge  : </label>
        <select style={{ color: "pink", background: "#2a1433" }} id="mySelect" onChange={onChange} name='challengeType' value={formData.challengeType}>
            <option style={{ color: "pink", background: "#2a1433" }} value="">Select an option</option>
            <option style={{ color: "pink", background: "#2a1433" }} value="isHackathon">Hackathon</option>
            <option style={{ color: "pink", background: "#2a1433" }} value="isBounty">Bounty</option>
            <option style={{ color: "pink", background: "#2a1433" }} value="isHiring">Hiring</option>
            <option style={{ color: "pink", background: "#2a1433" }} value="isSolo">Solo</option>
        </select>
    </div>

    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "40px" }}>
        <button style={{ background:'grey'}} class="px-4 py-2 m-1  hover:bg-grey-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-white rounded-md" type="button" onClick={()=>setShowCreateChallenge('all')} >
            Cancel
        </button>
        <button  class="px-4 py-2 m-1 bg-black hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-white rounded-md" type="submit"  >
            Save
        </button>
    </div>

</div>
    </form>
  )
}

export default UpdateChallenge
