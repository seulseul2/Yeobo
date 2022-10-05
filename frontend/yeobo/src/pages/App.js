import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
// import { BrowserView, MobileView } from 'react-device-detect';
import Boddari from './Boddari/Boddari';
import BoddariSave from './Boddari/BoddariSave';
import Main from './MainPage/Main';
import Signup from './MainPage/User/Signup';
import Login from './MainPage/User/Login';
import Mypage from './MyPage/Mypage';
import Search from './Search/Search';
import Detail from '../pages/component/Detail';
import TestAPI from './TestAPI';
import '../assets/styles/App.scss';
import BottomNavBar from './BottomNavBar';
import BoddariDetail from './Boddari/BoddariDetail';

function App() {
  return (
    <div className='App'>
      <div className='tempNavBar'>
        <Link to="/">Main</Link>
        <Link to="/Boddari">보따리만들기</Link>
        <Link to="/Search">Search</Link>
        <Link to="/Login">로그인</Link>
      </div>
      <div>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path="/Boddari" element={<Boddari />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Mypage" element={<Mypage />}></Route>
          <Route path="/SaveBoddari" element={<BoddariSave/>}></Route>
          <Route path='/Search' element={<Search/>}></Route>
          <Route path='/Detail/:attractionId' element={<Detail/>}></Route>
          <Route path='/testapi' element={<TestAPI/>}></Route>
          <Route path='/Betail/:BoddariId'element={<BoddariDetail/>}></Route>
        </Routes>
      </div>
      {/* <div style="height: 80px;">.</div> */}
      <BottomNavBar/>
    </div>
  );
}

export default App;
