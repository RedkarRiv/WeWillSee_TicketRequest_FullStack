import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Dashboard.css";
import { Col, Container, Row } from "react-bootstrap";

export const Dashboard = () => {
  return (
    <Container fluid className="dashboardBox p-0 m-0 d-flex">
      <Row className="dashboardBackground d-flex flex-column flex-md-row justify-content-center align-items-center px-1 m-0">
        <Col className="profileBar col-md-2 col-sm-12 my-1 mx-md-1 align-items-center">
          <div className="profileAvatarContainer d-flex m-0 pt-md-4 justify-content-md-center align-items-center justify-content-sm-start">
            <div className=" m-0">
                <img
                fluid
                src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                alt="Avatar logo"
                className= "profileAvatar"
                />
            </div>
          </div>
          <div className="profileButtons"></div>
        </Col>
        <Col className="dashboardContainer col-md-9 col-sm-12 my-1">
        </Col>
      </Row>
    </Container>    
  );
};
