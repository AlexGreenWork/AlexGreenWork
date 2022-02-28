import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import fileReducer from "./fileReducer";
import uploadReducer from "./uploadReducer";
import appReducer from "./appReducer";
import ReducerStepper from "./reducerStepper"
import searchReducer from "./searchReducer";
import offerReducer from "./offerReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
    upload: uploadReducer,
    app: appReducer,
    stepper:ReducerStepper,
    search:searchReducer,
    offers: offerReducer,
    notification: notificationReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
