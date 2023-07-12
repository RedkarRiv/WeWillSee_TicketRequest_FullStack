import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Home.css";
import { LoginCard } from "../../common/LoginCard/LoginCard";

export const Home = () => {
  return (
    <div className="homeBackground">
      <div className="credentialSlide">
        <LoginCard />
      </div>

      <div className="imageSlide"></div>
    </div>
  );
};
