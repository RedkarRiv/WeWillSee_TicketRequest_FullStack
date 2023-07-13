import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Dashboard.css";
import { Col, Container, Row } from "react-bootstrap";

export const Dashboard = () => {
  return (
    <Container fluid className="dashboardBox p-0 m-0 d-flex">
      <Row className="dashboardBackground d-flex flex-column flex-md-row justify-content-center align-content-center p-1 m-0">
        <Col className="profileBar col-md-2 col-sm-12 m-1"></Col>
        <Col className="dashboardContainer col-md-9 col-sm-12 m-1"></Col>
      </Row>
    </Container>
  );
};
