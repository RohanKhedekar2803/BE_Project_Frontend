import React from 'react'
import Navbar from './Navbar'

const navigation = [
    {name : 'Create Challenge', href : 'http://localhost:3000/createchallenge', current : false},
    {name : 'All challenges', href : '#', current : false},
    {name : 'Recommended Challenges', href : 'http://localhost:3000/challenge', current : false},

]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Challenge = () => {
    return (

        <div>
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
        </div>
    )
}

export default Challenge
