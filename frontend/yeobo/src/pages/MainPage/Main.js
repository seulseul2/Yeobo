import "./Main.scss";
import MainTop from "./MainTop";
import MainRecom from "./MainRecom";
import MainBoddari from "./MainBoddari";
import MainPopularBoddari from "./MainPopularBoddari";
import MainThisMonth from "./MainThisMonth";
import React, { useEffect } from "react";

const Main = () => {
  useEffect(() => {
    console.log("컴포넌트 화면에 나타남");
    return () => {
      console.log("컴포넌트가 화면에서 사라짐");
    };
  }, []);
  return (
    <div className="Main back">
      <MainTop />
      <MainRecom />
      <MainBoddari />
      <MainPopularBoddari />
      <MainThisMonth />
      <div className="bottomback"></div>
    </div>
  );
};

export default Main;
