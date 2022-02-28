import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import s from "./sendOffer/offerForm/offers.module.css";
import { API_URL } from "../../config";
import { useContext } from "react";
import Context from "../context/Context";
import { useDispatch } from "react-redux";
import { addSendler, selectMyOffers } from "../../reducers/offerReducer";

export const CardOfferLinkAdapter = (props) => {
    const value = useContext(Context);
    const [dateComission, setDateComission] = useState("");

    const dispatch = useDispatch();

    function DispatchOffers() {
      RequestSelectOffers();

      function RequestSelectOffers() {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", `${API_URL}api/offers/selectMyOffers`, true);
        xhr.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );

        xhr.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            let offersData = JSON.parse(xhr.response);

            requestInfoAutor(xhr.response);
          }
        };

        xhr.send(`selectOffers=${props.id}`);
      }

      function requestInfoAutor(xhr) {
        let req = new XMLHttpRequest();
        req.open("POST", `${API_URL}api/files/workData`, true);
        req.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        req.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            let offersData = JSON.parse(xhr);
            let workData = JSON.parse(req.response);

            dispatch(
              selectMyOffers(
                offersData.Id,
                offersData.nameOffer,
                offersData.date,
                offersData.tabelNum,
                offersData.nameSendler,
                offersData.surnameSendler,
                offersData.middlenameSendler,
                offersData.email,
                offersData.status,
                offersData.descriptionProblem,
                offersData.category,
                offersData.view,
                offersData.responsibles,
                offersData.responsibles_rg,
                offersData.textOffer,
                offersData.phoneNumber,
                offersData.dateComission,
                workData[1],
                workData[2]
              )
            );
          } else {
            // console.log("false response")
          }
        };

        req.send(`tabNum=${props.tabelNum}`);
      }
    }

    function DispatchAddSendler() {
      RequestAddSendlerOffers();

      function RequestAddSendlerOffers() {
        let idOffers = props.id;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", `${API_URL}api/offers/sendAddInfo`, true);
        xhr.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );

        xhr.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            dispatch(addSendler(xhr.response));
          }
        };
        xhr.send(`selectOffers=${idOffers}`);
        return xhr.response;
      }
    }
    function clickOnOfferLink() {
      localStorage.setItem("idOffers", props.id);
      localStorage.setItem("status", props.status);
      value.contextFunction(props.id, props.tabelNum);
      localStorage.setItem("dateComission", props.dateComission);
      setDateComission(localStorage.getItem("dateComission"));
    }

    return (
        <NavLink
          to="/cardOffer"
          onClick={() => {
            clickOnOfferLink();
            DispatchOffers();
            DispatchAddSendler();
            localStorage.setItem("idOffers", props.id);
            localStorage.setItem("sendlerTabWG", props.tabelNum);
          }}
        >
			{props.children}
        </NavLink>
    );

  };

