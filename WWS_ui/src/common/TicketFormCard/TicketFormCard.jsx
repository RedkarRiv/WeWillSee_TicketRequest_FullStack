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

  return (
    <MDBRow className="ticketFormCardContainer d-flex justify-content-center align-items-center p-0">
      <MDBCol>
        <MDBCard className="p-2 px-4">
          <MDBRow className="">
            <MDBCol lg="12">
              <MDBCardBody className="d-flex flex-column justify-content-center">
                {faqItems.map((item, index) => (
                  <div key={index}>
                    <MDBRow className="d-flex justify-content-center align-items-center">
                      <MDBCol
                        md="12"
                        className={`mt-1 d-flex justify-content-center FAQquestionDesign ${
                          item.isOpen ? "active" : ""
                        }`}
                        onClick={() => toggleAnswer(index)}
                      >
                        {item.question}
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

                {/* <MDBRow className="d-flex justify-content-center align-items-center">
                  <MDBCol
                    md="12"
                    className="mt-1 d-flex justify-content-center FAQquestionDesign"
                    onClick={toggleAnswer}
                  >
                    Esto es una pregunta del FAQ{" "}
                  </MDBCol>
                </MDBRow>

                {isOpen && (
                  <MDBRow className="d-flex justify-content-center align-items-start">
                    <MDBCol
                      md="12"
                      className="d-flex justify-content-center FAQanswerDesign"
                    >
                      Esto es una respuesta del FAQ Esto es una respuesta del
                      Esto es una respuesta del FAQ Esto es una respuesta del
                      Esto es una respuesta del FAQ Esto es una respuesta del
                      Esto es una respuesta del FAQ Esto es una respuesta del
                      Esto es una respuesta del FAQ Esto es una respuesta del
                      FAQ{" "}
                    </MDBCol>
                  </MDBRow>
                )}
                <MDBRow className="d-flex justify-content-center align-items-center">
                  <MDBCol
                    md="12"
                    className="mt-1 d-flex justify-content-center FAQquestionDesign"
                    onClick={toggleAnswer}
                  >
                    Esto es una pregunta del FAQ{" "}
                  </MDBCol>
                </MDBRow>

                {isOpen && (
                  <MDBRow className="d-flex justify-content-center align-items-start">
                    <MDBCol
                      md="12"
                      className="d-flex justify-content-center FAQanswerDesign"
                    >
                      Esto es una respuesta del FAQ Esto es una respuesta del
                      Esto es una respuesta del FAQ Esto es una respuesta del
                      Esto es una respuesta del FAQ Esto es una respuesta del
                      Esto es una respuesta del FAQ Esto es una respuesta del
                      Esto es una respuesta del FAQ Esto es una respuesta del
                      FAQ{" "}
                    </MDBCol>
                  </MDBRow>
                )}
                                <MDBRow className="d-flex justify-content-center align-items-center">
                  <MDBCol
                    md="12"
                    className="mt-1 d-flex justify-content-center FAQquestionDesign"
                    onClick={toggleAnswer}
                  >
                    Esto es una pregunta del FAQ{" "}
                  </MDBCol>
                </MDBRow>

                {isOpen && (
                  <MDBRow className="d-flex justify-content-center align-items-start">
                    <MDBCol
                      md="12"
                      className="d-flex justify-content-center FAQanswerDesign"
                    >
                      Esto es una respuesta del FAQ Esto es una respuesta del
                      Esto es una respuesta del FAQ Esto es una respuesta del
                      Esto es una respuesta del FAQ Esto es una respuesta del
                      Esto es una respuesta del FAQ Esto es una respuesta del
                      Esto es una respuesta del FAQ Esto es una respuesta del
                      FAQ{" "}
                    </MDBCol>
                  </MDBRow>
                )} */}
                <MDBRow>
                  <MDBCol
                    md="12"
                    className="mt-3 d-flex justify-content-center h3"
                  >
                    Nuevo ticket
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <InputLabel
                      type="text"
                      placeholder="Tema"
                      name="title"
                      classDesign={
                        credentialsError.emailError === ""
                          ? "inputFormDesign"
                          : "errorDesign"
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
                      placeholder="Categoría"
                      name="title"
                      classDesign={
                        credentialsError.emailError === ""
                          ? "inputFormDesign"
                          : "errorDesign"
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
                      placeholder="Titulo del ticket"
                      name="title"
                      classDesign={
                        credentialsError.emailError === ""
                          ? "inputFormDesign"
                          : "errorDesign"
                      }
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
                      name="comment"
                      maxLength={500}
                      className={
                        credentialsError.emailError === ""
                          ? "commentDesign"
                          : "errorDesign"
                      }
                      functionHandler={(e) => InputHandler(e)}
                      onBlurFunction={(e) => InputCheck(e)}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <InputLabel
                      type="file"
                      accept=".jpg, .png, .pdf"
                      name="data"
                      classDesign={
                        credentialsError.emailError === ""
                          ? "inputFormDesign fileInputDesign"
                          : "errorDesign"
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
