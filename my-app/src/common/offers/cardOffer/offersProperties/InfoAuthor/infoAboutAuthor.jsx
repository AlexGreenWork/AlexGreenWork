import React, {useState, useContext} from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import s from "./infoAboutAuthor.module.css"
import { API_URL } from "../../../../../config";


function RequestAddSendlerOffers() {
    let idOffers = localStorage.getItem('idOffers');
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}api/offers/sendAddInfo`, false); /// СИНХРОННЫЙ ЗАПРОС!!!
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    
    xhr.send(`selectOffers=${idOffers}`);



    return xhr.response
}




function Resp(tab, email) {
   
    /* console.log(tab);
    console.log(email); */
   // console.log(idOffers);

    let userPhoneNumber = localStorage.getItem('userPhoneNumber');
    let userTabelNum = localStorage.getItem('userTabelNum');
    let userName = localStorage.getItem('userName');
    let userSurName = localStorage.getItem('userSurName');
    let userMiddleName = localStorage.getItem('userMiddleName');
    let userEmail = localStorage.getItem('userEmail');
    let idOffers = localStorage.getItem('idOffers');

    if(tab === userTabelNum){
       
        let xhr = new XMLHttpRequest();

        xhr.open('POST', `${API_URL}api/offers/myOffers`, false); /// СИНХРОННЫЙ ЗАПРОС!!!
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
              
               xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                   
                    let tabSendSelectOffer = JSON.parse(xhr.response)
                   // console.log(tabSendSelectOffer[0].tabelNum)
                  //  console.log(tabSendSelectOffer)
                    localStorage.setItem('sendlerTabWG', tabSendSelectOffer[0].tabelNum);
                   
          }
    
        }
        xhr.send(`email=${userEmail}&tabelNumber=${userTabelNum}&idOffers=${idOffers}`);
             
        return xhr.response
    }else{
        
        let xhr = new XMLHttpRequest();

        xhr.open('POST', `${API_URL}api/offers/myOffers`, false); /// СИНХРОННЫЙ ЗАПРОС!!!
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(`email=${email}`+
                `&tabelNumber=${tab}&phoneNumber=${idOffers}`);  
      

        return xhr.response

    }
    
}

function UserInfo(userTabelNum){
    let xhr = new XMLHttpRequest();
   // let userTabelNum = localStorage.getItem('userTabelNum');
    xhr.open('POST', `${API_URL}api/offers/userInfo`, false); /// СИНХРОННЫЙ ЗАПРОС!!!
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`userTab=${userTabelNum}`)
    return xhr.response
}

const CreateCompMyOffers = (props)=>{
      //  name={name} surname={surname} middlename={middlename} email={email} tabelNumber={tabelNumber}
      let idOffers = localStorage.getItem('idOffers');
    console.log(props)
    console.log('idOffers', idOffers)
    
    let email = props.email
    console.log('email',  email)
    let offersData = JSON.parse(Resp(props.tabelNumber,  email, undefined, "CreateCompMyOffers" ));  
    console.log(offersData);
    
    console.log(Resp(props.tabelNumber,  props.email, idOffers));
    return offersData.map((number, index)=><MyOffersComp id={number.Id} date={number.date}
                                            nameOffer={number.nameOffer}  counter={index+1}/>)
}



const MyOffersComp = (props) => {

    return(
        <div>
            <div>{props.counter}</div>
            <div>{props.date.slice(0, 10)}</div>
            <div className={s.offerText}>
               №{props.id} {props.nameOffer}        
            </div>
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
    let offersDataStart = JSON.parse(Resp(localStorage.getItem('userTabelNum')));
   console.log(offersDataStart[0]);
   
    const [value, setValue] = useState(0);
    const [name, setName] = useState(offersDataStart[0].nameSendler);
    const [surname, setSurname] = useState(offersDataStart[0].surnameSendler);
    const [middlename, setMiddlename] = useState(offersDataStart[0].middlenameSendler);
    const [email, setEmail] = useState(offersDataStart[0].email);
    const [tabelNumber, setTabelNumber] = useState(offersDataStart[0].tabelNum);
    const [phoneNumber, setPhoneNumber] = useState(offersDataStart[0].phoneNumber);
    const [photo, setPoto] = useState(`${ API_URL }files/photos/${localStorage.getItem('sendlerTabWG')}.jpg`);
    
   

    const SendlerTab = (props) => {
                
          return (
              <Tab label={`Автор ${props.numAut}`} onChange={()=>{
                if(props.numAut === 1){
                    let offersData = JSON.parse(Resp(localStorage.getItem('userTabelNum')));  //Данные из запроса
                        setName(offersData[0].nameSendler);
                        setSurname(offersData[0].surnameSendler);
                        setMiddlename(offersData[0].middlenameSendler);
                        setEmail(offersData[0].email);
                        setTabelNumber(offersData[0].tabelNum);
                        setPhoneNumber(offersDataStart[0].phoneNumber)
                        setPoto(`${ API_URL }files/photos/${offersData[0].tabelNum}.jpg`)
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
        let offersData = JSON.parse(RequestAddSendlerOffers());
       

    
        if(tabelNumber !== 0){
            userInfo = JSON.parse(UserInfo(tabelNumber));

       }
            
    return Object.keys(offersData).map((key, i)=><SendlerTab key={i} numAut={i+1} name={offersData[key].name}
                                              surname={offersData[key].surname} middlename={offersData[key].middlename} 
                                              email={offersData[key].email} tabelNumber={offersData[key].tabelNumber}
                                              phoneNumber={offersData[key].phoneNumber}/>)
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

   /*  function ChangeRender(){
        if()
    } */

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
                backgroundRepeat: "round", width: "150px", minHeight: "200px", borderRadius: "10px"}}>
                    
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
