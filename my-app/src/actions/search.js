import {searchUserTabnum, selectUserCard} from "../reducers/searchReducer";

export const searchtabnum = (tabnum) => {
    return async dispatch => {
        dispatch(searchUserTabnum(tabnum));
    }
}

export const selectcard = (tabnum) => {
    return async dispatch => {
        dispatch(selectUserCard(tabnum));
    }
}
