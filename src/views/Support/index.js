import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom'; 
import SupportListView from './ListView';
import SupportTicket from './SupportTicket';
import StatusView from './StatusView';

class Support extends Component {
    render() {
        return ( 
            <Fragment>
                <Switch>
                    <Route exact path='/support' component={SupportListView} /> 
                    <Route exact path='/support/ticket/:rewardId?' component={SupportTicket} /> 
                    <Route exact path='/support/status' component={StatusView} /> 
                </Switch> 
            </Fragment> 
        ) 
    }
}

export default Support;