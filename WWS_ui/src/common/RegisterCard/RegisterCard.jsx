import React, { useState } from "react";
import "./RegisterCard.css";
import { InputLabel } from "../../common/InputLabel/InputLabel";
import { CheckError } from "../../services/useful";
import { loginMe, registerMe } from "../../services/apiCalls";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../pages/userSlice";
import { useNavigate } from "react-router-dom";
import { userDataCheck } from "../../pages/userSlice";

export const RegisterCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const credentialsRdx = useSelector(userDataCheck);
  const [newCredentials, setNewCredentials] = useState({
    name: "",
    email: "",
    password: "",
    doubleCheckPassword: "",
  });

  const [newCredentialsError, setNewCredentialsError] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
    doubleCheckPasswordError: "",
  });

  const InputHandler = (e) => {
    setNewCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const InputCheck = (e, password) => {
    let mensajeError = CheckError(e.target.name, e.target.value, password);

    setNewCredentialsError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: mensajeError,
    }));
  };

  const registerNewUser = (e) => {
    e.preventDefault();
    registerMe(newCredentials)
      .then((resultado) => {
        const newUserCredentials = {
          email: resultado.data.data.email,
          password: newCredentials.password,
        };
        loginMe(newUserCredentials)
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
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <>
      <div className="registerCard">
        <div className="registerContainer mb-2">
          <div className="p-0 m-0 d-flex justify-content-end align-items-center w-100"></div>
          <div className="registerTitle mb-1">Nombre</div>
          <div className="inputDesign">
            <InputLabel
              type="text"
              placeholder="Introduce tu nombre"
              name="name"
              Length="15"
              classDesign={
                newCredentialsError.nameError === "" ? "" : "errorDesign"
              }
              functionHandler={(e) => InputHandler(e)}
              onBlurFunction={(e) => InputCheck(e)}
            />
          </div>{" "}
          <div className="errorMessageDesign p-0 m-0">
            {newCredentialsError.nameError}
          </div>
        </div>

        <div className="registerContainer mb-2">
          <div className="registerTitle mb-1">E-mail</div>
          <div className="inputDesign">
            <InputLabel
              type="email"
              placeholder="Introduce tu email"
              name="email"
              classDesign={
                newCredentialsError.emailError === "" ? "" : "errorDesign"
              }
              functionHandler={(e) => InputHandler(e)}
              onBlurFunction={(e) => InputCheck(e)}
            />
          </div>
          <div className="errorMessageDesign p-0 m-0">
            {newCredentialsError.emailError}
          </div>
        </div>

        <div className="registerContainer mb-2">
          <div className="registerTitle mb-1">Password</div>
          <div className="inputDesign">
            <InputLabel
              type="password"
              placeholder="Introduce tu password"
              name="password"
              classDesign={
                newCredentialsError.passwordError === "" ? "" : "errorDesign"
              }
              functionHandler={(e) => InputHandler(e)}
              onBlurFunction={(e) => InputCheck(e)}
            />
          </div>
          <div className="errorMessageDesign p-0 m-0">
            {newCredentialsError.passwordError}
          </div>
        </div>

        <div className="registerContainer mb-2">
          <div className="registerTitle mb-1">Repite tu Password</div>
          <div className="inputDesign">
            <InputLabel
              type="password"
              placeholder="Repite la password"
              name="doubleCheckPassword"
              classDesign={
                newCredentialsError.doubleCheckPasswordError === ""
                  ? ""
                  : "errorDesign"
              }
              functionHandler={(e) => InputHandler(e)}
              onBlurFunction={(e) => InputCheck(e, newCredentials.password)}
            />
          </div>
          <div className="errorMessageDesign p-0 m-0">
            {newCredentialsError.doubleCheckPasswordError}
          </div>
        </div>
      </div>
      <div className="errorMessageDesign p-0 m-0">{errorMessage}</div>
      <div
        className="buttonLogin mt-4 mb-4"
        onClick={(e) => registerNewUser(e)}
        type="submit"
      >
        Enviar
      </div>
    </>
  );
};
