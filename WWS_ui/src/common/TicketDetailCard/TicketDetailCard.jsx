import React, { useState, useContext } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import "./TicketDetailCard.css";
import { useSelector } from "react-redux";
import { userDataCheck } from "../../pages/userSlice";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";
import { CommentCard } from "../CommentCard/CommentCard";
import {
  activateTicket,
  closeTicket,
  getAllTemplates,
  inactivateTicket,
  newTicketComment,
  reassignTicket,
} from "../../services/apiCalls";
import { TemplateCard } from "../TemplateCard/TemplateCard";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../../services/messageContext";
export const TicketDetailCard = ({ ticket, onClose }) => {
  const credentialsRdx = useSelector(userDataCheck);
  const credentialCheck = credentialsRdx?.credentials?.token;
  const roleCheck = credentialsRdx.credentials.user.roleId;
  const [newComment, setNewComment] = useState("");
  const [messageData, setMessageData] = useState({
    ticket: ticket.id,
    message: "",
  });
  const [templateData, setTemplateData] = useState([]);
  const navigate = useNavigate();
  const { setMessage } = useContext(MessageContext);

  const InputHandler = (e) => {
    setNewComment(e.target.value);
    setMessageData(() => ({
      ...messageData,
      message: e.target.value,
    }));
  };
  const bringAllTemplates = () => {
    getAllTemplates(credentialCheck)
      .then((resultado) => {
        if (resultado.data.message == "Token invalido") {
          navigate("/");
          return;
        } else {
          setTemplateData(resultado.data.data);
        }
      })
      .catch((error) => console.log(error));
  };
  const resetCommentHandler = () => {
    setNewComment("");
    onClose();
  };

  const inactivateTicketHandler = () => {
    inactivateTicket(credentialCheck, ticket.id)
      .then((resultado) => {
        setMessage("EL TICKET HA SIDO ANULADO");
        navigate("/m");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const takeTemplates = () => {
    if (templateData.length === 0) {
      bringAllTemplates();
    } else {
      setTemplateData([]);
    }
  };
  const activateTicketHandler = () => {
    activateTicket(credentialCheck, ticket.id)
      .then((resultado) => {
        setMessage("EL TICKET HA SIDO ACTIVADO");
        navigate("/m");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reassignHandler = () => {
    const reassignData = { id: ticket.id };
    reassignTicket(credentialCheck, reassignData)
      .then((resultado) => {
        setMessage("EL TICKET HA SIDO REASIGNADO");
        navigate("/m");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeTicketHandler = () => {
    closeTicket(credentialCheck, ticket.id)
      .then((resultado) => {
        setMessage("EL TICKET HA SIDO CERRADO");
        navigate("/m");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendNewComment = () => {
    newTicketComment(credentialCheck, messageData)
      .then((resultado) => {
        setMessage("NUEVO COMENTARIO CREADO CORRECTAMENTE");
        navigate("/m");
      })
      .catch((error) => {
        console.log(error);
      });
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
              <MDBCardBody className="d-flex flex-column justify-content-center">
                <MDBRow>
                  <MDBCol md="12" className="mt-1">
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
                      <MDBCol className="contentLabel px-2">
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
                {ticket?.ticket_status === 1 ? (
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
                ) : null}
                {roleCheck === 2 && (
                  <MDBRow>
                    <MDBCol md="12" className="mt-3">
                      <div
                        className="inputTicketDetail dropdownTemplatesDesign"
                        onClick={() => takeTemplates()}
                      >
                        TEMPLATES ▼
                      </div>
                    </MDBCol>
                    {templateData.length > 0 &&
                      templateData.map((template, index) => (
                        <MDBCol
                          md="12"
                          className="mt-0 templateList"
                          key={index}
                        >
                          <TemplateCard
                            title={template.template_title}
                            description={template.template_description}
                          />{" "}
                        </MDBCol>
                      ))}
                  </MDBRow>
                )}
                <MDBRow className="d-flex justify-content-center mt-4">
                  {ticket?.ticket_status === 1 ? (
                    <>
                      <div
                        className="buttonSendTicket mx-2"
                        onClick={() => sendNewComment()}
                      >
                        Enviar comentario
                      </div>
                      <div
                        className="buttonCancelTicket mx-2"
                        onClick={() => inactivateTicketHandler()}
                      >
                        Anular
                      </div>
                    </>
                  ) : ticket?.ticket_status === 3 ? (
                    <div
                      className="buttonActiveTicket mx-2"
                      onClick={() => activateTicketHandler()}
                    >
                      Activar
                    </div>
                  ) : null}
                  {roleCheck === 2 ? (
                    <>
                      {ticket?.ticket_status !== 2 && (
                        <div
                          className="buttonCloseTicket mx-2"
                          onClick={() => closeTicketHandler()}
                        >
                          Cerrar
                        </div>
                      )}

                      <div
                        className="buttonActiveTicket mx-2"
                        onClick={() => reassignHandler()}
                      >
                        Reasignar
                      </div>
                      <div
                        className="buttonActiveTicket mx-2"
                        onClick={() => activateTicketHandler()}
                      >
                        Activar
                      </div>
                    </>
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
