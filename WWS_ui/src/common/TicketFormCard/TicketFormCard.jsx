import React, { useState } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import "./TicketFormCard.css";
import { InputLabel } from "../InputLabel/InputLabel";
import { CheckError } from "../../services/useful";

export const TicketFormcard = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [credentialsError, setCredentialsError] = useState({
    emailError: "",
    passwordError: "",
  });
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
    <MDBRow className="d-flex justify-content-center align-items-center h-100">
      <MDBCol>
        <MDBCard className="p-4">
          <MDBRow className="">
            <MDBCol lg="12">
              <MDBCardBody className="text-black d-flex flex-column justify-content-center m-0 p-0">
                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <InputLabel
                      type="text"
                      placeholder="Titulo del ticket"
                      name="title"
                      classDesign={
                        credentialsError.emailError === "" ? "inputFormDesign" : "errorDesign"
                      }
                      functionHandler={(e) => InputHandler(e)}
                      onBlurFunction={(e) => InputCheck(e)}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <InputLabel
                      type="text"
                      placeholder="Descripción del ticket"
                      name="comment"
                      classDesign={
                        credentialsError.emailError === "" ? "commentDesign" : "errorDesign"
                      }
                      functionHandler={(e) => InputHandler(e)}
                      onBlurFunction={(e) => InputCheck(e)}
                    />
                  </MDBCol>
                </MDBRow>




                <MDBRow className="d-flex justify-content-center my-3">
                  <div className="buttonSendTicket">Enviar ticket</div>
                </MDBRow>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};
{
  /* <MDBRow>
                  <MDBCol md="12" className="errorMessageDesign">
                    {errorMessage}
                  </MDBCol>
                </MDBRow> */
}
