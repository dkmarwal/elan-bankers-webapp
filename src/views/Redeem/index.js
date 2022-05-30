import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom';
//import RedeemListView from './ListView';
import RedeemListView from './ListView'

//import './styles.scss'

class PaymentPreference extends Component {
	render() {
		return (
			<Fragment>
				<Switch>
					<Route exact path='/redeem/:paymentMethodId?' component={RedeemListView} />
				</Switch>
			</Fragment>
		)
	}
}

export default PaymentPreference;