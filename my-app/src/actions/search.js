import {setTabnum} from "../reducers/searchReducer";

export const searchtabnum = (tabnum) => {
    return async dispatch => {
        dispatch(setTabnum(tabnum));
    }
}