const Offers = () => {
  const [displ, setDispl] = useState("block");

	const Offer = (props) => {
		let nameStatus;
		let colorStatus;
		let colorStatus1;
		if (props.status == 1) {
		  nameStatus = "Подано";
		  colorStatus = "white";
		  colorStatus1 = "#d5b71d";
		}
		if (props.status == 2) {
		  colorStatus = "#ffd600";
		  nameStatus = "Рассматривается первоначальной рабочей группой";
		  colorStatus1 = "#d5b71d";
		}
		if (props.status == 3) {
		  nameStatus = "Отклонено первоначальной рабочей группой";
		  colorStatus = "red";
		  colorStatus1 = "red";
		}
		if (props.status == 4) {
		  nameStatus =
			"Направлено в подразделения для подготовки заключения и предварительного обоснования";
		  colorStatus = "#ffd600";
		  colorStatus1 = "#2d68d7";
		}
		if (props.status == 5) {
		  nameStatus = "Рассматривается рабочей группой";
		  colorStatus = "#508dff";
		  colorStatus1 = "#2d68d7";
		}
		if (props.status == 6) {
		  nameStatus =
			"Отклонено рабочей группой после рассмотрения подразделением(ями)";
		  colorStatus = "red";
		  colorStatus1 = "red";
		}
		if (props.status == 7) {
		  nameStatus = "Направлено секретарю комиссии";
		  colorStatus = "#c499f1";
		  colorStatus1 = "#b67df1";
		}
		if (props.status == 8) {
		  nameStatus = "Запланировано к рассмотрению комиссией";
		  colorStatus = "#7aa8ff";
		  colorStatus1 = "#b67df1";
		}
		if (props.status == 9) {
		  nameStatus = "Рассмотрено комиссией. Оформление результатов";
		  colorStatus = "#7aa8ff";
		  colorStatus1 = "#b67df1";
		}
		if (props.status == 10) {
		  nameStatus = "Результаты рассмотрения комиссией оформлены";
		  colorStatus = "#7aa8ff";
		  colorStatus1 = "#b67df1";
		}
		if (props.status == 11) {
		  nameStatus = "Отклонено комиссией";
		  colorStatus1 = "red";
		}
		if (props.status == 12) {
		  nameStatus = "Направлено для внедрения";
		  colorStatus = "#8ef392";
		  colorStatus1 = "#2db873";
		}
		if (props.status == 13) {
		  nameStatus = "Внедрено";
		  colorStatus = "#8ef392";
		  colorStatus1 = "#2db873";
		}

		return ( <div className={colorStatus} style={{ }}>
			  <CardOfferLinkAdapter {...props}>
				  <div className={s.header} style={{ backgroundColor: colorStatus }}>
					<div className={s.offerPreview}>
					  <div
						className={s.from}
						style={{ justifyContent: "space-between" }}
					  >
						<div
						  className={s.fromName}
						  style={{
							backgroundColor: "darkorange",
							borderRadius: "5px",
							color: "white",
							textShadow: "1px 1px 2px #0e23ff",
						  }}
						>
						  {" "}
						  {props.surname + " " + props.name + " " + props.midlename}
						</div>
						{/* <div className={s.date}> {props.date.slice(0, 9)}</div> */}
						<div
						  className={s.status}
						  style={{
							backgroundColor: colorStatus1,
							textShadow: "1px 1px 2px black",
							color: "white",
							borderRadius: "20px",
							paddingLeft: "12px",
							paddingRight: "12px",
							border: "1px solid",
						  }}
						>
						  {" "}
						  {nameStatus}
						</div>
					  </div>
					  <div
						className={s.offerText}
						style={{
						  display: "flex",
						  justifyContent: "space-between",
						}}
					  >
						<div className={s.date}>№{props.id}</div>
						<div
						  style={{
							marginRight: "7px",
							marginLeft: "7px",
							textAlign: "center",
						  }}
						>
						  {props.nameOffer}
						</div>
						<div className={s.date}>
						  {" "}
						  {props.date
							.slice(0, 10)
							.replace(/(\d{4})-(\d\d)-(\d\d)/, "$3/$2/$1")}
						</div>
					  </div>
					</div>
				  </div>
			  </CardOfferLinkAdapter>
		</div>);
	}

  function SortOffers(props) {
    const [sortArr, setSortArr] = useState(null);
    console.log(props.typeSort);
    let offersData = JSON.parse(props.request);
    let sort = props.sort;
    let arr = [];
    if (props.typeSort === null) {
      return <div>{/* нет сортировки */}</div>;
    }
    switch (props.typeSort) {
      case "numberOffer":
        offersData.map((number, count) => {
          if (`${number.Id}`.includes(sort) === true) {
            arr.push(number);
          } else {
            return <div>sort null</div>;
          }
        });

        if (arr.length !== 0 && sort.length !== 0) {
          return (
            <div>
              {" "}
              Результат поиска <OffersLink request={arr} />{" "}
            </div>
          );
        } else {
          return <div>{/* нет сортировки */}</div>;
        }
        break;

      case "nameOffer":
        offersData.map((number, count) => {
          if (
            `${number.nameOffer}`.toLowerCase().includes(sort.toLowerCase()) ===
            true
          ) {
            arr.push(number);
          } else {
            return <div>sort null</div>;
          }
        });

        if (arr.length !== 0 && sort.length !== 0) {
          return (
            <div>
              {" "}
              Результат поиска <OffersLink request={arr} />{" "}
            </div>
          );
        } else {
          return <div>{/* нет сортировки */}</div>;
        }
        break;

      case "fullname":
        if (sort == null) {
          sort = " ";
        }
        let fullname = sort.toLowerCase().split(" ");
        console.log(fullname);
        if (fullname.length === 1) {
          offersData.map((number, count) => {
            if (
              `${number.surnameSendler.toLowerCase()}`.includes(fullname) ===
              true
            ) {
              arr.push(number);
            } else {
              return <div>sort null</div>;
            }
          });

          if (arr.length !== 0 && sort.length !== 0) {
            return (
              <div>
                {" "}
                Результат поиска <OffersLink request={arr} />{" "}
              </div>
            );
          } else {
            return <div>{/* нет сортировки */}</div>;
          }
        } else if (fullname.length === 2) {
          offersData.map((number, count) => {
            if (
              `${number.surnameSendler.toLowerCase()}`.includes(fullname[0]) ===
                true &&
              `${number.nameSendler.toLowerCase()}`.includes(fullname[1]) ===
                true
            ) {
              arr.push(number);
            } else {
              return <div>sort null</div>;
            }
          });

          if (arr.length !== 0 && sort.length !== 0) {
            return (
              <div>
                {" "}
                Результат поиска <OffersLink request={arr} />{" "}
              </div>
            );
          } else {
            return <div>{/* нет сортировки */}</div>;
          }
        } else if (fullname.length === 3) {
          offersData.map((number, count) => {
            if (
              `${number.surnameSendler.toLowerCase()}`.includes(fullname[0]) ===
                true &&
              `${number.nameSendler.toLowerCase()}`.includes(fullname[1]) ===
                true &&
              `${number.middlenameSendler.toLowerCase()}`.includes(fullname[2])
            ) {
              arr.push(number);
            } else {
              return <div>sort null</div>;
            }
          });

          if (arr.length !== 0 && sort.length !== 0) {
            return (
              <div style={{ marginBottom: "10px" }}>
                {" "}
                Результат поиска <OffersLink request={arr} />
              </div>
            );
          } else {
            return <div>{/* нет сортировки */}</div>;
          }
          break;
        }
    }
  }

  const OffersLink = (props) => {
    console.log(typeof props.request);
    // console.log( props.request)

    if (typeof props.request === "object") {
      return props.request.map((number) => (
        <Offer
          key={`offer_${number.Id}`}
          id={number.Id}
          date={number.date}
          name={number.nameSendler}
          surname={number.surnameSendler}
          midlename={number.middlenameSendler}
          status={number.status}
          nameOffer={number.nameOffer}
          tabelNum={number.tabelNum}
          dateComission={number.dateComission}
          email={number.email}
        />
      ));
    } else {
      let offersData = JSON.parse(props.request);
      // console.log(offersData)
      let offersDataReverse = offersData.reverse();

      return offersDataReverse.map((number) => (
        <Offer
          key={`offer_${number.Id}`}
          id={number.Id}
          date={number.date}
          name={number.nameSendler}
          surname={number.surnameSendler}
          midlename={number.middlenameSendler}
          status={number.status}
          nameOffer={number.nameOffer}
          tabelNum={number.tabelNum}
          dateComission={number.dateComission}
          email={number.email}
        />
      ));
    }
  };

  // function sortNumberOffer

  class CheckboxNewList extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        check: this.props.check,
        img: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
      };
      this.check = this.check.bind(this);
    }

    check(event) {
      
      this.setState({ check: event.target.checked });

      if (this.state.check === true) {
        this.setState({
          img: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z",
        });
        var x = document.getElementsByClassName(`${this.props.color}`);
          var i;
          for (i = 0; i < x.length; i++) 
        {
         x[i].className += ' newclassname'; // WITH space added
        }
        
       
      }
      if (this.state.check === false) {
        this.setState({
          img: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
        });
        var x = document.getElementsByClassName(`${this.props.color}`);
          var i;
          for (i = 0; i < x.length; i++) 
        {
         x[i].className = `${this.props.color}`;
        }


       
      }

      if (this.props.checked && typeof this.props.checked === "function") {
        this.props.checked(!this.state.check, this.props.label);
      }
    }

    render() {
      return (
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <span>
            <input
              style={{ display: "none" }}
              class=""
              type="checkbox"
              data-indeterminate="false"
              value=""
              defaultChecked={this.state.check}
              onChange={this.check}
            />
            <svg
              style={{ width: "25px", fill: this.props.color, boxShadow: "-1px 1px 1px 1px rgb(34 60 80 / 20%"}}
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d={this.state.img}>{this.state.img}</path>
            </svg>
            <span class=""></span>
          </span>
          <span class="">{this.props.name}</span>
        </label>
      );
    }
  }

  const [reqAllOff, setReqAllOff] = useState(0);
  const [sort, setSort] = useState("null");
  const [typeSort, setTypeSort] = useState("numberOffer");

  function CheckBoxItem(props) {
    const [checked, setChecked] = React.useState(true);

    const [iconCheck, setIconCheck] = React.useState(
      "MuiCheckbox-root MuiCheckbox-colorSuccess MuiButtonBase-root MuiCheckbox-root MuiCheckbox-colorSuccess PrivateSwitchBase-root Mui-checked css-10drtbx-MuiButtonBase-root-MuiCheckbox-root"
    );
    const [blanckPath, setBlanckPath] = React.useState(
      "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
    );

    const [dis, setDis] = React.useState("checked");
    function CheckTrueFalse(props) {
      console.log(props);
      setChecked(!checked);

      if (dis == "notChecked") {
        setDis("checked");
        setIconCheck("CheckBoxIcon");
        setBlanckPath(
          "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        );
        setDispl(props);
        console.log(displ);
      } else {
        setDis("notChecked");
        setIconCheck("CheckBoxOutlineBlankIcon");
        setBlanckPath(
          "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
        );
        setDispl("none");
        console.log(displ);
      }
      console.log("ривет");
    }

    return (
      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <span class={dis} >
          <input
            style={{ display: "none" }}
            class=""
            type="checkbox"
            data-indeterminate="false"
            value=""
            defaultChecked={checked}
            onChange={CheckTrueFalse}
          />
          <svg
            style={{ width: "25px", fill: props.color, boxShadow: "-1px 1px 6px 5px rgb(34 60 80 / 20%"}}
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
            data-testid={iconCheck}
          >
            <path d={blanckPath}></path>
          </svg>
          <span class=""></span>
        </span>
        <span class="">{props.name}</span>
      </label>
    );
  }

  function CheckBoxesList(props) {
    let chkBoxesList = [
      { name: "Подано", color: "white" },
      { name: "Рассмотрение подразделениями", color: "#ffd600" },
      { name: "Комиссия", color: "#7aa8ff" },
      { name: "Внедрение", color: "#8ef392" },
      { name: "Направлено секретарю комиссии", color: "#c499f1" },
      { name: "Отклонено", color: "red" },
    ];
    return chkBoxesList.map((item) => (
      <CheckboxNewList name={item.name} color={item.color} check={true}/>
      // <CheckBoxItem name={item.name} color={item.color} />
    ));
  }

  if (reqAllOff === 0) {
    Resp();
  }

  function Resp() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `${API_URL}api/offers/allOffers`, false);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // console.log(xhr.response)
        setReqAllOff(xhr.response);
      }
    };
    xhr.send();

    return xhr.response;
  }

  if (sort === "null" || sort.length === 0) {
    return (
      <div className={s.offersContainer}>
        <div className={s.titleHeader}>
          {" "}
          Предложения для обработки рабочей группой
        </div>
        <div className={s.searchContainer}>
          <div
            style={{
              fontSize: "15px",
              textAlign: "right",
              paddingRight: "10px",
              paddingTop: "5px",
            }}
          >
            Искать по{" "}
          </div>
          <select
            value={typeSort}
            onChange={(e) => {
              setTypeSort(e.target.value);
            }}
          >
            <option selected value="numberOffer">
              Номеру предложения
            </option>
            <option value="nameOffer">Названию предложения</option>
            <option selected value="fullname">
              ФИО автора
            </option>
          </select>
          <div
            style={{
              fontSize: "25px",
              textAlign: "right",
              paddingRight: "10px",
              paddingBottom: "30px",
            }}
          >
            {" "}
            &#128269;
          </div>
          <input
            type="text"
            name="sort"
            className={s.searchOffer}
            onChange={(e) => {
              setSort(e.target.value);
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "gainsboro"}}>
          <CheckBoxesList />
        </div>

        

        <SortOffers request={reqAllOff} sort={sort} typeSort={typeSort} />
        <OffersLink request={reqAllOff} />
      </div>
    );
  } else {
    return (
      <div className={s.offersContainer}>
        <div className={s.titleHeader}>
          {" "}
          Предложения для обработки рабочей группой
        </div>
        <div className={s.searchContainer}>
          <div
            style={{
              fontSize: "15px",
              textAlign: "right",
              paddingRight: "10px",
              paddingTop: "5px",
            }}
          >
            Искать по{" "}
          </div>
          <select
            value={typeSort}
            onChange={(e) => {
              setTypeSort(e.target.value);
            }}
          >
            <option selected value="numberOffer">
              Номеру предложения
            </option>
            <option value="nameOffer">Названию предложения</option>
            <option selected value="fullname">
              ФИО автора
            </option>
          </select>
          <div
            style={{
              fontSize: "25px",
              textAlign: "right",
              paddingRight: "10px",
              paddingBottom: "30px",
            }}
          >
            {" "}
            &#128269;
          </div>
          <input
            type="text"
            name="sort"
            className={s.searchOffer}
            onChange={(e) => {
              setSort(e.target.value);
            }}
          />
        </div>
        <SortOffers request={reqAllOff} sort={sort} typeSort={typeSort} />
      </div>
    );
  }
};
export default Offers;
