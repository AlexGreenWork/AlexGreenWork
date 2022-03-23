import React from "react";
import s from "../contentHome/contentContainer.module.css";
import { API_URL } from "../../config";
import { NavLink } from "react-router-dom";
import ContentContainer from "../contentHome/contentContainer";
import { style } from "@mui/system";
import { fn } from "moment";
import server from "../../actions/server";

const CehList = [
  { number: 400, name: "ГЕНЕРАЛЬНАЯ ДИРЕКЦИЯ" },
  { number: 401, name: "ОТДЕЛ ТЕХНИЧЕСКОГО СЕКРЕТАРИАТА" },
  { number: 410, name: "ОТДЕЛ ГЛАВНОГО МЕХАНИКА" },
  { number: 420, name: "ОТДЕЛ ГЛАВНОГО ЭНЕРГЕТИКА" },
  { number: 430, name: "УПРАВЛЕНИЕ ТЕХНИЧЕСКОГО СЕРВИСА" },
  { number: 431, name: "ОТДЕЛ ИДЕОЛОГИЧЕСКОЙ РАБОТЫ И СВЯЗЕЙ С ОБЩЕСТВЕННО" },
  { number: 433, name: "УПРАВЛЕНИЕ ПО МЕЖДУНАРОДНОЙ ФИНАНСОВОЙ ОТЧЕТНОСТИ" },
  { number: 436, name: "ОТДЕЛ СИСТЕМ ИНТЕЛЛЕКТУАЛЬНОГО УПРАВЛЕНИЯ КАРЬЕРОМ" },
  { number: 437, name: "ОТДЕЛ СОВЕРШЕНСТВОВАНИЯ УПРАВЛЕНИЯ ПРОИЗВОДСТВОМ И" },
  { number: 438, name: "ОТДЕЛ ПРОМЫШЛЕННОЙ ЭЛЕКТРОНИКИ" },
  { number: 441, name: "УПРАВЛЕНИЕ КАДРОВ" },
  { number: 443, name: "ФИНАНСОВОЕ УПРАВЛЕНИЕ" },
  { number: 444, name: "УПРАВЛЕНИЕ БУХГАЛТЕРСКОГО УЧЁТА И ОТЧЁТНОСТИ" },
  { number: 445, name: "ПРОИЗВОДСТВЕННО - ДИСПЕТЧЕРСКОЕ УПРАВЛЕНИЕ" },
  { number: 446, name: "ПЛАНОВО - ЭКОНОМИЧЕСКОЕ УПРАВЛЕНИЕ" },
  { number: 447, name: "УПРАВЛЕНИЕ ИНФОРМАЦИОННЫХ СИСТЕМ" },
  { number: 448, name: "УПРАВЛЕНИЕ ОРГАНИЗАЦИИ ТРУДА И ЗАРАБОТНОЙ ПЛАТЫ" },
  { number: 449, name: "УПРАВЛЕНИЕ КАПИТАЛЬНОГО СТРОИТЕЛЬСТВА" },
  { number: 450, name: "УПРАВЛЕНИЕ МАТЕР.-ТЕХНИЧ. СНАБЖЕНИЯ И КОМПЛЕКТАЦИИ" },
  { number: 452, name: "ЮРИДИЧЕСКОЕ УПРАВЛЕНИЕ" },
  { number: 453, name: "ОТДЕЛ ОХРАНЫ ТРУДА И ТЕХНИКИ БЕЗОПАСНОСТИ" },
  { number: 458, name: "УПРАВЛЕНИЕ ЭКОНОМИЧЕСКОЙ БЕЗОПАСНОСТИ" },
  { number: 459, name: "ОТДЕЛ РЕЖИМНО-СЕКРЕТНОЙ ДЕЯТЕЛЬНОСТИ, МОБИЛИЗАЦИОН" },
  { number: 463, name: "УПРАВЛЕНИЕ СИСТЕМЫ КАЧЕСТВА И СТАНДАРТИЗАЦИИ" },
  { number: 464, name: "КОНТРОЛЬНО-РЕВИЗИОННОЕ УПРАВЛЕНИЕ" },
  { number: 466, name: "УПРАВЛЕНИЕ КОРПОРАТИВНЫХ СУБЪЕКТОВ СОБСТВЕННОСТИ" },
  { number: 467, name: "ОТДЕЛ ТЕХНИКО-ЭКОНОМИЧЕСКОГО ОБОСНОВАНИЯ ИНВЕСТИЦИ" },
  { number: 468, name: "ОТДЕЛ СТРАТЕГИЧЕСКОГО РАЗВИТИЯ" },
  { number: 469, name: "УПРАВЛЕНИЕ СБЫТА" },
  { number: 480, name: "УПРАВЛЕНИЕ КОНТРОЛЯ КАЧЕСТВА" },
  { number: 490, name: "ОТДЕЛ МЕХАН-ЦИИ И АВТОМ-ЦИИ ПРОИЗ-НЫХ ПРОЦЕССОВ" },
  { number: 510, name: "ОТДЕЛ ВЕДОМСТВЕННОЙ ОХРАНЫ" },
  { number: 570, name: "МАРКЕТИНГ-ЦЕНТР - УКР" },
  { number: 571, name: "АНАЛИТИЧЕСКИЙ ОТДЕЛ МКЦ" },
  { number: 572, name: "ОТДЕЛ ИМПОРТА" },
  { number: 590, name: "СЛУЖБА ОЗЕЛЕНЕНИЯ, БЛАГОУСТРОЙСТВА И ХОЗЯЙСТВЕННОГ" },
  { number: 610, name: "УПРАВЛЕНИЕ ГЛАВНОГО ТЕХНОЛОГА" },
  { number: 620, name: "ЦЕНТРАЛЬНАЯ ЗАВОДСКАЯ ЛАБОРАТОРИЯ" },
  { number: 630, name: "ИСПЫТАТЕЛЬНАЯ ЛАБОРАТОРИЯ НТЦ ИМ.А.Н.ЕГОРОВА" },
  { number: 660, name: "ОТДЕЛ ГЛАВНОГО МЕТРОЛОГА" },
  { number: 680, name: "ОГК ПОДЗЕМНОЙ И СТРОИТЕЛЬНО-ДОРОЖНОЙ ТЕХНИКИ НТЦ И" },
  { number: 805, name: "УПРАВЛЕНИЕ ДЕКЛАРИРОВАНИЯ И ТАМОЖЕННЫХ УСЛУГ" },
  { number: 810, name: "ОТДЕЛ СОЦИАЛЬНОЙ ЗАЩИТЫ" },
  { number: 454, name: 'РЕДАКЦИЯ ГАЗЕТЫ "НОВОСТИ БЕЛАЗА"' },
  { number: 800, name: 'МНОГОПРОФ-НОЕ СТР-НОЕ ПР-ВО"БЕЛАЗСТРОЙКОМПЛЕКС"' },
  { number: 802, name: "МЕДИЦИНСКАЯ СЛУЖБА УПРАВЛЕНИЯ СО И ЛП РАБОТЫ" },
  { number: 807, name: "УПР-Е СПОРТ.-ОЗДОРОВИТ. И ЛЕЧЕБНО-ПРОФИЛАКТ.РАБОТЫ" },
  { number: 840, name: 'ОЗДОРОВИТЕЛЬНЫЙ ЦЕНТР "ДУДИНКА" УПР.СО И ЛП РАБОТЫ' },
  { number: 860, name: "ЖИЛИЩНО - ЭКСПЛУАТАЦИОННАЯ СЛУЖБА" },
  { number: 870, name: "ДВОРЕЦ КУЛЬТУРЫ" },
  { number: 895, name: "УПРАВЛЕНИЕ ПО ТОРГОВЛЕ И УСЛУГАМ" },
  { number: 30, name: "ПРЕССОВЫЙ ЦЕХ" },
  { number: 40, name: "АВТОМАТНЫЙ ЦЕХ" },
  { number: 50, name: "СВАРОЧНЫЙ ЦЕХ" },
  { number: 51, name: "ЦЕХ СВАРНЫХ КОНСТРУКЦИЙ" },
  { number: 60, name: "ЦЕХ ГЛАВНОГО КОНВЕЙЕРА" },
  { number: 70, name: "ТЕРМОГАЛЬВАНИЧЕСКИЙ ЦЕХ" },
  { number: 90, name: "ЦЕХ ГИДРОАГРЕГАТОВ" },
  { number: 100, name: "МЕХАНОСБОРОЧНЫЙ ЦЕХ №1" },
  { number: 110, name: "ЦЕХ ГИДРОТРАНСМИССИЙ" },
  { number: 120, name: "МЕХАНОСБОРОЧНЫЙ ЦЕХ №2" },
  { number: 130, name: "ЦЕХ СБОРКИ, ИСПЫТАНИЙ АВТОМОБИЛЕЙ И ТЯГАЧЕЙ" },
  { number: 135, name: "ЦЕХ ЭЛЕКТРОМЕХАНИЧЕСКИХ ТРАНСМИССИЙ" },
  { number: 140, name: "ЦЕХ ОТГРУЗКИ ГОТОВОЙ ПРОДУКЦИИ" },
  { number: 150, name: "ЦЕХ ПРОГРАММНЫХ СТАНКОВ" },
  { number: 160, name: "ПРОИЗВОДСТВО СВЕРХТЯЖЕЛЫХ МАШИН" },
  { number: 170, name: "ЗАГОТОВИТЕЛЬНЫЙ ЦЕХ" },
  { number: 182, name: "ШВЕЙНАЯ ФАБРИКА" },
  { number: 80, name: "ЦЕХ МЕХАНИЗАЦИИ ПРОИЗВОДСТВА И СТАНКОСТРОЕНИЯ" },
  { number: 200, name: "ИНСТРУМЕНТАЛЬНЫЙ ЦЕХ" },
  { number: 210, name: "РЕМОНТНО - МЕХАНИЧЕСКИЙ ЦЕХ" },
  { number: 220, name: "РЕМОНТНО - ЭНЕРГЕТИЧЕСКИЙ ЦЕХ" },
  { number: 230, name: "ТРАНСПОРТНЫЙ ЦЕХ" },
  { number: 250, name: "ИНСТРУМЕНТАЛЬНО - ШТАМПОВОЕ ПРОИЗВОДСТВО" },
  { number: 260, name: "ЭКСПЕРИМЕНТАЛЬНЫЙ ЦЕХ НТЦ ИМ.А.Н.ЕГОРОВА" },
  { number: 270, name: "ЦЕХ ЗАПАСНЫХ ЧАСТЕЙ И ТНП" },
  { number: 972, name: "РУКОВОДСТВО ФИЛИАЛА МОАЗ" },
  { number: 820, name: 'РУКОВОДСТВО "СПК"ПЕРВОМАЙСКИЙ""' },
];

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: [], ceh: CehList };
  }

  componentDidMount() {
    server
      .send_post_request(`${API_URL}api/offers/readContacts`)
      .then((res) => {
        this.setState({ list: res.data });
      });
  }
  showName() {}
  showDepartment() {}

  render() {
    return (
      <div
        style={{
          width:"100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ContentContainer />
        <div
          style={{

            backgroundColor: "white",

            position: "absolute",
            top: "0",
            transform: "translate(-0.4vw)",
            width: "65vw",
            height: "100%",
            overflowY: "scroll",
          }}
        >
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <h2>Контакты</h2>
          </div>

          <div style={{ display: "flex" }}>
            {/* <div style={{ width: "30%" }}>
              <div style={{ padding: "10px" }}>
                <input
                  placeholder="введите подразделение"
                  onChange={this.showDepartment}
                ></input>
              </div>
            </div>
            <div style={{ width: "30%" }}>
              <div style={{ padding: "10px" }}>
                <input
                  placeholder="введите имя"
                  onChange={this.showName}
                ></input>
              </div>
            </div> */}
            {/* <div style={{ width: "30%" }}>
              <div style={{ padding: "10px" }}>
                <input placeholder="введите табельный" onChange={this.showTabel}></input>
              </div>
            </div> */}
          </div>
          <div style={{ padding: "10px", display: "flex" }}>
            {/* <button style={{ margin: "10px" }} onClick={this.readContacts}>
              поиск
            </button> */}
            {/* <button style={{ margin: "10px" }}>Сбросить данные</button> */}
          </div>
          

          <div>
            {this.state.ceh.map((ceh, index) => (
              <div name={ceh.number} style={{ border: "1px solid", padding:"20px", backgroundColor:`${'#' + Math.floor(Math.random()*16777215).toString(16)+'36'}` }}>
                <div style={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center", backgroundColor: "darkorange"}}>{ceh.name}</div>
                  <div>
                
                  {this.state.list.map((person, index) => (
                    <div>
                    {person.department == ceh.number ? <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "5px",
                        boxShadow: "2px 2px 3px 0px rgba(34, 60, 80, 0.52)",
                        
                      }}
                    >
                      
                      <div>
                        <div
                          style={{
                            border: "1px solid",
                            padding: "8px",
                            borderRadius: "5px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div style={{ color: "crimson" }}>{person.fio}</div>
                            <div>
                              {person.nameDepartment}
                            </div>
                          </div>
                          <div>
                            <div>{person.position}</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <div style={{ display: "flex", color: "blue" }}>
                              внутренний: <div>{person.inside}</div>
                            </div>
                            <div style={{ display: "flex", color: "blue" }}>
                              городской: <div>{person.city}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> :<div></div>}
                    
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Contacts;
