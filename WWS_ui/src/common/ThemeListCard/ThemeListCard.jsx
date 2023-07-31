import React, { useEffect, useState } from "react";
import {
  MDBModal,
  MDBModalBody,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import "./ThemeListCard.css";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";
import { useSelector } from "react-redux";
import { bringThemesByAdmin } from "../../services/apiCalls";
import { userDataCheck } from "../../pages/userSlice";
import { CategoryDetailCard } from "../CategoryDetailCard/CategoryDetailCard";
import { CategoryFormCard } from "../CategoryFormCard/CategoryFormCard";

export const ThemeListCard = () => {
  const credentialsRdx = useSelector(userDataCheck);
  const credentialCheck = credentialsRdx?.credentials?.token;
  const [themeData, setThemeData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [expandedThemes, setExpandedThemes] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeComponentView, setActiveComponentView] = useState("");

  const getAllThemes = () => {
    bringThemesByAdmin(credentialCheck)
      .then((resultado) => {
        if (resultado.data.message == "Token invalido") {
          navigate("/");
          return;
        } else {
          setThemeData(resultado.data.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const takeCategoryData = (ticket) => {
    setActiveComponentView(1);
    setSelectedCategory(ticket);
    setShowModal(true);
  };

  const handleNewCategory = () => {
    setActiveComponentView(2);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleExpandTheme = (themeId) => {
    setExpandedThemes((prevExpanded) => ({
      ...prevExpanded,
      [themeId]: !prevExpanded[themeId],
    }));
  };

  useEffect(() => {
    getAllThemes();
  }, [credentialsRdx]);

  return (
    <div className="ticketListCardContainer ticketListDesign d-flex justify-content-center align-items-center flex-column p-0">
      <TitleSectionCard title="Todos las categorias" />
      <MDBRow className="d-flex justify-content-center mt-2">
        <div
          className="buttonSendTicket mx-2"
          onClick={() => handleNewCategory()}
        >
          Nueva categoria{" "}
        </div>
      </MDBRow>
      <MDBRow className="cardThemesContainer w-100 d-flex flex-column my-3 p-0">
        <div className="mapThemeContainer my-4 d-flex flex-column justify-content-center align-items-center">
          {themeData?.length > 0
            ? themeData?.map((theme, index) => (
                <MDBCol className="col-8 my-2" key={index}>
                  <div
                    className="themeNameDesign p-1"
                    onClick={() => handleExpandTheme(theme?.id)}
                  >
                    {theme?.theme_name}
                  </div>
                  <div>
                    {expandedThemes[theme.id] &&
                      theme?.Categories?.map((category, catIndex) => (
                        <div
                          className={
                            category?.category_status !== "Active"
                              ? "categoryNameDesign inactiveContent px-2"
                              : "categoryNameDesign activeContent px-2"
                          }
                          key={catIndex}
                          onClick={() => takeCategoryData(category)}
                        >
                          {category?.category_name}
                        </div>
                      ))}
                  </div>
                </MDBCol>
              ))
            : "Cargando"}
        </div>
      </MDBRow>
      <MDBModal show={showModal} onHide={() => setShowModal(false)}>
        <MDBModalBody className="modalTicketDesign d-flex justify-content-center alig-items-center ">
          {activeComponentView == 1 && (
            <div className="registerAdminContainer m-0 p-0 d-flex justify-content-center align-items-center flex-column">
              {
                <CategoryDetailCard
                  category={selectedCategory}
                  onClose={handleCloseModal}
                />
              }
            </div>
          )}
          {activeComponentView == 2 && (
            <div className="registerAdminContainer m-0 p-0 d-flex justify-content-center align-items-center flex-column">
              {<CategoryFormCard onClose={handleCloseModal} />}
            </div>
          )}
        </MDBModalBody>
      </MDBModal>{" "}
    </div>
  );
};
