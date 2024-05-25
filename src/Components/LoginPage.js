// import React from 'react';
// import { Layout, Button } from 'antd';
// import { useNavigate } from 'react-router-dom'
// const { Header, Content } = Layout;

// const Login = () => {

//   const navigate = useNavigate();
//   const handleLogin = () => {
//     console.log('Login button clicked');
//   };

//   const handleRegister = () => {
//     navigate('/register')
//   }

//   return (
//     <Layout>
//       <Header className="login-navbar">
//         <a href="#opengenics" style={{ fontSize: "100px", color: "pink" }} >OpenGenics</a>
//         <div className="navbar-buttons">
//           <a style={{ color: "violet" }} href="#features" className="navbar-button">
//             Features
//           </a>
//           <a style={{ color: "violet" }} href="#advantages" className="navbar-button">
//             Advantages and Use Cases
//           </a>
//         </div>
//         <Button style={{color: "pink" }} type="primary" onClick={handleLogin} className="login-button">
//           Login
//         </Button>
//         <Button style={{color: "pink" }} type="primary" onClick={handleRegister} className="login-button">
//           Register
//         </Button>
//       </Header>
//       <Content>
//       <img id="opengenics" src="/images/img1.png" alt="Feature 1" />
//         <div id="features" >
//           <img src="/images/img2.png" alt="Feature 2" />
//           <img src="/images/img3.png" alt="Advantage 1" />
//         </div>
//         <div id="advantages">
//           <img src="/images/img4.png" alt="Advantage 2" />
//         </div>
//       </Content>
//     </Layout>
//   );
// };

// export default Login;


import React from 'react';
import { Layout, Button } from 'antd';
import { Animator, ScrollContainer, ScrollPage, batch, Fade,FadeUp, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
import { useNavigate } from 'react-router-dom'
import video from '../assets/landingpage3.mp4';

const { Header, Content } = Layout;



const Login = () => {

  const navigate = useNavigate();
  const handleLogin = () => {
    console.log('Login button clicked');
  };

  const handleRegister = () => {
    navigate('/register')
  }
  const handleSignin = () => {
    navigate('/login')
  }

  const ZoomOutScrollIN = batch(StickyIn(), FadeIn(), ZoomIn());
  const ZoomInScrollOut = batch(StickyOut(), FadeIn(), ZoomOut(),  );
  const changeXandY = batch(
    StickyOut(), 
    Move(ZoomOut(-10, 100, -100), -10, -500) // Move to top-right after centered
  );

  return (
    <Layout>
      < Header style={{ zIndex: 9}} className="login-navbar">
        <a href="/" style={{ fontSize: "30px", color: "pink" }} >OpenGenics</a>
        <div className="navbar-buttons">
          <a style={{ color: "violet" }} href="#features" className="navbar-button">
            Features
          </a>
          <a style={{ color: "violet" }} href="#advantages" className="navbar-button">
            Advantages and Use Cases
          </a>
        </div>
        
        <div>
        <Button style={{color: "pink" }} type="primary" onClick={handleRegister} className="login-button">
          Register
        </Button>
        <Button style={{color: "pink" }} type="primary" onClick={handleSignin} className="login-button">
          Sign In
        </Button>
        </div>
        
      </Header>
      <Content  style={{ backgroundColor: "#2a1433"}}>
      {/* <img id="opengenics" src="/images/img1.png" alt="Feature 1" />
        <div id="features" >
          <img src="/images/img2.png" alt="Feature 2" />
          <img src="/images/img3.png" alt="Advantage 1" />
        </div>
        <div id="advantages">
          <img src="/images/img4.png" alt="Advantage 2" />
        </div> */}
        
        <ScrollContainer>
  <ScrollPage style={{ backgroundColor: "#2a1433"}} >
    <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -250))}>
      <span className=" bg-gradient-to-r from-white  to-purple-400 inline-block text-transparent text-center bg-clip-text text-9xl font-bold h-52 w-screen "> OpenGenics <br/> 
      <p className="text-6xl pt-10  text-purple-500  ">A Platform for Open Source Developers </p> 
      <p className="text-base text-pink-300  " style={{ maxWidth: "700px", margin: "0 auto", paddingTop: "70px"  }} >A Platform combining the benefits of Github Features, Social Networking, and communication for Open Source Developers. Manage your Projets, Network with your peers, discover Opportunities and create communities with our unique approach.</p>  </span>
    </Animator>
  </ScrollPage>
  <ScrollPage >
 
   <Animator animation={ZoomInScrollOut} className="flex  justify-center items-center ">
       <span style={{ width: "100%", transform: 'translateZ(0px) translateX(0%) translateY(0%)', position: 'relative', zIndex: 0  }}>
        <video style={{ borderRadius: "50px"}} src={video} autoPlay loop className="h-auto border-2 border-purple-950 overflow-clip">
         </video>
       </span>
       </Animator> 
      </ScrollPage>
      {/* <Animator animation={ZoomInScrollOut} className="flex justify-center items-center h-screen"> 
      <span className=" relative " style={{ transform: 'translateZ(0px) translateX(0%) translateY(0%)', zIndex: -20 ,  }}>
        <video src={video} autoPlay loop className="h-auto border-2 border-purple-950 overflow-clip">
        </video>
      </span>
      </Animator>
      <Animator animation={ZoomInScrollOut} className="flex justify-center items-center h-screen">
      <span style={{ transform: 'translateZ(0px) translateX(250%) translateY(150%)', position: 'relative', zIndex: 2}}>
        <video src={video} autoPlay loop className="h-auto border-2 border-purple-950 overflow-clip">
        </video>
       
      </span>
      </Animator>
      <Animator animation={ZoomInScrollOut} className="flex justify-center items-center h-screen">
      <span style={{ transform: 'translateZ(-150px) translateX(150%) translateY(-150%)', position: 'relative', zIndex: -20 }}>
        <video src={video} autoPlay loop className="h-auto border-2 border-purple-950 overflow-clip">
        </video>
      </span>
      </Animator>
      <Animator animation={ZoomInScrollOut} className="flex justify-center items-center h-screen">
      <span style={{ transform: 'translateZ(-150px) translateX(-450%) translateY(-150%)', position: 'relative', zIndex: -20 }}>
        <video src={video} autoPlay loop className="h-auto border-2 border-purple-950 overflow-clip">
        </video>
      </span>
      </Animator> */}
      {/* <Animator animation={ZoomOutScrollIN} className="flex justify-center items-center h-screen">
      <span style={{ transform: 'translateZ(-150px) translateX(50%)', position: 'relative', zIndex: -20  }}>
        <video src={video} autoPlay loop className="h-auto border-2 border-purple-950 overflow-clip">
        </video>
      </span>
      </Animator> */}
      {/* <Animator animation={ZoomOutScrollIN} className="flex justify-center items-center h-screen">
      <span style={{ transform: 'translateZ(-150px) translateX(50%)', position: 'relative', zIndex: -20  }}>
        <video src={video} autoPlay loop className="h-auto border-2 border-purple-950 overflow-clip">
        </video>
      </span>
      </Animator>
      <Animator animation={ZoomOutScrollIN} className="flex justify-center items-center h-screen">
      <span style={{ transform: 'translateZ(-150px) translateX(50%)', position: 'relative', zIndex: -20  }}>
        <video src={video} autoPlay loop className="h-auto border-2 border-purple-950 overflow-clip">
        </video>
      </span>
      </Animator>
      
      <Animator animation={ZoomOutScrollIN} className="flex justify-center items-center h-screen">
      <span style={{ transform: 'translateZ(-150px) translateX(50%)', position: 'relative', zIndex: -20  }}>
        <video src={video} autoPlay loop className="h-auto border-2 border-purple-950 overflow-clip">
        </video>
      </span>
    </Animator> */}

  
  <ScrollPage>
    <Animator animation={batch(StickyIn(), FadeIn())}>
    <span class="text-purple-500 text-9xl flex justify-center" >OpenGenics</span>
    </Animator>
  </ScrollPage>
  <ScrollPage style={{ backgroundColor: "#2a1433"}}>
    <div id="features" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} >
      <span style={{ fontSize: "40px",margin: "100px" }}>
        <Animator animation={MoveIn(-1000, 0)}><img src="/images/img2.png" alt="Feature 2" /></Animator>
        
      </span>
    </div>
  </ScrollPage>
  <ScrollPage style={{ backgroundColor: "#2a1433"}}>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} >
      <span style={{ fontSize: "40px" ,margin: "100px"}}>
        <Animator animation={MoveIn(1000, 0)}><img src="/images/img3.png" alt="Feature 2" /></Animator>
              </span>
    </div>
  </ScrollPage>
  <ScrollPage style={{ backgroundColor: "#2a1433"}}>
    <div id="advantages"  style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} >
      <span style={{ fontSize: "40px",margin: "100px" }}>

        <Animator animation={MoveIn(-1000, 0)}><img src="/images/img4.png" alt="Feature 2" /></Animator>
      </span>
    </div>
  </ScrollPage>
  <ScrollPage style={{ backgroundColor: "linear-gradient(to bottom, white, #2a1433)", color: "#ff599c" }}>
  <Animator animation={batch(Fade(), Sticky())}>
    <p style={{ fontSize: "40px", textAlign: "center" }}>Developed by the team of</p>
    <ul style={{color: "pink", fontSize: "24px", textAlign: "center", listStyle: "none", padding: 0, margin: 0 }}>
      <li>Pranit Kittad</li>
      <li>Manasi Darade</li>
      <li>Rohan Khedekar</li>
      <li>Vaibhav Gadhave</li>
    </ul>
  </Animator>
