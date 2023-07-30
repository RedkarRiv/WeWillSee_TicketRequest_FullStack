import React, { useState, useContext } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import "./TemplateFormCard.css";
import { InputLabel } from "../InputLabel/InputLabel";
import { useSelector } from "react-redux";
import { userDataCheck } from "../../pages/userSlice";
import { CheckError } from "../../services/useful";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";
import { createNewTemplate } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../../services/messageContext";

export const TemplateFormCard = () => {

  const navigate = useNavigate();
  const { setMessage } = useContext(MessageContext);

 
  const [credentialsError, setCredentialsError] = useState({
    title: "",
    description: "",
  });
  const InputCheck = (e) => {
    console.log(credentialsError);
    let mensajeError = CheckError(e.target.name, e.target.value);

    setCredentialsError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: mensajeError,
    }));
  };

  const credentialsRdx = useSelector(userDataCheck);
  const credentialCheck = credentialsRdx?.credentials?.token;

  const [newTemplate, setNewTemplate] = useState({
    template_title:"",
    template_description:""
  });
  const InputHandler = (e) => {
    console.log(newTemplate);
    setNewTemplate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const templateMeHandler = () => {
    createNewTemplate(credentialCheck, newTemplate)
      .then((resultado) => {
        console.log(resultado);
        setMessage("EL TEMPLATE HA SIDO CREADO");
        navigate("/m")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MDBRow className="templateFormCardContainer d-flex justify-content-center align-items-center p-0">
      <MDBCol>
        <MDBCard className="d-flex justify-content-center align-items-center cardBackgroundDesign">
          <TitleSectionCard title="Nuevo template" />

          <MDBRow className="contentBoxSide">
          <MDBCol lg="12" className="p-0">
              <MDBCardBody className="d-flex flex-column justify-content-center mt-2">

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <InputLabel
                      type="text"
                      placeholder="Titulo del template"
                      name="template_title"
                      Length="50"
                      classDesign="inputFormDesign"
                      functionHandler={(e) => InputHandler(e)}
                      onBlurFunction={(e) => InputCheck(e)}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <textarea
                      type="textarea"
                      placeholder="Descripción del template"
                      name="template_description"
                      maxLength={500}
                      className="commentDesign"
                      onChange={(e) => InputHandler(e)}
                      onBlur={(e) => InputCheck(e)}
                    />
                  </MDBCol>
                </MDBRow>
                

                <MDBRow className="d-flex justify-content-center mt-4">
                  <div
                    className="buttonSendTicket"
                    onClick={() => templateMeHandler()}
                  >
                    Crear template
                  </div>
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
