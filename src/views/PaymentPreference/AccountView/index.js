import React, { Component, Fragment } from 'react'
import { MenuItem, Link, Select, Box, Paper, Grid, Container, OutlinedInput, TextField, InputAdornment, Fab, Button, Dialog, DialogActions, DialogContent, CircularProgress, FormControlLabel, Radio } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle'
import { connect } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import DateRangeIcon from '@material-ui/icons/DateRange'
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp'
import DatePicker from "react-datepicker"
import moment from 'moment'
import Notification from '~/components/Notification'
import { fetchAccountDetails, deleteAccount, updateAccount, fetchAccountTypes } from '~/redux/actions/manage-account';
import { redeemRewards } from '~/redux/actions/redeem';
import { ConfirmDialog, AlertDialog } from '~/components/Dialogs'

import "react-datepicker/dist/react-datepicker.css";
import './styles.scss'
import MaskInput from '../../../components/MaskInput';
import { getColorCodeByClientCode } from "~/services/config/index";


class PaymentPreferenceUpdateView extends Component {
    state = {
        isLoading: false,
        showUpdatedAccount: false,
        accountUpdateProgress: false,
        accountDeleteProgress: false,
        alertMessage: null,
        alertMessageCallbackType: null,
        paymentDetails: null,
        errors: [],
        errorDialog: false,
        defaultPaymentMethod: null,
        rewardsList: []
    }

    handleError() {
        this.setState({ errorDialog: true });
    }

    setDefaultPaymentMethod() {
        this.setState({ defaultPaymentMethod: 2 });
    }

    componentDidMount() {
        //const pbuID = 19999;
        //const oeID  = 37251;
        const { accessToken, portbu, oeid } = this.props.user.info;
        this.setState({
            isLoading: true
        }, () => {
            this.props.dispatch(fetchAccountDetails({ accessToken, portbu, oeid, selectedPaymentId: 2 })).then((res) => {
                console.log(res);
                if (!res) {
                    this.handleError();
                }
            const { details } = this.props;
            this.setState({ defaultPaymentMethod: details && details.paymentMethodId });
            this.reset();
            })
            this.props.dispatch(fetchAccountTypes(accessToken));
        })
    }

    reset() {
        this.setState({
            isLoading: false,
            paymentDetails: {
                ...this.props.details,
                acc_no: this.props && this.props.details && this.props.details.acc_no && this.props.details.acc_no.toString(),
                routing_no: this.props && this.props.details && this.props.details.routing_no && this.props.details.routing_no.toString(),
                confirm_acc_no: this.props && this.props.details && this.props.details.confirm_acc_no && this.props.details.confirm_acc_no.toString(),
            },
            defaultPaymentMethod: this.props && this.props.details && this.props.details && this.props.details.paymentMethodId,
            errors: [],
        });
    }

    preventCCP = e => {
        e.preventDefault();
        return false;
    }

    validatePayment = paymentDetails => {
        let errors = [];
        //if (!paymentDetails) {
        //  errors.push('All fields are required.');
        //return errors;
        //}
        console.log(paymentDetails.routing_no);
        if (paymentDetails.routing_no === undefined || !paymentDetails.routing_no || paymentDetails.routing_no.toString().trim() === '') {
            errors.push('Routing Number is required.');
        } else if (paymentDetails.routing_no !== undefined && paymentDetails.routing_no.toString().trim().length != 9) {
            errors.push('Routing number should be of length nine.');
        }

        if (paymentDetails.acc_no === undefined || !paymentDetails.acc_no || paymentDetails.acc_no.toString().trim() === '') {
            errors.push('Account Number is required.');
        } else if (paymentDetails.acc_no !== undefined && paymentDetails.acc_no.toString().trim().length > 17) {
            errors.push('Account number should be less than eighteen character.');
        }

        if (paymentDetails.confirm_acc_no === undefined || !paymentDetails.confirm_acc_no || paymentDetails.confirm_acc_no.toString().trim() === '') {
            errors.push('Confirmation Account Number is required.');
        } else if (paymentDetails.confirm_acc_no !== paymentDetails.acc_no) {
            errors.push('Account Number is not matching with Confirm Account number.');
        }

        if ((paymentDetails.routing_no == paymentDetails.acc_no) && (paymentDetails.acc_no && paymentDetails.routing_no && paymentDetails.routing_no.toString().trim() != '' && paymentDetails.acc_no.toString().trim() != '')) {
            errors.push('The bank account information you provided was incorrect. Please reenter your bank account routing and account number, or refer to the illustration of check below to identify the account number and routing number in your check.');
        }

        if (!paymentDetails.acc_type || paymentDetails.acc_type.toString().trim() === '') {
            errors.push('Account Type is required.');
        }

        return errors;
    }

