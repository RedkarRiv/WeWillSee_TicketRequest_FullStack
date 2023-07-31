import React, { useEffect, useState } from "react";
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
import "./TicketListCard.css";
import Dropdown from "react-bootstrap/Dropdown";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";
import { useSelector } from "react-redux";
import {
  getAllTicketsByAdmin,
  getAllTicketsBySAT,
  getAllTicketsByUser,
  getAllTicketsStatus,
} from "../../services/apiCalls";
import { userDataCheck } from "../../pages/userSlice";
import moment from "moment";
import { TicketDetailCard } from "../TicketDetailCard/TicketDetailCard";
import loadingImg from "../../img/loadingGif.webp";

export const TicketListCard = () => {
  const credentialsRdx = useSelector(userDataCheck);
  const credentialCheck = credentialsRdx?.credentials?.token;
  const roleCheck = credentialsRdx.credentials.user.roleId;

  const [ticketsData, setTicketsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [criteria, setCriteria] = useState(null);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [ticketStatus, setTicketStatus] = useState([]);
  const itemsPerPage = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlerTicketStatus = () => {
    getAllTicketsStatus(credentialCheck)
      .then((resultado) => {
        setTicketStatus(resultado.data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    handlerTicketStatus();
  }, []);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return ticketsData.slice(startIndex, endIndex);
  };

  const getAllTickets = () => {
    switch (roleCheck) {
      case 1:
        getAllTicketsByUser(credentialCheck, criteria)
          .then((resultado) => {
            if (resultado.data.message == "Token invalido") {
              navigate("/");
              return;
            } else {
              setTicketsData(resultado.data.data);
            }
          })
          .catch((error) => console.log(error));
        break;
      case 2:
        getAllTicketsBySAT(credentialCheck, criteria)
          .then((resultado) => {
            if (resultado.data.message == "Token invalido") {
              navigate("/");
              return;
            } else {
              setTicketsData(resultado.data.data);
            }
          })
          .catch((error) => console.log(error));
        break;
      case 3:
        getAllTicketsByAdmin(credentialCheck, criteria)
          .then((resultado) => {
            if (resultado.data.message == "Token invalido") {
              navigate("/");
              return;
            } else {
              setTicketsData(resultado.data.data);
            }
          })
          .catch((error) => console.log(error));
        break;
    }
  };
  const criteriaHandler = (e) => {
    const { value, name } = e.target;
    const criteriaURLdesign = `${name}=${value}`;
    setCriteria(criteriaURLdesign);
  };

  const takeTicketData = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!ticketsData) {
      return;
    }
    const totalPages = Math.ceil(ticketsData.length / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    setPageNumbers(pageNumbers);
  }, [ticketsData]);

  useEffect(() => {
    getAllTickets();
  }, [credentialsRdx, criteria]);

  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    const criteriaURLdesign = `ticket_status=${status}`;
    setCriteria(criteriaURLdesign);
  };

  const [filterOptions, setFilterOptions] = useState([
    {
      name: "Elegir filtro  ",
      value: "string",
      fieldName: "",
    },
    {
      name: "Por titulo  ",
      value: "string",
      fieldName: "ticket_title",
    },
    {
      name: "Por estado  ",
      value: "string",
      fieldName: "ticket_status",
    },
    {
      name: "Por fecha  ",
      value: "date",
      fieldName: "createdAt",
    },
  ]);
  const [filterOptionsAdmin, setFilterOptionsAdmin] = useState([
    {
      name: "Elegir filtro  ",
      value: "string",
      fieldName: "",
    },
    {
      name: "Por titulo  ",
      value: "string",
      fieldName: "ticket_title",
    },
    {
      name: "Por SAT id  ",
      value: "string",
      fieldName: "SAT_assigned",
    },
    {
      name: "Por estado  ",
      value: "string",
      fieldName: "ticket_status",
    },
    {
      name: "Por fecha  ",
      value: "date",
      fieldName: "createdAt",
    },
  ]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  return (
    <div className="ticketListCardContainer ticketListDesign d-flex justify-content-center align-items-center flex-column p-0">
      <TitleSectionCard title="Todos los tickets" />
      <MDBRow className="d-flex justify-content-center searchContainerDesign my-3 m-0 p-0">
        <MDBCol className="col-3 p-0 m-0 d-flex justify-content-center items-align-center">
          <div className="d-flex justify-content-end align-items-center p-0 m-0 dropdownContainer">
            <Dropdown className="p-0 h-100 w-100 ">
              <Dropdown.Toggle
                id="dropdown-basic"
                className="searchOptionsDropdown m-0 "
              >
                {!selectedFilter
                  ? "Elegir filtro"
                  : selectedFilter?.option?.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {roleCheck !== 3
                  ? filterOptions.map((option, index) => (
                      <Dropdown.Item key={index}>
                        <div
                          key={option.name}
                          className="option"
                          onClick={() => {
                            setSelectedFilter({ option });
                          }}
                        >
                          {option.name}
                        </div>
                      </Dropdown.Item>
                    ))
                  : filterOptionsAdmin.map((option, index) => (
                      <Dropdown.Item key={index}>
                        <div
                          key={option.name}
                          className="option"
                          onClick={() => {
                            setSelectedFilter({ option });
                          }}
                        >
                          {option.name}
                        </div>
                      </Dropdown.Item>
                    ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </MDBCol>

        {selectedFilter?.option?.name !== "Por estado  " ? (
          <MDBCol className="col-6 d-flex p-0 me-1 me-md-4">
            <input
              className="inputSearchOptions h-100 w-100"
              name={selectedFilter?.option?.fieldName}
              type={selectedFilter?.option?.value}
              onChange={criteriaHandler}
              onBlur={() => getAllTickets()}
            />
          </MDBCol>
        ) : (
          <MDBCol className="col-8 d-flex p-0 me-1 me-md-4 d-flex justify-content-center align-items-center">
            {ticketStatus?.map((status) => (
              <label
                key={status.id}
                className="d-flex justify-content-center align-items-center mx-2 labelStatusDesign"
              >
                <input
                  type="radio"
                  name="ticket_status"
                  value={status.id}
                  checked={selectedStatus === status.id}
                  onChange={() => handleStatusSelect(status.id)}
                />
                <div className="mx-1"> {status.status_name} </div>
              </label>
            ))}
          </MDBCol>
        )}
      </MDBRow>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">SAT</th>
            {roleCheck === 3 && <th scope="col">SAT id</th>}
            <th scope="col">Titulo</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {ticketsData ? (
            ticketsData.length > 0 ? (
              getCurrentPageItems().map((ticket, index) => (
                <tr key={index}>
                  <td>
                    <p className="fw-normal mb-1">
                      {moment(ticket?.createdAt).format("YYYY-MM-DD")}{" "}
                    </p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{ticket?.SAT?.User?.name}</p>
                  </td>
                  {roleCheck === 3 && (
                    <td>
                      <p className="fw-normal mb-1">{ticket?.SAT?.id}</p>
                    </td>
                  )}
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
            ) : (
              <img
                alt="loading gif"
                src={loadingImg}
                className="loadingDashboardDesign"
              ></img>
            )
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
      <MDBModal show={showModal} onHide={() => setShowModal(false)}>
        <MDBModalBody className="d-flex justify-content-center alig-items-center">
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
