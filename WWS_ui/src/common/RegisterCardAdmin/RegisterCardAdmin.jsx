import React, { useState, useContext } from "react";
import "./RegisterCardAdmin.css";
import { InputLabel } from "../../common/InputLabel/InputLabel";
import { CheckError } from "../../services/useful";
import { loginMe, registNewSAT, registNewUser, registerMe } from "../../services/apiCalls";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../pages/userSlice";
import { useNavigate } from "react-router-dom";
import { userDataCheck } from "../../pages/userSlice";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";
import { MDBCardBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { MessageContext } from "../../services/messageContext";

export const RegisterCardAdmin = ({ onClose, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setMessage } = useContext(MessageContext);

  const [errorMessage, setErrorMessage] = useState("");
  const credentialsRdx = useSelector(userDataCheck);
  const credentialCheck = credentialsRdx?.credentials?.token;
  console.log(credentialCheck);
  const [newCredentials, setNewCredentials] = useState({
    name: "",
    email: "",
    password: "",
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
  const onCloseHandler = () => {
    onClose();
  };
  const InputCheck = (e, password) => {
    let mensajeError = CheckError(e.target.name, e.target.value, password);
    setErrorMessage(mensajeError);
    setNewCredentialsError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: mensajeError,
    }));
  };

  const registerNewUser = (e) => {
    e.preventDefault();
    if (user == 2) {
      registNewSAT(credentialCheck, newCredentials)
      .then((resultado) => {
        console.log(resultado);
        setMessage("EL SAT SE HA CREADO CON EXITO");
        navigate("/m")
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
    } else {
      registNewUser(credentialCheck, newCredentials)
      .then((resultado) => {
        console.log(resultado)
        setMessage("EL USUARIO SE HA CREADO CON EXITO");
        navigate("/m")
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
      });
    }
   
  };

  return (
    <>
      <MDBRow className="p-0 m-0 d-flex justify-content-end align-items-center w-100">
        <div
          color="secondary"
          className="closeButtonModal"
          onClick={() => onCloseHandler()}
        >
          X
        </div>
      </MDBRow>
      {user === 1 ? (
        <TitleSectionCard title="Crear nuevo usuario" />
      ) : (
        <TitleSectionCard title="Crear nuevo SAT" />
      )}
      <MDBRow className="contentBoxSide">
        <MDBCol lg="12" className="p-3">
          <MDBCardBody className="d-flex flex-column justify-content-center">
            <MDBRow>
              <MDBCol md="12" className="mt-1">
                <MDBRow className="inputTicketDetail d-flex m-0">
                  <MDBCol className="categoryLabel px-2 col-6 d-flex justify-content-center align-items-center">
                    Nombre
                  </MDBCol>
                  <MDBCol className="categoryLabel px-2 col-6">
                    <InputLabel
                      type="string"
                      placeholder="Introduce el nombre"
                      name="name"
                      classDesign={
                        newCredentialsError.nameError === ""
                          ? ""
                          : "errorDesign"
                      }
                      Length="15"
                      functionHandler={(e) => InputHandler(e)}
                      onBlurFunction={(e) => InputCheck(e)}
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12" className="mt-1">
                <MDBRow className="inputTicketDetail d-flex m-0">
                  <MDBCol className="categoryLabel px-2 col-6 d-flex justify-content-center align-items-center">
                    Email
                  </MDBCol>
                  <MDBCol className="categoryLabel px-2 col-6">
                    <InputLabel
                      type="email"
                      placeholder="Introduce el mail"
                      name="email"
                      classDesign={
                        newCredentialsError.emailError === ""
                          ? ""
                          : "errorDesign"
                      }
                      Length="15"
                      functionHandler={(e) => InputHandler(e)}
                      onBlurFunction={(e) => InputCheck(e)}
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="12" className="mt-1">
                <MDBRow className="inputTicketDetail d-flex m-0">
                  <MDBCol className="categoryLabel px-2 col-6 d-flex justify-content-center align-items-center">
                    Password
                  </MDBCol>
                  <MDBCol className="categoryLabel px-2 col-6">
                    <InputLabel
                      type="password"
                      placeholder="Introduce la contraseña"
                      name="password"
                      classDesign={
                        newCredentialsError.passwordError === ""
                          ? ""
                          : "errorDesign"
                      }
                      Length="15"
                      functionHandler={(e) => InputHandler(e)}
                      onBlurFunction={(e) => InputCheck(e)}
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol md="12" className="mt-1">
                <MDBRow className="inputTicketDetail d-flex m-0">
                  <MDBCol className="categoryLabel px-2 col-6 d-flex justify-content-center align-items-center">
                    Confirma password
                  </MDBCol>
                  <MDBCol className="categoryLabel px-2 col-6">
                    <InputLabel
                      type="password"
                      placeholder="Repite la contraseña"
                      name="doubleCheckPassword"
                      classDesign={
                        newCredentialsError.doubleCheckPasswordError === ""
                          ? ""
                          : "errorDesign"
                      }
                      Length="15"
                      functionHandler={(e) => InputHandler(e)}
                      onBlurFunction={(e) =>
                        InputCheck(e, newCredentials?.password)
                      }
                    />
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
            {errorMessage !== "" && (
              <div className="errorMessageDesign my-2">{errorMessage}</div>
            )}
            <MDBRow>
              <MDBCol className="col-12 d-flex justify-content-center">
                <div
                  className="buttonLogin mt-3 mb-4"
                  onClick={(e) => registerNewUser(e)}
                  type="submit"
                >
                  Crear
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </>
  );
};
