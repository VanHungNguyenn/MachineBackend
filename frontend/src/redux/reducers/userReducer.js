import ACTIONS from 'redux/actions'

const initialState = {
	username: '',
	isLogged: false,
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.LOGIN:
			return {
				...state,
				isLogged: true,
			}
		default:
			return state
	}
}

export default userReducer
