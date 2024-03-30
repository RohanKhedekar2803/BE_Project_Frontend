import React from 'react'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import Cards from './Cards';
import axios from 'axios';
import Pagination from './Pagination';
import ChallengeCard from './ChallengeCard';

const navigation = [
    {name : 'Create Challenge', href : 'http://localhost:3000/createchallenge', current : false},
    {name : 'All challenges', href : '#', current : false},
    {name : 'Recommended Challenges', href : 'http://localhost:3000/challenge', current : false},

]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Challenge = () => {

    const [repos, setRepos] = useState([]);
    const [page, setPage] = useState(0);

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
                hasLanguage: "",
                hasTopic: "",
            });
            console.log('Response:', response.data);
            const res = response.data;
            setRepos(res);
            console.log("data: ", repos)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(()=> {
        fetchData(page)
    }, [page])


    return (

        <>
        <div className="min-h-full bg-blue-100">
            <Navbar />

            <header className="bg-blue-300 shadow h-15">
                {/* <div className="flex max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-x-4">
                        <p>Create Challenge</p>
                        <p>All challenges</p>
                        <p>Recommended Challenges</p>
                    </div> */}
                <div className="hidden md:block h-16 pt-3">
                    <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}

                                className={classNames(
                                    item.current
                                        ? 'bg-blue-500 text-white'
                                        : 'text-white hover:bg-blue-400 hover:text-white',
                                    'rounded-md px-3 py-2 font-sans-serif font-bold text-lg'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            </header>

            <div className="bg-blue-100 pt-6">
                        {repos.map((item, index) => ( 
                            <div key={index} className="mb-4">
                                <ChallengeCard data={item} />
                            </div>
                        ))}
                    </div>
                    <Pagination nextPage={nextPage} prevPage={prevPage} /> 

        </div>
        </>
    )
}

export default Challenge
