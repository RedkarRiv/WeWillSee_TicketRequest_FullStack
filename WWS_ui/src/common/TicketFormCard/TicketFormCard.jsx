import React, { useState } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import "./TicketFormCard.css";
import { InputLabel } from "../InputLabel/InputLabel";
import { useSelector } from "react-redux";
import { userDataCheck } from "../../pages/userSlice";
import { CheckError } from "../../services/useful";
import { ticketMe } from "../../services/apiCalls";

export const TicketFormcard = ({ category }) => {
  console.log(category);

  const [faqItems, setFaqItems] = useState([
    {
      question: "Esto es una pregunta del FAQ1",
      answer:
        "Esto es una respuesta del FAQ Esto es una respuesta del Esto es una respuesta del FAQ Esto es una respuesta del Esto es una respuesta del FAQ Esto es una respuesta del Esto es una respuesta del FAQ Esto es una respuesta del Esto es una respuesta del FAQ Esto es una respuesta del",
      isOpen: false,
    },
    {
      question: "Esto es una pregunta del FAQ2",
      answer:
        "Esto es una respuesta del FAQ Esto es una respuesta del Esto es una respuesta del FAQ Esto es una respuesta del Esto es una respuesta del FAQ Esto es una respuesta del Esto es una respuesta del FAQ Esto es una respuesta del Esto es una respuesta del FAQ Esto es una respuesta del",
      isOpen: false,
    },

    {
      question: "Esto es una pregunta del FAQ3",
      answer:
        "Esto es una respuesta del FAQ Esto es una respuesta del Esto es una respuesta del FAQ Esto es una respuesta del Esto es una respuesta del FAQ Esto es una respuesta del Esto es una respuesta del FAQ Esto es una respuesta del Esto es una respuesta del FAQ Esto es una respuesta del",
      isOpen: false,
    },
  ]);

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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MDBRow className="ticketFormCardContainer d-flex justify-content-center align-items-center p-0">
      <MDBCol>
        <MDBCard className="p-2 px-4">
          <MDBRow className="">
            <MDBCol lg="12">
              <MDBCardBody className="d-flex flex-column justify-content-center">
                <MDBRow className="mb-3">
                  <MDBCol md="12" className="d-flex justify-content-center h3">
                    Nuevo ticket
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  {faqItems.map((item, index) => (
                    <div key={index}>
                      <MDBRow className="d-flex justify-content-center align-items-center">
                        <MDBCol
                          md="12"
                          className={`mt-1 d-flex justify-content-between FAQquestionDesign ${
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

                  {/* <MDBCol md="12" className="mt-5">
                    <InputLabel
                      type="text"
                      placeholder="Tema"
                      name="title"
                      classDesign="inputFormDesign"
                      functionHandler={(e) => InputHandler(e)}
                      onBlurFunction={(e) => InputCheck(e)}
                    />
                  </MDBCol> */}
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <InputLabel
                      type="text"
                      placeholder={category.category_name}
                      name="category"
                      classDesign="inputFormDesign"
                      functionHandler={(e) => InputHandler(e)}
                      onBlurFunction={(e) => InputCheck(e)}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <InputLabel
                      type="text"
                      placeholder="Titulo del ticket"
                      name="title"
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
                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <InputLabel
                      type="file"
                      accept=".jpg, .png, .pdf"
                      name="data"
                      classDesign="inputFormDesign"
                      functionHandler={(e) => InputHandler(e)}
                      onBlurFunction={(e) => InputCheck(e)}
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
