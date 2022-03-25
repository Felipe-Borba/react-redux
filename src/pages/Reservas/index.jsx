import React from "react";
import { MdDelete } from "react-icons/md";
import "./style.css";

function Reservas() {
  return (
    <div>
      <h1 className="title">Reservas</h1>

      <div className="reservas">
        <img
          src="https://sujeitoprogramador.com/wp-content/uploads/2019/12/maceio.jpg"
          alt="teste"
        />

        <strong>abc</strong>

        <span>Bfd</span>

        <button>
          <MdDelete size={20} color="#191919" />
        </button>
      </div>

      <footer>
        <button type="button">Solicitar Reserva</button>
      </footer>
    </div>
  );
}

export default Reservas;
