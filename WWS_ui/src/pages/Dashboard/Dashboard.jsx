import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Dashboard.css";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userDataCheck } from "../../pages/userSlice";
import { bringThemes } from "../../services/apiCalls";

export const Dashboard = () => {
  const categoriesList = {
    label1: "category1",
    label2: "category2",
    label3: "category3",
    label4: "category4",
    label5: "category5",
    label6: "category6",
  };
  const credentialsRdx = useSelector(userDataCheck);
  const [themeData, setThemeData] = useState([]);

  const credentialCheck = credentialsRdx?.credentials?.token;

  const TakeAllThemes = () => {
    console.log(credentialCheck);
    bringThemes(credentialCheck)
      .then((resultado) => {
        console.log("Esto es el resultado de traer los Themes");
        console.log(resultado);
        console.log("------Themes-----");
        console.log(resultado?.data?.data);
        setThemeData(resultado);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    TakeAllThemes();
  }, []);
  console.log("------ThemesData-----");

  console.log(themeData.data?.data);

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
          <Row className="d-flex justify-content-around align-items-around w-100 p-5">
            {themeData?.data?.data &&
              Object.values(themeData.data.data).map((theme, index) => (
                <Col
                  key={index}
                  className="themeContainer col-12 col-md-3 d-flex flex-column mb-4"
                >
                  <div className="d-flex flex-row w-100 dropdownClick justify-content-center align-items-center px-2">
                    <div className="logoCategory"></div>
                    <div className="themeContainerTitle">
                      {theme.theme_name}
                    </div>
                  </div>
                  <div className="w-100 dropdownContainer">
                    <div className="categoryList d-flex flex-column justify-content-center align-items-center pt-2">
                      {Object.values(theme?.Categories).map(
                        (category, index) => (
                          <div key={index} className="categoryLabelDesign">
                            {category.category_name}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
