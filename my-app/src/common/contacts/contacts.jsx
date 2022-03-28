import React, {useState} from "react";
import { API_URL } from "../../config";

import axios from "axios";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import s from "./contacts.module.css"
import ContentContainer from "../contentHome/contentContainer";

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
  { number: 438, name:  'ОТДЕЛ ОХРАНЫ ОКРУЖАЮЩЕЙ СРЕДЫ И ПРОМСАНИТАРИИ'},
  { number: 439, name:  "ОТДЕЛ ПРОМЫШЛЕННОЙ ЭЛЕКТРОНИКИ"},
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

function Contacts(){
  const [req, setReq] = useState(null)
  if(req === null){
    try {
      axios.post(`${API_URL}api/offers/readContacts`, {})
        .then(res => {
          console.log(res.data)
          setReq(res.data)
        })
    } catch (e) {
      alert(e.response)
    }
  
  }


  return(
      <div style={{width:"100%",
          position:"relative",
          display:"flex",
          justifyContent:"center",
          }}>
          <ContentContainer />
    <div  className={s.contactContainer}>

    
 <ListAccordion req = {req}/>
  
    </div>
      </div>
  )
}

function ListAccordion(props){

  if(props.req !== null){
    return CehList.map((number, index)=><AccordionName id={'accordionName'+index} key = {index+"ListAccordion"} ceh={number} req = {props.req}/>)
    // return props.req.map()
  } else{
    return <div style={{
      backgroundColor: "white",
      height: '100%',

    }}><div className={s.expectation}></div>
    </div>
  }
 
}
function AccordionName(props){
    const [view, setView] = useState(0)
return(
  <Accordion id={"accordionName"+props.id} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={()=>{
              let elem =  document.querySelector('#accordionName'+props.id);
              if(view === 0){

                  elem.style.transition = "background-color 0.8s , color 0.8s"
                  elem.style.backgroundColor= "#02a9c1"
                  elem.style.color= "white"
                  setView(1)
              } else{
                  setView(0)
                  elem.style.backgroundColor= "#ffffff"
                  elem.style.color= "black"
              }

          }
          }>
          <Typography>{props.ceh.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
         <ContactList req={props.req} ceh = {props.ceh.name} number = {props.ceh.number}/>
        </AccordionDetails>
      </Accordion>
      
)
}

function ContactList(props){
   
 return props.req.map((count, index)=>{
  
      if(Number(count.department) === props.number){

      return (<ContactItem key = {"ContactItem"+index} ceh={props.ceh} inside={count.inside} position={count.position} fio={count.fio} city = {count.city} />)
    } /* else{
      return(<div>null</div>)
    } */
  })
}

function ContactItem(props){
 
return (
  <div className={s.blockInfo}>
    
     <div className={s.blockFio}>
     <div >{props.fio}</div>
     <div>{props.ceh}</div>
     </div>
  
   
    <div>Должность: {props.position}</div>
    <div className={s.blockPhone}>
    <div style={{color:"rgb(204, 43, 43)"}} >Внутренний: {props.inside}</div>
    <div style={{color:"rgb(51 0 255)"}}>Городской: {props.city}</div>
    </div>
    
    </div>

)
}

export default Contacts;
