import React, { useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Message.css";
import { Col, Container, Row } from "react-bootstrap";
import { MessageContext } from "../../services/messageContext";
import { useNavigate } from "react-router-dom";

export const Message = () => {
    const  {message}  = useContext(MessageContext);
console.log(message)
const navigate = useNavigate();

useEffect(() => {
  const timeout = setTimeout(() => {
    navigate("/dashboard"); 
  }, 2500);
  return () => clearTimeout(timeout);
}, []); 

  return (
    <Container fluid className="p-0 m-0 d-flex">
      <Row className="dashboardBackground d-flex flex-column flex-md-row justify-content-center align-items-start px-1 m-0 pt-md-5">
        <Col className="profileBar col-md-8 col-sm-12 my-1 mx-md-1 d-flex justify-content-center flex-md-row  pt-md-4 pb-md-4">
            {message}
        </Col>
      </Row>
    </Container>
  );
};