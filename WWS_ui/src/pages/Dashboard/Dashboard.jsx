import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Dashboard.css";
import { Col, Container, Row } from "react-bootstrap";
import { userDataCheck } from "../../pages/userSlice";
import { getOneUser } from "../../services/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { userout } from "../../pages/userSlice";
import { useNavigate } from "react-router-dom";
import { TicketFormcard } from "../../common/TicketFormCard/TicketFormCard";
import { bringThemes } from "../../services/apiCalls";
import { TicketListCard } from "../../common/TicketListCard/TicketListCard";
import { TitleSectionCard } from "../../common/TitleSectionCard/TitleSectionCard";

export const Dashboard = () => {
  const credentialsRdx = useSelector(userDataCheck);
  const [userData, setUserData] = useState({});
  const credentialCheck = credentialsRdx?.credentials?.token;
  const [themeData, setThemeData] = useState([]);
  const [categoryTicket, setCategoryTicket] = useState({});
  const [activeComponentView, setActiveComponentView] = useState(1);

  const loadForm = (categoryData) => {
    setCategoryTicket(categoryData);
    setActiveComponentView(3);
  };
  const dinamicRenderHandler = (componentNumber) => {
    setActiveComponentView(componentNumber);
  };

  const TakeAllThemes = () => {
    bringThemes(credentialCheck)
      .then((resultado) => {
        setThemeData(resultado);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    TakeAllThemes();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getMyProfile = () => {
    getOneUser(credentialCheck)
      .then((resultado) => {
        if (resultado.data.message == "Token invalido") {
          navigate("/");
          return;
        } else {
          setUserData(resultado.data.data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!credentialsRdx) {
      navigate("/");
      return;
    }
    getMyProfile();
  }, [credentialsRdx]);

  const logOut = () => {
    dispatch(userout());
    navigate("/");
  };

  return (
    <Container fluid className="p-0 m-0 d-flex">
      <Row className="dashboardBackground d-flex flex-column flex-md-row justify-content-center align-items-start px-1 m-0 pt-md-5">
        <Col className="profileBar col-md-2 col-sm-12 my-1 mx-md-1 d-flex flex-lg-column flex-md-row  pt-md-4 pb-md-4">
          <div className="profileAvatarContainer d-flex  flex-column  m-0 align-items-sm-center justify-content-sm-center align-items-md-center justify-content-md-start">
            <div className="m-0 d-flex p-1 justify-content-center align-items-center">
              <img
                src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                alt="Avatar logo"
                className="profileAvatar"
              />
            </div>
            <div className="userTitle pt-md-2">{userData.name}</div>
            <div className="logoutDesign" onClick={() => logOut()}>
              Logout
            </div>
          </div>
          <div className="profileButtons d-flex flex-column justify-content-center align-items-center pt-md-3">
            <div className="buttonDesign">Mis datos</div>
            <div
              className="buttonDesign"
              onClick={() => dinamicRenderHandler(2)}
            >
              Mis tickets
            </div>
            <div
              className="buttonDesignNew"
              onClick={() => dinamicRenderHandler(1)}
            >
              New ticket
            </div>
          </div>
        </Col>
        <Col className="dashboardContainer col-lg-9 col-md-12 my-1 d-flex justify-content-center align-items-start p-0">
          <Row className="d-flex justify-content-around align-items-around w-100 pt-4 pb-4">
            {activeComponentView === 1 ? (
              <Row className="categoryListContainer d-flex justify-content-around p-0">
                <TitleSectionCard title="Selecciona una categoría" />
                {themeData?.data?.data
                  ? Object.values(themeData.data.data).map((theme, index) => (
                      <Col
                        key={index}
                        className="themeContainer col-md-12 col-lg-3 d-flex flex-column mb-sm-4 mt-lg-4"
                      >
                        <div className="d-flex flex-row w-100 dropdownClick justify-content-center align-items-center px-2">
                          <div className="logoCategory"></div>
                          <div className="themeContainerTitle d-flex justify-content-center">
                            {theme.theme_name.toUpperCase()}
                          </div>
                        </div>
                        <div className="w-100 dropdownContainer">
                          <div className="categoryList d-flex flex-column justify-content-center align-items-center pt-2">
                            {Object.values(theme?.Categories).map(
                              (category, index) => (
                                <div
                                  key={index}
                                  className="categoryLabelDesign"
                                  onClick={() => loadForm(category)}
                                >
                                  {category.category_name}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </Col>
                    ))
                  : "Cargando"}
              </Row>
            ) : null}

            {activeComponentView === 3 && (
              <TicketFormcard category={categoryTicket} />
            )}
            {activeComponentView === 2 && <TicketListCard />}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
