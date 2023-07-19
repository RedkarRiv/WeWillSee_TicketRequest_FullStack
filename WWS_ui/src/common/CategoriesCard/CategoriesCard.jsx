import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./CategoriesCard.css";
import { Col } from "react-bootstrap";
import { userDataCheck } from "../../pages/userSlice";
import { bringThemes, } from "../../services/apiCalls";
import { useSelector } from "react-redux";


export const CategoriesCard = () => {
  const credentialsRdx = useSelector(userDataCheck);
  const [themeData, setThemeData] = useState([]);
  const credentialCheck = credentialsRdx?.credentials?.token;

  const TakeAllThemes = () => {
    console.log(credentialCheck);
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



  return (
    <>
      {themeData?.data?.data &&
        Object.values(themeData.data.data).map((theme, index) => (
          <Col
            key={index}
            className="themeContainer col-md-12 col-lg-3 d-flex flex-column mb-sm-4"
          >
            <div className="d-flex flex-row w-100 dropdownClick justify-content-center align-items-center px-2">
              <div className="logoCategory"></div>
              <div className="themeContainerTitle d-flex justify-content-center">
                {theme.theme_name.toUpperCase()}
              </div>
            </div>
            <div className="w-100 dropdownContainer">
              <div className="categoryList d-flex flex-column justify-content-center align-items-center pt-2">
                {Object.values(theme?.Categories).map((category, index) => (
                  <div key={index} className="categoryLabelDesign">
                    {category.category_name}
                  </div>
                ))}
              </div>
            </div>
          </Col>
        ))}
    </>
  );
};
