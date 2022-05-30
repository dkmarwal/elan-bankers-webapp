import React, { Component, Fragment } from 'react'
import { Tabs, Tab } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { getColorCodeByClientCode } from "~/services/config/index";
import _ from 'lodash';
//import NavData from '~/config/navigation.json'
import './styles.scss'
import Cookies from 'universal-cookie';
import { userInfo, processLogin, logout, fetchClientConfigSettings, fetchClientConfig } from '~/redux/actions/user';

export default class NavBar extends Component {

    state = {
        leftMenu: [
            {
                "url": "/redeem",
                "name": "Redeem",
                "items": []
            },
            {
                "url": "/payments",
                "name": "Rewards",
                "items": []
            },
            {
                "url": "/manage-account",
                "name": "Manage Account",
                "items": []
            },
            {
                "url": "/support",
                "name": "Support",
                "items": []
            },
            {
                "url": "/bankers",
                "name": "Employee Rewards",
                "items": []
            }
        ]
    };

    showLink(navItem) {
        let cookies = new Cookies(window.document.cookie);
        let am = cookies.get("am");
        const { configs } = this.props.clientConfig;
        const showBankerTab = getColorCodeByClientCode(configs, "C00021") === "Y";
        console.log("ban", navItem.name);
        if (navItem && navItem.name === "Employee Rewards") {
            if (showBankerTab) {
                switch (am) {
                    case "001":
                        return true;
                    case "002":
                        return true;
                    default: return false;
                }
            } else {
                return false;
            }

        } else {
            return true;
        }
    }

    render() {
        const cookies = new Cookies(window.document.cookie);
        const { leftMenu } = this.state
        const { path } = this.props.match
        const currentNavIndex = _.findIndex(leftMenu, item => item.url === path)
        const { isLoggedIn } = this.props;
        const { configs } = this.props.clientConfig;
        const headerLinkActiveColors = getColorCodeByClientCode(configs, "C00017") && getColorCodeByClientCode(configs, "C00017").split(";");
        console.log(headerLinkActiveColors);
        return (
            <Fragment>
                <div id="navbar">
                    {isLoggedIn && cookies.get("client") !== "hd" ? <Tabs value={currentNavIndex} TabIndicatorProps={{ style: { background: `${headerLinkActiveColors && headerLinkActiveColors[currentNavIndex] || '#000000'}` } }} indicatorColor={`primary`}>
                        {leftMenu.map((navItem, index) => (
                            this.showLink(navItem) &&
                            <div>
                                <Link to={navItem.url} key={index}>
                                    <Tab label={navItem.name} />
                                </Link>
                            </div>
                        ))}
                    </Tabs> : null}
                </div>
            </Fragment>
        )
    }
}