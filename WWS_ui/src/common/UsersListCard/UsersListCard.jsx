import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBModal,
  MDBModalBody,
} from "mdb-react-ui-kit";
import "./UsersListCard.css";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";
import { useSelector } from "react-redux";
import { getAllUsersByAdmin } from "../../services/apiCalls";
import { userDataCheck } from "../../pages/userSlice";
import moment from "moment";
import { TicketDetailCard } from "../TicketDetailCard/TicketDetailCard";

export const UsersListCard = () => {
  const credentialsRdx = useSelector(userDataCheck);
  const credentialCheck = credentialsRdx?.credentials?.token;
  const [usersData, setUsersData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const roleCheck = credentialsRdx.credentials.user.roleId;

  const getAllUsers = () => {
    getAllUsersByAdmin(credentialCheck)
      .then((resultado) => {
        if (resultado.data.message == "Token invalido") {
          navigate("/");
          return;
        } else {
          setUsersData(resultado.data.data);
          console.log("Esto son los usuarios");
          console.log(usersData);
        }
      })
      .catch((error) => console.log(error));
  };

  //   const takeTicketData = (ticket) => {
  //     setSelectedTicket(ticket);
  //     console.log(ticket);
  //     setShowModal(true);
  //   };
  //   const handleCloseModal = () => {
  //     setShowModal(false);
  //   };

  useEffect(() => {
    getAllUsers();
  }, [credentialsRdx]);

  return (
    <div className="ticketListCardContainer ticketListDesign d-flex justify-content-center align-items-center flex-column p-0">
      <TitleSectionCard title="Todos los usuarios" />
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Role</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {usersData
            ? Object.values(usersData).map((user, index) => (
                <tr key={index}>
                  <td>
                    <p className="fw-normal mb-1">{user?.name}</p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{user?.email}</p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{user?.Role.role_name}</p>
                  </td>
                  <td>
                    {user?.user_status === "Active" ? (
                      <MDBBadge color="success" pill>
                        {user?.user_status}
                      </MDBBadge>
                    ) : 
                      <MDBBadge color="danger" pill>
                        {user?.user_status}
                      </MDBBadge>
                    }
                  </td>
                  <td>
                    <p className="detailTicketButton">Ver</p>
                  </td>
                </tr>
              ))
            : "CARGANDO"}
        </MDBTableBody>
      </MDBTable>
      {/* <MDBModal show={showModal} onHide={() => setShowModal(false)}>
        <MDBModalBody className="modalTicketDesign d-flex justify-content-center alig-items-center">
          {selectedTicket && (
            <TicketDetailCard
              ticket={selectedTicket}
              onClose={handleCloseModal}
            />
          )}
        </MDBModalBody>
      </MDBModal>{" "} */}
    </div>
  );
};
