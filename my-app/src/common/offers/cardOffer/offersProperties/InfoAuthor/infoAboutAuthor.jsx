import React, {useState, useContext} from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import s from "./infoAboutAuthor.module.css"
import { API_URL } from "../../../../../config";
import { store } from "../../../../../reducers";
import axios from "axios";


function RequestAddSendlerOffers() {
    let idOffers = localStorage.getItem('idOffers');
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}api/offers/sendAddInfo`, false); /// СИНХРОННЫЙ ЗАПРОС!!!
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    
    xhr.send(`selectOffers=${idOffers}`);



    return xhr.response
}



function UserInfo(userTabelNum){
    let xhr = new XMLHttpRequest();
  
    xhr.open('POST', `${API_URL}api/offers/userInfo`, false); /// СИНХРОННЫЙ ЗАПРОС!!!
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`userTab=${userTabelNum}`)
    return xhr.response
}
let  offersDataCount;
const CreateCompMyOffers = (props)=>{
     
    const  [offersData, SetOffersData] = useState(0)

    if(offersData === 0 ){
      
        Resp(props.tabelNumber,  props.email );
        
    } else if(offersDataCount === offersData){
      
        Resp(props.tabelNumber,  props.email );
    }

    function Resp(tab, email) {
      
        let userTabelNum = localStorage.getItem('userTabelNum');
        let userEmail = localStorage.getItem('userEmail');
      
            if(tab === userTabelNum){
            try{
                axios.post(`${API_URL}api/offers/myOffers`, {  tabelNumber: userTabelNum,
                                                            email: userEmail,
                                                          //  idOffers: idOffers,
                                                            })
                                                            .then(res => {
                                                                SetOffersData(res.data);
                                                                offersDataCount = res.data;
                                                                console.log(offersDataCount)
                                                            })
            } catch (e){
                alert(e.response.message)
            }
        } else{
            try{
                axios.post(`${API_URL}api/offers/myOffers`, {  tabelNumber: tab,
                                                               email: email,
                                                            //   idOffers: idOffers,
                                                            })
                                                            .then(res => {
                                                                SetOffersData(res.data)   
                                                                offersDataCount = res.data;
                                                                console.log(offersDataCount)
                                                            })
            } catch (e){
                alert(e.response.message)
            }
        }
        
    } 
 
    if(offersData !== 0){
     
        return offersData.map((number, index)=><MyOffersComp key = {"myOffComp"+number.Id} id={number.Id} date={number.date}
        nameOffer={number.nameOffer}  counter={index+1} coAuthor = {number.coAuthor}/>)

    } else {
        return(
            <div>
               Нет предложений
            </div>
        )
    }
    
}

const MyOffersComp = (props) => {

    return(
        <div>
            <div>{props.counter}</div>
            <div>{props.date.slice(0, 10)}</div>
            <div className={s.offerText}>
               №{props.id} {props.nameOffer}           
            </div>
            <div> {props.coAuthor}</div>
            
        </div>
    )
}

function validElem(){
    
    if(localStorage.getItem('userTabelNum')!==0){
        const divStyle = {

            display: "flux",

          };
          return divStyle
    } else {
        const divStyle = {
            display: "none",
          };
          return divStyle
    }
}



const InfoAboutAuthor = () => {
     
   let obj = {};
   
   Object.assign(obj, store.getState().offers)
   let objYetSendlers = JSON.parse(obj.addSendler)
  
    const [value, setValue] = useState(0);
    const [name, setName] = useState(obj.offer.nameSendler);
    const [surname, setSurname] = useState(obj.offer.surnameSendler);
    const [middlename, setMiddlename] = useState(obj.offer.middlenameSendler);
    const [email, setEmail] = useState(obj.offer.email);
    const [tabelNumber, setTabelNumber] = useState(obj.offer.tabelNum);
    const [phoneNumber, setPhoneNumber] = useState(obj.offer.phoneNumber);
   
    const [photo, setPoto] = useState(`${ API_URL }files/photos/${ store.getState().offers.offer.tabelNum}.jpg`);
    const [sendlersOffers, setSendlersOffers] = useState(objYetSendlers)

    const SendlerTab = (props) => {
        
          return (
              <Tab label={`Автор ${props.numAut}`} onChange={()=>{
                if(props.numAut === 1){
                   // let offersData = JSON.parse(Resp(localStorage.getItem('userTabelNum')));  //Данные из запроса
                        setName(store.getState().offers.offer.nameSendler);
                        setSurname(store.getState().offers.offer.surnameSendler);
                        setMiddlename(store.getState().offers.offer.middlenameSendler);
                        setEmail(store.getState().offers.offer.email);
                        setTabelNumber(store.getState().offers.offer.tabelNum);
                        setPhoneNumber(store.getState().offers.offer.phoneNumber)
                        setPoto(`${ API_URL }files/photos/${store.getState().offers.offer.tabelNum}.jpg`)
                }else{
                        setName(props.name);
                        setSurname(props.surname);
                        setMiddlename(props.middlename);
                        setEmail(props.email);
                        setTabelNumber(props.tabelNumber);
                        setPhoneNumber(props.phoneNumber)
                        setPoto(`${ API_URL }files/photos/${props.tabelNumber}.jpg`)
                }
                  
                  
            }
        } />
          )
      }

      const SendlerTabList = () => {
    
        if(RequestAddSendlerOffers() !== 'null'){
        
            let obj = {};
            let objAll = {};
        
            objAll["0"] = store.getState().offers.offer;
            Object.assign(obj, store.getState().offers)
            
            let objYetSendlers = JSON.parse(obj.addSendler)   //обьект с доп пользователями
            let a = Object.keys(objYetSendlers)
        
            for(let i = 0; i<a.length; i++){
                objAll[`${i+1}`] = objYetSendlers[i]
            }
        
            /* if(tabelNumber !== 0){
            
            // userInfo = JSON.parse(UserInfo(tabelNumber));

        } */
        console.log(objAll)
        return Object.keys(objAll).map((key, i)=><SendlerTab key={`numAut${i}`} numAut={i+1} name={objAll[key].nameSendler}
                                                surname={objAll[key].surnameSendler} middlename={objAll[key].middlenameSendler} 
                                                email={objAll[key].email} tabelNumber={objAll[key].tabelNum}
                                                phoneNumber={objAll[key].phoneNumber }/>)
            } else{
            return ( <SendlerTab numAut={1}/>)
            }
       
    }
    
    const handleChange = () => {
        setValue(value);
      };

    let userInfo = {
        position: null,
        division: null,
        department: null,
    }
   
   
    if(tabelNumber !== 0){
     userInfo = JSON.parse(UserInfo(tabelNumber));
     
    }

    return (
        <div className={s.cardOfferContainer}>
                      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  <Tabs value={value} onChange={handleChange} style={{
                     display: "flex",
                       flexDirection: "inherit",
                      justifyContent: "flex-start"
                }}>
        <SendlerTabList/>
            </Tabs>
          </Box>
            <div className={s.header}>
                <div className="img" style={{ backgroundImage: `url(${photo})`,
                backgroundRepeat: "round", width: "150px", minHeight: "200px", borderRadius: "10px",
                    opacity: 1,
                    transition: "0.2s ease-in-out"}}>
                    
                </div>

                <div className={s.nameOffer}>
                    <div>Автор:</div>
                    <div>{surname} {name} {middlename} </div>
                </div>
                <div className={s.nameOffer} style={validElem()}>
                    <div>Табельный номер:</div>
                    <div> {tabelNumber} </div>
                </div>
                <div className={s.nameOffer} style={validElem()}>
                    <div>Цех/Управление:</div>
                    <div> {userInfo.department}</div>
                </div>
                <div className={s.nameOffer} style={validElem()}>
                    <div>Участок/Отдел:</div>
                    <div> {userInfo.division}</div>
                </div>
                <div className={s.nameOffer} style={validElem()}>
                    <div>Должность:</div>
                    <div> {userInfo.position}</div>
                </div>
                <div className={s.nameOffer}>
                    <div>E-mail:</div>
                    <div> {userInfo.email}</div>
                </div>
                <div className={s.insideOffers}>
                    <div>Поступившие предложения:</div>
                    
                    <CreateCompMyOffers  name={name} surname={surname} middlename={middlename} email={email} tabelNumber={tabelNumber} phoneNumber={phoneNumber}/>
                </div>


            </div>
            
              
        </div>
    )
}
export default InfoAboutAuthor;
