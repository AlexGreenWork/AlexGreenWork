// import * as React from 'react';
import React, { useState } from "react";
// import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import  {useState} from 'react';
// import DateTimePicker from '@mui/lab/DateTimePicker';

// import {useDispatch, useSelector} from "react-redux";

import s from "../comission/comission.module.css";
import CardOfferUpload from "../../../../components/card/card";
import DndOffer from "../../../../components/dnd/dnd";
import { saveComissionAnnotationToDb } from "../../../../../actions/file";
import Button from "@material-ui/core/Button";
import { API_URL } from "../../../../../config";
import { toDbDateComission } from "../../../../../actions/offers";
import { useDispatch } from "react-redux";
import StatementFileList from "./comissionFiles";
import { store } from "../../../../../reducers";
import server from "../../../../../actions/server";
import CostOffers from "./costOffers";

function IMG(props) {
  return (
    <div className="imgFile">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
        <g>
          <title>Layer 1</title>
          <line
            stroke="#000"
            stroke-linecap="undefined"
            stroke-linejoin="undefined"
            id="svg_1"
            y2="1.66663"
            x2="0.73774"
            y1="49.64471"
            x1="0.84703"
            fill="none"
          />
          <line
            stroke-linecap="undefined"
            stroke-linejoin="undefined"
            id="svg_2"
            y2="2.10379"
            x2="0.84703"
            y1="2.10379"
            x1="34.94534"
            stroke="#000"
            fill="none"
          />
          <line
            stroke-linecap="undefined"
            stroke-linejoin="undefined"
            id="svg_4"
            y2="49.64471"
            x2="49.15297"
            y1="12.70487"
            x1="49.26226"
            stroke="#000"
            fill="none"
          />
          <line
            stroke-linecap="undefined"
            stroke-linejoin="undefined"
            id="svg_6"
            y2="13.03274"
            x2="49.26226"
            y1="2.32237"
            x1="34.72676"
            stroke="#000"
            fill="none"
          />
          <line
            stroke="#000"
            stroke-linecap="undefined"
            stroke-linejoin="undefined"
            id="svg_7"
            y2="13.90705"
            x2="34.72676"
            y1="2.75953"
            x1="34.72676"
            fill="none"
          />
          <line
            stroke-linecap="undefined"
            stroke-linejoin="undefined"
            id="svg_8"
            y2="13.46989"
            x2="34.72676"
            y1="13.57918"
            x1="49.04368"
            stroke="#000"
            fill="none"
          />
          <line
            stroke-linecap="undefined"
            stroke-linejoin="undefined"
            id="svg_9"
            y2="49.09826"
            x2="3.46997"
            y1="36.63926"
            x1="3.36068"
            stroke="#000"
            fill="none"
          />
          <line
            transform="rotate(1.43372 5.35885 36.5227)"
            stroke="#000"
            stroke-linecap="undefined"
            stroke-linejoin="undefined"
            id="svg_10"
            y2="36.63926"
            x2="2.92353"
            y1="36.40613"
            x1="7.79418"
            fill="none"
          />
          <line
            stroke-linecap="undefined"
            stroke-linejoin="undefined"
            id="svg_11"
            y2="41.77587"
            x2="3.36068"
            y1="41.77587"
            x1="6.3115"
            stroke="#000"
            fill="none"
          />
          <line
            stroke-linecap="undefined"
            stroke-linejoin="undefined"
            id="svg_12"
            y2="49.31684"
            x2="10.68308"
            y1="36.42068"
            x1="10.68308"
            stroke="#000"
            fill="none"
          />
          <line
            stroke-linecap="undefined"
            stroke-linejoin="undefined"
            id="svg_13"
            y2="49.53542"
            x2="13.52461"
            y1="36.42068"
            x1="13.63389"
            stroke="#000"
            fill="none"
          />
          <line
            stroke="#000"
            stroke-linecap="undefined"
            stroke-linejoin="undefined"
            id="svg_14"
            y2="49.20755"
            x2="13.03297"
            y1="49.09826"
            x1="17.45903"
            fill="none"
          />
          <line
            stroke-linecap="undefined"
            stroke-linejoin="undefined"
            id="svg_15"
            y2="49.42613"
            x2="20.847"
            y1="36.52997"
            x1="20.62842"
            stroke="#000"
            fill="none"
          />
          <line
            stroke="#000"
            stroke-linecap="undefined"
            stroke-linejoin="undefined"
            id="svg_16"
            y2="49.09826"
            x2="20.30427"
            y1="49.09826"
            x1="24.56284"
            fill="none"
          />
          <line
            transform="rotate(-2.33302 22.1038 43.3606)"
            stroke-linecap="undefined"
            stroke-linejoin="undefined"
            id="svg_17"
            y2="43.30592"
            x2="20.73771"
            y1="43.41521"
            x1="23.46995"
            stroke="#000"
            fill="none"
          />
          <line
            transform="rotate(5.38926 22.4317 36.9671)"
            stroke="#000"
            stroke-linecap="undefined"
            stroke-linejoin="undefined"
            id="svg_18"
            y2="37.18571"
            x2="20.51913"
            y1="36.74855"
            x1="24.34426"
            fill="none"
          />
        </g>
      </svg>
      {props.type}
    </div>
  );
}

