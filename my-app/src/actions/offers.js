import axios from 'axios'
import {API_URL} from "../config";
import {useSelector} from "react-redux";

export const toStatus = async (offerId, view, category, status) => {
    try {
        console.log(offerId, view, category, status)
        const response = await axios.post(`${API_URL}api/offers/toStatus`, {
            offerId,
            view,
            category,
            status
        })

    } catch (e) {
        alert(e.response.data.message)
    }
}
