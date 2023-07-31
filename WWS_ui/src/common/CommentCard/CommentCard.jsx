import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./CommentCard.css";
import { Col, Row } from "react-bootstrap";
import moment from "moment";

export const CommentCard = ({ user, date, comment }) => {
  return (
    <Row className="m-0 p-0 commentCardDesign d-flex flex-column flex-md-row">
      <Col className="col-md-2 col-sm-12 perfilCommentDesign">
        <Row className=" d-flex flex-column">
          <Col className="commentUserName">{user}</Col>
          <Col className="commentDateDesign">
            {moment(date).format("YYYY-MM-DD")}
          </Col>
        </Row>
      </Col>
      <Col className="col-md-10 col-sm-12 newCommentBoxDesign d-flex justify-content-center align-items-center">
        "{comment}"
      </Col>
    </Row>
  );
};
