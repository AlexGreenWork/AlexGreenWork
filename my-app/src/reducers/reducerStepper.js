const ADD_STATUS = "ADD_STATUS"
const ADD_REJECT = "ADD_REJECT"


const defaultState= {
    rejectStatusOffer:-1,
    stepStatusOffer:0,

}
export default function ReducerStepper (state=defaultState, action){
    switch (action.type){
        case "ADD_STATUS":

             state.stepStatusOffer =action.payload;
            break;
        case "ADD_REJECT":
            state.rejectStatusOffer =action.payload;

            break;
        default:
            return state
    }
}
export const stepStatusOffer = () => ({type: ADD_STATUS})
export const rejectStatusOffer = () => ({type: ADD_REJECT})