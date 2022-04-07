import React, {useState}from "react";
import {NavLink} from "react-router-dom";
import s from "../../../common/offers/sendOffer/offerForm/offers.module.css"
import { API_URL } from "../../../config";
import {useContext} from "react";
import Context from "../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import { addSendler, selectMyOffers } from "../../../reducers/offerReducer";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { StylesProvider } from "@material-ui/core/styles";

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
                   
                    requestInfoAutor(xhr.response);
                                                                    
                } 
            }     

            xhr.send(`selectOffers=${props.id}`);
        }

        function requestInfoAutor(xhr){
            let req = new XMLHttpRequest();
            req.open('POST', `${API_URL}api/files/workData`, true); 
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            req.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                  
                   let offersData = JSON.parse(xhr); 
                   let workData = JSON.parse(req.response); 
                   
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
                                            offersData.dateComission,
                                            workData[1],
                                            workData[2]))
                              
                } else{
                   // console.log("false response")
                }
        
            }
        
            req.send(`tabNum=${props.tabelNum}`);
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
            <NavLink to='/cardOffer' onClick={() => { 
              clickOnOfferLink(); DispatchOffers(); DispatchAddSendler();
              localStorage.setItem('idOffers', props.id);
              localStorage.setItem('sendlerTabWG', props.tabelNum);
           
            }}>
                <div className={s.header}>
                {props.close ? <LockOpenIcon className={s.lock} />: <LockIcon className={s.unlock} />}
                <div className={s.NumberOffers}>№ {props.id}</div>
                    <div className={s.offerPreview}>
                 
                        <div className={s.from}>
                            
                            <div className={s.fromName}>  {props.surname + " " + props.name + " " + props.midlename}</div>
                            <div className={s.date}> {props.date.slice(0, 9)}</div>
                            {/* <div className={s.status}>  {props.status}</div> */}
                          
                        </div>
                        <div className={s.offerText}>{props.nameOffer}</div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}



const OffersLink = (props) => {

    return props.request.map((number) => { 
                               
        return <Offer key={`offer_${number.Id}`} id={number.Id} date={number.date} name={number.nameSendler}
        surname={number.surnameSendler} midlename={number.middlenameSendler}
        status={number.status} nameOffer={number.nameOffer} tabelNum={number.tabelNum}
        email={number.email} unlock = {props.unlock} close = {number.close}/>})

}

const OffersResponsible = () => {
    const [reqAllOff, setReqAllOff] = useState(0);
    let tabNum = localStorage.getItem('userTabelNum')
    let unlockOffResp = useSelector( state => state.notification.offerForProcessing.notifConc[1])


    if(reqAllOff === 0){
        Resp();
    }
   
   function Resp() {

        let xhr = new XMLHttpRequest();
       
        xhr.open('POST', `${API_URL}api/offers/responsibleToOffers`, true)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let dataOffers = JSON.parse(xhr.response)
                setReqAllOff(dataOffers[0])
            }
        }
        xhr.send(`tabNum=${tabNum}`);
        //console.log(xhr.response)
        return xhr.response;

    }

    if(reqAllOff != 0 ){
        
        return (
            <div className={s.offersContainer}>
                <div className={s.titleHeader}> Предложения с вашими заключениями</div>
                <OffersLink request={reqAllOff} unlock = {unlockOffResp}/>
            </div>
        )
    } else{
        return (
            
            <div className={s.offersContainer}>
             <div className={s.titleHeader}> Нет предложений</div>
             </div>
        )
    }
   
}
export default OffersResponsible;
