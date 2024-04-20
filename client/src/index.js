import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router ,createBrowserRouter , RouterProvider} from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import OtpForm from './components/OtpForm';
import Navbar from './components/Navbar';
import JobCard from './components/JobCard';
import BodyCard from './components/BodyCard';
import Applyjob from './components/Applyjob';
import ContactUs from './components/ContactUs';
import CreateJob from './components/CreateJob';



const root = ReactDOM.createRoot(document.getElementById('root'));
const approuter=createBrowserRouter([
  {
    path:"/",
    element:<SignupForm/>,
    // errorElement:<Error/>,
  },
  {
    path:'/login',
    element:<LoginForm/>
  },
  {
    path:'/otp',
    element:<OtpForm/>
  },
  {
    path:'/app',
    element:<App/>,
    children:[
      {
        path:'/app',
        element:<BodyCard/>
      },
      {
        path:'/app/applyjob',
        element:<Applyjob/>
      },
      {
        path:'/app/contact',
        element:<ContactUs/>
      },
      {
        path:'/app/createjob',
        element:<CreateJob/>
      }
    ]
  }
])



root.render(
  <React.StrictMode>
    <RouterProvider router={approuter}/>
  </React.StrictMode>
);