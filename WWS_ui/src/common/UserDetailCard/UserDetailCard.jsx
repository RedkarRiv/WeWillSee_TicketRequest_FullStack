import React, { useContext } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import "./UserDetailCard.css";
import { useSelector } from "react-redux";
import { userDataCheck } from "../../pages/userSlice";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../../services/messageContext";
import { activateUser, inactivateUser } from "../../services/apiCalls";

export const UserDetailCard = ({ onClose, user }) => {
  const credentialsRdx = useSelector(userDataCheck);
  const credentialCheck = credentialsRdx?.credentials?.token;
  const navigate = useNavigate();
  const { setMessage } = useContext(MessageContext);

  const inactivateUserHandler = () => {
    inactivateUser(credentialCheck, user.id)
      .then((resultado) => {
        if (resultado.data.message == "Token invalido") {
          navigate("/");
          return;
        } else {
          setMessage("EL USUARIO HA SIDO DESACTIVADO");
          navigate("/m");
        }
      })
      .catch((error) => console.log(error));
  };

  const activateUserHandler = () => {
    activateUser(credentialCheck, user.id)
      .then((resultado) => {
        if (resultado.data.message == "Token invalido") {
          navigate("/");
          return;
        } else {
          setMessage("EL USUARIO HA SIDO ACTIVADO");
          navigate("/m");
        }
      })
      .catch((error) => console.log(error));
  };

  const resetCommentHandler = () => {
    onClose();
  };

  return (
    <MDBRow className="userDetailCardContainer d-flex justify-content-center align-items-center p-0">
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
          <TitleSectionCard title="Ticket en detalle" />
          <MDBRow className="contentBoxSide">
            <MDBCol lg="12" className="p-0">
              <MDBCardBody className="d-flex flex-column justify-content-center">
                <MDBRow>
                  <MDBCol md="12" className="mt-1">
                    <MDBRow className="inputTicketDetail d-flex m-0">
                      <MDBCol className="categoryLabel px-2">ID</MDBCol>
                      <MDBCol className="contentLabel px-2"> {user.id} </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <MDBRow className="inputTicketDetail d-flex m-0">
                      <MDBCol className="categoryLabel px-2">NOMBRE</MDBCol>
                      <MDBCol className="contentLabel px-2">
                        {" "}
                        {user.name}{" "}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <MDBRow className="inputTicketDetail d-flex m-0">
                      <MDBCol className="categoryLabel px-2">MAIL</MDBCol>
                      <MDBCol className="contentLabel px-2">
                        {" "}
                        {user.email}{" "}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <MDBRow className="inputTicketDetail d-flex m-0">
                      <MDBCol className="categoryLabel px-2">ROLE</MDBCol>
                      <MDBCol className="contentLabel px-2">
                        {" "}
                        {user.role_id}{" "}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <MDBRow className="inputTicketDetail d-flex m-0">
                      <MDBCol className="categoryLabel px-2">STATUS</MDBCol>
                      <MDBCol className="contentLabel px-2">
                        {" "}
                        {user.user_status}{" "}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <MDBRow className="inputTicketDetail d-flex m-0">
                      <MDBCol className="categoryLabel px-2">CREACIÓN </MDBCol>
                      <MDBCol className="contentLabel px-2">
                        {" "}
                        {user.createdAt}{" "}
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="d-flex justify-content-center align-items-center">
                  {user.user_status == "Active" && (
                    <div
                      className="buttonCloseTicket mx-2 mt-4"
                      onClick={() => inactivateUserHandler()}
                    >
                      Desactivar
                    </div>
                  )}
                  {user.user_status == "Inactive" && (
                    <div
                      className="buttonCloseTicket mx-2 mt-4"
                      onClick={() => activateUserHandler()}
                    >
                      Activar
                    </div>
                  )}
                </MDBRow>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};
