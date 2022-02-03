import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import s from "./sendOffer/offerForm/offers.module.css"
import {API_URL} from "../../config";
import {useContext} from "react";
import Context from "../context/Context";
import { useDispatch } from "react-redux";
import { addSendler, selectMyOffers } from "../../reducers/offerReducer";





const Offer = (props) => {

    const value = useContext(Context);
    const [dateComission, setDateComission] = useState('');

    const dispatch = useDispatch();


    function DispatchOffers(){
        RequestSelectOffers();

        function RequestSelectOffers() {
           
            let xhr = new XMLHttpRequest();
            xhr.open('POST', `${API_URL}api/offers/selectMyOffers`, true); 
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
           
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let offersData = JSON.parse(xhr.response);           
                   dispatch(selectMyOffers(
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
                    offersData.dateComission
                    ))
                   // requestInfoAutor(xhr.response);
                                                                    
                } 
            }     

            xhr.send(`selectOffers=${props.id}`);
        }

        
    }

    function DispatchAddSendler(){
        RequestAddSendlerOffers();

        function RequestAddSendlerOffers() {
            let idOffers = props.id;
            let xhr = new XMLHttpRequest();
            xhr.open('POST', `${API_URL}api/offers/sendAddInfo`, true); 
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    
                    dispatch(addSendler(xhr.response))

                }
            }  
            xhr.send(`selectOffers=${idOffers}`);
        
        
        
            return xhr.response
        }

          
    }

    function clickOnOfferLink(){
        localStorage.setItem('idOffers', props.id);
        localStorage.setItem('status', props.status);
        value.contextFunction(props.id, props.tabelNum)
        localStorage.setItem('dateComission', props.dateComission);
        setDateComission(localStorage.getItem('dateComission'))
    }


    return (
        <div className={s.nlink}>
            <NavLink to='/cardOffer' onClick={()=>{clickOnOfferLink(); DispatchAddSendler(); DispatchOffers(); }}>
                <div className={s.header}>
                    <div className={s.offerPreview}>
                        <div className={s.from}>
                             <div className={s.offerText}>{props.coAuthor}</div>
                            <div className={s.fromName}>  {props.surname + " " + props.name + " " + props.midlename }</div>
                            <div className={s.status}>  {props.status}</div>
                        </div>
                        <div className={s.offerText} style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}><div className={s.date}>№{props.id}</div><div style={{marginRight: "7px", marginLeft: "7px", textAlign: "center"
                        }}>{props.nameOffer}</div><div className={s.date}> {props.date.slice(0, 10).replace(/(\d{4})-(\d\d)-(\d\d)/, "$3/$2/$1")}</div> </div>

                       
                    </div>
                </div>
            </NavLink>
        </div>
    )
}



const OffersLink = (props) => {
    let offersData = JSON.parse(props.request);
    let offersDataReverse = [];

    for (let i = 0; i < Object.keys(offersData).length; i++) {
        if (offersData[i].coAuthor === undefined){
            offersDataReverse.unshift(offersData[i])
        }
    }
    for (let i = 0; i < Object.keys(offersData).length; i++) {
       
        if (offersData[i].coAuthor !== undefined && offersData[i].coAuthor === "Соавтор") {
            offersDataReverse.push(offersData[i])
            console.log(i)
         }
    }
    return offersDataReverse.map((number) =>
    <Offer key = {"myOffer"+number.Id} id={number.Id} date={number.date} name={number.nameSendler}
           surname={number.surnameSendler} midlename={number.middlenameSendler}
           status={number.status} nameOffer={number.nameOffer} tabelNum={number.tabelNum} dateComission={number.dateComission} coAuthor={number.coAuthor} />)
}

const Offers = () => {
   
    const [reqMyOff, setReqMyOff] = useState(0);

    function Resp() {

        let xhr = new XMLHttpRequest();
    
        let userPhoneNumber = localStorage.getItem('userPhoneNumber');
        let userTabelNum = localStorage.getItem('userTabelNum');
        let userName = localStorage.getItem('userName');
        let userSurName = localStorage.getItem('userSurName');
        let userMiddleName = localStorage.getItem('userMiddleName');
        let userEmail = localStorage.getItem('userEmail');
        
    
        xhr.open('POST', `${API_URL}api/offers/myOffers`, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
           
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

               setReqMyOff(xhr.response)
                
            }
    
        }
        xhr.send(`firstName=${userName}&userSurName=${userSurName}&middleName=${userMiddleName}&email=${userEmail}` +
        `&tabelNumber=${userTabelNum}&phoneNumber=${userPhoneNumber}&phoneNumber=${userPhoneNumber}`);
        
    
        //return xhr.response
    }

    
    Resp()

    function ChangeOff(){
        if(reqMyOff != 0){
            return <OffersLink request={reqMyOff}/>

        }else{
            return null
        }
    }
    return (
        <div className={s.offersContainer}>
            <div className={s.titleHeader} >Мои предложения</div>
            <ChangeOff />
          

        </div>
    )
}
export default Offers;
