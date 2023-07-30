import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./TemplateCard.css";
import { Col, Row } from "react-bootstrap";

export const TemplateCard = ({ title, description }) => {
  return (
    <Row className="m-0 p-0 commentCardDesign d-flex flex-column flex-md-row">
      <Col className="col-md-2 col-sm-12 perfilCommentDesign">
        <Row className=" d-flex flex-column">
          <Col className="commentUserName">{title}</Col>
        </Row>
      </Col>
      <Col className="col-md-10 col-sm-12 newCommentBoxDesign d-flex justify-content-center align-items-center">
        {description}
      </Col>
    </Row>
  );
};
