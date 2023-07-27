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
import {
  getAllTicketsByAdmin,
  getAllTicketsBySAT,
  getAllTicketsByUser,
} from "../../services/apiCalls";
import { userDataCheck } from "../../pages/userSlice";
import moment from "moment";
import { TicketDetailCard } from "../TicketDetailCard/TicketDetailCard";

export const TicketListCard = () => {
  const credentialsRdx = useSelector(userDataCheck);
  const credentialCheck = credentialsRdx?.credentials?.token;
  const [ticketsData, setTicketsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const roleCheck = credentialsRdx.credentials.user.roleId;

  const getAllTickets = () => {
    switch (roleCheck) {
      case 1:
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
        break;
      case 2:
        getAllTicketsBySAT(credentialCheck)
          .then((resultado) => {
            if (resultado.data.message == "Token invalido") {
              navigate("/");
              return;
            } else {
              setTicketsData(resultado.data.data);
              console.log("Esto es el ticketsData de SAT");
              console.log(ticketsData);
            }
          })
          .catch((error) => console.log(error));
        break;
      case 3:
        getAllTicketsByAdmin(credentialCheck)
          .then((resultado) => {
            if (resultado.data.message == "Token invalido") {
              navigate("/");
              return;
            } else {
              setTicketsData(resultado.data.data);
              console.log("Esto es el ticketsData de Admin");
              console.log(ticketsData);
            }
          })
          .catch((error) => console.log(error));
        break;
    }
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
      <TitleSectionCard title="Todos los tickets" />
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
                      {moment(ticket?.createdAt).format("YYYY-MM-DD")}{" "}
                    </p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{ticket?.SAT?.User?.name}</p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{ticket?.ticket_title}</p>
                  </td>
                  <td>
                    {ticket?.ticket_status === 1 ? (
                      <MDBBadge color="success" pill>
                        En proceso
                      </MDBBadge>
                    ) : ticket?.ticket_status === 3 ? (
                      <MDBBadge color="danger" pill>
                        Anulado{" "}
                      </MDBBadge>
                    ) : (
                      <MDBBadge color="secondary" pill>
                        Cerrado{" "}
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
