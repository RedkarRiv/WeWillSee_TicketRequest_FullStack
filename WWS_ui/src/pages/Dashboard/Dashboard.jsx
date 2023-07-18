import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Dashboard.css";
import { Col, Container, Row } from "react-bootstrap";

export const Dashboard = () => {
  // ABRIR Y CERRAR TODOS LOS DROPDOWNS
  // const [showCategories, setShowCategories] = useState(false);

  // const ToggleCategories = () => {
  //   setShowCategories(!showCategories);
  // };
  // ABRIR Y CERRAR UN DROPDOWN

  const [categoryStates, setCategoryStates] = useState({});

  const toggleCategory = (category) => {
    setCategoryStates((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const categoriesList = {
    label1: "category1",
    label2: "category2",
    label3: "category3",
    label4: "category4",
    label5: "category5",
    label6: "category6",
  };

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
        <Col className="dashboardContainer col-md-9 col-sm-12 my-1 d-flex justify-content-center align-items-center">
          <Container
            fluid
            className="p-0 m-0 d-flex justify-content-center w-100 h-100"
          >
            <Row className="d-flex justify-content-around align-items-around w-100 p-5">
              <Col className="themeContainer col-12 col-md-3 d-flex flex-column mb-4">
                <div
                  className="d-flex flex-row w-100 dropdownClick justify-content-center align-items-center"
                  onClick={() => toggleCategory("MARKETING")}
                  >
                  <div className="logoCategory"></div>

                  <div className="themeContainerTitle">MARKETING</div>
                  <div className="dropdownButtonTheme px-2">▼</div>
                </div>
                <div className="w-100">
                  {categoryStates["MARKETING"] && (
                    <div className="categoryList w-100 d-flex flex-column justify-content-center align-items-center pt-2">
                      {Object.values(categoriesList).map((category, index) => (
                        <div key={index} className="categoryLabelDesign">
                          {category}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Col>
              <Col className="themeContainer col-12 col-md-3 d-flex flex-column mb-4">
                <div
                  className="d-flex flex-row w-100 dropdownClick justify-content-center align-items-center"
                  onClick={() => toggleCategory("INFORMATICA")}
                >
                  <div className="logoCategory"></div>

                  <div className="themeContainerTitle">INFORMATICA</div>
                  <div className="dropdownButtonTheme px-2">▼</div>
                </div>
                <div className="w-100">
                {categoryStates["INFORMATICA"] && (
                    <div className="categoryList w-100 d-flex flex-column justify-content-center align-items-center pt-2">
                      {Object.values(categoriesList).map((category, index) => (
                        <div key={index} className="categoryLabelDesign">
                          {category}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Col>
              <Col className="themeContainer col-12 col-md-3 d-flex flex-column mb-4">
                <div
                  className="d-flex flex-row w-100 dropdownClick justify-content-center align-items-center"
                  onClick={() => toggleCategory("LOGISTICA")}
                >
                  <div className="logoCategory"></div>

                  <div className="themeContainerTitle">LOGISTICA</div>
                  <div className="dropdownButtonTheme px-2">▼</div>
                </div>
                <div className="w-100">
                {categoryStates["LOGISTICA"] && (
                    <div className="categoryList w-100 d-flex flex-column justify-content-center align-items-center pt-2">
                      {Object.values(categoriesList).map((category, index) => (
                        <div key={index} className="categoryLabelDesign">
                          {category}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
