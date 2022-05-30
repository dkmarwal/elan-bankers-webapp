import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Cookies from 'universal-cookie';
import './styles.scss';
import TabView from "./TabView";
import { connect } from 'react-redux';
import { getColorCodeByClientCode } from "~/services/config/index";

class AuthRoute extends React.Component {

    isAllowed() {
        let cookies = new Cookies(window.document.cookie);
        let am = cookies.get("am");
        return am && (am === "001" || am === "002");
    }

    render() {
        const { component: Component, clientConfig , ...rest} = this.props;
        let isAccessable = this.isAllowed();
        const { configs } = this.props.clientConfig;
        const showBankerTab = getColorCodeByClientCode(configs, "C00021") === "Y";
        return (
            <Route exact={true} {...rest} render={(props) => (
                (isAccessable === true && showBankerTab === true) ?
                    <Fragment>
                        <Component {...props} />
                    </Fragment>
                    : null
            )} />
        )
    }
}

class Bankers extends React.Component {
    render() {
        const { clientConfig } = this.props;
        return (
            <Fragment>
                <Switch>
                    <AuthRoute exact path='/bankers' component={TabView} clientConfig={clientConfig} />
                    {/*<AuthRoute exact path='/bankers' component={ListView} /> */}
                </Switch>
            </Fragment>
        )
    }
}

export default  connect(state => (
	{ ...state.clientConfig }
))(Bankers)