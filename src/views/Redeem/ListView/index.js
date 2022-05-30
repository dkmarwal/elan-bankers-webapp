import React, { Component, Fragment } from "react";
import _ from 'lodash'
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { AlertDialog, ConfirmDialog } from '~/components/Dialogs'
import { Box, Paper, Grid, Container, Button, Avatar, Typography, Dialog, Radio, RadioGroup, FormHelperText, FormControl, FormLabel, IconButton, CircularProgress, TextField } from "@material-ui/core";
import { Brightness1 } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
//import Brightness1 from "@bit/mui-org.material-ui-icons.brightness1";
import { borders, spacing } from '@material-ui/system';
import redeem from '~/redux/reducers/redeem';
import { connect } from 'react-redux';
import { fetchRewardsList, redeemRewards } from '~/redux/actions/redeem';
import { checkW9Resubmit } from '~/redux/actions/taxation';
import { checkW9FormExistance, downloadSSNPDF } from "~/redux/helpers/redeem";
import { checkSSNExistance, mergeProfile } from "~/redux/actions/redeem";
import { GetPaymentMethods } from "~/redux/helpers/paymentmethod";
import { updateAccount } from "~/redux/actions/manage-account";
import moment from 'moment'
import { maskedAccountNumber } from '~/redux/helpers/maskedaccountnumber';
import currency from 'currency.js';
import { getColorCodeByClientCode } from "~/services/config/index";
import Cookies from "universal-cookie";
import "./styles.scss"
import CurrencyInput from '~/components/CurrencyInput';
//import { getClientInfoFromConfig } from '~/config/clients';

const cookies = new Cookies(window.document.cookie);
const defaultProps = {
    //bgcolor: '#9bafbd',
    //borderColor: 'text.primary',
    m: 1,
    //border: 5,
    style: { width: '35.5rem', height: '0.5rem' },
}
// const bgBr = {

// }

class RedeemListView extends Component {

    constructor(props) {
        super(props);
        this.ssn1 = React.createRef();
        this.ssn2 = React.createRef();
        this.ssn3 = React.createRef();
    }
    state = {
        ssn: { one: "", two: "", three: "", value: "" },
        isLoading: true,
        open: false,
        redeemed: false,
        totalRewards: 0,
        maTotalReward: 0,
        rewardList: [],
        maskedNumber: null,
        errorDialog: false,
        btnDisabled: false,
        paymentMethods: [],
        selectedPaymentId: null,
        defaultPaymentId: null,
        isZelle: false,
        isW9Exist: 0,
        openW9ExistAlert: false,
        openSSNAlert: false,
        openResubmitPopup: false,
        openMergeW9Form: false,
        oeids: "",
        fromW9Form: false,
        openEnrollmentPopup: false,
        openPaymentFailedPopup: false,
        showMergeSuccessPopup: false,
        processingDownload: false,
        clientInfo: null,
    }

    handleClickOpen = () => {
        const { isW9Exist } = this.state;

        //if w9 form not exist show Alert to fill w9 form with continue button
        if (isW9Exist == 0) {
            this._openSSNAlert();
        } else {
            //open payment selection popup
            this.setState({
                open: true
            })
        }
    }

    _openW9ExistAlert = () => {
        this.setState({ openW9ExistAlert: true });
    }

    _openMergeW9Form = () => {
        this.setState({ openMergeW9Form: true, openSSNAlert: false })
    }

    _closeMergeW9Form = () => {
        this.setState({ openMergeW9Form: false })
    }

    _openResubmitPopup = () => {
        this.setState({ openResubmitPopup: true })
    }

    _closeResubmitPopup = () => {
        this.setState({ openResubmitPopup: false })
    }

    _openSSNAlert = () => {
        this.setState({ openSSNAlert: true, openW9ExistAlert: false, ssn: { one: "", two: "", three: "", value: "" } });
    }

