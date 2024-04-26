
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux'



export default function CreateChallenge() {
    const { user } = useSelector((state) => state.auth)


    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        createdBy: user.username,
        nameOfOrganization: '',
        nameChallenge: '',
        problemStatement: '',
        description: '',
        githubUrl: '',
        language: '',
        topics: [],
        startDateAndTime: '',
        endDateAndTime: '',
        createdAt: '',
        minPeopleinTeam: 0,
        maxPeopleinTeam: 0,
        salaryPerYear: 0,
        theme: '',
        prize: 0,
        challengeType : "",
        relatedLinks: [
            "string"
          ],
    });
    const [topicsfilter, setTopics] = useState([]);



    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleCheckBox = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.checked
        }))
    }

    const postChallenge = async (data) => {
        console.log(data)
        try {
            const response = await axios.post(`http://localhost:9005/challenges/save/${user.username}`,data );
            console.log('Response:', response)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // http://localhost:9005/challenges/save
    //     postChallenge(formData)
    //     navigate('/challenge')
    //     console.log(formData)
    // }
    const stringifyArrayWithSingleQuotes = (arr) => {
        return '[' + arr.map(item => `'${item}'`).join(', ') + ']';
      };
      
      const handleSubmit = (e) => {
        e.preventDefault();
        const topicsString = stringifyArrayWithSingleQuotes(formData.topics); // Convert topics array to string
        const updatedFormData = { ...formData, topics: topicsString }; // Update formData with the stringified topics
        postChallenge(updatedFormData);
        console.log(updatedFormData);
      };
      

    const fetchLanguagesAndTopics = async () => {
        try {
            const topics = await axios.get(`http://localhost:9005/utils/gettopics`);
            setTopics(topics.data)
            console.log(topics.data)
        } catch (error) {
            console.error('Error fetching languages or topics:', error);
        }
    };
    useEffect(() => {
        fetchLanguagesAndTopics()
    }, [])
    


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
        >
            <div style={{ padding: "50px", background: "#ebc9e1", borderRadius: "25px" }} >


                <div className="border-b border-gray-900/10 pb-12 text-base">
                    <h2 className="text-3xl font-semibold leading-7 text-gray-900">Create a challenge</h2>
                    <p className="mt-2 text-xl leading-6 text-gray-600">Fill in the below deails to create a new challenge</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="nameOfOrganization" className="block text-md font-medium leading-6 text-gray-900">
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
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-md sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="nameChallenge" className="block text-md font-medium leading-6 text-gray-900">
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
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="problemStatement" className="block text-md font-medium leading-6 text-gray-900">
                                Problem Statement
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="problemStatement"
                                    name="problemStatement"
                                    value={formData.problemStatement}
                                    onChange={onChange}

                                    rows={2}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-md font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={onChange}

                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="githubUrl" className="block text-md font-medium leading-6 text-gray-900">
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
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>



                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="language" className="block text-md font-medium leading-6 text-gray-900">
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
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="startDateAndTime" className="block text-md font-medium leading-6 text-gray-900">
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
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="endDateAndTime" className="block text-md font-medium leading-6 text-gray-900">
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
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                />
                            </div>
                        </div>



                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="maxPeopleinTeam" className="block text-md font-medium leading-6 text-gray-900">
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
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="minPeopleinTeam" className="block text-mdfont-medium leading-6 text-gray-900">
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
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="salaryPerYear" className="block text-md font-medium leading-6 text-gray-900">
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
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="theme" className="block text-md font-medium leading-6 text-gray-900">
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
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="prize" className="block text-md font-medium leading-6 text-gray-900">
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
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="topics" className="block text-md font-medium leading-6 text-gray-900">
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
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                /> */}
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
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900 mt-2">Other Details</h2>
                 

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
                                        <label htmlFor="isBounty" className="font-medium text-gray-900 text-md">
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
                                        <label htmlFor="isHiring" className="font-medium text-gray-900 text-md">
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
                                        <label htmlFor="isHackathon" className="font-medium text-gray-900 text-md">
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
                                        <label htmlFor="isSolo" className="font-medium text-gray-900 text-md">
                                            Solo Challenge
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                     
                    </div>
                </div> */}

                <div>
                    <label style={{ color: "pink" }}>Select type of Challenge</label>
                    <select style={{ color: "pink", background: "#2a1433" }} id="mySelect" onChange={onChange} name='challengeType' value={formData.challengeType}>
                        <option style={{ color: "pink", background: "#2a1433" }} value="">Select an option</option>
                        <option style={{ color: "pink", background: "#2a1433" }} value="isHackathon">Hackathon</option>
                        <option style={{ color: "pink", background: "#2a1433" }} value="isBounty">Bounty</option>
                        <option style={{ color: "pink", background: "#2a1433" }} value="isHiring">Hiring</option>
                        <option style={{ color: "pink", background: "#2a1433" }} value="isSolo">Solo</option>
                    </select>
                </div>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "40px" }}>
                    <button type="button" style={{ backgroundColor: "#ccc", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer", marginRight: "10px" }}>
                        Cancel
                    </button>
                    <button type="submit" style={{ backgroundColor: "purple", padding: "10px 20px", borderRadius: "5px", color: "white", border: "none", cursor: "pointer" }}>
                        Save
                    </button>
                </div>

            </div>


        </form>
    )
}


