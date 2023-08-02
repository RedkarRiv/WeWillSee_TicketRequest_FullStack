import React, { useState, useContext, useEffect } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import "./CategoryFormCard.css";
import { useSelector } from "react-redux";
import { userDataCheck } from "../../pages/userSlice";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../../services/messageContext";
import { InputLabel } from "../InputLabel/InputLabel";
import { bringThemesByAdmin, newCategory } from "../../services/apiCalls";
import "bootstrap/dist/css/bootstrap.css";
import { Dropdown } from "react-bootstrap";

export const CategoryFormCard = ({ onClose }) => {
  const credentialsRdx = useSelector(userDataCheck);
  const credentialCheck = credentialsRdx?.credentials?.token;
  const navigate = useNavigate();
  const { setMessage } = useContext(MessageContext);
  const [themeData, setThemeData] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState({
    theme_name: "",
    theme_id: "",
  });
  const [newCredentials, setNewCredentials] = useState({
    category_name: "",
  });
  const [credentialsError, setCredentialsError] = useState({
    title: "",
    description: "",
  });
  const InputCheck = (e) => {
    let mensajeError = CheckError(e.target.name, e.target.value);

    setCredentialsError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: mensajeError,
    }));
  };

  const resetCommentHandler = () => {
    onClose();
  };
  const InputHandler = (e) => {
    setNewCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendNewCategory = (themeSelected, categorySelected) => {
    const newCategoryData = {
      new_category_name: categorySelected.category_name,
      theme: themeSelected.theme_id,
    };

    newCategory(credentialCheck, newCategoryData)
      .then((resultado) => {
        if (resultado.data.message == "Token invalido") {
          navigate("/");
          return;
        } else {
          setMessage("LA CATEGORÍA HA SIDO CREADA");
          navigate("/m");
        }
      })
      .catch((error) => console.log(error));
  };

  const getAllThemes = () => {
    bringThemesByAdmin(credentialCheck)
      .then((resultado) => {
        if (resultado.data.message == "Token invalido") {
          navigate("/");
          return;
        } else {
          setThemeData(resultado?.data?.data);
        }
      })
      .catch((error) => console.log(error));
  };
  const selectedThemeHandler = (theme) => {
    setSelectedTheme({
      theme_name: theme.theme_name,
      theme_id: theme.id,
    });
  };

  useEffect(() => {
    getAllThemes();
  }, [credentialsRdx]);

  return (
    <MDBRow className="ticketDetailCardContainer  w-100 d-flex justify-content-center align-items-center p-0">
      <MDBCol className="p-0 m-0">
        <MDBCard className="d-flex justify-content-center align-items-center cardDetailBackgroundDesign">
          <MDBRow className="p-0 m-0 d-flex justify-content-end align-items-center w-100">
            <div
              color="secondary"
              className="closeButtonModal"
              onClick={() => resetCommentHandler()}
            >
              X
            </div>
          </MDBRow>
          <TitleSectionCard title="Nueva categoria" />
          <MDBRow className="contentBoxSide">
            <MDBCol lg="12" className="p-0">
              <MDBCardBody className="d-flex flex-column justify-content-center">
                <MDBRow>
                  <MDBCol md="12" className="mt-1">
                    <MDBRow className="d-flex m-0">
                      <MDBCol className="px-2 col-12">
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="secondary"
                            id="dropdown-basic"
                            className="w-100"
                          >
                            Elige tema
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {themeData.length > 0
                              ? themeData.map((theme, index) => (
                                  <Dropdown.Item
                                    href="#/action-1"
                                    key={index}
                                    onClick={() => selectedThemeHandler(theme)}
                                  >
                                    <div>{theme?.theme_name}</div>
                                  </Dropdown.Item>
                                ))
                              : null}
                          </Dropdown.Menu>
                        </Dropdown>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    {selectedTheme.theme_name == "" && (
                      <div className="inputBlockedEmpty">
                        No hay tema seleccionado
                      </div>
                    )}
                    {selectedTheme.theme_name && (
                      <div className="inputBlocked">
                        {selectedTheme.theme_name}
                      </div>
                    )}
                  </MDBCol>
                  <MDBCol md="12" className="mt-3">
                    <MDBRow className="inputTicketDetail d-flex m-0">
                      <MDBCol className="categoryLabel px-2 d-flex align-items-center justify-content-center">
                        Titulo
                      </MDBCol>
                      <MDBCol className="col-8 px-2">
                        <InputLabel
                          type="string"
                          placeholder="Titulo de la categoría"
                          name="category_name"
                          Length={20}
                          classDesign=""
                          functionHandler={(e) => InputHandler(e)}
                          onBlurFunction={(e)=>InputCheck(e)}
                        />{" "}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <MDBRow></MDBRow>
                <MDBRow className="d-flex justify-content-center mt-4">
                  <>
                    <div
                      className="buttonActiveTicket mx-2"
                      onClick={() =>
                        sendNewCategory(selectedTheme, newCredentials)
                      }
                    >
                      Crear categoría
                    </div>
                  </>
                </MDBRow>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};
