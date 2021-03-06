import {logout, setUser, setUserLocal} from "../reducers/userReducer";
import {API_URL} from "../config";
import server from './server';


export const registration = async (surname, name, middlename,  email, tabelNum, phoneNumber, password, fired, adminOptions) => {
    try {

        const date= new Date().toISOString().slice(0, 10);

        if(phoneNumber.length === 12){
        console.log(date)
        const response = await server.send_post_request(`${API_URL}api/auth/registration`, {
            surname,
            name,
            middlename,
            email,
            tabelNum,
            phoneNumber,
            password,
            fired,
            adminOptions,
            date
        })
        alert(response.data.message)
        window.location.href = '/authorization';
         }if(phoneNumber.length < 12){
            alert("Неправильно введенный номер телефона")
         }

    } catch (e) {
        alert(e.response.data.message)
    }
}

export const changePassword = async (oldPassword, newPassword) => {
    try {
        const date= new Date().toISOString().slice(0, 10);
        const tabelNum = localStorage.getItem('userTabelNum')

        console.log(date)
        const response = await server.send_post_request(`${API_URL}api/auth/changePassword`, {
            tabelNum,
            newPassword, 
            oldPassword
        })
        alert(response.data.message)
     
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try
		{
            const response = await server.send_post_request(`${API_URL}api/auth/login`, {
                email,
                password
            })

            localStorage.setItem('userAvatar', response.data.user.avatar)
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

            
            dispatch(setUser(response.data.user))
        }
		catch (e)
		{
            console.log("Error Level: "+ e);
            alert(e.response.data.message)
        }
    }
}

export const auth = () => {
    return async dispatch => {
		const current_date = new Date();
		const token_date = new Date(localStorage.getItem('tokenExpires'));
		const hours_diff = Math.abs(Math.floor((current_date - token_date) / (1000 * 3600)));
		const SERVER_TOKEN_LIFE_HOURS = 8;

        if (localStorage.getItem('token'))
		{
			if(hours_diff < SERVER_TOKEN_LIFE_HOURS)
			{
				const user = {
					id: localStorage.getItem('userId'),
					name: localStorage.getItem('userName'),
					surname: localStorage.getItem('userSurName'),
					middlename: localStorage.getItem('userMiddleName'),
					tabelNum: localStorage.getItem('userUserTabelNum'),
					email: localStorage.getItem('userEmail'),
					phoneNumber: localStorage.getItem('userPhoneNumber'),
					fired: localStorage.getItem('userFired'),
					adminOptions: localStorage.getItem('userAdminOptions'),
					avatar: localStorage.getItem('userAvatar'),
				}
               
				dispatch(setUserLocal(user))
			}
			else
			{
				dispatch(logout());
			}
		}
	}
}
/**
	* @param {File} file
**/
export const uploadAvatar = (file) => {
    return async dispatch => {
        try
		{
            const formData = new FormData()
            formData.append('file', file)

            const response = await server.send_post_request(`${API_URL}api/files/avatar`, formData)

            localStorage.setItem('userAvatar', response.data.avatar)
           
            dispatch(setUser(response.data))

        }
		catch (e)
		{
            console.log(e)
        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try {
            const response = await server.send_delete_request(`${API_URL}api/files/avatar`)

            localStorage.setItem('userAvatar','')
          
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}
export const getToMyOffers = (currentTabelnum) => {
    return async dispatch => {
        try {

            const response = await server.send_post_request(`${API_URL}api/offers/myOffers`, {
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
//         const response = await server.send_post_request(`${API_URL}api/auth/form`, {
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
