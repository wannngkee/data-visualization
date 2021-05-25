import React from "react";
import "./App.css";
import { BackTop } from "antd";
import { RiArrowUpSLine } from "react-icons/ri";
import SectionOne from "./component/SectionOne/index";
import SectionTwo from "./component/SectionTwo/index";
import SectionThree from "./component/SectionThree/index";
import SectionFour from "./component/SectionFour/index";
import SectionFive from "./component/SectionFive/index";
import SectionSix from "./component/SectionSix/index";

function App() {
  return (
    <div>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
      <BackTop style={{ opacity: 0.8, marginRight: -60 }}>
        <RiArrowUpSLine className="backTop" />
      </BackTop>
    </div>
  );
}

export default App;
