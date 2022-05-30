import React, {Fragment} from "react";
import { Box, Paper, Grid } from '@material-ui/core'
import './styles.scss'

export class ErrorPage extends React.Component {
    render() {
		
		return (
			<Fragment>
				<div id="error-page" className="login-container">
					<Grid container>
						<Grid item sm={12} xs={12} >
							<Box className="error-page-form-container" display="flex" justifyContent="center">
								<div className="centered-container">
									<h2>Error</h2>
									<div className="elan-client-services">
										You do not have permission to access this page
									</div>
								</div>
							</Box>
						</Grid>
					</Grid>
				</div>
			</Fragment>
		)
	}
}