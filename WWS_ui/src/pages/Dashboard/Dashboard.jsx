import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Dashboard.css";
import { Col, Container, Row } from "react-bootstrap";

export const Dashboard = () => {







  
    return (
    <Container fluid className="p-0 m-0 d-flex">
      <Row className="dashboardBackground d-flex flex-column flex-md-row justify-content-center align-items-start px-1 m-0 pt-md-5">
        <Col className="profileBar col-md-2 col-sm-12 my-1 mx-md-1 d-flex flex-md-column flex-sm-row  pt-md-4 pb-md-4">
          <div className="profileAvatarContainer d-flex  flex-column  m-0 align-items-sm-center justify-content-sm-center align-items-md-center justify-content-md-start">
            <div className="m-0 d-flex p-1 justify-content-center align-items-center">
              <img
                src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                alt="Avatar logo"
                className="profileAvatar"
              />
            </div>
            <div className="userTitle pt-md-2">Requester Name</div>
            <div className="logoutDesign">Logout</div>
          </div>
          <div className="profileButtons d-flex flex-column justify-content-center align-items-center pt-md-3">
            <div className="buttonDesign">Mis datos</div>
            <div className="buttonDesign">Mis tickets</div>
            <div className="buttonDesignNew">New ticket</div>
          </div>
        </Col>
        <Col className="dashboardContainer col-md-9 col-sm-12 my-1">
          <Container fluid className="p-0 m-0 d-flex justify-content-center w-100 h-100">
            <Row className="d-flex justify-content-around align-items-around w-100 p-5">
              <Col className="themeContainer col-12 col-md-3 d-flex flex-column mb-4">
                <div className="d-flex flex-row w-100">
                  <div className="themeContainerTitle">MARKETING</div>
                  <div className="dropdownButtonTheme px-2">▼</div>
                </div>
                <div className="w-100">
                  <div className="categoryList w-100 d-flex flex-column justify-content-center align-items-center pt-2">
                    <div className="categoryLabelDesign">Categoria 1</div>
                    <div className="categoryLabelDesign">Categoria 2</div>
                    <div className="categoryLabelDesign">Categoria 3</div>
                    <div className="categoryLabelDesign">Categoria 4</div>
                    <div className="categoryLabelDesign">Categoria 5</div>
                  </div>
                </div>
              </Col>
              <Col className="themeContainer col-12 col-md-3 d-flex flex-column mb-4">
                <div className="d-flex flex-row w-100">
                  <div className="themeContainerTitle">OFIMATICA</div>
                  <div className="dropdownButtonTheme px-2">▼</div>
                </div>
                <div className="w-100">
                  <div className="categoryList w-100 d-flex flex-column justify-content-center align-items-center pt-2">
                    <div className="categoryLabelDesign">Categoria 1</div>
                    <div className="categoryLabelDesign">Categoria 2</div>
                    <div className="categoryLabelDesign">Categoria 3</div>
                    <div className="categoryLabelDesign">Categoria 4</div>
                    <div className="categoryLabelDesign">Categoria 5</div>
                  </div>
                </div>
              </Col>
              <Col className="themeContainer col-12 col-md-3 d-flex flex-column mb-4">
                <div className="d-flex flex-row w-100">
                  <div className="themeContainerTitle">COMERCIAL</div>
                  <div className="dropdownButtonTheme px-2">▼</div>
                </div>
                <div className="w-100">
                  <div className="categoryList w-100 d-flex flex-column justify-content-center align-items-center pt-2">
                    <div className="categoryLabelDesign">Categoria 1</div>
                    <div className="categoryLabelDesign">Categoria 2</div>
                    <div className="categoryLabelDesign">Categoria 3</div>
                    <div className="categoryLabelDesign">Categoria 4</div>
                    <div className="categoryLabelDesign">Categoria 5</div>
                  </div>
                </div>
              </Col>
              <Col className="themeContainer col-12 col-md-3 d-flex flex-column mb-4">
                <div className="d-flex flex-row w-100">
                  <div className="themeContainerTitle">PROVEEDORES</div>
                  <div className="dropdownButtonTheme px-2">▼</div>
                </div>
                <div className="w-100">
                  <div className="categoryList w-100 d-flex flex-column justify-content-center align-items-center pt-2">
                    <div className="categoryLabelDesign">Categoria 1</div>
                    <div className="categoryLabelDesign">Categoria 2</div>
                    <div className="categoryLabelDesign">Categoria 3</div>
                    <div className="categoryLabelDesign">Categoria 4</div>
                    <div className="categoryLabelDesign">Categoria 5</div>
                  </div>
                </div>
              </Col>
              <Col className="themeContainer col-12 col-md-3 d-flex flex-column mb-4">
                <div className="d-flex flex-row w-100">
                  <div className="themeContainerTitle">PROVEEDORES</div>
                  <div className="dropdownButtonTheme px-2">▼</div>
                </div>
                <div className="w-100">
                  <div className="categoryList w-100 d-flex flex-column justify-content-center align-items-center pt-2">
                    <div className="categoryLabelDesign">Categoria 1</div>
                    <div className="categoryLabelDesign">Categoria 2</div>
                    <div className="categoryLabelDesign">Categoria 3</div>
                    <div className="categoryLabelDesign">Categoria 4</div>
                    <div className="categoryLabelDesign">Categoria 5</div>
                  </div>
                </div>
              </Col>
              <Col className="themeContainer col-12 col-md-3 d-flex flex-column mb-4">
                <div className="d-flex flex-row w-100">
                  <div className="themeContainerTitle">PROVEEDORES</div>
                  <div className="dropdownButtonTheme px-2">▼</div>
                </div>
                <div className="w-100">
                  <div className="categoryList w-100 d-flex flex-column justify-content-center align-items-center pt-2">
                    <div className="categoryLabelDesign">Categoria 1</div>
                    <div className="categoryLabelDesign">Categoria 2</div>
                    <div className="categoryLabelDesign">Categoria 3</div>
                    <div className="categoryLabelDesign">Categoria 4</div>
                    <div className="categoryLabelDesign">Categoria 5</div>
                  </div>
                </div>
              </Col>
              <Col className="themeContainer col-12 col-md-3 d-flex flex-column mb-4">
                <div className="d-flex flex-row w-100">
                  <div className="themeContainerTitle">PROVEEDORES</div>
                  <div className="dropdownButtonTheme px-2">▼</div>
                </div>
                <div className="w-100">
                  <div className="categoryList w-100 d-flex flex-column justify-content-center align-items-center pt-2">
                    <div className="categoryLabelDesign">Categoria 1</div>
                    <div className="categoryLabelDesign">Categoria 2</div>
                    <div className="categoryLabelDesign">Categoria 3</div>
                    <div className="categoryLabelDesign">Categoria 4</div>
                    <div className="categoryLabelDesign">Categoria 5</div>
                  </div>
                </div>
              </Col>
              <Col className="themeContainer col-12 col-md-3 d-flex flex-column mb-4">
                <div className="d-flex flex-row w-100">
                  <div className="themeContainerTitle">PROVEEDORES</div>
                  <div className="dropdownButtonTheme px-2">▼</div>
                </div>
                <div className="w-100">
                  <div className="categoryList w-100 d-flex flex-column justify-content-center align-items-center pt-2">
                    <div className="categoryLabelDesign">Categoria 1</div>
                    <div className="categoryLabelDesign">Categoria 2</div>
                    <div className="categoryLabelDesign">Categoria 3</div>
                    <div className="categoryLabelDesign">Categoria 4</div>
                    <div className="categoryLabelDesign">Categoria 5</div>
                  </div>
                </div>
              </Col>
              <Col className="themeContainer col-12 col-md-3 d-flex flex-column mb-4">
                <div className="d-flex flex-row w-100">
                  <div className="themeContainerTitle">PROVEEDORES</div>
                  <div className="dropdownButtonTheme px-2">▼</div>
                </div>
                <div className="w-100">
                  <div className="categoryList w-100 d-flex flex-column justify-content-center align-items-center pt-2">
                    <div className="categoryLabelDesign">Categoria 1</div>
                    <div className="categoryLabelDesign">Categoria 2</div>
                    <div className="categoryLabelDesign">Categoria 3</div>
                    <div className="categoryLabelDesign">Categoria 4</div>
                    <div className="categoryLabelDesign">Categoria 5</div>
                  </div>
                </div>
              </Col>
              <Col className="themeContainer col-12 col-md-3 d-flex flex-column mb-4">
                <div className="d-flex flex-row w-100">
                  <div className="themeContainerTitle">PROVEEDORES</div>
                  <div className="dropdownButtonTheme px-2">▼</div>
                </div>
                <div className="w-100">
                  <div className="categoryList w-100 d-flex flex-column justify-content-center align-items-center pt-2">
                    <div className="categoryLabelDesign">Categoria 1</div>
                    <div className="categoryLabelDesign">Categoria 2</div>
                    <div className="categoryLabelDesign">Categoria 3</div>
                    <div className="categoryLabelDesign">Categoria 4</div>
                    <div className="categoryLabelDesign">Categoria 5</div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
