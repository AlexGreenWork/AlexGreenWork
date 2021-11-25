import axios from 'axios'
import {API_URL} from "../config";


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