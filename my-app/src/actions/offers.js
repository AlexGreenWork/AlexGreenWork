import axios from 'axios'
import {API_URL} from "../config";
import server from "./server";


export const saveToDb1 = async (searchUser) => {
    try {

        await server.send_post_request(`${API_URL}api/offers/saveToDb1`, {
            searchUser
        })

    } catch (e) {
        alert(e.response.data.message)
    }
}
export const saveToDb2 = async (searchUser) => {
    try {

        await server.send_post_request(`${API_URL}api/offers/saveToDb2`, {
            searchUser
        })

    } catch (e) {
        alert(e.response.data.message)
    }
}
export const saveToDb3 = async (searchUser) => {
    try {

        await server.send_post_request(`${API_URL}api/offers/saveToDb3`, {
            searchUser
        })

    } catch (e) {
        alert(e.response.data.message)
    }
}

export const toStatus = async (offerId, view, category, status) => {
    try {
if(view==''){
    console.log("null view")
    view=0
}
if(category==''){
    console.log("null view")
    category=0
}
        await server.send_post_request(`${API_URL}api/offers/toStatus`, {
            offerId,
            view,
            category,
            status
        })

    } catch (e) {
        alert(e.response.data.message)
    }
}
export const toDbDateComission = async (offerId, dateComission) => {
    try {

        await server.send_post_request(`${API_URL}api/offers/toDbDateComission`, {
            offerId,
            dateComission
        })

    } catch (e) {
        alert(e.response.data.message)
    }
}
export const saveResponsible = async ()=>{

}
