import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
// import { BrowserView, MobileView } from 'react-device-detect';
import Main from './MainPage/Main';
import Boddari from './boddari';
import Signup from './MainPage/User/Signup';
import Login from './MainPage/User/Login';

import './App.scss';
import BottomNavBar from './BottomNavBar';

function App() {
  return (
    <div className='App'>
      <div className='tempNavBar'>
        <Link to="/">Main</Link>
        <Link to="/Boddari">보따리만들기</Link>
        <Link to="/Login">로그인</Link>
      </div>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path="/Boddari" element={<Boddari />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
      </Routes>
      <BottomNavBar/>
    </div>
  );
}

export default App;
