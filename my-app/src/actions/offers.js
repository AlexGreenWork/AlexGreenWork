import axios from 'axios'
import {API_URL} from "../config";


export const saveToDb1 = async (searchUser) => {
    try {

        await axios.post(`${API_URL}api/offers/saveToDb1`, {
            searchUser
        })

    } catch (e) {
        alert(e.response.data.message)
    }
}
export const saveToDb2 = async (searchUser) => {
    try {

        await axios.post(`${API_URL}api/offers/saveToDb2`, {
            searchUser
        })

    } catch (e) {
        alert(e.response.data.message)
    }
}
export const saveToDb3 = async (searchUser) => {
    try {

        await axios.post(`${API_URL}api/offers/saveToDb3`, {
            searchUser
        })

    } catch (e) {
        alert(e.response.data.message)
    }
}

export const toStatus = async (offerId, view, category, status) => {
    try {

        await axios.post(`${API_URL}api/offers/toStatus`, {
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

        await axios.post(`${API_URL}api/offers/toDbDateComission`, {
            offerId,
            dateComission
        })

    } catch (e) {
        alert(e.response.data.message)
    }
}
export const saveResponsible = async ()=>{

}
