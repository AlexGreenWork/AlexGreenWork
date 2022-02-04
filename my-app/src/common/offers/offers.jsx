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
                if (this.readyState === 4 && this.status === 200) {
                    // let offersData = JSON.parse(xhr.response);           
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
                if (this.readyState === 4 && this.status === 200) {
                  
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

                if (this.readyState === 4 && this.status === 200) {

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
                    <div className={s.offerPreview}>
                        <div className={s.from}>
                        
                            <div className={s.fromName}>  {props.surname + " " + props.name + " " + props.midlename}</div>
                            {/* <div className={s.date}> {props.date.slice(0, 9)}</div> */}
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
    // const [sortArr, setSortArr] = useState(null);

    let offersData = JSON.parse(props.request);
    let sort = props.sort
    let arr = []
    if(props.typeSort === null){
        return ( <div>{/* нет сортировки */}</div>);
    }
    switch(props.typeSort){
        case "numberOffer":
                offersData.map((number, count) => { if(`${number.Id}`.includes(sort) === true){
                arr.push(number)
                   
                }
            else{
                return (<div>
                     sort null
                </div>)
            }
        }) 
           
         if(arr.length !== 0 && sort.length !== 0){
           
            return ( <div> Результат поиска <OffersLink request = {arr} /> </div>);
         } else {
            return ( <div>{/* нет сортировки */}</div>);
         }
    break;

    case "nameOffer":
        offersData.map((number, count) => { if(`${number.nameOffer}`.toLowerCase().includes(sort.toLowerCase()) === true){
            arr.push(number)
               
            }
        else{
            return (<div>
                 sort null
            </div>)
        }
    }) 

    if(arr.length !== 0 && sort.length !== 0){
           
        return ( <div> Результат поиска <OffersLink request = {arr} /> </div>);
     } else {
        return ( <div>{/* нет сортировки */}</div>);
     }
        break;

    case "fullname":
        
        if(sort === null){
            sort = " "
        }
        let fullname = sort.toLowerCase().split(" ")
       
            if(fullname.length === 1){
               
                offersData.map((number, count) => { if(`${number.surnameSendler.toLowerCase()}`.includes(fullname) === true){
                    arr.push(number)
                  
                    }
                else{
                    return (<div>
                         sort null
                    </div>)
                }
            }) 
        
            if(arr.length !== 0 && sort.length !== 0){
                   
                return ( <div> Результат поиска <OffersLink request = {arr} /> </div>);
             } else {
                return ( <div>{/* нет сортировки */}</div>);
             }
            } else if(fullname.length === 2){
                offersData.map((number, count) => { if(`${number.surnameSendler.toLowerCase()}`.includes(fullname[0]) === true && `${number.nameSendler.toLowerCase()}`.includes(fullname[1]) === true){
                    arr.push(number)
                     
                    }
                else{
                    return (<div>
                         sort null
                    </div>)
                }
            }) 
        
            if(arr.length !== 0 && sort.length !== 0){
                   
                return ( <div> Результат поиска <OffersLink request = {arr} /> </div>);
             } else {
                return ( <div>{/* нет сортировки */}</div>);
             }
            } else if(fullname.length === 3){
                offersData.map((number, count) => { if(`${number.surnameSendler.toLowerCase()}`.includes(fullname[0]) === true && `${number.nameSendler.toLowerCase()}`.includes(fullname[1]) === true && `${number.middlenameSendler.toLowerCase()}`.includes(fullname[2])){
                    arr.push(number)
                  
                    }
                else{
                    return (<div>
                         sort null
                    </div>)
                }
            }) 
        
            if(arr.length !== 0 && sort.length !== 0){
                   
                return ( <div style={{marginBottom:'10px'}}> Результат поиска <OffersLink request = {arr} /></div>);
             } else {
                return ( <div>{/* нет сортировки */}</div>);
            }
            break;
         

    }
}
}

const OffersLink = (props) => {
 
  
    if(typeof props.request === "object"){
        return props.request.map((number) => <Offer key={`offer_${number.Id}`} id={number.Id} date={number.date} name={number.nameSendler}
                                             surname={number.surnameSendler} midlename={number.middlenameSendler}
                                             status={number.status} nameOffer={number.nameOffer} tabelNum={number.tabelNum} dateComission={number.dateComission}
                                             email={number.email}/>)
    } else{
        let offersData = JSON.parse(props.request);
        let offersDataReverse = offersData.reverse();
   
    return offersDataReverse.map((number) => <Offer key={`offer_${number.Id}`} id={number.Id} date={number.date} name={number.nameSendler}
                                             surname={number.surnameSendler} midlename={number.middlenameSendler}
                                             status={number.status} nameOffer={number.nameOffer} tabelNum={number.tabelNum} dateComission={number.dateComission}
                                             email={number.email}/>)

    }
    
}

// function sortNumberOffer

const Offers = () => {
    const [reqAllOff, setReqAllOff] = useState(0);
    const [sort, setSort] = useState("null");
    const [typeSort, setTypeSort] = useState("numberOffer");
  
    if(reqAllOff === 0){
        Resp();
    }
   
   function Resp() {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', `${API_URL}api/offers/allOffers`, false)
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                setReqAllOff(xhr.response)
            }
        }
        xhr.send();

        return xhr.response;

    }
   
   if(sort === "null" || sort.length === 0 ){
    return (
        <div className={s.offersContainer}>
            <div className={s.titleHeader}> Предложения для обработки рабочей группой</div>
            <div className={s.searchContainer} >
              <div style={ {fontSize: "15px",
                            textAlign: "right",
                            paddingRight: "10px",
                            paddingTop: "5px" }}>Искать по </div>  
                <select value={typeSort} onChange={(e)=>{setTypeSort(e.target.value)}}>
                <option select="true" value="numberOffer" >Номеру предложения</option>
                <option value="nameOffer">Названию предложения</option>
                <option value="fullname">ФИО автора</option>
                </select>
                <div style={ {fontSize: "25px",
                            textAlign: "right",
                            paddingRight: "10px",
                            paddingBottom: "30px" }}> &#128269;</div>
            <input type="text" name="sort" className={s.searchOffer} onChange={(e)=>{setSort(e.target.value)}}/>
            </div>
            
            <SortOffers request = {reqAllOff} sort={sort} typeSort = {typeSort}/>
            <OffersLink request={reqAllOff} />
           
        </div>
    )
    } else{
        return (
            <div className={s.offersContainer}>  
                <div className={s.titleHeader}> Предложения для обработки рабочей группой</div>
                <div className={s.searchContainer} >
              <div style={ {fontSize: "15px",
                            textAlign: "right",
                            paddingRight: "10px",
                            paddingTop: "5px" }}>Искать по </div>  
                <select value={typeSort} onChange={(e)=>{setTypeSort(e.target.value)}}>
                <option selected value="numberOffer" >Номеру предложения</option>
                <option value="nameOffer">Названию предложения</option>
                <option selected value="fullname">ФИО автора</option>
                </select>
                <div style={ {fontSize: "25px",
                            textAlign: "right",
                            paddingRight: "10px",
                            paddingBottom: "30px" }}> &#128269;</div>
            <input type="text" name="sort" className={s.searchOffer} onChange={(e)=>{setSort(e.target.value)}}/>
            </div>
                <SortOffers request = {reqAllOff} sort={sort} typeSort = {typeSort}/>
            </div>
        )
    }
    
}
export default Offers;