    _closeSSNAlert = () => {
        this.setState({ openSSNAlert: false });
    }

    _closeW9AlertAlert = () => {
        this.setState({ openW9ExistAlert: false });
    }

    _openEnrolmentPopup = () => {
        this.setState({ openEnrollmentPopup: true })
    }

    _closeEnrolmentPopup = () => {
        this.setState({ openEnrollmentPopup: false })
    }

    _openPaymentFailedPopup() {
        this.setState({ openPaymentFailedPopup: true })
    }

    _closePaymentFailedPopup() {
        this.setState({ openPaymentFailedPopup: false })
    }

    handleClickClose = () => {
        this.setState({
            open: false
        })
    }

    handleClose = () => {
        this.setState({
            open: false,
            redeemed: true
        })
    }

    closeRedeemed = () => {
        this.setState({
            btnDisabled: true,
            redeemed: false
        })
    }

    handleError = () => {
        this.setState({ errorDialog: true })
    }

    handlePaymentMethodsChange = (paymentMethodId) => {
        this.setState({ defaultPaymentId: paymentMethodId });
    }

    handleClickRedeem = () => {
        const { defaultPaymentId } = this.state;
        this.setState({ btnDisabled: true }, () => {
            console.log(this.props, this.state);
            if (this.state.selectedPaymentId === 3 || defaultPaymentId === 3) {
                this.checkAliasEnrollment().then((response) => {
                    if (response) {
                        if (response.Data.responseCode === 1) {
                            this._openEnrolmentPopup(); // processing                    
                        } else {
                            //process payment
                            this.initiateRedeem();
                        }
                    } else {
                        this.handleError();
                    }
                })
            } else {
                this.initiateRedeem();
            }
        })
    }

    initiateRedeem() {
        const { defaultPaymentId } = this.state;
        const { accessToken, portbu, oeid } = this.props.user.info;
        console.log("ttk masked", this.state.maskedNumber);
        if (!this.state.maskedNumber) {
            return false;
        }
        //const rewardIds = this.props.redeem.list.map(item => item.RewardId);
        const rewardIds = this.props.redeem.list.filter(item => item.IsExpired ==0).map(item => item.RewardId);
        this.props.dispatch(redeemRewards({ rewardIds: rewardIds.join(), accessToken, paymentMethodId: defaultPaymentId })).then(response => {
            if (!response) this.handleError();
            const totalReward = this.props.redeem.list ? (this.props.redeem.list[0] ? this.props.redeem.list[0].TotalRewards : 0) : 0;
            this.setState({
                open: false,
                redeemed: true,
                btnDisabled: false,
                totalRewards: totalReward,
            })
        }).catch(err => {
            this.handleError();
        })
    }

    handleResubmit = () => {
        this._closeResubmitPopup();
        this.props.history.push('/manage-account', { selectW9Form: true });
    }

    _checkSSNExistance = () => {
        const { accessToken, portbu, oeid } = this.props.user.info;
        const { ssn, totalRewards } = this.state;

        if (ssn.value.length == 9) {
            this.props.dispatch(checkSSNExistance({ PBU: portbu, OEID: oeid, SSN: ssn.value, accessToken })).then((response) => {
                if (!response) {
                    this.setState({ errorDialog: true, openSSNAlert: false, }) // error handling
                    return false;
                }
                const { SSNData } = this.props.redeem;
                if (SSNData) {
                    //SSN Exists
                    this.setState({ openSSNAlert: false, oeids: SSNData.OEID || "" }, () => {
                        //show merge popup with OEIDs received in response.
                        this._openMergeW9Form();
                        // if selected merge -> call merge API and show success message. --> then show redeem popup with payment methods.
                    })
                } else {
                    //SSN Does not Exist
                    // console.warn("ssn",ssn)
                    this.props.history.push('/manage-account', { fromSSNModal: true, totalRewards: totalRewards,ssn:ssn });
                }
            })
        }
    }

