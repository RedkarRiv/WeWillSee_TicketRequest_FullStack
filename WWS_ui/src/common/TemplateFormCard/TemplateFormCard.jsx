import React, { useState, useContext } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import "./TemplateFormCard.css";
import { InputLabel } from "../InputLabel/InputLabel";
import { useSelector } from "react-redux";
import { userDataCheck } from "../../pages/userSlice";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";
import { createNewTemplate } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../../services/messageContext";
import { CheckError } from "../../services/useful";

export const TemplateFormCard = () => {
  const navigate = useNavigate();
  const { setMessage } = useContext(MessageContext);
  const [validationCheck, setValidationCheck] = useState("");
  const [credentialsError, setCredentialsError] = useState({
    template_title: "",
    template_description: "",
  });
  const credentialsRdx = useSelector(userDataCheck);
  const credentialCheck = credentialsRdx?.credentials?.token;
  const InputCheck = (e) => {
    let mensajeError = CheckError(e.target.name, e.target.value);

    setCredentialsError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: mensajeError,
    }));
  };
  const [newTemplate, setNewTemplate] = useState({
    template_title: "",
    template_description: "",
  });
  const InputHandler = (e) => {
    setNewTemplate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const templateMeHandler = () => {
    console.log(newTemplate);

    if (newTemplate.template_description == "") {
      console.log(newTemplate);
      setValidationCheck("No puedes crear una plantilla sin descripcion");
      return;
    }
    if (newTemplate.template_title) {
      console.log(newTemplate);

      setValidationCheck("No puedes crear una plantilla sin título");
      return;
    }
    createNewTemplate(credentialCheck, newTemplate)
      .then((resultado) => {
        setMessage("LA PLANTILLA HA SIDO CREADA");
        navigate("/m");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MDBRow className="templateFormCardContainer d-flex justify-content-center align-items-center p-0">
      <MDBCol>
        <MDBCard className="d-flex justify-content-center align-items-center cardBackgroundDesign">
          <TitleSectionCard title="Nueva plantilla" />

          <MDBRow className="contentBoxSide">
            <MDBCol lg="12" className="p-0">
              <MDBCardBody className="d-flex flex-column justify-content-center mt-2">
                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <InputLabel
                      type="text"
                      placeholder="Titulo de la plantilla"
                      name="template_title"
                      Length="50"
                      classDesign="inputFormDesign"
                      functionHandler={(e) => InputHandler(e)}
                      onBlurFunction={(e) => InputCheck(e)}                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <textarea
                      type="textarea"
                      placeholder="Descripción de la plantilla"
                      name="template_description"
                      maxLength={500}
                      className="commentDesign"
                      onChange={(e) => InputHandler(e)}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol className="d-flex justify-content-center">
                    <div className="validationMessage">{validationCheck}</div>
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
