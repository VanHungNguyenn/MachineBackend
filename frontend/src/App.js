import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import NotFound from 'components/utils/NotFound'
import Loading from 'components/utils/Loading'
import Header from 'components/Header'
import { dispatchGetToken } from 'redux/actions/tokenActions'
import { dispatchLogin } from 'redux/actions/userActions'

// Lazy load - Code splitting
const Body = React.lazy(() => import('./components/Body'))

function App() {
	const dispatch = useDispatch()
	const isLogged = useSelector((state) => state.user.isLogged)
	const token = useSelector((state) => state.token)

	useEffect(() => {
		const firstLogin = localStorage.getItem('firstLogin')
		if (firstLogin) {
			const getToken = async () => {
				const res = await axios.post('/user/refresh_token', null)

				dispatch(dispatchGetToken(res.data.access_token))
			}

			getToken()
		}
	}, [isLogged, dispatch])

	useEffect(() => {
		if (token) {
			dispatch(dispatchLogin())
		}
	}, [token, dispatch])

	return (
		<div className='machines_app'>
			<Suspense fallback={<Loading />}>
				<BrowserRouter>
					<Header />

					<Switch>
						<Route path='' component={Body} />
						<Route component={NotFound} />
					</Switch>
				</BrowserRouter>
			</Suspense>
		</div>
	)
}

export default App