</ScrollPage>

</ScrollContainer>

      <div className="flex flex-col items-center justify-center h-screen pb-20 bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">
          Support Open Source Development
        </h1>
        <p className="text-2xl">Contribute to GitHub Projects</p>
        <div className="pt-10">
          <Button onClick={handleRegister} type='primary' style={{ border: "1px solid white"}}>
            Login
          </Button>
        </div>
      </div>
      
      {/* <div className=" bg-slate-400 h-screen ">
        <div className="flex h-5/6 pl-20 pr-20 pt-10 ">
          <div className="w-1/2  p-4 ease-in-out bg-gradient-to-t from-white to-white hover:to-lime-100">
            <h2 className="text-xl font-bold">Gitsplit Grants</h2>
            <p className="text-2xl pt-5">Get funding & grow your ecosystem </p>
            <p className="pb-3">
              Participate in our quartely grants programfor open-source &
              impact-oriented projects.
            </p>
            <button className="border-2  rounded-md border-black p-1 ">
              view Grants{" "}
            </button>
          </div>
          <div className="w-1/2  p-4 ease-in-out bg-gradient-to-t from-white to-white hover:to-blue-100">
            <h2 className="text-xl font-bold">Grant Program</h2>
            <p className="text-2xl pt-5">Launch & grow your grants program </p>
            <p className="pb-3">
              Easily manage your onchine program with our customizable grants
              solution .
            </p>
            <button className="border-2  rounded-md border-black p-1 ">
              view Grants{" "}
            </button>
          </div>
        </div>
      </div> */}
      </Content>
    </Layout>
  );
};

export default Login;
