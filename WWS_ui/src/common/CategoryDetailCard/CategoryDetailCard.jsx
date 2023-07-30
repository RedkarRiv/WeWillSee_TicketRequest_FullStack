import React, { useState, useContext } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import "./CategoryDetailCard.css";
import { useSelector } from "react-redux";
import { userDataCheck } from "../../pages/userSlice";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";
import { activateCategory, inactivateCategory } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../../services/messageContext";

export const CategoryDetailCard = ({ category, onClose }) => {
  const credentialsRdx = useSelector(userDataCheck);
  const credentialCheck = credentialsRdx?.credentials?.token;
  const [FAQData, setFAQData] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [messageData, setMessageData] = useState({});
  const navigate = useNavigate();
  const { setMessage } = useContext(MessageContext);

  const resetCommentHandler = () => {
    setNewComment("");
    onClose();
  };

  const inactivateCategoryHandler = () => {
    inactivateCategory(credentialCheck, category?.id)
      .then((resultado) => {
        setMessage("LA CATEGORIA HA SIDO ANULADA");
        navigate("/m");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const activateCategoryHandler = () => {
    activateCategory(credentialCheck, category?.id)
      .then((resultado) => {
        setMessage("LA CATEGORIA HA SIDO ACTIVADA");
        navigate("/m");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MDBRow className="ticketDetailCardContainer  w-100 d-flex justify-content-center align-items-center p-0">
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
                      <MDBCol className="categoryLabel px-2">Titulo</MDBCol>
                      <MDBCol className="contentLabel px-2">
                        {" "}
                        {category?.category_name}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <MDBRow className="inputTicketDetail d-flex m-0">
                      <MDBCol className="categoryLabel px-2">Estado</MDBCol>
                      <MDBCol className="contentLabel px-2">
                        {" "}
                        {category?.category_status}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <div className="inputTicketDetail FAQTitleTicketDetail">
                      FAQs
                    </div>
                  </MDBCol>
                  <MDBCol md="12" className="mt-2">
                    {category?.FAQs?.length > 0
                      ? category?.FAQs.map((faq, faqIndex) => (
                          <div key={faqIndex} className="FAQLabel p-2 my-1">
                            <div className="FAQquestion">
                              Pregunta: {faq?.question}
                            </div>
                            <div>Respuesta: {faq?.answer}</div>
                          </div>
                        ))
                      : null}
                  </MDBCol>
                </MDBRow>
                <MDBRow className="d-flex justify-content-center mt-4">
                  <>
                    <div
                      className="buttonCancelTicket mx-2"
                      onClick={() => inactivateCategoryHandler()}
                    >
                      Anular
                    </div>

                    <div
                      className="buttonActiveTicket mx-2"
                      onClick={() => activateCategoryHandler()}
                    >
                      Activar
                    </div>
                  </>
                </MDBRow>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};
