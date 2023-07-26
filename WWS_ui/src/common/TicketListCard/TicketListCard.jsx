import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import "./TicketListCard.css";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";
import { useSelector } from "react-redux";
import { getAllTicketsByUser } from "../../services/apiCalls";
import { userDataCheck } from "../../pages/userSlice";
import moment from "moment";
import { TicketDetailCard } from "../TicketDetailCard/TicketDetailCard";

export const TicketListCard = () => {
  const credentialsRdx = useSelector(userDataCheck);
  const credentialCheck = credentialsRdx?.credentials?.token;
  const [ticketsData, setTicketsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const getAllTickets = () => {
    getAllTicketsByUser(credentialCheck)
      .then((resultado) => {
        if (resultado.data.message == "Token invalido") {
          navigate("/");
          return;
        } else {
          setTicketsData(resultado.data.data);
          console.log("Esto es el ticketsData");
          console.log(ticketsData);
        }
      })
      .catch((error) => console.log(error));
  };

  const takeTicketData = (ticket) => {
    setSelectedTicket(ticket);
    console.log(ticket);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getAllTickets();
  }, [credentialsRdx]);

  return (
    <div className="ticketListCardContainer ticketListDesign d-flex justify-content-center align-items-center flex-column p-0">
      <TitleSectionCard title="Mis tickets"/>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">SAT</th>
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
                    <p className="fw-normal mb-1">
                      {moment(ticket?.createdAt).format("YYYY-MM-DD")}
                    </p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{ticket?.SAT?.User?.name}</p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{ticket?.ticket_title}</p>
                  </td>
                  <td>
                    {ticket?.TicketStatus.status_name === "En proceso" ? (
                      <MDBBadge color="success" pill>
                        {ticket.TicketStatus.status_name}
                      </MDBBadge>
                    ) : ticket?.TicketStatus.status_name === "Anulada" ? (
                      <MDBBadge color="danger" pill>
                        {ticket.TicketStatus.status_name}
                      </MDBBadge>
                    ) : (
                      <MDBBadge color="secondary" pill>
                        {ticket.TicketStatus.status_name}
                      </MDBBadge>
                    )}
                  </td>
                  <td>
                    <p
                      className="detailTicketButton"
                      onClick={() => takeTicketData(ticket)}
                    >
                      Ver
                    </p>
                  </td>
                </tr>
              ))
            : "CARGANDO"}
        </MDBTableBody>
      </MDBTable>
      <MDBModal show={showModal} onHide={() => setShowModal(false)}>
        <MDBModalBody className="modalTicketDesign d-flex justify-content-center alig-items-center">
          {selectedTicket && (
            <TicketDetailCard
              ticket={selectedTicket}
              onClose={handleCloseModal}
            />
          )}
        
        </MDBModalBody>
      </MDBModal>{" "}
    </div>
  );
};