    _mergeProfile = () => {
        const { accessToken, portbu, oeid } = this.props.user.info;
        const { ssn } = this.state;
        this.props.dispatch(mergeProfile({ PBU: portbu, OEID: oeid, SSN: ssn.value, accessToken })).then((response => {
            if (!response) {
                this.setState({ error: this.props.redeem.error }, () => {
                    this._closeMergeW9Form();
                })
                return false;
            }
            this.openMergeProfileSuccess();
            //call to check w9form exist or not again
            this.checkW9FormExist();
        }))
    }


    getRandomColor = (reward) => {
        //const color1 = Math.floor(Math.random() * 256);
        //const color2 = Math.floor(Math.random() * 256);
        //const color3 = Math.floor(Math.random() * 256);
        //const circleColor = "rgba(" + color1 + "," + color2 + "," + color3 + ", 0.5 )";
        let circleColor = "rgba(95,209,99, 0.5 )";
        const amount = currency(reward.Rewards).value;
        if (amount > 100 && amount < 201) {
            circleColor = "rgba(235,17,36, 0.5 )";
        } else if (amount > 200 && amount < 301) {
            circleColor = "rgba( 255, 195, 0 , 0.5 )";
        } else if (amount > 300 && amount < 401) {
            circleColor = "rgba(22,233,218, 0.5 )";
        } else if (amount > 400 && amount < 501) {
            circleColor = "rgba(152,160,196, 0.5 )";
        } else if (amount > 500 && amount < 601) {
            circleColor = "rgba(111,243,4, 0.5 )";
        } else if (amount > 600 && amount < 701) {
            circleColor = "rgba(164,11,239, 0.5 )";
        } else if (amount > 700 && amount < 801) {
            circleColor = "rgba(96,77,77, 0.5 )";
        } else if (amount > 800 && amount < 901) {
            circleColor = "rgba(211, 64, 173, 0.5 )";
        } else if (amount > 900 && amount < 1001) {
            circleColor = "rgba( 211, 211, 64 , 0.5 )";
        } else if (amount > 1000 && amount < 2001) {
            circleColor = "rgba(87,83,22, 0.5 )";
        } else if (amount > 2000 && amount < 3001) {
            circleColor = "rgba(218, 247, 166 , 0.5 )";
        } else if (amount > 3000 && amount < 4001) {
            circleColor = "rgba(211, 97, 64 , 0.5 )";
        } else if (amount > 4000 && amount < 5001) {
            circleColor = "rgba(255, 255, 51, 0.5 )";
        } else if (amount > 5000) {
            circleColor = "rgba( 0, 106, 117 , 0.5 )";
        }

        //console.log(amount)
        return circleColor;
    }

    checkW9FormExist = () => {
        const { accessToken, portbu, oeid } = this.props.user.info;
        checkW9FormExistance({ PBU: portbu, OEID: oeid, accessToken }).then((response) => {
            console.log("checkW9FormExistance", response)
            if (!response.error) {
                console.log("inner", (response && response.Data && response.Data.IsExists) ? response.Data.IsExists : 0);
                this.setState({
                    isW9Exist: (response && response.Data && response.Data.IsExists) ? response.Data.IsExists : 0
                });
            }
            if (!response) this.handleError();
        })
    }