function FileCommissionList(props) {
  if (props.req !== "null") {
    let offersFile = JSON.parse(props.req);
    let arr = new Array();
    arr = offersFile;

    for (let i = 0; i < offersFile.length; i++) {
      for (let j = 0; j < offersFile[i].length; j++) {
        if (offersFile[i][j] == ".") {
          let format = offersFile[i].slice(j);
          arr[i] = React.createElement(
            "div",
            { className: "fileElement" },
            <div>{offersFile[i]}</div>,
            <IMG type={format} />,
            <input
              className="downloadFileFromGeneral download"
              type="submit"
              value="скачать"
              onClick={() => {
                downloadFile(offersFile[i]);
              }}
            />
          );
        } else {
        }
      }
    }

    return React.createElement("div", { className: "elementContainer" }, arr);
  } else {
    return React.createElement(
      "div",
      { className: "elementContainer" },
      <label>Нет файлов</label>
    );
  }
}

function downloadFile(obj) {
  // console.log(obj.props.children[0].props.children)
  let idOffers = localStorage.getItem("idOffers");
  window.location = `${API_URL}api/offers/downloadMyFile?idOffers=${idOffers}&folder=conclusionCommission&fileName=${obj.props.children[0].props.children}`;
}

const ComissionOffer = () => {
  const [annotateComission, setAnnotateComission] = useState("");
  const response1 = server
    .send_post_request(`${API_URL}api/offers/comission`, {
      idOffer: localStorage.getItem("idOffers"),
    })
    .then(function (data) {
      setAnnotateComission(data.data);
      console.log(data.data);
    });

  //   console.log("state", annotateComission)

  const [requestDir, setRequestDir] = React.useState(0);
  const [dateComission, setDateComission] = React.useState(
    `${localStorage.getItem("dateComission")}`
  );
  const [listFileComission, setListFileComission] = React.useState(
    <FileCommissionList req="null" />
  );

  if (requestDir === 0) {
    ReadDir();
    // console.log('условие рендеринга requestDir === 0');
  }
  // ReadDir();

  const handleSubmit = (event) => {
    event.preventDefault();
    UploadFileComission("file");
    //setRequestDir(0);
  };

  function UploadFileComission(file) {
    if (file === undefined) {
      return console.log("предложение без вложения файла");
    } else {
      let idOffers = localStorage.getItem("idOffers");
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      xhr.open("POST", `${API_URL}api/auth/conclusComissionUpload`, true);

      formData.append("idOffers", idOffers);
      formData.append(
        "fileConcCommission",
        document.getElementById(`${file}`).files[0]
      );
      console.log(document.getElementById(`${file}`).files[0]);
      console.log(formData);
      xhr.send(formData);

      xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          ReadDir();
          // setListFileComission(<FileList1 req={requestDir}/>)
        }
      };
    }
  }
  function ReadDir() {
    let idOffers = localStorage.getItem("idOffers");
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_URL}api/files/FilesConclusionCommission`, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        setRequestDir(xhr.response);
        setListFileComission(<FileCommissionList req={xhr.response} />);
      }
    };

    xhr.send(`idOffers=${idOffers}`);
  }

  const handleChange = (newValue) => {
    setDateComission(newValue);
  };

  const [viewChangeCom, setViewChangeCom] = React.useState("");

  function changeViewMultiSelect() {
    if (viewChangeCom == true) {
      setViewChangeCom(false);
    }
    if (viewChangeCom == false) {
      setViewChangeCom(true);
    }
  }

  function MultiSelectChangeCom(props) {
    const viewChangeCom = props.viewChangeCom;
    if (viewChangeCom == false) {
      return (
        <div>
          <Button
            sx={{
              border: "1px solid lightblue",
              boxShadow:
                "1px 4px 8px 4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);",
              margin: "10px",
            }}
            onClick={changeViewMultiSelect}
          >
            Редактировать
          </Button>
        </div>
      );
    }
    if (viewChangeCom == true) {
      return (
        <div>
          <div className={s.navMultiSel}>
            <Button onClick={changeViewMultiSelect}>Отменить</Button>
            <Button onClick={saveDateComission}>Сохранить</Button>
          </div>

          <div className={s.FormControl}>
            <label htmlFor="" className={s.labelCalender} data-shrink="true">
              Дата
            </label>
            <div className={s.inputCalender}>
              <input
                type="datetime-local"
                value={dateComission}
                onChange={(e) => handleChange(e.target.value)}
                renderInput={(params) => <TextField {...params} />}
              ></input>

              <fieldset aria-hidden="true" className={s.OutlineCalender}>
                <legend className="css-186xcr5"></legend>
              </fieldset>
            </div>
          </div>
        </div>
      );
    }
  }

  function IsAdminRG() {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input type="file" name="filename" id="file" />
          <button
            id="form-button"
            className="form-btn-sendOffer"
            type="submit"
            value="submit"
          >
            Загрузить файл{" "}
          </button>
        </form>
      </div>
    );
  }

  function IsAdminUser(props) {
    return <div></div>;
  }

  function profitToDB() {
    const authorProfit = document.getElementById("author");
    const soAuthorProfit = document.getElementById("soAuthor");
    const offerId = localStorage.getItem("idOffers");

    dispatch(profitToDB(authorProfit, soAuthorProfit, offerId));
  }

  function ProfitChange() {
    if (
      localStorage.getItem("userAdminOptions") == "wg" ||
      localStorage.getItem("userAdminOptions") == "topComission" ||
      localStorage.getItem("userAdminOptions") == "admin"
    ) {
      return (
        <div>
          <Button
            sx={{
              border: "1px solid lightblue",
              boxShadow:
                "1px 4px 8px 4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);",
              margin: "10px",
            }}
            onClick={profitToDB}
          >
            Сохранить суммы
          </Button>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  function DateTimeChange() {
    if (
      localStorage.getItem("userAdminOptions") == "wg" ||
      localStorage.getItem("userAdminOptions") == "topComission" ||
      localStorage.getItem("userAdminOptions") == "admin"
    ) {
      return <MultiSelectChangeCom viewChangeCom={viewChangeCom} />;
    } else {
      return <div></div>;
    }
  }

  function AdminChange(props) {
    const isAdmin = props.isAdmin;
    if (isAdmin == "wg") {
      return <IsAdminRG />;
    } else {
      return <IsAdminUser />;
    }
  }

  let offerId = localStorage.getItem("idOffers");

  function saveDateComission() {
    let T = /[T]/;
    let str = `${dateComission}`;
    let newstr = str.replace(T, " В ");
    toDbDateComission(offerId, dateComission);
    localStorage.setItem("dateComission", newstr);

    setViewChangeCom(false);
    alert("Изменения сохранены");
  }

  /////////////////////////////
  // const [dateComision, setDateComision] = React.useState('');
  //
  // const handleChangeView = (event) => {
  //     setDateComision(event.target.value);
  // };

  let dateCom = dateComission;
  var month = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];

  var d = new Date(`${dateCom}`);
  var newDate =
    d.getDate().toString().padStart(2, "0") + " " + month[d.getMonth()];

  var time = " в " + " " + d.getHours() + ":" + d.getMinutes();

  const dispatch = useDispatch();
  function saveToDbAnnotationComission() {
    const w = document.getElementById("textAreaCommision").innerText;
    console.log(w);
    dispatch(saveComissionAnnotationToDb(w));
    setAnnotateComission(w);
  }

  function AdminChangeComissionAnnotation() {
    const isAdminComission = localStorage.getItem("userAdminOptions");

    if (isAdminComission == "wg") {
      return (
        <div className={s.containerAnnotation}>
          <div>краткая аннотация решения:</div>
          <div
            contentEditable={"true"}
            id="textAreaCommision"
            placeholder="Напишите краткую аннотацию..."
            className={s.comissionTextArea}
            style={{
              width: "100%",
              flexDirection: "column",
              padding: "15px",
              borderRadius: "15px",
              boxShadow: "4px 4px 10px rgba(0,0,0,0.06)",
              minHeight: "150px",
              heght: "fit-content",
            }}
          >
            {annotateComission}
          </div>
          <Button
            sx={{
              border: "1px solid lightblue",
              boxShadow:
                "1px 4px 8px 4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);",
              margin: "10px",
            }}
            onClick={saveToDbAnnotationComission}
          >
            Сохранить
          </Button>
        </div>
      );
    } else {
      return (
        <div className={s.containerAnnotation}>
          <div>краткая аннотация решения:</div>
          <div
            id="textAreaCommision"
            placeholder="Напишите краткую аннотацию..."
            className={s.comissionTextArea}
            style={{
              width: "100%",
              flexDirection: "column",
            }}
          >
            {annotateComission}
          </div>
        </div>
      );
    }
  }
  function DateRender() {
    if (newDate == "NaN undefined") {
      return "Дата не назначена";
    } else {
      return (
        <div>
          {newDate}
          {time}
        </div>
      );
    }
  }

  return (
    <div className={s.nameOffer}>
      <div style={{ display: "flex" }}>
        Дата заседания комиссии: <DateRender />
      </div>

      <DateTimeChange isAmin={localStorage.getItem("userAdminOptions")} />

      <div
        style={{
          backgroundColor: "aliceblue",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "10px",
          boxShadow: "4px 4px 8px 0px rgb(34 60 80 / 20%) inset",
          marginTop: "5px",
        }}
      >
        <div>Файл протокола заседания:</div>
        <div className={s.filesContainer}>{listFileComission}</div>
        {/* <DndOffer/> */}
        <AdminChange isAdmin={localStorage.getItem("userAdminOptions")} />
      </div>
      <div
        style={{
          backgroundColor: "aliceblue",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "10px",
          boxShadow: "4px 4px 8px 0px rgb(34 60 80 / 20%) inset",
          marginTop: "5px",
        }}
      >
        <div>Файл выписки:</div>
        <div>
          <StatementFileList />
        </div>
      </div>
      <AdminChangeComissionAnnotation
        isAdmin={localStorage.getItem("userAdminOptions")}
      />
      <div
        style={{
          backgroundColor: "aliceblue",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "10px",
          boxShadow: "4px 4px 8px 0px rgb(34 60 80 / 20%) inset",
          marginTop: "5px",
        }}
      >
        <div>Величина вознаграждения</div>
        <div style={{ display: "flex" }}>
          {/* <div>
            <div>
              {" "}
              Автору:
               <div style={{
                                backgroundImage: `url(${API_URL + 'files/photos/' + store.getState().offers.offer.tabelNum + ".jpg"})`,
                                width: "40px",
                                height: "40px",
                                backgroundSize: "cover",
                                borderRadius: "50%",
                                backgroundPosition: "center"
                            }}>
                            </div> 
            </div>

            <div
              contentEditable={"true"}
              id="author"
              style={{ backgroundColor: "white" }}
            >
              {" "}
              1500
            </div>
          </div>
          <div>
            <div> Соавтору </div>
            <div contentEditable={"true"} id="soAuthor">
              {" "}
              1500
            </div>
          </div>
        </div> */}
        <CostOffers/>
        {/* <ProfitChange isAmin={localStorage.getItem("userAdminOptions")} /> */}
        </div>
      </div>
    </div>
  );
};
export default ComissionOffer;
