import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom';
import PaymentPreferenceListView from './ListView';
import TabView from './TabView';
import AccountView from './AccountView';

import './styles.scss'

class PaymentPreference extends Component {
	render() {
		return (
			<Fragment>
				<Switch>
					<Route exact path='/manage-account' component={TabView} />
                    <Route exact path='/manage-account-update' component={AccountView} />
					
				</Switch>
			</Fragment>
		)
	}
}

export default PaymentPreference;