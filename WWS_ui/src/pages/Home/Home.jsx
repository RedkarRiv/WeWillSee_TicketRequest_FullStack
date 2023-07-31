import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Home.css";
import { LoginCard } from "../../common/LoginCard/LoginCard";
import { RegisterCard } from "../../common/RegisterCard/RegisterCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userDataCheck } from "../../pages/userSlice";

export const Home = () => {
  const [credentialsShow, setCredentialsSow] = useState(true);
  const credentialsRdx = useSelector(userDataCheck);
  const credentialCheck = credentialsRdx?.credentials?.token;
  const navigate = useNavigate();

const credentialsActive = () => {
  if (credentialCheck) {
    navigate("/dashboard")
  }
}
useEffect(() => {
  credentialsActive();
}, []);


  const LoginCredentialsSlide = () => {
    return (
      <div className="credentialSlide">
        <div className="logoContainer mb-3"></div>
        <LoginCard />

        <div className="d-flex">
          <div className="notAccountRegistTitle mt-1 mb-1 me-2">
            ¿No tienes cuenta todavía?
          </div>
          <div
            className="notAccountRegist mt-1 mb-1"
            onClick={() => setCredentialsSow(!credentialsShow)}
          >
            {" "}
            Registrate.
          </div>
        </div>
      </div>
    );
  };

  const RegisterCredentialsSlide = () => {
    return (
      <div className="credentialSlide">
        <div className="logoContainer logoContainerRegister"></div>
        <RegisterCard />
        <div className="d-flex aboutCredentials">
          <div className="notAccountRegistTitle mt-1 mb-1 me-2">
            ¿Ya tienes cuenta?
          </div>
          <div
            className="notAccountRegist mt-1 mb-1"
            onClick={() => setCredentialsSow(!credentialsShow)}
          >
            {" "}
            Login.
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="homeBackground">
      {credentialsShow ? LoginCredentialsSlide() : RegisterCredentialsSlide()}
      <div className="imageSlide"></div>
    </div>
  );
};
