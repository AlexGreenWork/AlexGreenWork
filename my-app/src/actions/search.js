import {searchUserTabnum} from "../reducers/searchReducer";

export const searchtabnum = (tabnum) => {
    return async dispatch => {
        dispatch(searchUserTabnum(tabnum));
    }
}
