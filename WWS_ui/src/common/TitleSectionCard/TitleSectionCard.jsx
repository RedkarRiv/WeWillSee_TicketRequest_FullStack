import React from "react";
import "./TitleSectionCard.css";
import { Col, Row } from "react-bootstrap";

export const TitleSectionCard = ({ title }) => {
  return (
    <>
      <Row className="titleContainer d-flex justify-content-center align-items-center text-center w-100 p-0 mb-1 mt-3">
        <Col className="titleDesign col-11">{title.toUpperCase()}</Col>
      </Row>
    </>
  );
};