    handleAccountEdit = (e) => {
        if (!this.props.details) {
            e.preventDefault();
            return false;
        }
        this.setState({
            showUpdatedAccount: true
        });
    }

    handleAccountUpdateCancel = () => {
        this.setState({
            errors: [],
            paymentDetails: this.props.details,
            defaultPaymentMethod: this.props.details.paymentMethodId,
            showUpdatedAccount: false,
        });
    }

    onConfirmRedeem = () => {
        //call redeem API
        const { accessToken, portbu, oeid } = this.props.user.info;
        const rewardIds = this.state.rewardsList.filter(item => item.IsExpired === 0).map(item => item.RewardId);
        const totalReward = this.props.redeem.list ? (this.props.redeem.list[0] ? this.props.redeem.list[0].TotalRewards : 0) : 0;

        this.props.dispatch(redeemRewards({ rewardIds: rewardIds.join(), accessToken, paymentMethodId: 2 })).then(response => {
            this.setState({ showConfirmRedeemDialog: false })
            if (!response) {
                this.handleError();
                return false;
            }

            this.props.history.push('/redeem', { fromManageAccount: true, totalReward: totalReward });
        }).catch(err => {
            this.handleError();
        })

    }
    onCancelRedeem = () => {
        this.props.history.push('/redeem')
    }

    handleAccountUpdate = (e) => {
        this.processUpdate();
    }

    processUpdate = () => {
        console.log(this.props);
        const { accessToken, portbu, oeid } = this.props.user.info;
        this.setState({
            accountUpdateProgress: true
        }, async () => {
            //validation here
            const { paymentDetails, defaultPaymentMethod } = this.state;
            const errors = this.validatePayment(paymentDetails);
            if (errors.length) {
                this.setState({
                    errors,
                    accountUpdateProgress: false,
                })
            } else {
                const { zelleDetails } = this.props;
                this.setState({
                    errors,
                })
                console.log(this.props);
                //Send Api request accessToken, portbu, paymentDetails: details, lEmail: email, lMobile: phoneNumber, lZelleToken: zelleToken, lPaymentMethodId : 3  
                await this.props.dispatch(updateAccount({ accessToken, portbu, oeid, lPaymentMethodId: defaultPaymentMethod , paymentDetails, lSelectedPaymentId: 2, lEmail: zelleDetails && zelleDetails.email, lMobile: zelleDetails && zelleDetails.mobile, lZelleToken: zelleDetails && zelleDetails.zelleToken }));
                if (!this.props.error) {
                    this.props.dispatch(fetchAccountDetails({ accessToken, portbu, oeid, selectedPaymentId: 2 })).then((res) => {
                    if(res) {
                        this.reset();
                    }
                    //check for new account
                    if (!this.state.showUpdatedAccount) {
                        //Show confirmation box to redeem rewards and close loader
                        //const preferenceId = this.props.match.params.preferenceId;
                  
                        const prevPage = this.props.location.state && this.props.location.state.fromRedeem;
                        const rewardsList = this.props.location.state && this.props.location.state.rewardsList;
                        if (prevPage) {
                            this.setState({
                                showConfirmRedeemDialog: true,
                                accountUpdateProgress: false,
                                rewardsList
                            });
                        } else {
                            this.setState({
                                accountUpdateProgress: false,
                                alertMessage: 'Your Bank Account was successfully setup!',
                                alertMessageCallbackType: 'REDIRECT',
                                rewardsList
                            });
                        }
                    } else {
                        this.setState({
                            accountUpdateProgress: false,
                            alertMessage: 'Your Bank Account was successfully Updated!',
                            alertMessageCallbackType: 'REDIRECT'
                        });
                    }
                })
                } else {
                    this.handleError();
                    this.setState({
                        showUpdatedAccount: true,
                        errorMessage: true,
                        alertMessageCallbackType: 'REDIRECT',
                        accountUpdateProgress: false,
                    });
                }
            }
        });
    }

    goBack = () => {
        //window.location.reload(false);
        this.hideAlertMessage();
    }

    hideAlertMessage = () => {
        this.setState({
            alertMessage: null,
            alertMessageCallbackType: null,
            showUpdatedAccount: false,
            errorMessage: false,
        });
    }

    onConfirmDelete = () => {
        this.processDelete()
    }
    onCancelDelete = () => {
        this.setState({
            showConfirmDeleteDialog: false,
        })
    }

    handleChangeAccountType = (e) => {
        this.setState({
            paymentDetails: {
                ...this.state.paymentDetails,
                acc_type: e.target.value
            }
        })
    }

