import ACTIONS from 'redux/actions'

const historyAPI = {}

const historyReducer = (state = historyAPI, action) => {
	switch (action.type) {
		case ACTIONS.GET_ALL_INFO_HISTORY_API:
			return action.payload
		default:
			return state
	}
}

export default historyReducer
