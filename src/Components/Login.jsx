import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stompClient, isStompConnected } from '../Constants/StompClient';
import { UsernameContext } from '../Context/UsernameContext';
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { login , reset } from '../features/auth/authSlice'
import { Spinner } from '@material-tailwind/react';
const Login = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const { username, password } = formData

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

    useEffect(() => {

        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            navigate('/dashboard')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // var user=usercontext.username

        const userData = {
            username,
            password
        }

        dispatch(login(userData))

        var name = user?.username
        const userObject = {
            senderId: name,
            content: `user ${name} have joined the chat`
        };

        stompClient.send(
            '/app/user.addUser',
            JSON.stringify(userObject),
            {});


        // navigate('/chat');
    };

    if(isLoading){
        return <Spinner/>
    }


    return (

        <>
        {/*
    This example requires updating your template:

    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  */}
  <body className='h-full bg-blue-100'>


        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-blue-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6 bg-white pl-5 pr-5 pt-8 pb-8 rounded-sm" onSubmit={handleSubmit}>
                <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="username"
                                value={formData.name}
                                onChange={onChange}
                                autoComplete="username"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>


                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={onChange}
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>



                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md px-3 py-1.5 bg-blue-500 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            style={{ backgroundColor: 'blue' }}
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Start a 14 day free trial
                    </a>
                </p>
            </div>
        </div>
        </body>
    </>



        // <div>
        //     <h1>Hello {user.nickname} </h1>
        //     <button className="bg-blue-500 text-white rounded-md px-2 py-1 border border-blue-700" onClick={submitdata}>
        //         Submit
        //     </button>
        // </div>
    );
};

export default Login;