    handleAccountDelete = (e) => {
        if (!this.props.details) {
            e.preventDefault();
            return false;
        }
        this.setState({
            showConfirmDeleteDialog: true,
        })
    }

    processDelete = () => {
        const { accessToken, portbu, oeid } = this.props.user.info;
        //const pbuID = 19999;
        //const oeID  = 37251;
        this.setState({
            showConfirmDeleteDialog: false,
            accountDeleteProgress: true
        }, async () => {
            await this.props.dispatch(deleteAccount({ accessToken, portbu, oeid, selectedPaymentId: 2 }))
            if (!this.props.error) {
                const {details} = this.props;
                this.setState({
                    alertMessage: 'Your Bank Account was successfully Deleted!',
                    alertMessageCallbackType: 'REDIRECT',
                    accountDeleteProgress: false,
                    paymentDetails: null,
                    defaultPaymentMethod: details && details.paymentMethodId
                })
            } else {
                this.handleError();
                this.setState({
                    accountDeleteProgress: false
                })
            }
        })
    }

    render() {
        const { isLoading, paymentDetails, alertMessage, errorMessage, alertMessageCallbackType, accountDeleteProgress, errors, accountUpdateProgress, showConfirmDeleteDialog, showConfirmRedeemDialog, showUpdatedAccount, errorDialog, defaultPaymentMethod } = this.state;
        const { user, acc_types, setDefault } = this.props;
        const { configs } = this.props.clientConfig;
        let buttonPrimaryColor = getColorCodeByClientCode(configs, "C00015");
		let buttonSecondaryColor = getColorCodeByClientCode(configs, "C00019");
		let buttonPrimartTextColor = getColorCodeByClientCode(configs, "C00020");
        if (isLoading) {
            return <Box display="flex" p={10} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
        }

        return (
            <Fragment>
                <Grid container >
                    <Grid item container md={12} justify="flex-end">
                        {accountUpdateProgress || accountDeleteProgress ? <Box width="100px" justifyContent="center" alignItems="center"><CircularProgress color="error" /></Box> : null}
                        {!this.state.showUpdatedAccount && <Grid item>
                            <Link href="javascript:void(0);" className="editLinkBtn" onClick={this.handleAccountEdit}>EDIT</Link>
                        </Grid>}
                        {!this.state.showUpdatedAccount && <Grid item>
                            <Link href="javascript:void(0);" className="editLinkBtn" onClick={this.handleAccountDelete}>DELETE</Link>
                        </Grid>}
                    </Grid>
                    <Grid item xs={6} md={4} lg={4}>
                        <label className="inputLabel" for="routingnumber">Routing Number</label>
                        <MaskInput autoFocus={true} maxLength={9} getValue={(val) => {
                            this.setState({
                                paymentDetails: {
                                    ...paymentDetails,
                                    routing_no: val.replace(/\D/g, '')
                                }
                            })
                        }}
                            value={paymentDetails ? paymentDetails.routing_no : ''}
                            disabled={!showUpdatedAccount && this.props.details}
                        id="routingnumber"
                        />
                    </Grid>
                    <Grid item xs={6} md={4} lg={4}>
                        <label className="inputLabel" for="accountnumber">Account Number</label>
                        <MaskInput maxLength={17} getValue={(val) => {
                            this.setState({
                                paymentDetails: {
                                    ...paymentDetails,
                                    acc_no: val.replace(/\D/g, '')
                                }
                            })
                        }}
                            value={paymentDetails ? paymentDetails.acc_no : ''}
                            disabled={!showUpdatedAccount && this.props.details}
                        id="accountnumber"
                        />
                    </Grid>
                    <Grid item xs={6} md={4} lg={4}>
                        <label className="inputLabel" for="confirmaccount">Confirm Account Number</label>
                        <MaskInput maxLength={17} getValue={(val) => {
                            this.setState({
                                paymentDetails: {
                                    ...paymentDetails,
                                    confirm_acc_no: val.replace(/\D/g, '')
                                }
                            })
                        }}
                            value={paymentDetails ? paymentDetails.confirm_acc_no : ''}
                            disabled={!showUpdatedAccount && this.props.details}
                        id="confirmaccount"
                        />
                    </Grid>
                    <Grid item xs={5} md={5} lg={5}>
                        <label className="inputLabel" for="acc_type">Account Type</label>
                        <Select
                            fullWidth={true}
                            labelId="acc_type"
                            id="acc_type"
                            disabled={!showUpdatedAccount && this.props.details}
                            displayEmpty
                            variant="outlined"
                            value={paymentDetails ? paymentDetails.acc_type || "" : ""}
                            onChange={this.handleChangeAccountType}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {acc_types ? acc_types.map((item, index) => (
                                <MenuItem key={index} value={`${item.AccountTypeCode}`}>{item.AccountTypeName}</MenuItem>
                            )) : null}
                        </Select>
                    </Grid>
                    {errors.length > 0 && (
                        <Grid item xs={12} md={12} lg={12}>
                            <Box py={1} px={1} mb={1} color="error.main">
                                <ul className="error">
                                    {errors.map(err => <li key={err}>{err}</li>)}
                                </ul>
                            </Box>
                        </Grid>
                    )}

                    {<Grid item xs={12} md={12} lg={12}>
                        <Box py={1} px={1} mb={1} >
                            <FormControlLabel value="email" control={<Radio
                                disabled={!showUpdatedAccount && this.props.details}
                                checked={defaultPaymentMethod === 2}
                                onChange={this.setDefaultPaymentMethod.bind(this)}
                                value="setasdefault"
                                color="#286787"
                                name="radio-button-contact"
                                inputProps={{ 'aria-label': 'B' }}
                            />} label="Set As Default" />
                        </Box>
                    </Grid>}

                    <Grid item xs={12} md={12} lg={12}>
                        <Box mt={5}>
                            {showUpdatedAccount ?
                                (<Grid container spacing={2} >
                                    <Grid item>
                                        <Button style={{color: buttonPrimartTextColor, backgroundColor: buttonPrimaryColor}}  variant="contained" onClick={this.handleAccountUpdate} color="primary" className="btnCreate">
                                            Update
                                        </Button>
                                    </Grid>
                                    <Grid item >
                                        <Button variant="contained" style={{width:"124px", color: buttonPrimartTextColor, backgroundColor: buttonSecondaryColor}} onClick={this.handleAccountUpdateCancel} color="primary" className="btnCancel" >Cancel</Button>
                                    </Grid>
                                </Grid>) : !this.props.details ? (
                                    <Grid container spacing={2} >
                                        <Grid item>
                                            <Button style={{width:"124px", color: buttonPrimartTextColor, backgroundColor: buttonPrimaryColor}} variant="contained" color="primary" className="btnCreate" onClick={this.handleAccountUpdate} >
                                                Save
                                            </Button>
                                        </Grid>
                                    </Grid>
                                ) : null
                            }
                        </Box>
                    </Grid>
                </Grid>


                {this.props.error && this.renderSnackbar(this.props.error)}
                {this.props.redeem.error && this.renderSnackbar(this.props.redeem.error)}
                {showConfirmRedeemDialog && this.renderRedeemDialog('Your Account is Successfully setup!', 'Would you like to continue to Redeem?')}
                {showConfirmDeleteDialog && this.renderDeleteDialog('Are you sure you want to delete your Bank Account?', '')}
                {alertMessage && this.renderAlertMessage('', alertMessage, alertMessageCallbackType)}
                {errorMessage && this.renderDeletErrorDialog('The Bank Account seems to have an issue', "Please check your Bank Account details", alertMessageCallbackType)}
                {errorDialog && this.renderErrorDialog("OOPS!", "Something went wrong, We're working on getting this fixed as soon as we can.")}
            </Fragment>
        )
    }