    componentDidMount = () => {
        const { accessToken, portbu, oeid, client } = this.props.user.info;
        const paymentMethodId = this.props.match.params.paymentMethodId;

        const prevPage = this.props.location.state && this.props.location.state.fromManageAccount;
        const fromW9Form = this.props.location.state && this.props.location.state.fromW9Form;
        console.log(fromW9Form)
        const maTotalReward = this.props.location.state && this.props.location.state.totalReward;
        const isZelle = this.props.location.state && this.props.location.state.isZelle;
        //Show success pop only first time after redeem from manage account
        this.props.history.replace('/redeem');

        this.props.dispatch(checkW9Resubmit({ pbu: portbu, oeid: oeid })).then((response) => {
            if (response && !isZelle && !prevPage && !fromW9Form) {
                this._openResubmitPopup();
            }
        });

        this.props.dispatch(fetchRewardsList({ accessToken, portbu, oeid })).then((res) => {
            //check w9 form exists
            checkW9FormExistance({ PBU: portbu, OEID: oeid, accessToken }).then((response) => {
                console.log("checkW9FormExistance", response)
                if (!response.error) {
                    console.log("inner", (response && response.Data && response.Data.IsExists) ? response.Data.IsExists : 0);
                    this.setState({
                        isW9Exist: (response && response.Data && response.Data.IsExists) ? response.Data.IsExists : 0
                    });
                    const totalReward = this.props.redeem.list ? (this.props.redeem.list[0] ? this.props.redeem.list[0].TotalRewards : 0) : 0;
                    this.setState({
                        isLoading: false,
                        isZelle,
                        totalRewards: totalReward,
                        maTotalReward: maTotalReward ? maTotalReward : totalReward,
                        redeemed: (prevPage && !totalReward) ? true : false,
                        fromW9Form
                    });
                }
            })
            if (!res) this.handleError();
        }).catch(err => {
            this.handleError();
        })

        maskedAccountNumber({ accessToken, portbu, oeid }).then(maskedNumber => {
            this.setState({
                maskedNumber: maskedNumber && maskedNumber.Data
            }, () => {
                const { maskedNumber } = this.state;
                console.log("276", this.state.maskedNumber);
                let defaultPaymentId = maskedNumber && maskedNumber.filter(m => m.default === 1) && maskedNumber.filter(m => m.default === 1)[0] && maskedNumber.filter(m => m.default === 1)[0].paymentTypeId || 2;
                this.setState({ defaultPaymentId: defaultPaymentId })
            })
        }).catch(err => {
            this.handleError();
        })

        const { configs } = this.props.clientConfig;
        //const lblOeid = getColorCodeByClientCode(configs, "C00020");
        //const lblSsnOeid = getColorCodeByClientCode(configs, "C00021");
        const lblOeid = "OEID";
        const lblSsnOeid = "Officer/Employee Identification (OEID)";
        this.setState({ clientInfo: { lblSSNOEID: lblSsnOeid, lblOEID: lblOeid } });
    }

    renderRewardItem = reward => {
        const bgColor = this.getRandomColor(reward);
        const { configs } = this.props.clientConfig;
        let canPromotionExpire = getColorCodeByClientCode(configs, "C00002") === "Y";

        return (
            <Grid key={reward.RewardId} item xs={4} md={4} lg={4} >
                <Paper className={`${reward && reward.IsExpired === 1 && 'disabled'} reward-item`}>
                    <Grid container>
                        <Grid item md={2}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="12" cy="12" r="10" fill={bgColor} />
                            </svg>
                        </Grid>
                        <Grid item md={10}>
                            <h1 className="MuiTypography-alignLeft" style={{ marginTop: '0px', fontSize: '18px' }}>{currency(reward.Rewards, { formatWithSymbol: true }).format()}
                                {reward && reward.IsExpired === 1 &&
                                    <Box component="span" textAlign="right" style={{ float: 'right', marginTop: '0px', fontSize: '18px' }}>Expired</Box>
                                }
                            </h1>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md={12}>
                            <Typography className="MuiTypography-alignLeft" style={{ fontSize: 14 }}>
                                {reward.PromotionName}
                            </Typography>
                            <Typography className="MuiTypography-alignLeft">
                                Fulfilment Date: {reward.FulfillmentDate ? moment.utc(reward.FulfillmentDate).local().format("MM/DD/YYYY") : ""}{canPromotionExpire && `; ${moment.utc(reward.ExpirationDate).local().format("MM/DD/YYYY")}`}
                            </Typography>
                        </Grid>
                        <Grid container>
                            <Grid item md={3}></Grid>
                            <Grid item md={9}>
                                <Box display="flex" justifyContent="center">
                                    <Box borderRadius={16} bgcolor={bgColor}{...defaultProps} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        )
    }

