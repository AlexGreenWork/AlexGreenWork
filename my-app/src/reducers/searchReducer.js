const SEARCH_USER_TABNAME = "select";
const SELECT_USER_CARD = "card";
const DEFAULT = {
					searchUserTabnum: null,
					selectUserCard: null
				}

export default function searchReducer(state = DEFAULT, action)
{
	switch(action.type)
	{
		case SEARCH_USER_TABNAME:
			state.searchUserTabnum = action.searchUserTabnum;
		break;

		case SELECT_USER_CARD:
			state.selectUserCard = action.selectUserCard;
		break;
		default: break;
	}

	return state;
}

export const searchUserTabnum = tabnum => ({type: SEARCH_USER_TABNAME, searchUserTabnum: tabnum})
export const selectUserCard = tabnum => ({type: SELECT_USER_CARD, selectUserCard: tabnum})
