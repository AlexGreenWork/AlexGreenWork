const SEARCH_USER = "select";
const SELECT_USER_CARD = "card";
const DEFAULT = {
					searchUser: {tabnum: null, name: null, department: null, division: null},
					selectUserCard: null
				}

export default function searchReducer(state = DEFAULT, action)
{
	switch(action.type)
	{
		case SEARCH_USER:
			state.searchUser = action.searchUser;
		break;

		case SELECT_USER_CARD:
			state.selectUserCard = action.selectUserCard;
		break;
		default: break;
	}

	return state;
}

export const searchUser = (tabnum, name, department, division) => ({type: SEARCH_USER, searchUser: {tabnum:tabnum, name: name, department: department, division: division}})
export const selectUserCard = tabnum => ({type: SELECT_USER_CARD, selectUserCard: tabnum})
