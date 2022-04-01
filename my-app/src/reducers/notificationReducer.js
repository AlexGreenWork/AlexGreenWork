const NOTIFICATION_OFFERS_PROCESSING = "NOTIFICATION_OFFERS_PROCESSING"


const defaultState = {
    offerForProcessing :{
        offersProcess: 0,
        notifConc: 0
    }
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


export const NotifOffersProcessing = (notifOffersProcessing, notifConcProcessing) => ({ type:NOTIFICATION_OFFERS_PROCESSING, payload: {offersProcess: notifOffersProcessing,
                                                                                                                notifConc: notifConcProcessing
}
    }) 

