import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Home.css";
import { LoginCard } from "../../common/LoginCard/LoginCard";

export const Home = () => {
  return (
    <div className="homeBackground">
      <div className="credentialSlide">
        <div className="logoContainer mb-3"></div>
        <LoginCard />
        <div className="buttonLogin  mt-2 mb-3">Enviar</div>

        <div className="d-flex">
          <div className="notAccountRegistTitle mt-1 mb-1 me-2">
            ¿No tienes cuenta todavía?
          </div>
          <div className="notAccountRegist mt-1 mb-1"> Registrate.</div>
        </div>
      </div>

      <div className="imageSlide"></div>
    </div>
  );
};