    renderSnackbar = message => {
        return <Notification variant="error" message={message} />
    }
    renderRedeemDialog = (title, message) => {
        return <AlertDialog success={true} showCancelBtn={true} title={title} message={message} confirmText="Redeem"
            onConfirm={this.onConfirmRedeem} clickOutsideToClose={this.onCancelRedeem} />
    }
    renderDeleteDialog = (title, message) => {
        return <ConfirmDialog title={title} message={message} onCancel={this.onCancelDelete} onConfirm={this.onConfirmDelete} />
    }
    renderAlertMessage = (title, message, callbackType) => {
        return <AlertDialog success={true} title={title} message={message} onConfirm={callbackType === 'REDIRECT' ? this.goBack : this.hideAlertMessage()} />
    }
    renderDeletErrorDialog = (title, message, callbackType) => {
        return <AlertDialog success={false} showCancelBtn={false} title={title} message={message} confirmText="DISMISS"
            onConfirm={callbackType === 'REDIRECT' ? this.goBack : this.hideAlertMessage()} />
    }
    renderErrorDialog = (title, message) => {
        return <AlertDialog title={title} message={message} onConfirm={() => { this.setState({ errorDialog: false }) }} />
    }
}

export default connect(state => (
    { ...state.user, ...state.redeem, ...state.manageAccount, ...state.clientConfig }
))(PaymentPreferenceUpdateView)