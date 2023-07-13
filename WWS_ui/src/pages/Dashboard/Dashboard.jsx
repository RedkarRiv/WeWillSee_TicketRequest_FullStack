import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Dashboard.css";
import { Col, Container, Row } from "react-bootstrap";

export const Dashboard = () => {
  return (
    <Container fluid className="dashboardBox p-0 m-0 d-flex">
      <Row className="dashboardBackground d-flex flex-column flex-md-row justify-content-center align-items-center px-1 m-0">
        <Col className="profileBar col-md-2 col-sm-12 my-1 mx-md-1  d-flex align-items-sm-center justify-content-sm-start align-items-md-start justify-content-md-center">

          <div className="profileAvatarContainer d-flex  flex-column m-0 pt-md-4 justify-content-md-center align-items-center justify-content-center">
            <div className="m-0 d-flex">
                <img
                fluid
                src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                alt="Avatar logo"
                className= "profileAvatar"
                />
            </div>
            <div className="userTitle p-2xp">Usuario Usuario</div>

          </div>
          <div className="profileButtons"></div>
        </Col>
        <Col className="dashboardContainer col-md-9 col-sm-12 my-1">
        </Col>
      </Row>
    </Container>    
  );
};
