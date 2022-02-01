import React, {useState}from "react";
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
                   
                    requestInfoAutor(xhr.response);
                   console.log(xhr.response)
                                                                    
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
        console.log(props)
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
                    <div className={s.offerPreview}>
                        <div className={s.from}>
                        
                            <div className={s.fromName}>  {props.surname + " " + props.name + " " + props.midlename}</div>
                            <div className={s.date}> {props.date.slice(0, 9)}</div>
                            <div className={s.status}>  {props.status}</div>
                        </div>
                        <div className={s.offerText} style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}><div className={s.date}>№{props.id}</div>
                            <div style={{
                                marginRight: "7px", marginLeft: "7px", textAlign: "center"
                            }}>{props.nameOffer}</div>
                            <div className={s.date}> {props.date.slice(0, 10).replace(/(\d{4})-(\d\d)-(\d\d)/, "$3/$2/$1")}</div>
                        </div>
                         </div>
                </div>
            </NavLink>
        </div>
    )
}

function SortOffers(props){
    const [sortArr, setSortArr] = useState(null);
    console.log(props.typeSort)   
    let offersData = JSON.parse(props.request);
    let sort = props.sort
    let arr = []
    console.log(props)
    switch(props.typeSort){
        case "numberOffer":
    console.log("Bananas are $0.48 a pound.");
    break;
    }
    if(props.sort !== null){
        offersData.map((number, count) => { if(`${number.Id}`.includes(sort) === true){
            arr.push(number)
            if(count === offersData.length-1){
                console.log(arr)
                  return(<div>wedw
{/* <OffersLink request = {String(arr)}/> */}

                  </div> )
            } else{
                console.log('wedw')
                return (<div>efwe</div>)
            }
           
    
        }
    else{
        
        return (<div>
             sort null
        </div>)
    }})
    } else{
        console.log('wedw')
        return (
            <div>
                5456
            </div>
        )
    }
    // if(sort !== 341) console.log(sort, sort !== '341' );
 if(arr.length !== 0){
   
    return ( <div> Результат сортировки <OffersLink request = {arr} />.............</div>)
 } else {
    return ( <div>нет сортировки</div>)
 }
   
}

const OffersLink = (props) => {
    // console.log(typeof props.request)
    // console.log( props.request)
    
  
    if(typeof props.request === "object"){
        return props.request.map((number) => <Offer key={`offer_${number.Id}`} id={number.Id} date={number.date} name={number.nameSendler}
                                             surname={number.surnameSendler} midlename={number.middlenameSendler}
                                             status={number.status} nameOffer={number.nameOffer} tabelNum={number.tabelNum} dateComission={number.dateComission}
                                             email={number.email}/>)
    } else{
        let offersData = JSON.parse(props.request);
        // console.log(offersData)
        let offersDataReverse = offersData.reverse();
   
    return offersDataReverse.map((number) => <Offer key={`offer_${number.Id}`} id={number.Id} date={number.date} name={number.nameSendler}
                                             surname={number.surnameSendler} midlename={number.middlenameSendler}
                                             status={number.status} nameOffer={number.nameOffer} tabelNum={number.tabelNum} dateComission={number.dateComission}
                                             email={number.email}/>)

    }
    
}

const Offers = () => {
    const [reqAllOff, setReqAllOff] = useState(0);
    const [sort, setSort] = useState(null);
    const [typeSort, setTypeSort] = useState(null);
  
    if(reqAllOff === 0){
        Resp();
    }
   
   function Resp() {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', `${API_URL}api/offers/allOffers`, false)
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // console.log(xhr.response)
                setReqAllOff(xhr.response)
            }
        }
        xhr.send();

        return xhr.response;

    }
    return (
        <div className={s.offersContainer}>
            <select value={typeSort} onChange={(e)=>{setTypeSort(e.target.value)}}>
            <option selected value="numberOffer" >Номер предложения</option>
            <option value="nameOffer">Название предложения</option>
            <option selected value="fullname">ФИО автора</option>
            <option value="dateOffer">Дата подачи</option>
            </select>
            <div className={s.titleHeader}> Предложения для обработки рабочей группой</div>
            <input type="text" name="sort" onChange={(e)=>{setSort(e.target.value)}}/>
            <SortOffers request = {reqAllOff} sort={sort} typeSort = {typeSort}/>
            <OffersLink request={reqAllOff} />
           
        </div>
    )
}
export default Offers;
