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
        dateResp1 : null,
        dateMarkRespons1 : null,
        responsible1: null,
        nameResponsible1 : null,
        markRespons1 : null,
        dateResp2 : null,
        dateMarkRespons2 : null,
        responsible2: null,
        nameResponsible2 : null,
        markRespons2: null,
        dateResp3 : null,
        dateMarkRespons3 : null,
        responsible3: null,
        nameResponsible3 : null,
        markRespons3 : null,
        dateRespRG : null,
        dateMarkRG : null,
        responsibleRG : null,
        nameResponsibleRG : null,
        answerRG: null, 
        textOffer: null, 
        phoneNumber: null, 
        note : null,
        note1 : null,
        note2 : null,
        note3 : null,
        dateComission : null,    
       
    },
    addSendler: ''
}


export default function offerReducer(state = defaultState, action) {
    console.log("State"+ state)
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

    export const selectMyOffers = (Id, nameOffer, date, tabelNum, nameSendler, surnameSendler, 
                                middlenameSendler, email, status, descriptionProblem, responsible1,
                                responsible2, responsible3, answerRG, answerTEO, textOffer, 
                                phoneNumber, note) => ({ type:SELECT_MYOFFERS, payload:{
                    Id: Id,
                    nameOffer: nameOffer,
                    date: date,
                    tabelNum: tabelNum,
                    nameSendler: nameSendler,
                    surnameSendler: surnameSendler,
                    middlenameSendler: middlenameSendler,
                    email: email,
                    status: status,
                    descriptionProblem: descriptionProblem,
                    responsible1: responsible1,
                    responsible2: responsible2,
                    responsible3: responsible3,
                    answerRG: answerRG,
                    answerTEO: answerTEO,
                    textOffer: textOffer,
                    phoneNumber: phoneNumber,
                    note: note
                } 
            })

    export const addSendler = (addSendler) => ({type:ADD_SENDLER, payload: addSendler })