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
import { UsersListCard } from "../../common/UsersListCard/UsersListCard";
import logoBackWWS from "../../img/logoWhiteWWS.png";
import { TemplateListCard } from "../../common/TemplateListCard/TemplateListCard";
import { ThemeListCard } from "../../common/ThemeListCard/ThemeListCard";

export const Dashboard = () => {
  const credentialsRdx = useSelector(userDataCheck);
  const [userData, setUserData] = useState({});
  const credentialCheck = credentialsRdx?.credentials?.token;
  const [themeData, setThemeData] = useState([]);
  const [categoryTicket, setCategoryTicket] = useState({});
  const [themeTicket, setThemeTicket] = useState({});
  const roleCheck = credentialsRdx?.credentials.user.roleId;
  let roleCheckId;

  switch (roleCheck) {
    case 1:
      roleCheckId = 2;
      break;
    case 2:
      roleCheckId = 1;
      break;
    case 3:
      roleCheckId = 5;
      break;
    default:
      break;
  }

  const [activeComponentView, setActiveComponentView] = useState(roleCheckId);

  const loadForm = (categoryData, themeData) => {
    setCategoryTicket(categoryData);
    setThemeTicket(themeData);
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
            <div className="mt-1 d-flex justify-content-center align-items-center">
              <img
                src={logoBackWWS}
                alt="Avatar logo"
                className="profileAvatar"
              />
            </div>
            <div className="userTitle pt-md-2 mt-2">{userData.name}</div>
            <div className="logoutDesign" onClick={() => logOut()}>
              Logout
            </div>
          </div>
          <div className="profileButtons d-flex flex-column justify-content-center align-items-center pt-md-3">
            {roleCheck !== 3 ? (
              <>
                <div
                  className="buttonDesign"
                  onClick={() => dinamicRenderHandler(1)}
                >
                  Mis tickets
                </div>
                {roleCheck === 1 && (
                  <div
                    className="buttonDesign"
                    onClick={() => dinamicRenderHandler(2)}
                  >
                    New ticket
                  </div>
                )}
                {roleCheck === 2 && (
                  <div
                    className="buttonDesign"
                    onClick={() => dinamicRenderHandler(4)}
                  >
                    Templates
                  </div>
                )}
              </>
            ) : (
              <>
                <div
                  className="buttonDesign"
                  onClick={() => dinamicRenderHandler(5)}
                >
                  All users
                </div>
                <div
                  className="buttonDesign"
                  onClick={() => dinamicRenderHandler(6)}
                >
                  All tickets
                </div>
                <div
                  className="buttonDesign"
                  onClick={() => dinamicRenderHandler(7)}
                >
                  All themes
                </div>{" "}
              </>
            )}
          </div>
        </Col>
        {roleCheck === 1 && (
          <Col className="dashboardContainer col-lg-9 col-md-12  my-1 d-flex justify-content-center align-items-start p-0">
            <Row className="d-flex justify-content-around align-items-around w-100 pt-4 pb-4">
              {activeComponentView === 2 ? (
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
                                (category, index) => {
                                  if (category.category_status !== "Inactive") {
                                    return (
                                      <div
                                        key={index}
                                        className="categoryLabelDesign"
                                        onClick={() =>
                                          loadForm(category, theme.theme_name)
                                        }
                                      >
                                        {category.category_name}
                                      </div>
                                    );
                                  }
                                  return null;
                                }
                              )}
                            </div>
                          </div>
                        </Col>
                      ))
                    : "Cargando"}
                </Row>
              ) : null}

              {activeComponentView === 3 && (
                <TicketFormcard category={categoryTicket} theme={themeTicket} />
              )}
              {activeComponentView === 1 && <TicketListCard />}
            </Row>
          </Col>
        )}

        {roleCheck === 2 && (
          <Col className="dashboardContainer col-lg-9 col-md-12  my-1 d-flex justify-content-center align-items-start p-0">
            <Row className="d-flex justify-content-around align-items-around w-100 pt-4 pb-4">
              {activeComponentView === 1 && <TicketListCard />}
              {activeComponentView === 4 && <TemplateListCard />}
            </Row>
          </Col>
        )}

        {roleCheck === 3 && (
          <Col className="dashboardContainer col-lg-9 col-md-12  my-1 d-flex justify-content-center align-items-start p-0">
            {activeComponentView === 5 && <UsersListCard />}
            {activeComponentView === 6 && <TicketListCard />}
            {activeComponentView === 7 && <ThemeListCard />}
          </Col>
        )}
      </Row>
    </Container>
  );
};
