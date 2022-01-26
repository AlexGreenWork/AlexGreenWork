const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"
const SET_USER_LOCAL="SET_USER_LOCAL"

const defaultState = {
    isAdmin: "",
    currentUser: {},
    isAuth: false
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            
            return {
                ...state,
                isAuth: state.isAuth = true,
                currentUser: state.currentUser = action.payload,
                isAdmin:state.isAdmin = action.payload.adminOptions ,

            }


        case SET_USER_LOCAL:

            return{
                ...state,
                isAuth: state.isAuth = true,
                currentUser:state.currentUser={
                    avatar: localStorage.getItem('userAvatar'),
                    id: localStorage.getItem('userId'),
                    name: localStorage.getItem('userName'),
                    surname: localStorage.getItem('userSurName'),
                    middlename: localStorage.getItem('userMiddleName'),
                    tabelNum: localStorage.getItem('userTabelNum'),
                    email: localStorage.getItem('userEmail'),
                    phoneNumber: localStorage.getItem('userPhoneNumber'),
                    fired: localStorage.getItem('userFired'),
                    adminOptions: localStorage.getItem('userAdminOptions'),

                },

                isAdmin: state.isAdmin = localStorage.getItem('userAdminOptions')
            }
        case LOGOUT:
            localStorage.removeItem('token')
            localStorage.removeItem('tokenExpires')
            localStorage.removeItem('userId')
            localStorage.removeItem('userName')
            localStorage.removeItem('userMiddleName')
            localStorage.removeItem('userSurName')
            localStorage.removeItem('userTabelNum')
            localStorage.removeItem('userEmail')
            localStorage.removeItem('userPhoneNumber')
            localStorage.removeItem('userFired')
            localStorage.removeItem('userAdminOptions')
            localStorage.removeItem('userAvatar')
            localStorage.removeItem('dateComission')
            localStorage.removeItem('idOffers')


            return {
                ...state,
                isAuth: state.isAuth = false,
                currentUser:state.currentUser = {},

                isAdmin: state.isAdmin = '',
            }
        default:
            return state
    }
}


export const setUser = user => ({type: SET_USER, payload: user})
export const setUserLocal = user => ({type: SET_USER_LOCAL, payload: user})
export const logout = () => ({type: LOGOUT})
