import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";

import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBModal,
  MDBModalBody,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import "./TemplateListCard.css";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";
import { useSelector } from "react-redux";
import { getAllTemplates } from "../../services/apiCalls";
import { userDataCheck } from "../../pages/userSlice";
import { TicketFormcard } from "../TicketFormCard/TicketFormCard";
import { TemplateFormCard } from "../TemplateFormCard/TemplateFormCard";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../../services/messageContext";

export const TemplateListCard = () => {
  const credentialsRdx = useSelector(userDataCheck);
  const credentialCheck = credentialsRdx?.credentials?.token;
  const [templateData, setTemplateData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const itemsPerPage = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return templateData.slice(startIndex, endIndex);
  };

  const bringAllTemplates = () => {
    getAllTemplates(credentialCheck)
      .then((resultado) => {
        if (resultado.data.message == "Token invalido") {
          navigate("/");
          return;
        } else {
          setTemplateData(resultado.data.data);
          console.log("Esto es el template data");
          console.log(templateData);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!templateData) {
      return;
    }
    const totalPages = Math.ceil(templateData.length / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    setPageNumbers(pageNumbers);
  }, [templateData]);

  useEffect(() => {
    bringAllTemplates();
  }, [credentialsRdx]);
  const [activeComponentView, setActiveComponentView] = useState(1);
  const dinamicRenderHandler = (componentNumber) => {
    setActiveComponentView(componentNumber);
  };
  return (
    <div className="templateListCardContainer text-center d-flex justify-content-center align-items-center flex-column p-0">
      {activeComponentView === 1 && (
        <>
          <TitleSectionCard title="Todos los templates" />
          <MDBRow>
            <div
              className="buttonSendTicket my-3 
        "
              onClick={() => dinamicRenderHandler(2)}
            >
              New Template
            </div>
          </MDBRow>

          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">Titulo</th>
                <th scope="col">Descripción</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {templateData ? (
                getCurrentPageItems().map((template, index) => (
                  <tr key={index}>
                    <td className="templateTitleDesign ">
                      <p className="fw-normal mb-1 d-flex justify-content-center font-weight-bold">
                        {template?.template_title}{" "}
                      </p>
                    </td>
                    <td className="templateDescriptionDesign">
                      <p className="fw-normal mb-1">
                        {" "}
                        {template?.template_description}{" "}
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="noResultMessage w-100 d-flex justify-content-center align-items-center">
                  NO HAY RESULTADOS
                </div>
              )}
            </MDBTableBody>
          </MDBTable>
          <div className="mb-3 w-100 d-flex justify-content-center">
            {pageNumbers.length !== 1
              ? pageNumbers.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    disabled={currentPage === pageNumber}
                  >
                    {pageNumber}
                  </button>
                ))
              : null}
          </div>
        </>
      )}
      {activeComponentView === 2 && <TemplateFormCard/>
}
    </div>
  );
};
