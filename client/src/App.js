import './App.css';
import BodyCard from './components/BodyCard';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import OtpForm from './components/OtpForm';
import SignupForm from './components/SignupForm';
import Footer from './components/Footer';
import Offline from './components/Offline';
import useOnline from './utils/useOnline';
import { Outlet } from 'react-router-dom';

function App() {

  const online=useOnline();

  if(!online)
  return <Offline/>

  return (
    <div className="App">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default App;
