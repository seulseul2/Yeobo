import "./Main.scss";
import MainTop from "./MainTop";
import MainRecom from "./MainRecom";
import MainBoddari from "./MainBoddari";
import MainPopularBoddari from "./MainPopularBoddari";
import MainThisMonth from "./MainThisMonth";
import React, { useEffect } from "react";

const Main = () => {
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
