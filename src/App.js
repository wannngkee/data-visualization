import React from "react";
import "./App.css";
import SectionOne from "./component/SectionOne/index";
import SectionTwo from "./component/SectionTwo/index";
import SectionThree from "./component/SectionThree/index";
import SectionFour from "./component/SectionFour/index";
import SectionFive from "./component/SectionFive/index";
// import "antd/dist/antd.css";

function App() {
  return (
    <div>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
    </div>
  );
}

export default App;
