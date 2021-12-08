const SELECT_USER_TABNAME = "select";
const DEFAULT = {searchUserTabnum: null}

export default function searchReducer(state = DEFAULT, action)
{
	switch(action.type)
	{
		case SELECT_USER_TABNAME:
		{
			state.searchUserTabnum = action.searchUserTabnum;
		}
	}

	return state;
}

export const searchUserTabnum = tabnum => ({type: SELECT_USER_TABNAME, searchUserTabnum: tabnum})
