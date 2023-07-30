import React, { useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Message.css";
import { Col, Container, Row } from "react-bootstrap";
import { MessageContext } from "../../services/messageContext";
import { useNavigate } from "react-router-dom";
import logoBackWWS from "../../img/logoWhiteWWS.png";

export const Message = () => {
  const { message } = useContext(MessageContext);
  console.log(message);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/dashboard");
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);  

  return (
    <Container fluid className="p-0 m-0 d-flex">
      <Row className="dashboardBackground d-flex flex-md-row justify-content-center align-items-start px-1 m-0 pt-md-5">
        <Col className="profileBar col-md-8 col-sm-12 d-flex flex-column justify-content-center pt-md-4 pb-md-4">
          <div className="w-100 d-flex mb-5 justify-content-center">
          <img
                src={logoBackWWS}
                alt="Avatar logo"
                className="logoMessageDesign"
              />
          </div>
          <div className="messageTextDesign text-center mb-3"> {message}</div>
        </Col>
      </Row>
    </Container>
  );
};
