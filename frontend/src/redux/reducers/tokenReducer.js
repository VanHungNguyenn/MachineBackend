import ACTIONS from 'redux/actions'

const initialToken = ''

const tokenReducer = (state = initialToken, action) => {
	switch (action.type) {
		case ACTIONS.GET_TOKEN:
			return action.payload
		default:
			return state
	}
}

export default tokenReducer
