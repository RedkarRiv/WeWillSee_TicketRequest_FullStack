import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./CommentCard.css";
import { userDataCheck } from "../../pages/userSlice";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";

export const CommentCard = () => {
  const credentialsRdx = useSelector(userDataCheck);
  const [themeData, setThemeData] = useState([]);
  const credentialCheck = credentialsRdx?.credentials?.token;

  return (
    <Row className="m-0 p-0 commentCardDesign d-flex flex-column flex-md-row">
      <Col className="col-md-2 col-sm-12 perfilCommentDesign">
        <Row className=" d-flex flex-column">
          <Col className="commentUserName">SAT demo</Col>
          <Col className="commentDateDesign">01/01/2020</Col>
        </Row>
      </Col>
      <Col className="col-md-10 col-sm-12 newCommentBoxDesign">
        Comentario Comentario Comentario Comentario Comentario Comentario
        Comentario Comentario Comentario Comentario Comentario Comentario
        Comentario Comentario Comentario Comentario Comentario Comentario
        Comentario Comentario Comentario Comentario Comentario Comentario
        Comentario Comentario Comentario Comentario Comentario
      </Col>
    </Row>
  );
};
