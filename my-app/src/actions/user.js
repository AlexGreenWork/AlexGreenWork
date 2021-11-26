import axios from 'axios'
import {setUser, setUserLocal} from "../reducers/userReducer";
import {API_URL} from "../config";


export const registration = async (name, middlename, surname, email, tabelNum, phoneNumber, password, fired, adminOptions) => {
    try {
        const response = await axios.post(`${API_URL}api/auth/registration`, {
            name,
            middlename,
            surname,
            email,
            tabelNum,
            phoneNumber,
            password,
            fired,
            adminOptions
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/auth/login`, {
                email,
                password
            })
			//console.log(response);
            //console.log(response.data.user)

            dispatch(setUser(response.data.user))

            localStorage.setItem('token', response.data.token)
            localStorage.setItem('tokenExpires', Date())
            localStorage.setItem('userId', response.data.user.id)
            localStorage.setItem('userName', response.data.user.name)
            localStorage.setItem('userMiddleName', response.data.user.middlename)
            localStorage.setItem('userSurName', response.data.user.surname)
            localStorage.setItem('userTabelNum', response.data.user.tabelNum)
            localStorage.setItem('userEmail', response.data.user.email)
            localStorage.setItem('userPhoneNumber', response.data.user.phoneNumber)
            localStorage.setItem('userFired', response.data.user.fired)
            localStorage.setItem('userAdminOptions', response.data.user.adminOptions)
            localStorage.setItem('avatar', response.data.user.avatar)
        } catch (e) {
			console.log("Error Level: "+ e);
            alert(e.response.data.message)
        }
    }
}

export const auth = () => {
    return async dispatch => {

        if (localStorage.getItem('token')) {
            if (new Date().getDate() - new Date(localStorage.getItem('tokenExpires')).getDate() < 10) {


                const user = {
                    id: localStorage.getItem('userId'),
                    name: localStorage.getItem('userName'),
                    surname: localStorage.getItem('userSurname'),
                    middlename: localStorage.getItem('userMiddlename'),
                    tabelNum: localStorage.getItem('userUsertabelNum'),
                    email: localStorage.getItem('userEmail'),
                    phoneNumber: localStorage.getItem('userPhoneNumber'),
                    fired: localStorage.getItem('userFired'),
                    adminOptions: localStorage.getItem('userAdminOptions'),
                    avatar: localStorage.getItem('avatar'),


                }
                dispatch(setUserLocal(user))


            } else {
                try {

                    const response = await axios.get(`${API_URL}api/auth/auth`,
                        {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
                    )
                    dispatch(setUser(response.data.user))
                    localStorage.setItem('token', response.data.token)
                    console.log(response.data.id)

                } catch (e) {
                    console.log('auth error' + e)
                }
            }
        }
    }
}

export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(`${API_URL}api/files/avatar`, formData,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
            )
            localStorage.setItem('avatar', response.data.avatar)
            dispatch(setUser(response.data))

            // dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/files/avatar`,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}
export const getToMyOffers = (currentTabelnum) => {
    return async dispatch => {
        try {

            const response = await axios.post(`${API_URL}api/offers/myOffers`, {
                currentTabelnum
            })
            console.log(response)

            dispatch(setUser(response.offers))


        } catch (e) {
            alert(e.response.data.message)
        }
    }
}








// export const formToBaseFree = async (name, lastName, middleName, Email, tabelNumber, phoneNumber, nameOffer, problem, offer) => {
//     try {
//         const response = await axios.post(`${API_URL}api/auth/form`, {
//             name,
//             middlename,
//             surname,
//             email,
//             tabelNum,
//             phoneNumber,
//             password,
//             fired,
//             adminOptions
//         })
//         alert(response.data.message)
//     } catch (e) {
//         alert(e.response.data.message)
//     }
// }
