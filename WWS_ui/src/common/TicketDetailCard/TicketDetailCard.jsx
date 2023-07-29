import React, { useEffect, useState } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import "./TicketDetailCard.css";
import { useSelector } from "react-redux";
import { userDataCheck } from "../../pages/userSlice";
import { CheckError } from "../../services/useful";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";
import { CommentCard } from "../CommentCard/CommentCard";

export const TicketDetailCard = ({ ticket, onClose }) => {
  const [closeComment, setCloseComment] = useState(false);
  const credentialsRdx = useSelector(userDataCheck);

  const roleCheck = credentialsRdx.credentials.user.roleId;
  console.log(roleCheck);
  const [newComment, setNewComment] = useState("");
  console.log(newComment);

  const InputHandler = (e) => {
    setNewComment(e.target.value);
  };

  const resetCommentHandler = () => {
    setNewComment("");
    onClose();
  };

  return (
    <MDBRow className="ticketDetailCardContainer d-flex justify-content-center align-items-center p-0">
      <MDBCol className="p-0 m-0">
        <MDBCard className="d-flex justify-content-center align-items-center cardDetailBackgroundDesign">
          <MDBRow className="p-0 m-0 d-flex justify-content-end align-items-center w-100">
            <div
              color="secondary"
              className="closeButtonModal"
              onClick={() => resetCommentHandler()}
            >
              X
            </div>
          </MDBRow>
          <TitleSectionCard title="Ticket en detalle" />
          <MDBRow className="contentBoxSide">
            <MDBCol lg="12" className="p-0">
              <MDBCardBody className="d-flex flex-column justify-content-center mt-2">
                <MDBRow>
                  <MDBCol md="12" className="mt-4">
                    <MDBRow className="inputTicketDetail d-flex m-0">
                      <MDBCol className="categoryLabel px-2">Tema</MDBCol>
                      <MDBCol className="contentLabel px-2">
                        {" "}
                        {ticket?.Category?.Theme?.theme_name}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <MDBRow className="inputTicketDetail d-flex m-0">
                      <MDBCol className="categoryLabel px-2">Categoría</MDBCol>
                      <MDBCol className="contentLabel px-2">
                        {" "}
                        {ticket?.Category?.category_name}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <MDBRow className="inputTicketDetail d-flex m-0">
                      <MDBCol className="categoryLabel px-2">Título</MDBCol>
                      <MDBCol className="contentLabel px-2">
                        {" "}
                        {ticket?.ticket_title}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <MDBRow className="inputTicketDetail d-flex m-0">
                      <MDBCol className="categoryLabel px-2 col-12">
                        Descripción
                      </MDBCol>
                      <MDBCol className="contentLabelDescription px-2 py-2 col-12">
                        {" "}
                        {ticket?.ticket_description}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <MDBRow className="inputTicketDetail d-flex m-0">
                      <MDBCol className="categoryLabel px-2">
                        SAT asignado
                      </MDBCol>
                      <MDBCol className="contentLabel pt-2">
                        {" "}
                        {ticket?.SAT?.User?.name}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <div className="inputTicketDetail commentTitleTicketDetail">
                      COMENTARIOS
                    </div>
                  </MDBCol>
                  {ticket.Messages.length !== 0 ? (
                    Object.values(ticket.Messages).map((comment, index) => (
                      <MDBCol md="12" className="mt-0" key={index}>
                        <CommentCard
                          user={comment?.User?.name}
                          date={comment?.updatedAt}
                          comment={comment?.message_content}
                        />{" "}
                      </MDBCol>
                    ))
                  ) : (
                    <div className="noComments w-100 d-flex justify-content-center">
                      NO HAY COMENTARIOS
                    </div>
                  )}
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <textarea
                      type="textarea"
                      placeholder="Nuevo comentario"
                      name="comment"
                      value={newComment}
                      maxLength={500}
                      className="commentDesign"
                      onChange={(e) => InputHandler(e)}
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
                  ) : null}
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
