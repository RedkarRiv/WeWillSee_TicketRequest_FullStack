import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import "./TicketListCard.css";
import { TitleSectionCard } from "../TitleSectionCard/TitleSectionCard";

export const TicketListCard = () => {
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
          <tr>
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
          </tr>
          <tr>
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
          </tr>
          <tr>
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
          </tr>
          <tr>
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
          </tr>
          <tr>
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
          </tr>
          <tr>
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
          </tr>
          <tr>
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
          </tr>
          <tr>
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
          </tr>
          <tr>
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
          </tr>
          <tr>
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
          </tr>
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};
