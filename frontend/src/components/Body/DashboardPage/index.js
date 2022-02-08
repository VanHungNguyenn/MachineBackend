import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
	dispatchGetAllInfo,
	fetchAllInfoHistoryAPI,
} from 'redux/actions/historyActions'

function DashboardPage(props) {
	const dispatch = useDispatch()
	const history = useHistory()

	const isLogged = useSelector((state) => state.user.isLogged)
	const token = useSelector((state) => state.token)
	const historyAPI = useSelector((state) => state.history)

	console.log(historyAPI)

	useEffect(() => {
		if (isLogged) {
			return fetchAllInfoHistoryAPI(token).then((res) => {
				dispatch(dispatchGetAllInfo(res))
			})
		}
	}, [token, isLogged, dispatch])

	return <div>DashboardPage</div>
}

export default DashboardPage
