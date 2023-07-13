import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Dashboard.css";
import { Col, Container, Row } from "react-bootstrap";

export const Dashboard = () => {
  return (
    <Container fluid className="dashboardBox p-0 m-0 d-flex">
      <Row className="dashboardBackground d-flex flex-column flex-md-row justify-content-center align-items-center px-1 m-0">
        <Col className="profileBar col-md-2 col-sm-12 my-1 mx-md-1 d-flex flex-md-column flex-sm-row">
          <div className="profileAvatarContainer d-flex  flex-column  m-0 pt-md-3 align-items-sm-center justify-content-sm-center align-items-md-center justify-content-md-start">
            <div className="m-0 d-flex p-1 justify-content-center align-items-center"> 
                <img
                fluid
                src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                alt="Avatar logo"
                className= "profileAvatar"
                />
            </div>
            <div className="userTitle pt-md-2">Requester Name</div>
            <div className="logoutDesign">Logout</div>

          </div>
          <div className="profileButtons d-flex flex-column justify-content-center align-items-center pt-md-3">
            <div className="buttonDesign">Mi perfil</div>
            <div className="buttonDesign">Mis tickets</div>
            <div className="buttonDesignNew">New ticket</div>
          </div>
          
        </Col>
        <Col className="dashboardContainer col-md-9 col-sm-12 my-1">
        </Col>
      </Row>
    </Container>    
  );
};
