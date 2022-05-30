import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Grid, Paper, Link, Box } from '@material-ui/core';
import NavBar from './NavBar';
import { logout } from '~/redux/actions/user'
import './styles.scss';
import { AlertDialog } from '../Dialogs';
import Cookies from 'universal-cookie';
import { userInfo } from '~/redux/actions/user';

const cookies = new Cookies(window.document.cookie)

class Header extends Component {

    state = {
        dialogActive: false,
        title: "",
        message: ""
    }

    componentDidMount() {
        this.props.dispatch(userInfo()).then(() => {
            console.log(this.props);
            this.setState({
                isLoading: false
            })
        })
    }

    logout() {
        this.props.dispatch(logout());
        this.props.history.push("/logout");
        // this.setState({ title: "Thank you!", message: "You have successfully logged out.", dialogActive: true });
    }

    render() {
        const userInfo = this.props.info;
        const { client } = this.props.user.info;
        const isClientBMW = client && client === "bmw";
        const isClientHD = client && client === "hd";
        const isClientACG = client && client === "acg";
        const { title, message, dialogActive } = this.state;
        const { isLoggedIn } = this.props;

        return (
            <Fragment>
               {isLoggedIn ? <Paper square id="header">
                
                    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" style={isClientHD ? {minHeight: "80px"} : null} className="header-top">
                        {isClientBMW && <Grid item md={4}>
                            <div className="logo-wrap"><img alt="elan" src={require('~/assets/images/bmw-header-logo.png')} /></div>
                        </Grid>}
                        {isClientHD && <Grid item md={4}>
                            <div className="logo-wrap"><img alt="elan" src={require('~/assets/images/hd-header-logo.png')} /></div>
                        </Grid>}
                        {isClientACG && <Grid item md={4}>
                            <div className="logo-wrap"><img alt="elan" src={require(`~/assets/images/${client}/logo.png`)} /></div>
                        </Grid>}
                        <Grid item md={4}>
                        {!isClientHD && !isClientBMW && !isClientACG && <div className="logo-wrap" style={isClientBMW ? {textAlign: "center"} : {textAlign: "left"}}><img alt="elan" src={require('~/assets/images/elan-header-logo.png')} /></div>}
                        </Grid>
                        <Grid item md={4}>
                             <div className="RightSection">
                                {userInfo ? cookies.get("client") !== "hd" ? <div className="LeftNav">
                                    <span>{`Welcome, `} <b>{`${userInfo.FirstName}`}</b></span>
                                </div> :
                                <div className="LeftNav">
                                    <span>{`Welcome `} <b>{`${userInfo.OEID}`}</b></span>
                                </div>
                                : null }
                                <div className="RightNav">
                                    <Link component="button" variant="body2" onClick={this.logout.bind(this)}>
                                        Logout
                                    </Link>
                                </div>
                            </div> 
                        </Grid>
                    </Box>
                    <Box className="header-bottom">
                        <NavBar {...this.props} />
                    </Box>
                </Paper>
                 : 
                <Paper square id="header">
                <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" style={cookies.get("client") == "hd" ? {minHeight: "80px"} : null} className="header-top">
                    {cookies.get("client") == "bmw" && <Grid item md={4}>
                        <div className="logo-wrap"><img alt="elan" src={require('~/assets/images/bmw-header-logo.png')} /></div>
                    </Grid>}
                    {cookies.get("client") == "hd" && <Grid item md={4}>
                        <div className="logo-wrap"><img alt="elan" src={require('~/assets/images/hd-header-logo.png')} /></div>
                    </Grid>}
                    {cookies.get("client") == "acg" && <Grid item md={4}>
                        <div className="logo-wrap"><img alt="elan" src={require(`~/assets/images/acg/logo.png`)} /></div>
                    </Grid>}
                    {cookies.get("client") !== "bmw" && cookies.get("client") !== "hd" && cookies.get("client") !== "acg" && <Grid item md={4}>
                        <div className="logo-wrap"><img alt="elan" src={require('~/assets/images/elan-header-logo.png')} /></div>
                    </Grid>}
                </Box>
                <Box className="header-bottom">
                    <NavBar {...this.props} />
                </Box>
            </Paper>
            }
                {dialogActive && <AlertDialog success={true} title={title} message={message} onConfirm={() => {
                    this.setState({ dialogActive: false, title: "", message: "" });
                    this.props.dispatch(logout());
                }} />}
            </Fragment>
        )
    }
}

export default connect(state => (
    { ...state.user, ...state.clientConfig }
))(Header)