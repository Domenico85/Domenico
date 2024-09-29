// import React from "react";
import Container from "./Container";
import logo from "../assets/dom2.jpeg";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import SocialIcon from "./ui/SocialIcon";

const Footer = () => {
  return (
    <div className="bg-primaryColor">
    <Container className="flex items-center text-lightText justify-between py-5">
      {/* Updated the className to include the new size and border-radius */}
      <img src={logo} alt="logo" className="w-16 h-16 rounded-[50px]" />
      <p className="text-sm lowercase hover:text-white duration-300 ">
        All rights reserved @me
      </p>
      <SocialIcon />
    </Container>
  </div>
  );
};

export default Footer;
