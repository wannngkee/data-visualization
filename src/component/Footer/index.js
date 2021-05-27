import React from "react";
import { GoMail, GoMarkGithub } from "react-icons/go";
import "./index.css";

const Footer = () => {
  return (
    <footer>
      <div className="footerDesc">Created with D3 and React</div>
      <div>FIT5147, 2021 S1</div>
      <div>
        <a
          className="contactIcon"
          href="https://github.com/wannngkee/data-visualization"
        >
          <GoMarkGithub />
        </a>
        <a className="contactIcon" href="mailto:wannngkee@gmail.com">
          <GoMail />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
