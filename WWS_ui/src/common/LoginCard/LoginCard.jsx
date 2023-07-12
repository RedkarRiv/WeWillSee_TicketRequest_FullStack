import React from "react";
import "./LoginCard.css";
import { InputLabel } from "../../common/InputLabel/InputLabel";

export const LoginCard = () => {
  return (
    <>
      <div className="loginCard">
        <div className="loginContainer">
          <div className="loginTitle mb-2">E-Mail</div>
          <div className="inputDesign">
            <InputLabel
              type="email"
              placeholder="Introduce tu email"
              name="email"
            />
          </div>
        </div>
        <div className="loginContainer">
          <div className="loginTitle mb-2">Password</div>

          <div className="inputDesign">
            <InputLabel
              type="password"
              placeholder="Introduce tu password"
              name="password"
            />
          </div>
        </div>
      </div>
    </>
  );
};
