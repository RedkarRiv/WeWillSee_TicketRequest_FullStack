import React, { useState } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import "./TicketDetailCard.css";
import { InputLabel } from "../InputLabel/InputLabel";
import { useSelector } from "react-redux";
import { userDataCheck } from "../../pages/userSlice";
import { CheckError } from "../../services/useful";
import { ticketMe } from "../../services/apiCalls";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";
import { CommentCard } from "../CommentCard/CommentCard";

export const TicketDetailCard = () => {
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

  const InputHandler = (e) => {
    console.log(newTicket);
    setNewTicket((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <MDBRow className="ticketFormCardContainer d-flex justify-content-center align-items-center p-0">
      <MDBCol>
        <MDBCard className="d-flex justify-content-center align-items-center">
          <TitleSectionCard title="Ticket en detalle" />

          <MDBRow className="contentBoxSide">
            <MDBCol lg="12">
              <MDBCardBody className="d-flex flex-column justify-content-center mt-2">
                <MDBRow>
                  <MDBCol md="12" className="mt-4">
                    <div className="inputTicketDetail">"TEMA"</div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <div className="inputTicketDetail">"CATEGORIA"</div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <div className="inputTicketDetail">"TITULO"</div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <div className="inputTicketDetail p-3">
                      "Esta es la descripcion del ticket Esta es la descripcion
                      del ticket Esta es la descripcion del ticket Esta es la
                      descripcion del ticket Esta es la descripcion del ticket
                      Esta es la descripcion del ticket Esta es la descripcion
                      del ticket "
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <div className="inputTicketDetail">"SAT ASIGNADO"</div>
                  </MDBCol>
                  </MDBRow>

                  <MDBRow>
           <MDBCol md="12" className="mt-3">
                    <div className="inputTicketDetail commentTitleTicketDetail">"COMENTARIOS"</div>
                  </MDBCol>
                  <MDBCol md="12" className="mt-0">
                    <CommentCard />{" "}
                  </MDBCol>
                  <MDBCol md="12" className="mt-2">
                    <CommentCard />{" "}
                  </MDBCol>
                  <MDBCol md="12" className="mt-2">
                    <CommentCard />{" "}
                  </MDBCol>
                  <MDBCol md="12" className="mt-2">
                    <CommentCard />{" "}
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <textarea
                      type="textarea"
                      placeholder="Nuevo comentario"
                      name="comment"
                      maxLength={500}
                      className="commentDesign"
                      onChange={(e) => InputHandler(e)}
                      onBlur={(e) => InputCheck(e)}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="d-flex justify-content-center mt-4">
                  <div
                    className="buttonSendTicket mx-2"
                    onClick={() => ticketMeHandler()}
                  >
                    Enviar comentario
                  </div>
                  <div
                    className="buttonCancelTicket mx-2"
                    onClick={() => ticketMeHandler()}
                  >
                    Anular
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
