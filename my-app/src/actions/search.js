import {searchUser, selectUserCard} from "../reducers/searchReducer";

export const searchuser = (tabnum, name, department, division) => {
    return async dispatch => {
        dispatch(searchUser(tabnum, name, department, division));
    }
}

export const selectcard = (tabnum) => {
    return async dispatch => {
        dispatch(selectUserCard(tabnum));
    }
}
