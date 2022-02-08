import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Col, Container, Row, Nav, NavItem } from 'reactstrap'
import { Avatar, Image, Dropdown, Menu } from 'antd'
import avatar_default from '../../assets/images/avatar_default.png'
import axios from 'axios'
import './Header.css'

Header.propTypes = {}

const handleLogout = async (token) => {
	try {
		await axios.get('/user/logout')
		localStorage.removeItem('firstLogin')
		window.location.href = '/'
	} catch (err) {
		window.location.href = '/'
	}
}

const menu = () => {
	return (
		<Menu>
			<Menu.Item key='1'>
				<Link to='/' onClick={handleLogout} style={{ margin: 16 }}>
					<i
						className='fas fa-sign-out-alt'
						style={{ marginRight: 6 }}
					></i>
					Logout
				</Link>
			</Menu.Item>
		</Menu>
	)
}

function Header(props) {
	const isLogged = useSelector((state) => state.user.isLogged)

	const userLink = () => {
		return (
			<>
				<NavItem>
					<Link to='/dashboard' className='navbar__link'>
						Dashboard
					</Link>
				</NavItem>
				<NavItem style={{ cursor: 'pointer' }}>
					<Dropdown
						arrow={true}
						overlay={menu}
						placement='bottomRight'
					>
						<div className='header_username_block'>
							<Avatar
								src={
									<Image
										preview={false}
										src={avatar_default}
										style={{ width: 32 }}
									/>
								}
								style={{
									border: '1px solid #fff',
									opacity: '.7',
								}}
							/>
							{/* <div className='header_username'>{username}</div> */}
						</div>
					</Dropdown>
				</NavItem>
			</>
		)
	}

	return (
		<header className='header'>
			<Container>
				<Row className='justify-content-between'>
					<Col xs='auto' className='d-flex align-items-center'>
						<Link to='/' className='header__link header__title'>
							Machines
						</Link>
					</Col>
					<Col xs='auto' className='d-flex align-items-center'>
						<Nav className='navbar'>
							{isLogged ? (
								userLink()
							) : (
								<NavItem>
									<Link to='/login' className='navbar__link'>
										Login
									</Link>
								</NavItem>
							)}
						</Nav>
					</Col>
				</Row>
			</Container>
		</header>
	)
}

export default Header
