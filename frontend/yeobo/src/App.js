import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
// import { BrowserView, MobileView } from 'react-device-detect';
import Main from './MainPage/Main';
import Boddari from './Boddari';

import './App.css';
import BottomNavBar from './BottomNavBar';

function App() {
  return (
    <div className='App'>
      <Link to="/">Main</Link>
      <Link to="/Boddari">보따리만들기</Link>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path="/Boddari" element={<Boddari />}></Route>
      </Routes>
      <BottomNavBar/>
    </div>
  );
}

export default App;
