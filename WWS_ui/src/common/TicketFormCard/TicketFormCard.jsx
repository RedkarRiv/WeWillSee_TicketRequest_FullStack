import React, { useState, useContext, useEffect } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import "./TicketFormCard.css";
import { InputLabel } from "../InputLabel/InputLabel";
import { useSelector } from "react-redux";
import { userDataCheck } from "../../pages/userSlice";
import { CheckError } from "../../services/useful";
import { ticketMe, getOneCategory } from "../../services/apiCalls";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../../services/messageContext";

export const TicketFormcard = ({ category, theme}) => {
  const navigate = useNavigate();
  const { setMessage } = useContext(MessageContext);
console.log(category.id)
console.log(theme)

  const [faqItems, setFaqItems] = useState([
    {
      question: "Esto es una pregunta del FAQ1",
      answer:
        "Esto es una respuesta del FAQ Esto es una respuesta del Esto es una respuesta del FAQ Esto es una respuesta del Esto es una respuesta del FAQ Esto es una respuesta del Esto es una respuesta del FAQ Esto es una respuesta del Esto es una respuesta del FAQ Esto es una respuesta del",
      isOpen: false,
    },
  ]);
const getCategoryDataHandler = () => {
  getOneCategory(credentialCheck, category.id)
  .then((resultado) => {
    console.log(resultado.data.data[0]);
    console.log(resultado.data.data[0].FAQs);
    const FAQData = resultado.data.data[0].FAQs

    const updateFAQData = FAQData.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    }));
    setFaqItems(updateFAQData)
  })
  .catch((error) => {
    console.log(error);
  });
}
useEffect(() => {
  getCategoryDataHandler();
}, []);
  const toggleAnswer = (index) => {
    setFaqItems((prevFaqItems) => {
      const updatedFaqItems = prevFaqItems.map((faqItem, i) => {
        if (i === index) {
          return { ...faqItem, isOpen: !faqItem.isOpen };
        }
        return faqItem;
      });
      return updatedFaqItems;
    });
  };
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
  const roleCheck = credentialsRdx.credentials.user.roleId;

  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    categoryId: category.id ?? 2,
  });
  const InputHandler = (e) => {
    console.log(newTicket);
    setNewTicket((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const ticketMeHandler = () => {
    ticketMe(credentialCheck, newTicket)
      .then((resultado) => {
        console.log(resultado);
        setMessage("EL TICKET HA SIDO CREADO");
        navigate("/m")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MDBRow className="ticketFormCardContainer d-flex justify-content-center align-items-center p-0">
      <MDBCol>
        <MDBCard className="d-flex justify-content-center align-items-center cardBackgroundDesign">
          <TitleSectionCard title="Nuevo ticket" />

          <MDBRow className="contentBoxSide">
          <MDBCol lg="12" className="p-0">
              <MDBCardBody className="d-flex flex-column justify-content-center mt-2">
                <MDBRow>
                  {faqItems.map((item, index) => (
                    <div key={index}>
                      <MDBRow className="d-flex justify-content-center align-items-center">
                        <MDBCol
                          md="12"
                          className={`mt-1 d-flex justify-content-center text-center FAQquestionDesign ${
                            item.isOpen ? "active" : ""
                          }`}
                          onClick={() => toggleAnswer(index)}
                        >
                          <div className="px-md-3">▾</div>
                          {item.question}
                          <div className="px-md-3">▾</div>
                        </MDBCol>
                      </MDBRow>

                      {item.isOpen && (
                        <MDBRow className="d-flex justify-content-center align-items-start">
                          <MDBCol
                            md="12"
                            className="d-flex justify-content-center FAQanswerDesign"
                          >
                            {item.answer}
                          </MDBCol>
                        </MDBRow>
                      )}
                    </div>
                  ))}
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-4">
                    <div className="inputBlocked">
                      {theme.toUpperCase()}
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <div className="inputBlocked">
                      {category.category_name.toUpperCase()}
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <InputLabel
                      type="text"
                      placeholder="Titulo del ticket"
                      name="title"
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
                      placeholder="Descripción del ticket"
                      name="description"
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
                    onClick={() => ticketMeHandler()}
                    
                  >
                    Enviar ticket
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
