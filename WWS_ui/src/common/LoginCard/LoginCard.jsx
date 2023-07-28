import React, { useState } from "react";
import "./LoginCard.css";
import { InputLabel } from "../../common/InputLabel/InputLabel";
import { CheckError } from "../../services/useful";
import { useDispatch, useSelector } from "react-redux";
import { login, userDataCheck } from "../../pages/userSlice";
import { loginMe } from "../../services/apiCalls";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const LoginCard = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [credentialsError, setCredentialsError] = useState({
    emailError: "",
    passwordError: "",
  });

  const dispatch = useDispatch();
  const credentialsRdx = useSelector(userDataCheck);

  const logMe = (e) => {
    console.log(credentials);
    e.preventDefault();
    loginMe(credentials)
      .then((resultado) => {
        let decoded = jwt_decode(resultado.data.token);
        let datosBackend = {
          token: resultado.data.token,
          user: decoded,
        };

        dispatch(login({ credentials: datosBackend }));
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
      });
  };

  const InputHandler = (e) => {
    console.log(credentials);
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const InputCheck = (e) => {
    console.log(credentialsError);
    let mensajeError = CheckError(e.target.name, e.target.value);

    setCredentialsError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: mensajeError,
    }));
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
                credentialsError.emailError === "" ? "" : "errorDesign"
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
                credentialsError.passwordError === "" ? "" : "errorDesign"
              }
              functionHandler={(e) => InputHandler(e)}
              onBlurFunction={(e) => InputCheck(e)}
            />
          </div>
        </div>
      </div>
      <div className="errorMessageDesign p-0 m-0">{errorMessage}</div>
      <div
        className="buttonLogin  mt-4 mb-4"
        onClick={(e) => logMe(e)}
        type="submit"
      >
        Enviar
      </div>
    </>
  );
};
