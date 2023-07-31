import React, { useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Message.css";
import { Col, Container, Row } from "react-bootstrap";
import { MessageContext } from "../../services/messageContext";
import { useNavigate } from "react-router-dom";
import logoBackWWS from "../../img/logoWhiteWWS.png";

export const Message = () => {
  const { message } = useContext(MessageContext);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);  

  return (
    <Container fluid className="p-0 m-0 h-100 d-flex justify-content-center align-items-center">
      <Row className="dashboardBackground d-flex flex-md-row justify-content-center align-items-start px-1 m-0 pt-md-5">
        <Col className="messageContainerDesign col-md-8 col-sm-12 d-flex flex-column justify-content-center pt-md-4 pb-md-4">
          <div className="w-100 d-flex mb-md-5 justify-content-center">
          <img
                src={logoBackWWS}
                alt="Avatar logo"
                className="logoMessageDesign"
              />
          </div>
          <div className="messageTextDesign text-center mb-md-3 mt-3"> {message}</div>
        </Col>
      </Row>
    </Container>
  );
};
