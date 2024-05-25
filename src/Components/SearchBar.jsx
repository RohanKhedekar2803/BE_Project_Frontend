import React, { useEffect, useState } from 'react'

const SearchBar = () => {

    const [selectedOption, setSelectedOption] = useState('');

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
        console.log(selectedOption)
        // Call your function here and pass event.target.value as the argument
        // For example: yourFunction(event.target.value);
    };

    const [input, setInput] = useState('');
  const handleChange = (event) => {
    setInput(event.target.value)
    console.log(event.target.value);
  };

  const handleClick = (event) => {
    console.log(input)
  }

  return (
    <div className="flex items-center">
                                <input
                                    
                                    type="text"
                                    name="input"
                                    id="input"
                                    value={input}
                                    onChange={handleChange}
                                    autoComplete="given-name"
                                    className="block rounded-md border-0 py-1.5 px-2 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-md sm:leading-6 ml-80 mt-4 mb-4"
                                    style={{ width: "600px" }} 
                                />
                                  <button
    className="z-[2] inline-block rounded-e border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out bg-blue-400"
    data-twe-ripple-init
    data-twe-ripple-color="white"
    type="button"
    id="button-addon3"
    onClick={handleClick}
    >
    Search
  </button>
      <div className="flex ml-5">
        <div className="flex items-center mb-1 mr-3">
          <input
                id="option1"
                name="options"
                value="Option 1"
                checked={selectedOption === 'Option 1'}
                onChange={handleRadioChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="option1"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Language
          </label>
        </div>
        <div className="flex items-center mb-1">
          <input
                id="option2"
                name="options"
                value="Option 2"
                checked={selectedOption === 'Option 2'}
                onChange={handleRadioChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="option2"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Topics
          </label>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
