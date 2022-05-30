import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Box, Paper, TextField, Button, Grid, CircularProgress, Modal } from '@material-ui/core'
import { connect } from 'react-redux'
import { logout } from '~/redux/actions/user'
import './styles.scss'

class LandingPage extends Component {
	state = {
		isLoading: true,
		ssoUrl: null
	}
	componentDidMount(){
		this.props.dispatch(logout())
		this.setState({
			isLoading: false,
			//ssoUrl: 'https://qn8sd2cwhj.execute-api.us-east-1.amazonaws.com/develop/sso?req=ob86dbuG7ptDDms1PdDTJ0yXACLk9j6A3vSjD1Q4QadU1cMFA%2FQw4uebQB030greuA5ZF%2BOc%2FlBPFxU2SWzYrSZyndMyGupFR%2FyiTJe9kVR2MzgGFg7ku1lKa74s530eLYGj6bGBnleK2BHLGQIMaxpQk0HFeqZo%2F4GfrByPvjWMEgSkbWC95xZ4ksnzjbxqMiQH96heIDOEzLhimap2Cw0GHdIS11ZIvr6I7sbyDACfU3Kg9JTV0HujcMLQAh0zjxm6zy%2FnJsBHsZtgWGdArHrJHwDTdFzcVuA4yacqd0Q%3D'
			ssoUrl: 'https://qn8sd2cwhj.execute-api.us-east-1.amazonaws.com/develop/sso?req=ob86dbuG7ptDDms1PdDTJywhk6ayvrsDHFxeAG2cZIF5DeU2SPZOo7VKtTalzG%2BgLkLtTxkv7nWQcXgivTLgK2R4kxa8umzzE8l4ABUdmE2RzDScyE0S0kbMTWKxyvnwLx09uPOEe8az8yTDO8AFQoLNaOPWwa15cj6ci%2BnGp%2BfHpXZBmU5XHZXbNGqLgiRUge9rI1I5PFP%2BaKiISW7gDSLAZwSPD%2FGs0a8MYiIvqDmc3A1g6Td66YPFGBFRZu8ySBx%2BRO7KyOXjxQU0XWjYD8oPmlzG4yD%2BhL1JN3UgjL6VSSAb3q4KC5hib%2FJHFomp',
			ssoUrl1: 'https://qn8sd2cwhj.execute-api.us-east-1.amazonaws.com/develop/sso?req=ob86dbuG7ptDDms1PdDTJywhk6ayvrsDHFxeAG2cZIF5DeU2SPZOo7VKtTalzG%2BgLkLtTxkv7nWQcXgivTLgK2R4kxa8umzzE8l4ABUdmE2RzDScyE0S0kbMTWKxyvnwLx09uPOEe8az8yTDO8AFQoLNaOPWwa15cj6ci%2BnGp%2BfHpXZBmU5XHZXbNGqLgiRUge9rI1I5PFP%2BaKiISW7gDSLAZwSPD%2FGs0a8MYiIvqDmc3A1g6Td66YPFGBFRZu8ySBx%2BRO7KyOXjxQU0XWjYD8oPmlzG4yD%2BhL1JN3UgjL6wV6fZFJDk3QBk%2B3YY6%2B18',
			ssoUrl2: 'https://qn8sd2cwhj.execute-api.us-east-1.amazonaws.com/develop/sso?req=ob86dbuG7ptDDms1PdDTJywhk6ayvrsDHFxeAG2cZIF5DeU2SPZOo7VKtTalzG%2BgLkLtTxkv7nXOU5cKMqvaxVHxdanXW%2Bc99z26N96MFHWRzDScyE0S0kbMTWKxyvnwLx09uPOEe8az8yTDO8AFQoLNaOPWwa15cj6ci%2BnGp%2BfHpXZBmU5XHZXbNGqLgiRUge9rI1I5PFP%2BaKiISW7gDSLAZwSPD%2FGs0a8MYiIvqDmc3A1g6Td66YPFGBFRZu8ySBx%2BRO7KyOXjxQU0XWjYD8oPmlzG4yD%2BhL1JN3UgjL7MPP4WvB8NSZgn6U3h5XsD'
		})
	}
	render() {
		const { isLoading, ssoUrl, ssoUrl1, ssoUrl2 } = this.state
		if(isLoading){
			return <Box display="flex" p={10} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
		}
		return (
			<div id="landing-page">
				<Grid container justify="center">
					<Grid item md={10}>
						<div className="header">
							<div className="logo">
								<img alt="elan" src={require('~/assets/images/elan-logo.png')} /> ELAN
							</div>
						</div>
						<div className="content">
							<div className="page-header">
								<h2 className="page-title">Elan-Banker Portal Workflow</h2>
							</div>
							<div className="page-content">
								<a href={`${ssoUrl}`}>
									<Paper>
										<Box p={3}>Log In with SSO 1</Box>
									</Paper>
								</a>
							</div>
							<div className="page-content" mt={2}>
								<a href={`${ssoUrl1}`}>
									<Paper>
										<Box p={3}>Log In with SSO 2</Box>
									</Paper>
								</a>
							</div>
							<div className="page-content" mt={2}>
								<a href={`${ssoUrl2}`}>
									<Paper>
										<Box p={3}>Log In with SSO 3</Box>
									</Paper>
								</a>
							</div>
							
						</div>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default connect(state => (
	{ ...state.user }
))(LandingPage)