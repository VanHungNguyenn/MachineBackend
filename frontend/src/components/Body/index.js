import NotFound from 'components/utils/NotFound'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import DashboardPage from './DashboardPage'

const Body = (props) => {
	return (
		<div>
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route path='/login' component={LoginPage} />
				<Route path='/dashboard' component={DashboardPage} />
				<Route component={NotFound} />
			</Switch>
		</div>
	)
}

export default Body
