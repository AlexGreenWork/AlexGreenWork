import React, { useState } from "react";
import {NavLink} from "react-router-dom";
import s from "./publicServices.module.css"
import axios from "axios"
import {API_URL} from "../../config"
import "./publicServices.css"
import ContentContainer from "../contentHome/contentContainer";
function PublicServices(){

    const [reqMatobzk, setReqMatobzk] = useState(null)
   
 

 
    if(reqMatobzk === null){
        try {
            axios.post(`${API_URL}api/files/publicServices`, {
            })
                .then(res => {
                    let reqMot = res.data;
                    setReqMatobzk(reqMot)
                  
                })
        } catch (e) {
            alert(e.response)
        }
    }
   
   

    return (
        <div style={{width:"100%",
            position:"relative",
            display:"flex",
            justifyContent:"center"}}>
            <ContentContainer />
          
            <div style={{
                position: "absolute",
                display: "flex",
                justifycontent: "center",
                width:"65vw",
                top:0,
                justifyContent:"center",
                height:"100%"
            }}>
            
            <div className='servicesBox'>
            <div style={{color: "red", position:"fixed", fontSize:'1.3em', top: "65px", left:"450px"}}>C 1 аперля цены не актуальны</div>
               <div className="headerServName">Наименование услуги</div>
               <div className="headerServCost">Стоимость</div>
            <ListServices req = {reqMatobzk}/>

            </div>
        </div>
        </div>
    );
}

function ListServices(props){

    if(props.req === null){
        return <div>null</div>
    } else {
        return  props.req.map((count, key)=>{
            if(key % 2 == 0){
                return <ListItem key = {key} item = {count} clsColor={"white"}/>
            } else {
                return <ListItem key = {key} item = {count} clsColor={"blue"}/>
            }
    }
    )
    }

}

function ListItem(props){
   
return(
    
    <div className={"services-container " + props.clsColor} >
     <div className="services-name">{props.item.matoboz ? props.item.matoboz : props.item.zatrname}</div> 
     <div className="services-cost"> {props.item.cenan ? props.item.cenan : "-" }</div> 
    </div>
)
}

export default PublicServices;