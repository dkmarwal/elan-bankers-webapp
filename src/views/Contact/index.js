import React, { Component, Fragment } from 'react'
import { Box, Paper, Grid } from '@material-ui/core'
import { connect } from 'react-redux';
import './styles.scss'

class Contact extends Component {
	render() {
		const { client } = this.props.user.info;
        const isClientBMW = client && client === "bmw";
		const isClientACG = client && client === "acg";
		return (
			<Fragment>
				<div id="contact" className="login-container">
					<Grid container spacing={0}>
						<Grid item sm={6}>
							<div className="contact-image-container" style={{
								backgroundImage: `url('${require('~/assets/images/login-bg.jpg')}')`
							}}></div>
						</Grid>
						<Grid item sm={6} xs={12}>
							<div className="contact-form-container">
								<div className="centered-container">
									<div className="logo-container">
										{isClientBMW && <img alt="bmw" style={{width: "250px"}} src={require('~/assets/images/bmw-header-logo.png')} />}
										{isClientACG ? <img alt="bmw" style={{width: "250px"}} src={require('~/assets/images/acg/logo.png')} /> : <img alt="elan" src={require('~/assets/images/contact-logo.png')} />}
									</div>
									<h2>Contact</h2>
									<div className="elan-client-services">
										Elan Client Services
									</div>
									<div className="phone-email">
										<img src={require('~/assets/images/phone-call.png')} style={{ marginRight: '10px', verticalAlign: 'bottom'}}/> 1-800-523-5354  
									</div>
									<div className="phone-email">
										<img src={require('~/assets/images/envelope.png')} style={{ marginRight: '10px', verticalAlign: 'bottom'}}/> clientservices@elanfs.com  
									</div>
									
								</div>
							</div>
						</Grid>
					</Grid>
				</div>
			
			</Fragment>
		)
	}
}

export default connect(state => ({ ...state.user }))(Contact);