import React, { Component, Fragment } from 'react';
import { Grid, Paper, Box, CircularProgress, Tabs, Tab, Typography, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import AccountView from "../AccountView/";
import Notification from '~/components/Notification';
import { GetPaymentMethodsByClientId } from "~/redux/helpers/paymentmethod";
import './styles.scss';
import ZelleView from '../ZelleView';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

class PaymentPreferenceListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            paymentOptions: [],
            defaultPayment: "",
            selectedPaymentMethod: 2,
        }
    }

    selectPaymentMethod(paymentMethodId) {
        this.setState({ selectedPaymentMethod: paymentMethodId })
    }

    componentDidMount = () => {
        const { accessToken, portbu, oeid } = this.props.user.info;
        this.setState({ isLoading: true }, async () => {
            let paymentmethods = await GetPaymentMethodsByClientId({ PBU: portbu, OEID: oeid });
            let defaultPaymentMethodId = paymentmethods && paymentmethods.Data && paymentmethods.Data.filter(m => m.DefaultMethod === 1) && paymentmethods.Data.filter(m => m.DefaultMethod === 1)[0] && paymentmethods.Data.filter(m => m.DefaultMethod === 1)[0].ID || 2;
            this.setState({
                defaultPayment: defaultPaymentMethodId,
                paymentOptions: paymentmethods && paymentmethods.Data,
                isLoading: false,
                selectedPaymentMethod: defaultPaymentMethodId
            })
        });
    }

    handleChange = (event, newValue) => {
        this.setState({ selectedPaymentMethod: newValue });
        console.log(this.state)
    };

    render() {
        const { client } = this.props.user.info;
        const isClientElan = client && client === "elan";
        const { isLoading, selectedPaymentMethod, paymentOptions, defaultPayment } = this.state;
        const { user } = this.props;

        if (isLoading) {
            return <Box display="flex" p={10} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
        }

        return (
            <Fragment>
                <Grid container justify="center" id="payment-preference-list-view">
                    <Grid item xs={12}>
                        <Box my={5}>
                            <Grid container spacing={1}>
                                <Grid item xs={4} md={4} lg={4}>
                                    <Paper square display="flex">
                                        <Box p={2} fontWeight={500}> Preferred Payment Option</Box>
                                        <Tabs
                                            orientation="vertical"
                                            variant="standard"
                                            value={selectedPaymentMethod}
                                            onChange={this.handleChange}
                                            aria-label="Payment Method"
                                        >
                                            {paymentOptions && paymentOptions.map && paymentOptions.map((item, index) => (
                                                <Tab icon={item.ID === 3 && <img width="68" height="23" src={require('~/assets/images/zelle-icon.png')} alt="Zelle"/>} className={selectedPaymentMethod === item.ID ? "selectedTab": undefined} label={item.ID === 2 && item.PaymentMethodType} onClick={() => this.selectPaymentMethod(item.ID)} />
                                            ))}
                                        </Tabs>
                                    </Paper>
                                </Grid>

                                <Grid item xs={8} md={8} lg={8}>
                                    <Paper square display="flex">
                                        <Box p={4} >
                                            <div value={selectedPaymentMethod} index={2}>
                                                {selectedPaymentMethod == 2 && <AccountView  {...this.props} defaultPaymentMethodId={defaultPayment} rewardsList={this.props.rewardsList} />}
                                            </div>
                                            <div value={selectedPaymentMethod} index={3} >
                                                {selectedPaymentMethod == 3 && <ZelleView {...this.props} defaultPaymentMethodId={defaultPayment} rewardsList={this.props.rewardsList}/>}
                                            </div>
                                        </Box>
                                    </Paper>

                                    <Grid container>
                                        <Grid item xs={12} >
                                            <Paper paddingTop={2} square display="flex" >
                                                <Box py={3} my={2}>
                                                    <Box pb={2} mt={2} square display="flex" justifyContent="center">
                                                        Your Payment Choice data is secured by Incedo Inc and Elan Financial Services
                                                    </Box>
                                                    <Box display="flex" flexDirection="row" justifyContent="center" >
                                                        {isClientElan && <img src={require('~/assets/images/elan-logo-1.jpg')} alt=""/>}
                                                    </Box>
                                                    <Box p={2} mb={3} display="flex" flexDirection="row" justifyContent="center" >
                                            {selectedPaymentMethod === 2 ? <img src={require('~/assets/images/ac-img.jpg')} alt=""/> :<img src={require('~/assets/images/zelle-icon.png')} alt=""/>} 
                                                    </Box>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }

    renderSnackbar = message => {
        return <Notification variant="error" message={message} />
    }
}

export default connect(state => ({ ...state.user, ...state.manageAccount, ...state.clientConfig }))(PaymentPreferenceListView);