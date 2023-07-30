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
import "./UsersListCard.css";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";
import { useSelector } from "react-redux";
import { getAllUsersByAdmin } from "../../services/apiCalls";
import { userDataCheck } from "../../pages/userSlice";
import moment from "moment";
import { RegisterCard } from "../RegisterCard/RegisterCard";
import Dropdown from "react-bootstrap/Dropdown";
import { RegisterCardAdmin } from "../RegisterCardAdmin/RegisterCardAdmin";
import { UserDetailCard } from "../UserDetailCard/UserDetailCard";

export const UsersListCard = () => {
  const credentialsRdx = useSelector(userDataCheck);
  const credentialCheck = credentialsRdx?.credentials?.token;
  const [usersData, setUsersData] = useState([]);
  const [activeComponentView, setActiveComponentView] = useState(1);

  const [criteria, setCriteria] = useState(null);
  const [userSelected, setUserSelected] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newUserRole, setNewUserRole] = useState("");
  const [filterOptions, setFilterOptions] = useState([
    {
      name: "Elegir filtro  ",
      value: "string",
    },
    {
      name: "Por nombre  ",
      value: "string",
      fieldName: "name",
    },
    {
      name: "Por mail  ",
      value: "mail",
      fieldName: "email",
    },
    {
      name: "Por role  ",
      value: "string",
      fieldName: "role_id",
    },
    {
      name: "Por estado  ",
      value: "string",
      fieldName: "user_status",
    },
  ]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  console.log(selectedFilter);

  const criteriaHandler = (e) => {
    const { value } = e.target;
    const selectedFieldName = selectedFilter?.option?.fieldName;
    const criteriaURLdesign = `${selectedFieldName}=${value}`;

    setCriteria(criteriaURLdesign);
    console.log("esto es criteria---------");
    console.log(criteriaURLdesign);
    console.log(selectedFieldName);
  };
  const getAllUsers = () => {
    getAllUsersByAdmin(credentialCheck, criteria)
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModalUser = () => {
    setNewUserRole(1);
    setShowModal(true);
  };

  const handleOpenModalSAT = () => {
    setNewUserRole(2);
    setShowModal(true);
  };

  const handleOpenModalDetail = (user) => {
    console.log(user)
    setUserSelected(user);

    setActiveComponentView(2);
    setShowModal(true);
  };

  console.log(userSelected);

  useEffect(() => {
    getAllUsers();
  }, [credentialsRdx, criteria]);

  return (
    <div className="ticketListCardContainer ticketListDesign d-flex justify-content-center align-items-center flex-column p-0">
      <TitleSectionCard title="Todos los usuarios" />
      <MDBRow className="d-flex justify-content-center mt-2">
        <div
          className="buttonSendTicket mx-2"
          onClick={() => handleOpenModalUser()}
        >
          Nuevo usuario{" "}
        </div>
        <div
          className="buttonSendTicket mx-2"
          onClick={() => handleOpenModalSAT()}
        >
          Nuevo SAT{" "}
        </div>
      </MDBRow>
      <MDBRow className="d-flex justify-content-center searchContainerDesign my-3 p-0">
        <MDBCol className="col-3 p-0 m-0">
          <div className="d-flex justify-content-end align-items-center p-0 m-0 dropdownContainer">
            <Dropdown className="p-0 h-100">
              <Dropdown.Toggle
                id="dropdown-basic"
                className="searchOptionsDropdown m-0"
              >
                {!selectedFilter
                  ? "Elegir filtro"
                  : selectedFilter?.option?.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {filterOptions.map((option, index) => (
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
        <MDBCol className="col-7 d-flex justify-content-start p-0 m-0">
          <input
            className="inputSearchOptions h-100 w-100"
            type={selectedFilter?.option?.value}
            name={selectedFilter?.option?.fieldName}
            onChange={criteriaHandler}
            onBlur={() => getAllUsers()}
          />
        </MDBCol>
      </MDBRow>
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
                    <p className="fw-normal mb-1">{user?.Role?.role_name}</p>
                  </td>
                  <td>
                    {user?.user_status === "Active" ? (
                      <MDBBadge color="success" pill>
                        {user?.user_status}
                      </MDBBadge>
                    ) : (
                      <MDBBadge color="danger" pill>
                        {user?.user_status}
                      </MDBBadge>
                    )}
                  </td>
                  <td>
                    <p
                      className="detailTicketButton"
                      onClick={() => handleOpenModalDetail(user)}
                    >
                      Ver
                    </p>
                  </td>
                </tr>
              ))
            : "No hay datos"}
        </MDBTableBody>
      </MDBTable>
      <MDBModal show={showModal} onHide={() => setShowModal(false)}>
        <MDBModalBody className="modalTicketDesign d-flex justify-content-center alig-items-center ">
          <div className="registerAdminContainer m-0 p-0 d-flex justify-content-center align-items-center flex-column">
            {activeComponentView == 1 && (
              <RegisterCardAdmin
                onClose={handleCloseModal}
                user={newUserRole}
              />
            )}
            {activeComponentView == 2 && (
              <UserDetailCard onClose={handleCloseModal} user={userSelected} />
            )}
          </div>
        </MDBModalBody>
      </MDBModal>{" "}
    </div>
  );
};
