// import React, { useEffect, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { register, reset } from '../features/auth/authSlice'
// import Spinner from './Spinner'

// const Register = () => {

//     const [formData, setFormData] = useState({
//         username: '',
//         password: '',
//         nickname: '',
//         isOrganization: false,
//         status: "Offline"
//     })

//     const { username, password, nickname, isOrganization, status } = formData

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

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

//     const handleCheckBox = (e) => {
//         setFormData((prevState) => ({
//             ...prevState,
//             [e.target.name]: e.target.checked
//         }))
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()

//         const userData = {
//             username,
//             password,
//             nickname,
//             isOrganization,
//             status
//         }

//         dispatch(register(userData))
//     }

//     if (isLoading) {
//         return <Spinner />
//     }


//     return (

//         <>
//             {/*
//         This example requires updating your template:

//         ```
//         <html class="h-full bg-white">
//         <body class="h-full">
//         ```
//       */}
//             <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-blue-100">
//                 <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//                     <img
//                         className="mx-auto h-10 w-auto"
//                         src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//                         alt="Your Company"
//                     />
//                     <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//                         Sign in to your account
//                     </h2>
//                 </div>

//                 <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//                     <form className="space-y-6 bg-white pl-5 pr-5 pt-8 pb-8 rounded" onSubmit={handleSubmit}>
//                     <div>
//                             <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
//                                 Username
//                             </label>
//                             <div className="mt-2">
//                                 <input
//                                     id="username"
//                                     name="username"
//                                     type="username"
//                                     value={formData.name}
//                                     onChange={onChange}
//                                     autoComplete="username"
//                                     required
//                                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-gray-900">
//                                 Nick name
//                             </label>
//                             <div className="mt-2">
//                                 <input
//                                     id="nickname"
//                                     name="nickname"
//                                     type="nickname"
//                                     value={formData.nickname}
//                                     onChange={onChange}
//                                     autoComplete="nickname"
//                                     required
//                                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                                 />
//                             </div>
//                         </div>


//                         <div>
//                             <div className="flex items-center justify-between">
//                                 <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
//                                     Password
//                                 </label>
//                                 <div className="text-sm">
//                                     <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
//                                         Forgot password?
//                                     </a>
//                                 </div>
//                             </div>
//                             <div className="mt-2">
//                                 <input
//                                     id="password"
//                                     name="password"
//                                     type="password"
//                                     value={formData.password}
//                                     onChange={onChange}
//                                     autoComplete="current-password"
//                                     required
//                                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             <div className="relative flex gap-x-3">
//                                 <div className="flex h-6 items-center">
//                                     <input
//                                         id="isOrganization"
//                                         name="isOrganization"
//                                         checked={formData.isOrganization}
//                                         onChange={handleCheckBox}
//                                         type="checkbox"
//                                         className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                                     />
//                                 </div>
//                                 <div className="text-sm leading-6">
//                                     <label htmlFor="isOrganization" className="font-medium text-gray-900 text-md">
//                                         Are you an organization ?
//                                     </label>
//                                     {/* <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p> */}
//                                 </div>
//                             </div>
//                         </div>

//                         <div>
//                             <button
//                                 type="submit"
//                                 className="flex w-full justify-center rounded-md px-3 py-1.5 bg-blue-500 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                                 style={{ backgroundColor: 'blue' }}
//                             >
//                                 Sign in
//                             </button>
//                         </div>
//                     </form>

//                     <p className="mt-10 text-center text-sm text-gray-500">
//                         Not a member?{' '}
//                         <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
//                             Start a 14 day free trial
//                         </a>
//                     </p>
//                 </div>
//             </div>
//         </>
//     )
// }


// export default Register
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import { Input, Button, Checkbox, Form, Row, Col, Card, Typography, Layout  } from 'antd';
import Spinner from './Spinner';

const { Header, Content } = Layout;

const { Title } = Typography;

const Register = () => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        nickname: '',
        isOrganization: false,
        status: "Offline"
    });

    const { username, password, nickname, isOrganization, status } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            navigate('/dashboard');
        }
        dispatch(reset());
    }, [user, isError, isSuccess, navigate, dispatch]);

    // const onFinish = (values) => {
    //   console.log("values", values)
    //     dispatch(register(values));
    // };
    const onFinish = (values) => {
      console.log("values", values);
      const updatedValues = { ...values, isOrganization: formData.isOrganization };
      dispatch(register(updatedValues));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // const handleCheckBox = (e) => {
    //     setFormData((prevState) => ({
    //         ...prevState,
    //         isOrganization: e.target.checked
    //     }));
    //     console.log("formData",formData)
    //     console.log("e.target.checked",e.target.checked)
    // };
    const handleCheckBox = (e) => {
      const isChecked = e.target.checked;
      setFormData((prevState) => ({
        ...prevState,
        isOrganization: isChecked
      }));
      // Update form data as well
      form.setFieldsValue({ isOrganization: isChecked });
              console.log("formData",formData)
        console.log("e.target.checked",e.target.checked)
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
      <Layout>
        < Header style={{ zIndex: 9}} className="login-navbar">
        <a  style={{ fontSize: "30px", color: "pink" }} onClick={()=> { navigate("/")}} >OpenGenics</a>
        <div className="navbar-buttons">
          <a style={{ color: "violet" , marginLeft: "-80px"}} onClick={()=> { navigate("/#features")}} href="#features" className="navbar-button">
            Features
          </a>
          <a style={{ color: "violet" }} onClick={()=> { navigate("/#advantages")}} className="navbar-button">
            Advantages and Use Cases
          </a>
        </div>
        
        <Button style={{color: "pink", border: "none" }} disabled className="login-button">
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
        marginTop:"60px",
        marginBottom:"60px"
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* <img
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
          style={{ width: '10rem', marginBottom: '1rem' }} // Add margin for spacing
        /> */}
        <span style={{ fontSize: "35px", color: "rgb(242 215 255)" }}>Register new account</span>
      </div>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <span style={{ fontSize: "15px", color: "white" }}>Username</span>
        <Form.Item
          // label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <span style={{ fontSize: "15px", color: "white" }}>Nickname</span>
        <Form.Item
          // label="Nickname"
          name="nickname"
          rules={[{ required: true, message: 'Please input your nickname!' }]}
        >
          <Input />
        </Form.Item>

        <span style={{ fontSize: "15px", color: "white" }}>Password</span>
        <Form.Item
          // label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Checkbox
            name="isOrganization"
            checked={isOrganization}
            onChange={handleCheckBox}
          >
            <span style={{ fontSize: "15px", color: "white" }}>Are you an Organization?</span>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="default" htmlType="submit" style={{ background: "purple"}} ghost block>
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

export default Register;