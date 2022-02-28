const NOTIFICATION_OFFERS_PROCESSING = "NOTIFICATION_OFFERS_PROCESSING"

const defaultState = {
    offerForProcessing: null
}

export default function notificationReducer(state = defaultState, action) {
    switch (action.type) {
        case NOTIFICATION_OFFERS_PROCESSING:
            state.offerForProcessing = action.payload
            break;
        default:
            break;
    }
    return state
}


export const NotifOffersProcessing = (notifOffersProcessing) => ({ type:NOTIFICATION_OFFERS_PROCESSING, payload: notifOffersProcessing
    }) 
