import React from "react";
import "./RegisterCard.css";
import { InputLabel } from "../../common/InputLabel/InputLabel";

export const RegisterCard = () => {
  return (
    <>
      <div className="registerCard">

      <div className="registerContainer mb-1">
          <div className="registerTitle mb-1">Nombre</div>
          <div className="inputDesign">
            <InputLabel
              type="name"
              placeholder="Introduce tu nombre"
              name="string"
              Length="15"
            />
          </div>
        </div>

        <div className="registerContainer mb-1">
          <div className="registerTitle mb-1">E-mail</div>
          <div className="inputDesign">
            <InputLabel
              type="email"
              placeholder="Introduce tu email"
              name="email"
            />
          </div>
        </div>

        <div className="registerContainer mb-1">
          <div className="registerTitle mb-1">Password</div>
          <div className="inputDesign">
            <InputLabel
              type="password"
              placeholder="Introduce tu password"
              name="password"
            />
          </div>
        </div>


        <div className="registerContainer mb-1">
          <div className="registerTitle mb-1">Repite tu Password</div>
          <div className="inputDesign">
            <InputLabel
              type="password"
              placeholder="Repite la password"
              name="password"
            />
          </div>
        </div>




      </div>
    </>
  );
};
