// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { stompClient, isStompConnected } from '../Constants/StompClient';
// import { UsernameContext } from '../Context/UsernameContext';
// import { useSelector, useDispatch } from 'react-redux'
// import { toast } from 'react-toastify'
// import { login , reset } from '../features/auth/authSlice'
// import { Spinner } from '@material-tailwind/react';
// const Login = () => {

//     const [formData, setFormData] = useState({
//         username: '',
//         password: '',
//     })

//     const { username, password } = formData

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     // const navigate = useNavigate();
//     const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

//     useEffect(() => {

//         if (isError) {
//             toast.error(message)
//         }

//         if (isSuccess) {
//             navigate('/dashboard')
//         }

//         dispatch(reset())

//     }, [user, isError, isSuccess, navigate, dispatch])

//     const onChange = (e) => {
//         setFormData((prevState) => ({
//             ...prevState,
//             [e.target.name]: e.target.value,
//         }))
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // var user=usercontext.username

//         const userData = {
//             username,
//             password
//         }

//         dispatch(login(userData))

//         var name = user?.username
//         const userObject = {
//             senderId: name,
//             content: `user ${name} have joined the chat`
//         };

//         stompClient.send(
//             '/app/user.addUser',
//             JSON.stringify(userObject),
//             {});


//         // navigate('/chat');
//     };

//     if(isLoading){
//         return <Spinner/>
//     }


//     return (

//         <>
     
//   <body className='h-full bg-blue-100'>


//         <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-blue-100">
//             <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//                 <img
//                     className="mx-auto h-10 w-auto"
//                     src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//                     alt="Your Company"
//                 />
//                 <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//                     Sign in to your account
//                 </h2>
//             </div>

//             <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//                 <form className="space-y-6 bg-white pl-5 pr-5 pt-8 pb-8 rounded-sm" onSubmit={handleSubmit}>
//                 <div>
//                         <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
//                             Username
//                         </label>
//                         <div className="mt-2">
//                             <input
//                                 id="username"
//                                 name="username"
//                                 type="username"
//                                 value={formData.name}
//                                 onChange={onChange}
//                                 autoComplete="username"
//                                 required
//                                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                             />
//                         </div>
//                     </div>


//                     <div>
//                         <div className="flex items-center justify-between">
//                             <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
//                                 Password
//                             </label>
//                             <div className="text-sm">
//                                 <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
//                                     Forgot password?
//                                 </a>
//                             </div>
//                         </div>
//                         <div className="mt-2">
//                             <input
//                                 id="password"
//                                 name="password"
//                                 type="password"
//                                 value={formData.password}
//                                 onChange={onChange}
//                                 autoComplete="current-password"
//                                 required
//                                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                             />
//                         </div>
//                     </div>



//                     <div>
//                         <button
//                             type="submit"
//                             className="flex w-full justify-center rounded-md px-3 py-1.5 bg-blue-500 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                             style={{ backgroundColor: 'blue' }}
//                         >
//                             Sign in
//                         </button>
//                     </div>
//                 </form>

//                 <p className="mt-10 text-center text-sm text-gray-500">
//                     Not a member?{' '}
//                     <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
//                         Start a 14 day free trial
//                     </a>
//                 </p>
//             </div>
//         </div>
//         </body>
//     </>
//     );
// };

// export default Login;






import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Form, Row, Col, Card, Layout } from 'antd';
import { login, reset } from '../features/auth/authSlice';
import { Spinner } from '@material-tailwind/react';
import { toast } from 'react-toastify';
import { stompClient } from '../Constants/StompClient';

const { Header, Content } = Layout;

const Login = () => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
            setIsLoading(false);
            alert('Enter correct username or password');
        }
        if (isSuccess) {
            navigate('/dashboard');
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onFinish = async (values) => {
        setIsLoading(true);
        try {
            await dispatch(login(values));
            // const name = user?.username;
            // const userObject = {
            //     senderId: name,
            //     content: `user ${name} has joined the chat`
            // };
            // stompClient.send(
            //     '/app/user.addUser',
            //     JSON.stringify(userObject),
            //     {}
            // );
        } catch (error) {
            console.error('Error signing in:', error);
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <Header style={{ zIndex: 9 }} className="login-navbar">
                <a style={{ fontSize: "30px", color: "pink" }} onClick={() => { navigate("/") }}>OpenGenics</a>
                <div className="navbar-buttons">
                    <a style={{ color: "violet", marginLeft: "-80px" }} onClick={() => { navigate("/#features") }} href="#features" className="navbar-button">
                        Features
                    </a>
                    <a style={{ color: "violet" }} onClick={() => { navigate("/#advantages") }} className="navbar-button">
                        Advantages and Use Cases
                    </a>
                </div>
                <Button style={{ color: "pink", border: "none" }} disabled className="login-button">
                </Button>
            </Header>

            <Content>
                <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#2a1433' }}>
                    <Col span={24} md={12} lg={8}>
                        <Card
                            style={{
                                borderRadius: 15,
                                background: '#4a0074',
                                boxShadow: `#c900c9 4px 4px 12px 3px, 
        #5ca4c1 -4px -4px 12px 3px, 
        rgba(177, 49, 250, 0.5) 0px 0px 20px 6px inset`,
                                padding: '1rem',
                                color: 'white',
                                border: 'none',
                                marginTop: "60px",
                                marginBottom: "60px"
                            }}
                        >
                            <div style={{ textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <span style={{ fontSize: "35px", color: "rgb(242 215 255)" }}>Sign in to your account</span>
                            </div>
                            <Form
                                form={form}
                                onFinish={onFinish}
                                layout="vertical"
                            >
                                 <span style={{ fontSize: "15px", color: "white" }}>Username</span>
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input />
                                </Form.Item>


                                <span style={{ fontSize: "15px", color: "white" }}>Password</span>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item>
                                    <Button style={{ background: "purple"}} type="default" ghost htmlType="submit" block loading={isLoading}>
                                        Sign in
                                    </Button>
                                </Form.Item>
                            </Form>
                            <p style={{ textAlign: 'center' }}>
                                Not a member? {' '}
                                <a href="#">Start a 14 day free trial</a>
                            </p>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default Login;
