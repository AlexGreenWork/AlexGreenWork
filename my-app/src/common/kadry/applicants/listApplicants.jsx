import React, {useEffect, useState} from "react";


import s from "./applicants.module.css"
import server from "../../../actions/server";


import CartApplicants from "./cartApplicants/CartApplicants";

import {API_URL} from "../../../config";
import EnhancedTable from "./cartApplicants/list";
import ListApp from "./cartApplicants/list";


function getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


function ListApll(props) {

console.log("props.req listApplicants 27",props.req)
    if (props.req !== null) {
        return props.req.map((number, index) => <CartApplicants
            fio={number.surname + ' ' + number.name + ' ' + number.middlename} surname={number.surname} name={number.name} photo= {number.photo} sp={number.speciality}
            bDay={getAge(number.bday)} heldPosition1={number.heldPosition1} heldPosition2 ={number.heldPosition2} heldPosition3={number.heldPosition3}
            education={number.education} tel={number.telNumber} email={number.email} address = {number.address} recommender = {number.recommender} workInBelaz = {number.workInBelaz}
            />
        )

        // return props.req.map()
    } else {
        return <div style={{
            backgroundColor: "white",
            height: '100%',

        }}>
            <div></div>
        </div>
    }

}



const ListApplicants = () => {


    const [req, setReq] = useState(null)
    if (req === null) {
        try {
            server.send_post_request(`${API_URL}api/kadry/applicantsFromBd`, {})
                .then(res => {
                    // console.log(res.data)
                    setReq(res.data)
                })
        } catch (e) {
            alert(e.response)
        }

    }




    return (
        <div style={{
            width: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
        }}>

            <div style={{width:"100%"}}>


                <ListApll style={{width:"100%"}} req={req}/>

            </div>
            {/*<ListApp req={req}/>*/}
        </div>
    )
}

export default ListApplicants;
