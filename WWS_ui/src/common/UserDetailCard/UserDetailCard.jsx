import React, { useState, useContext } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from "mdb-react-ui-kit";
import "./UserDetailCard.css";
import { useSelector } from "react-redux";
import { userDataCheck } from "../../pages/userSlice";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../../services/messageContext";

export const UserDetailCard = ({ onClose, user }) => {
  // const credentialsRdx = useSelector(userDataCheck);
  // const credentialCheck = credentialsRdx?.credentials?.token;
  // const roleCheck = credentialsRdx.credentials.user.roleId;
  // const navigate = useNavigate();
  // const { setMessage } = useContext(MessageContext);

console.log(user)



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
                      <MDBCol className="contentLabel px-2"> {user.name} </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <MDBRow className="inputTicketDetail d-flex m-0">
                      <MDBCol className="categoryLabel px-2">MAIL</MDBCol>
                      <MDBCol className="contentLabel px-2">  {user.email}  </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <MDBRow className="inputTicketDetail d-flex m-0">
                      <MDBCol className="categoryLabel px-2">ROLE</MDBCol>
                      <MDBCol className="contentLabel px-2">  {user.role_id}  </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <MDBRow className="inputTicketDetail d-flex m-0">
                      <MDBCol className="categoryLabel px-2">STATUS</MDBCol>
                      <MDBCol className="contentLabel px-2">  {user.user_status} </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="mt-3">
                    <MDBRow className="inputTicketDetail d-flex m-0">
                      <MDBCol className="categoryLabel px-2">CREACIÓN </MDBCol>
                      <MDBCol className="contentLabel px-2">  {user.createdAt}  </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="d-flex justify-content-center align-items-center">
                  <div className="buttonCloseTicket mx-2 mt-4">Desactivar</div>
                </MDBRow>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};
