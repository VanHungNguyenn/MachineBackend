import ACTIONS from '.'
import axios from 'axios'
import { SECRET_KEY } from 'constants/config'

export const dispatchGetAllInfo = (res) => {
	return {
		type: ACTIONS.GET_ALL_INFO_HISTORY_API,
		payload: res.data,
	}
}

export const fetchAllInfoHistoryAPI = async (token) => {
	const res = await axios.get(`/history_api/info?key=${SECRET_KEY}`, {
		headers: { Authorization: token },
	})

	return res
}
