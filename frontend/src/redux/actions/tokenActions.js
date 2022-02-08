import ACTIONS from '.'

export const dispatchGetToken = (payload) => {
	return {
		type: ACTIONS.GET_TOKEN,
		payload,
	}
}