    handleSSNChange = (event, position) => {
        const { ssn } = this.state;
        const newValue = event.target.value.trim();

        if (isNaN(event.target.value)) {
            return false;
        }

        const tempSSN = newValue.split("");
        switch (position) {
            case 1:
                ssn.one = newValue || "";
                tempSSN.length === 3 && this.ssn2.current.focus();
                break;
            case 2:
                ssn.two = newValue || "";
                tempSSN.length === 2 && this.ssn3.current.focus();
                break;
            case 3:
                ssn.three = newValue || "";
                break;
        }

        const ssnValue = [...ssn.one, ...ssn.two, ...ssn.three];
        const newSSN = { one: ssn.one, two: ssn.two, three: ssn.three, value: ssnValue.join("") }

        this.setState({ ssn: newSSN });
    }

    checkAliasEnrollment() {
        console.log(this.state, this.props);
        const { maskedNumber } = this.state;
        let ZelleDetails = maskedNumber.filter(q => q.paymentTypeId === 3)[0];
        let BankAccountDetails = maskedNumber.filter(q => q.paymentTypeId === 2)[0];
        const { accessToken, portbu, oeid } = this.props.user.info;
        // const { details } = this.props;
        // const { zelleToken } = this.state;
        // const { email, phoneNumber, defaultPaymentMethod } = this.state;

        // let phone = zelleToken === 0 && phoneNumber.replace(
        return this.props.dispatch(updateAccount({
            accessToken: accessToken,
            lRoutingNumber: BankAccountDetails && BankAccountDetails.routing_no || "",
            lAccountNumber: BankAccountDetails && BankAccountDetails.account_no || "",
            lConfirmAccountNumber: ZelleDetails && ZelleDetails.confirm_acc_no || "",
            lAccountType: ZelleDetails && ZelleDetails.account_type,
            lClientID: 1,
            lStatus: 1,
            oeid: oeid,
            portbu: portbu,
            lEmail: ZelleDetails && ZelleDetails.Email || "",
            lMobile: ZelleDetails && ZelleDetails.Mobile || "",
            lZelleToken: ZelleDetails && ZelleDetails.ZelleToken,
            lPaymentMethodId: this.state.defaultPaymentId || 0,
            lSelectedPaymentId: this.state.defaultPaymentId || 0
        }));
    }

    handleDownload = () => {
        this.setState({
            processingDownload: true
        }, () => {
            downloadSSNPDF().then((response) => {
                if (!response.error) {
                    //window.location.href= response.data
                    let link = document.createElement("a");
                    link.download = "";
                    link.target = "_blank";
                    link.href = response.data;
                    link.click();
                }
                this.setState({ processingDownload: false });
            }).catch(error => {
                this.setState({ processingDownload: false });
            })

        });
    }

