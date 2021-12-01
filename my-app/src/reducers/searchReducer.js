const defaultState = { searchUserTabnum: null }

export default function searchReducer(state = defaultState, action)
{
    return {
        ...state,
        searchUserTabnum: state.searchUserTabnum = action
    }
}

export const setTabnum = tabnum => ({type: "select", payload: tabnum})
