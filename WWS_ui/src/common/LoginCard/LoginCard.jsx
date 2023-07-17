import React, {useState} from "react";
import "./LoginCard.css";
import { InputLabel } from "../../common/InputLabel/InputLabel";
import { CheckError } from "../../services/useful";

export const LoginCard = () => {
  
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [credentialsError, setCredentialsError] = useState({
    emailError: "",
    passwordError: "",
  });

  const InputHandler = (e) => {
    console.log(credentials)
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const InputCheck = (e) => {
    console.log(credentialsError)
    let mensajeError = CheckError(e.target.name, e.target.value);

    setCredentialsError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: mensajeError,}));
  };

  return (
    <>
      <div className="loginCard">
        <div className="loginContainer">
          <div className="loginTitle mb-2">E-mail</div>
          <div>
            <InputLabel
              type="email"
              placeholder="Introduce tu email"
              name="email"
              classDesign={
                credentialsError.emailError === ""
                  ? ""
                  : "errorDesign"
              }
              functionHandler={(e) => InputHandler(e)}
              onBlurFunction={(e) => InputCheck(e)}
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
              classDesign={
                credentialsError.passwordError === ""
                ? ""
                : "errorDesign"
              }
              functionHandler={(e) => InputHandler(e)}
              onBlurFunction={(e) => InputCheck(e)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