    returnSSNalert = () => {
        const { ssn, processingDownload, clientInfo } = this.state;
        const isClientELAN = cookies.get("client") === "elan";
        const isClientBMW = cookies.get("client") === "bmw";
        const isClientACG = cookies.get("client") === "acg";
        const clientTitle = isClientELAN ? "ELAN" : isClientBMW ? "BMW" : isClientACG && "ACG";
        return (<AlertDialog dialogClassName="ssn-box" onClose={() => this._closeSSNAlert()} clickOutsideToClose={false} success={false} title={""} confirmText="Continue" px={10} py={4} btnDisabled={ssn.value.length != 9} onConfirm={() => this._checkSSNExistance()} >
            <Box display="inline-flex" flexDirection="column" justifyContent="center">
                <div className="alert-dialog-title">Note</div>
                <div className="content">
                    {`${clientTitle} requires IRS Form W-9 on an annual basis. The CA$H IN system does not have record of a 2021 W-9 tied to this ${clientInfo && clientInfo.lblSSNOEID} . To redeem your rewards, please continue and complete IRS Form W-9.`}
                    <div className="content" style={{ marginTop: "6px", fontWeight: "bold" }}>To begin Form W-9, please enter your Social Security Number.</div>
                    <div className="SSNinputWrapper" style={{ display: "block", textAlign: "center" }} flexDirection="column" justifyContent="center">
                        {/* <SSNInput /> */}
                        <Grid container justify="center">
                            <Grid item xs={12} md={4}>
                                <Box mx={1}>
                                    <TextField
                                        fullWidth={true}
                                        autoComplete="off"
                                        variant="outlined"
                                        value={ssn.one || ""}
                                        placeholder={"###"}
                                        inputProps={{
                                            ref: this.ssn1,
                                            maxLength: 3
                                        }}
                                        onChange={(e) => { this.handleSSNChange(e, 1) }}
                                        type="password"
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Box mx={1}>
                                    <TextField
                                        fullWidth={true}
                                        autoComplete="off"
                                        variant="outlined"
                                        value={ssn.two || ""}
                                        placeholder={"##"}
                                        inputProps={{
                                            ref: this.ssn2,
                                            maxLength: 2
                                        }}
                                        onChange={(e) => { this.handleSSNChange(e, 2) }}
                                        type="password"
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box mx={1}>
                                    <TextField
                                        fullWidth={true}
                                        autoComplete="off"
                                        variant="outlined"
                                        inputProps={{
                                            ref: this.ssn3,
                                            maxLength: 4
                                        }}
                                        value={ssn.three || ""}
                                        placeholder={"####"}
                                        onChange={(e) => { this.handleSSNChange(e, 3) }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={11}>
                                <Link to="#" onClick={() => this.handleDownload()} className="alert-dialog-link">Why am I seeing this?</Link>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Box>
        </AlertDialog>)
    }

    returnResubmitPopup = (title, message) => {
        return (<AlertDialog title={title} message={message} confirmText={"Continue"} onConfirm={() => this.handleResubmit()} onClose={() => this._closeResubmitPopup()} />)
    }

    returnW9Alert = (title, message) => {
        return (<AlertDialog title={title} message={message} confirmText={"Continue"} onConfirm={() => this._openSSNAlert()} onClose={() => this._closeW9AlertAlert()} />)
    }

    returnEnrollmentPopup = (title, message) => {
        return (<AlertDialog onClose={() => this._closeEnrolmentPopup()} title={""} message={""} confirmText="Dismiss" onConfirm={() => this._closeEnrolmentPopup()}>
            <div>
                <Box className="popup-title">Sorry!</Box>
                <p>The email address or Phone number entered is not enrolled with the Zelle® network.</p>
                <p>Click on the below Zelle® link to enroll and re-enter the information to complete the setup. You can also choose to setup Bank account to receive the payment.</p>
                <a href="#" onClick={(e) => { e.preventDefault(); window.open("https://www.clearxchange.com/receive/", '_blank'); }}>https://www.clearxchange.com/receive/</a>
            </div>
        </AlertDialog>)
    }

    returnPaymentFailedPopup(title, message) {
        return (<AlertDialog title={title} message={message} confirmText={"Continue"} onConfirm={() => { }} onClose={() => { }} />)
    }

    returnMergePopup = (title, message) => {
        return (<AlertDialog
            title={title}
            message={message}
            showCancelBtn={true}
            clickOutsideToClose={() => this._closeMergeW9Form()}
            outsideClick={true}
            success={true}
            confirmText={"Confirm"}
            onConfirm={() => this._mergeProfile()}
        />)
    }

    hideAlertMessage = () => {
        this.setState({
            showMergeSuccessPopup: false,
        })
    }

    openMergeProfileSuccess = () => {
        this.setState({ openMergeW9Form: false, showMergeSuccessPopup: true })
    }

    closeMergeProfileSuccess = () => {
        this.setState({ showMergeSuccessPopup: true })
    }

    render() {
        const { clientInfo, processingDownload, isLoading, open, redeemed, rewardList, totalRewards, maTotalReward, errorDialog, btnDisabled, paymentMethods, maskedNumber, defaultPaymentId, isZelle, openW9Alert, openSSNAlert, openW9ExistAlert, openMergeW9Form, oeids, openResubmitPopup, fromW9Form, openEnrollmentPopup, openPaymentFailedPopup, showMergeSuccessPopup, selectedPaymentId } = this.state;
        const { redeem } = this.props;
        const { portbu, oeid } = this.props.user.info;
        const { configs } = this.props.clientConfig;
        console.log(this.props);
        let buttonPrimaryColor = getColorCodeByClientCode(configs, "C00015");
        let buttonSecondaryColor = getColorCodeByClientCode(configs, "C00019");
        let buttonDisabledColor = getColorCodeByClientCode(configs, "C00016");
        console.log(buttonPrimaryColor)
        let isRedeemDisabled = maskedNumber && maskedNumber.length > 0 && (defaultPaymentId !== null) ? false : true;
        if (isLoading) {
            return <Box display="flex" p={10} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
        }
        return (
            <Box id="redeem-list-view">
                <Paper className="redeem-item-container">
                    <Grid className="redeem-item-header" container display="flex" flexDirection="row" justify="center" alignItems="center">
                        <Grid item xs={4} md={4} lg={4}>
                            <Box display="flex" flexDirection="row" width="100%">
                                <Grid item md={2}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="50"
                                        height="50"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle cx="12" cy="12" r="10" fill="#286787" />
                                    </svg>
                                </Grid>
                                <Grid item xs={9} md={9} lg={9} className="MuiTypography-alignLeft">
                                    <h2 style={{ fontSize: 16 }}>Total Earned</h2>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={8} md={8} lg={8}>
                            <Grid container justify="flex-end">
                                <Grid item xs={9} md={9} lg={9} className="MuiTypography-alignRight">
                                    <h1 style={{ marginTop: '5px', fontSize: 20 }}> {currency(totalRewards, { formatWithSymbol: true }).format()}</h1>
                                </Grid>
                                <Grid item xs={3} md={3} lg={3} className="MuiTypography-alignRight">
                                    <Button
                                        variant="contained"
                                        disabled={!totalRewards}
                                        style={!totalRewards ?
                                            {
                                                //backgroundColor: buttonDisabledColor,
                                                backgroundColor: 'rgba(0, 0, 0, 0.12)',
                                                opacity: 0.9
                                            } :
                                            {
                                                backgroundColor: `${buttonPrimaryColor}`,
                                                color: "white",
                                                borderRadius: "0"
                                            }}
                                        onClick={() => this.handleClickOpen()}
                                    >
                                        Redeem
                                    </Button>
                                </Grid>
                                <Box display="flex" justifyContent="center">
                                    <Box borderRadius={16} bgcolor='#9bafbd' {...defaultProps} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className="reward-item-container" container display="flex" alignItems="flex-start" spacing={2}>
                        {redeem.list.length ? redeem.list.map(item => this.renderRewardItem(item)) : null}
                    </Grid>
                </Paper>
                {(open || fromW9Form) && (
                    <AlertDialog clickOutsideToClose={false} redeemDisabled={isRedeemDisabled} title="Redeem Your Reward" show={this.state.maskedNumber} confirmText="Redeem" px={10} py={4} onConfirm={() => this.handleClickRedeem()} onClose={() => this.handleClickClose()} btnDisabled={btnDisabled}>
                        <Box display="flex" flexDirection="column" justifyContent="center">
                            <Box className="redeem-amount">{currency(totalRewards, { formatWithSymbol: true }).format()}</Box>
                            {this.state.maskedNumber ?
                                (<Fragment><Box className="redeem-message">I would like rewards to be deposited in</Box>
                                    {maskedNumber && maskedNumber.map(paymentMethod =>
                                        <Box className="redeem-message-radio disabled">
                                            <label >
                                                <Radio color="black" value={paymentMethod.paymentMethodName} checked={paymentMethod.paymentTypeId === defaultPaymentId} id={paymentMethod.paymentTypeId} name="method" onChange={() => this.handlePaymentMethodsChange(paymentMethod.paymentTypeId)} />
                                                {paymentMethod.paymentTypeId === 2 ? `${paymentMethod.paymentMethodName} ${paymentMethod.masked_AccountNumber}` : <img style={{ height: "22px", width: "85px", objectFit: "cover" }} src={require('~/assets/images/zelle-icon-registered.jpg')} />}
                                            </label>
                                        </Box>
                                    )}
                                </Fragment>
                                )
                                :
                                <Box className="redeem-message success">To Redeem your Rewards you must first setup your account details. </Box>
                            }
                            <Link to={{ pathname: "/manage-account", state: { fromRedeem: true, rewardsList: this.props.redeem.list } }} className="alert-dialog-link">Manage Account</Link>
                        </Box>
                    </AlertDialog>
                )}
                {redeemed && (
                    <AlertDialog clickOutsideToClose={false} success={true} title="" confirmText="Continue" px={10} py={4} onConfirm={this.closeRedeemed} btnDisabled={btnDisabled}>
                        <Box display="flex" flexDirection="column" justifyContent="center">
                            <Box className="redeem-amount">{currency(maTotalReward, { formatWithSymbol: true }).format()}</Box>
                            <Box className="redeem-message" color="primary.main" fontWeight={500}>Was successfully Submitted</Box>
                            <Box className="redeem-message success" color="primary.main">{isZelle || defaultPaymentId === 3 ? `You should receive your funds in few minutes.` : `We're sending deposits to your bank account. This usually takes 2-3 business days. You can log back into CA$HIN and verify the transaction.`}</Box>
                            <Link to="/payments" className="alert-dialog-link">Track your Payments</Link>
                        </Box>
                    </AlertDialog>
                )}
                {errorDialog && <AlertDialog title={"OOPS!"} message={"Something went wrong, We're working on getting this fixed as soon as we can."} onConfirm={() => { this.setState({ errorDialog: false }) }} />}
                {openW9ExistAlert && this.returnW9Alert("Alert!", "To Redeem your Rewards you must first fill out a W9 form.")}
                {openSSNAlert && this.returnSSNalert()}
                {openResubmitPopup && this.returnResubmitPopup("", "Please verify that the information provided in your W-9 is still accurate. Click “Continue” below to complete the verification. You must complete the verification in order to redeem any available rewards.")}
                {openMergeW9Form && this.returnMergePopup(`Your W9 Form already exists with the ${clientInfo && clientInfo.lblOEID} ${oeids}`, `You do not need to submit another W9 form and your profile of ${clientInfo && clientInfo.lblOEID} ${oeid} and ${oeids} will be merged from here on. For any questions/concerns reach out to support contact.`)}
                {openEnrollmentPopup && this.returnEnrollmentPopup("", "Enrolment not done")}
                {openPaymentFailedPopup && this.returnPaymentFailedPopup("", "Payment Failed")}
                {showMergeSuccessPopup && this.renderAlertMessage('', `Your profile have been merged successfully.`)}
            </Box>
        )
    }

    renderAlertMessage = (title, message) => {
        return <AlertDialog success={true} title={title} message={message} onConfirm={() => this.hideAlertMessage()} />
    }
}

export default connect(state => (
    { ...state.user, ...state.redeem, ...state.clientConfig }
))(RedeemListView);