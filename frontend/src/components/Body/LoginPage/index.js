import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { Container } from 'reactstrap'

import './LoginPage.css'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from 'components/utils/Notification'
import { dispatchLogin } from 'redux/actions/userActions'

const initialState = {
	name: '',
	password: '',
}

function LoginPage(props) {
	const [user, setUser] = useState(initialState)
	const history = useHistory()
	const dispatch = useDispatch()

	const { name, password } = user

	const handleSubmit = async ({ name, password }) => {
		try {
			const res = await axios.post('/user/login', {
				name,
				password: password,
			})
			setUser({
				...user,
			})

			showSuccessMsg(res.data.msg)

			localStorage.setItem('firstLogin', true)

			dispatch(dispatchLogin())
			history.push('/dashboard')
		} catch (error) {
			error.response.data.msg &&
				setUser({
					...user,
				})
			showErrorMsg(error.response.data.msg)
		}
	}

	const handleChangeInput = (e) => {
		const { name, value } = e.target
		setUser({ ...user, [name]: value })
	}

	return (
		<>
			<Container>
				<div
					className='login_page'
					style={{ maxWidth: 550, width: '100%' }}
				>
					<Form
						name='basic'
						onFinish={handleSubmit}
						layout='vertical'
					>
						<Form.Item
							label='Name'
							name='name'
							htmlFor='name'
							style={{ width: '100%' }}
						>
							<Input
								value={name}
								type='text'
								name='name'
								id='name'
								onChange={handleChangeInput}
							/>
						</Form.Item>

						<Form.Item
							label='Password'
							name='password'
							htmlFor='password'
						>
							<Input.Password
								value={password}
								type='password'
								name='password'
								id='password'
								onChange={handleChangeInput}
							/>
						</Form.Item>

						<Form.Item className='mb-1'>
							<Button type='primary' htmlType='submit'>
								Login
							</Button>
						</Form.Item>
					</Form>
				</div>
			</Container>
		</>
	)
}

LoginPage.propTypes = {}

export default LoginPage
