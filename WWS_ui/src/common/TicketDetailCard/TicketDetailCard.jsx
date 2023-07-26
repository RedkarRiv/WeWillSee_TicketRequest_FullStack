import React, { useState } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import "./TicketDetailCard.css";
import { useSelector } from "react-redux";
import { userDataCheck } from "../../pages/userSlice";
import { CheckError } from "../../services/useful";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";
import { CommentCard } from "../CommentCard/CommentCard";

export const TicketDetailCard = ({ ticket, onClose }) => {
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
  console.log(ticket);
  const credentialsRdx = useSelector(userDataCheck);
  console.log(credentialsRdx);

  const roleCheck = credentialsRdx.credentials.user.roleId;
  const credentialCheck = credentialsRdx?.credentials?.token;
  console.log(roleCheck);
  const [newComment, setNewComment] = useState("");
  const InputHandler = (e) => {
    setNewComment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <MDBRow className="ticketDetailCardContainer d-flex justify-content-center align-items-center p-0">
      <MDBCol className="p-0 m-0">
        <MDBCard className="d-flex justify-content-center align-items-center cardDetailBackgroundDesign">
          <MDBRow className="p-0 m-0 d-flex justify-content-end align-items-center w-100">
            <MDBBtn
              color="secondary"
              className="closeButtonModal"
              onClick={onClose}
            >
              X
            </MDBBtn>
          </MDBRow>
          <TitleSectionCard title="Ticket en detalle" />
          <MDBRow className="contentBoxSide">
            <MDBCol lg="12" className="p-0">
              <MDBCardBody className="d-flex flex-column justify-content-center mt-2">
                <MDBRow>
                  <MDBCol md="12" className="mt-4">
                    <div className="inputTicketDetail">
                      {ticket?.Category?.Theme?.theme_name}
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <div className="inputTicketDetail">
                      {ticket?.Category?.category_name}
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <div className="inputTicketDetail">
                      {ticket?.ticket_title}
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <div className="inputTicketDetail p-3">
                      {ticket?.ticket_description}
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <div className="inputTicketDetail">
                      {ticket?.SAT?.User?.name}
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <div className="inputTicketDetail commentTitleTicketDetail">
                      COMENTARIOS
                    </div>
                  </MDBCol>
                  {ticket.Messages
                    ? Object.values(ticket.Messages).map((comment, index) => (
                        <MDBCol md="12" className="mt-0" key={index}>
                          <CommentCard
                            user={comment?.User?.name}
                            date={comment?.updatedAt}
                            comment={comment?.message_content}
                          />{" "}
                        </MDBCol>
                      ))
                    : "NO HAY COMENTARIOS"}
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <textarea
                      type="textarea"
                      placeholder="Nuevo comentario"
                      name="comment"
                      contentEditable
                      maxLength={500}
                      className="commentDesign"
                      onChange={(e) => InputHandler(e)}
                      onBlur={(e) => InputCheck(e)}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <div className="inputTicketDetail">TEMPLATES</div>
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
                  {roleCheck === 2 ? (
                    <div
                      className="buttonSendTicket mx-2"
                      onClick={() => ticketMeHandler()}
                    >
                      Reasignar
                    </div>
                  ): null}
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
