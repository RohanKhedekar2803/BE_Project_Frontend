import React, { useState } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios'
const UpdateChallenge = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState(location?.state?.initialData)

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
          window.location.reload();
          // Handle success, update UI or show notification
        } catch (error) {
          console.error('Error updating data:', error);
          // Handle error, show error message
        }

    }
    
    // const data = location.state?.data

  return (
    <form onSubmit={handleSubmit}
    >
        <div className="border-2 mr-40 ml-40 mt-40 pt-5 pb-2 pl-5 pr-5 bg-blue-100">
            {/* <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    This information will be displayed publicly so be careful what you share.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="username"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="janesmith"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                            About
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="about"
                                name="about"
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                            />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                            Photo
                        </label>
                        <div className="mt-2 flex items-center gap-x-3">
                            <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                            <button
                                type="button"
                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                Change
                            </button>
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                            Cover photo
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

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

                    {/* <div className="sm:col-span-3">
        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
          Country
        </label>
        <div className="mt-2">
          <select
            id="country"
            name="country"
            autoComplete="country-name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
        </div>
      </div> */}

                    {/* <div className="col-span-full">
        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
          Street address
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="street-address"
            id="street-address"
            autoComplete="street-address"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div> */}

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
                            <input
                                type="text"
                                name="topics"
                                value={formData.topics}
                                onChange={onChange}

                                id="topics"
                                autoComplete="address-level2"
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                </div>

            </div>





            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900 mt-2">Other Details</h2>
                {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                    We'll always let you know about important changes, but you pick what else you want to hear about.
                </p> */}

                <div className="mt-4 space-y-10">
                    <fieldset>
                        {/* <legend className="text-sm font-semibold leading-6 text-gray-900"></legend> */}
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
                                    {/* <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p> */}
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
                                    {/* <p className="text-gray-500">Get notified when a candidate applies for a job.</p> */}
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
                                    {/* <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p> */}
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
                                    {/* <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p> */}
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    {/* <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                        <div className="mt-6 space-y-6">
                            <div className="flex items-center gap-x-3">
                                <input
                                    id="push-everything"
                                    name="push-notifications"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                    
                                </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <input
                                    id="push-email"
                                    name="push-notifications"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Same as email
                                </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <input
                                    id="push-nothing"
                                    name="push-notifications"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                    No push notifications
                                </label>
                            </div>
                        </div>
                    </fieldset> */}
                </div>
            </div>
        </div>

        <div className="mt-0 flex items-center justify-center gap-x-6 bg-blue-100 ml-40 mr-40 mb-40">
            <button type="button" className="text-md font-semibold leading-6 text-gray-900">
                Cancel
            </button>
            <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Save
            </button>
        </div>
    </form>
  )
}

export default UpdateChallenge
