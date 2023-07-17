import React, { useState } from "react";
import "./RegisterCard.css";
import { InputLabel } from "../../common/InputLabel/InputLabel";
import { CheckError } from "../../services/useful";

export const RegisterCard = () => {
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

  return (
    <>
      <div className="registerCard">
        <div className="registerContainer mb-2">
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
        </div>
      </div>
    </>
  );
};
