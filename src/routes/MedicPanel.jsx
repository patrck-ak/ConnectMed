/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import Nav from "../components/Nav";
import React, { useEffect, useState } from "react";
import Notification from "../components/Notification";
import Style from "./css/MedicPanel.module.css";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import PopUp from "../components/PopUp";

const MedicPanel = () => {
  const id = localStorage.getItem("access-uid");
  const token = localStorage.getItem("access-token");
  const urlBase = "https://api-connectmed.onrender.com";
  const showPop = () => {};
  const closePop = () => {};

  var msgConfirmDelete = 'Isto apagará TODOS os dados do paciente e não é reversivel.'
  var titleDelete = 'Deseja apagar este paciente?'
  var [data, setData] = useState(undefined);
  var [msg, setMsg] = useState(" ");
  var [title, setTitle] = useState(" ");

  function defNotif(msgres, title) {
    setMsg(msgres);
    setTitle(title);
    setTimeout(() => {
      setMsg(" ");
      setTitle(" ");
    }, 6000);
  }

  function deletePacient(id) {
    
  }

  function List() {
    axios
      .post(`${urlBase}/dashboard/listpacients`, { id: id, token: token })
      .then(async (response) => {
        console.log("teste");
        setData(response.data.pacients);
        switch (response.data.status) {
          case 5:
            defNotif(data.msg, data.title);
            break;
          case 10:
            defNotif(`Pacientes atualizados: [${data.length}]`, "INFO");
            break;
          default:
            defNotif("Erro interno, contate o suporte.", "ERRO");
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    List();
  }, []);

  return (
    <>
      <Nav />
      <PopUp msg={msgConfirmDelete} title={titleDelete} showPop={showPop} closePop={closePop} />
      <Notification msg={msg} title={title} />
      <div 
        className="bg-dark"
        style={{ display: "flex", justifyContent: "center", marginTop: "7em", padding: "10px", borderRadius: "10px" }}
      >
        <ul
          className="list-group"
          style={{ width: "80%", position: "inherit" }}
        >
          <li className="mt-1 list-group-item bg-dark border-dark">
            <div
              className="input-group d-flex justify-content-evenly bg-dark border-dark "
              style={{ marginTop: "-10px" }}
            >
              <p
                className="input-group-text bg-transparent border-0 text-bg-dark"
                style={{ marginLeft: "-5vw", marginBottom: "-15px" }}
              >
                NOME
              </p>
              <p
                className="input-group-text bg-transparent border-0 text-bg-dark"
                style={{ marginBottom: "-15px" }}
              >
                CPF
              </p>
              <p
                className="input-group-text bg-transparent border-0 text-bg-dark"
                style={{ marginBottom: "-15px" }}
              >
                ENDEREÇO
              </p>
              <p
                className="input-group-text bg-transparent border-0 text-bg-dark"
                style={{ marginBottom: "-15px" }}
              >
                DESCRIÇÃO
              </p>
            </div>
          </li>
          {data === undefined ? (
            <li className="list-group-item bg-dark border-dark">
              <div className="input-group m-auto">
                <input
                  type="text"
                  readOnly
                  className="form-control text-center "
                  value="CARREGANDO..."
                />
              </div>
            </li>
          ) : (
            data.map((pacient) => (
              <li
                className="list-group-item bg-dark border-dark"
                key={pacient.name}
              >
                <div className="input-group m-auto">
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    value={pacient.name}
                  />
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    value={pacient.cpf}
                  />
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    value={pacient.addr}
                  />
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    value={pacient.desc}
                  />
                  <button className="btn btn-danger" onClick={deletePacient(pacient.id)} >
                    <FaTrash />
                  </button>
                  <button className="btn btn-success">
                    <FaPencilAlt />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default MedicPanel;
