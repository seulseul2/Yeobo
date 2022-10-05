import React from "react";
import { Route, Routes, Link } from "react-router-dom";
// import { BrowserView, MobileView } from 'react-device-detect';

import Boddari from "./Boddari/Boddari";
import BoddariSave from "./Boddari/BoddariSave";
import Main from "./MainPage/Main";
import Signup from "./MainPage/User/Signup";
import Login from "./MainPage/User/Login";
import GoogleLogin from "./MainPage/User/GoogleLogin";
import Mypage from "./MyPage/Mypage";
import Search from "./Search/Search";
import Detail from '../pages/component/Detail';
import TestAPI from "./TestAPI";
import "../assets/styles/App.scss";
import BottomNavBar from "./BottomNavBar";
import BoddariDetail from './Boddari/BoddariDetail';
import Page404 from "./Page404";

function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          {/* 로그인+비로그인 */}
          <Route path="/" element={<Main />} />
          <Route path="/Search" element={<Search />}></Route>
          <Route path="/Google" element={<GoogleLogin />}></Route>

          {/* 비로그인 */}
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route
            path="/Detail"
            element={<Detail />}
          ></Route>

          {/* 로그인 */}
          <Route path="/Mypage" element={<Mypage />}></Route>
          <Route path="/SaveBoddari" element={<BoddariSave/>}></Route>
          <Route path='/Search' element={<Search/>}></Route>
          <Route path='/Detail/:attractionId' element={<Detail/>}></Route>
          <Route path='/testapi' element={<TestAPI/>}></Route>
          <Route path='/Betail/:BoddariId'element={<BoddariDetail/>}></Route>
          <Route path="/Boddari" element={<Boddari />}></Route>
          <Route path="/SaveBoddari" element={<BoddariSave />}></Route>
          <Route path="/testapi" element={<TestAPI />}></Route>

          {/* 그 외 404 */}
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <Page404 />
              </main>
            }
          />
        </Routes>
      </div>
      <BottomNavBar />
    </div>
  );
}

export default App;
