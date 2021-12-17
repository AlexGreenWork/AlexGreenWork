const SELECT_MYOFFERS = "SELECT_MYOFFERS"
const ADD_SENDLER = "ADD_SENDLER"

const defaultState = {
  
    offer :{
        Id: null,
        nameOffer: null,
        date: "0123456789",
        tabelNum: null,
        nameSendler: null,
        surnameSendler: null,
        middlenameSendler: null,
        email: null,
        status: null,
        descriptionProblem: null,
        category: null,
        view : null,
		responsibles: [],
		responsibles_rg: [],
        textOffer: null, 
        phoneNumber: null, 
        dateComission : null,    
    },
    addSendler: ''
}


export default function offerReducer(state = defaultState, action) {
    console.log(state)
    switch (action.type) {
        case SELECT_MYOFFERS:
            state.offer = action.payload
            break;
        case ADD_SENDLER: 
            state.addSendler = action.payload
            break; 

        default:
            break;
           
    }
    return state
}

    export const selectMyOffers = (Id,
									nameOffer,
									date,
									tabelNum,
									nameSendler,
									surnameSendler, 
									middlenameSendler,
									email,
									status,
									descriptionProblem,
									category,
									view,
									responsibles,
									responsibles_rg,
									textOffer, 
									phoneNumber,
									dateCommision) => ({ type:SELECT_MYOFFERS, payload:{
												Id: Id,
												nameOffer: nameOffer,
												date: date,
												tabelNum: tabelNum,
												nameSendler: nameSendler,
												surnameSendler: surnameSendler,
												middlenameSendler: middlenameSendler,
												email: email,
												status: status,
												descriptionProblem:descriptionProblem,
												category: category,
												view: view,
												responsibles: responsibles,
												responsibles_rg: responsibles_rg,
												textOffer: textOffer, 
												phoneNumber: phoneNumber, 
												dateComission : dateCommision
                } 
            })

    export const addSendler = (addSendler) => ({type:ADD_SENDLER, payload: addSendler })
