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
                    console.log("offersdata - ",offersData)
                   
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
												offersData.dateComission))
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
        <div>
            <NavLink to='/cardOffer' onClick={()=>{clickOnOfferLink(); DispatchOffers(); DispatchAddSendler()}}>
                <div className={s.header}>
                    <div className={s.offerPreview}>
                        <div className={s.from}>
                            <div className={s.date}> {props.id}</div>
                            <div className={s.date}> {props.date.slice(0, 10)}</div>
                            <div className={s.fromName}>  {props.surname + " " + props.name + " " + props.midlename}</div>

                            <div className={s.status}>  {props.status}</div>
                        </div>
                        <div className={s.offerText}>{props.nameOffer}</div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}



const OffersLink = (props) => {
    let offersData = JSON.parse(props.request);
   
       
    return offersData.map((number) =>
        <Offer id={number.Id} date={number.date} name={number.nameSendler}
               surname={number.surnameSendler} midlename={number.middlenameSendler}
               status={number.status} nameOffer={number.nameOffer} tabelNum={number.tabelNum} dateComission={number.dateComission} />)

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
    
    
        xhr.open('POST', `${API_URL}api/offers/myOffers`, true); /// AСИНХРОННЫЙ ЗАПРОС!!!
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
           
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               
               setReqMyOff(xhr.response)
                          
            }
    
        }
    
        xhr.send(`firstName=${userName}&userSurName=${userSurName}&middleName=${userMiddleName}&email=${userEmail}` +
            `&tabelNumber=${userTabelNum}&phoneNumber=${userPhoneNumber}&phoneNumber=${userPhoneNumber}`);
    
        return xhr.response
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
