import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import "./TicketListCard.css";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";
import { useSelector } from "react-redux";
import { getAllTicketsByUser } from "../../services/apiCalls";
import { userDataCheck } from "../../pages/userSlice";

export const TicketListCard = () => {
  const credentialsRdx = useSelector(userDataCheck);
  const credentialCheck = credentialsRdx?.credentials?.token;
  const [ticketsData, setTicketsData] = useState([]);

  const getAllTickets = () => {
    getAllTicketsByUser(credentialCheck)
      .then((resultado) => {
        if (resultado.data.message == "Token invalido") {
          navigate("/");
          return;
        } else {
          setTicketsData(resultado.data.data);
          console.log(credentialCheck);
          console.log("Esto es el ticketsData");
          console.log(ticketsData);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllTickets();
  }, [credentialsRdx]);

  return (
    <div className="ticketListCardContainer ticketListDesign p-0">
      <TitleSectionCard title="Mis tickets" />
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Categoria</th>
            <th scope="col">Titulo</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {ticketsData
            ? Object.values(ticketsData).map((ticket, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      <div>
                        <p className="fw-bold mb-1">
                          {ticket.Category.category_name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{ticket.ticket_title}</p>
                  </td>
                  <td>
                    {ticket.ticket_status === 1 ? (
                      <MDBBadge color="success" pill>
                        Asignado{" "}
                      </MDBBadge>
                    ) : (
                      <MDBBadge color="error" pill>
                        No asignado{" "}
                      </MDBBadge>
                    )}
                  </td>
                  <td>Ver</td>
                </tr>
              ))
            : "CARGANDO"}

          {/* <tr>
            <td>
              <div className="d-flex align-items-center justify-content-center">
                <div>
                  <p className="fw-bold mb-1">Nombre de categoria</p>
                </div>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1">Titulo de la categoria</p>
            </td>
            <td>
              <MDBBadge color="success" pill>
                Asignado{" "}
              </MDBBadge>
            </td>
            <td>Ver</td>
          </tr> */}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};
