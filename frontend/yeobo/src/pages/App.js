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
import DestinationDetail from "./Destination/DestinationDetail";
import TestAPI from "./TestAPI";
import "../assets/styles/App.scss";
import BottomNavBar from "./BottomNavBar";
import Page404 from "./Page404";

function App() {
  return (
    <div className="App">
      {/* <div className="tempNavBar">
        <Link to="/">Main</Link>
        <Link to="/Boddari">보따리만들기</Link>
        <Link to="/Search">Search</Link>
        <Link to="/Login">로그인</Link>
      </div> */}
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Boddari" element={<Boddari />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Mypage" element={<Mypage />}></Route>
          <Route path="/SaveBoddari" element={<BoddariSave />}></Route>
          <Route path="/Search" element={<Search />}></Route>
          <Route
            path="/DestinationDetail"
            element={<DestinationDetail />}
          ></Route>
          <Route path="/testapi" element={<TestAPI />}></Route>
          <Route path="/Google" element={<GoogleLogin />}></Route>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <Page404 />
              </main>
            }
          ></Route>
        </Routes>
      </div>
      {/* <div style={{ height: "80px;" }}>.</div> */}
      <BottomNavBar />
    </div>
  );
}

export default App;
