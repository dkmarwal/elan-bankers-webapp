import React from "react";
import RadioGroup from '@material-ui/core/RadioGroup';
import { updateAccount, deleteAccount } from "~/redux/actions/manage-account";
import { Link, Box, Grid, TextField, Button, CircularProgress, FormControlLabel, Radio } from '@material-ui/core';
import { connect } from 'react-redux';
import { GetPaymentMethods } from "~/redux/helpers/paymentmethod";
import { ConfirmDialog, AlertDialog } from '~/components/Dialogs';
import { redeemRewards } from '~/redux/actions/redeem';
import { fetchAccountDetails } from "~/redux/actions/manage-account";
import { getColorCodeByClientCode } from "~/services/config/index";
import "./styles.scss";

class ZelleView extends React.Component {

    state = {
        btnLoader: false,
        phoneNumber: "",
        email: "",
        alertMessage: "",
        heading: "",
        zelleToken: null,
        alertOpen: false,
        isRedeemDisabled: false,
        confirmDialog: false,
        loader: false,
        error: [],
        contactMethods: [
            { id: 1, value: "phone", label: "Phone number", selected: true, zelleToken: 0 },
            { id: 2, value: "email", label: "Email", selected: false, zelleToken: 1 }
        ],
        value: "",
        isEditable: false,
        defaultPaymentMethod: null,
        showConfirmRedeemDialog: false,
        zelleErrorAlert: false,
        showSuccessRedeemDialog: false,
        rewardsList: []
    }

    reset() {
        this.setState({
            btnLoader: false,
            phoneNumber: "",
            email: "",
            alertMessage: "",
            alertOpen: false,
            confirmDialog: false,
            loader: false,
            zelleErrorAlert: false
        })
    }

    isZelleDetailsExist() {
        const { zelleDetails } = this.props
        return zelleDetails !== null;
    }

    handleSetDefaultRadio() {
        this.setState({ defaultPaymentMethod: 3 });
    }

    handleValueChange(e) {
        const { zelleToken } = this.state;
        zelleToken === 0 ? this.handleMobileNumberChange(e) : this.handleEmailChange(e);
    }

    formatPhoneNumber = (contactNumber) => {
        const phoneNumber = contactNumber && contactNumber.replace(/\D/g, "").substring(0, 10); // First ten digits of input only
        const first = phoneNumber && phoneNumber.substring(0, 3);
        const middle = phoneNumber && phoneNumber.substring(3, 6);
        const last = phoneNumber && phoneNumber.substring(6, 10);
    
        if (phoneNumber && phoneNumber.length > 6) {
          return `(${first}) ${middle} - ${last}`;
        } else if (phoneNumber && phoneNumber.length > 3) {
          return `(${first}) ${middle}`;
        } else if (phoneNumber && phoneNumber.length > 0) {
          return `(${first}`;
        } else {
          return "";
        }
      }

    componentDidMount() {
        const { accessToken, portbu, oeid } = this.props.user.info;
        this.setState({ loader: true }, () => {
            this.props.dispatch(fetchAccountDetails({ accessToken, portbu, oeid, selectedPaymentId: 3 })).then((res) => {
                if (!res) {
                    this.handleError();
                } else {
                    const { details, zelleDetails } = this.props; 
                    this.setState({
                        loader: false,
                        defaultPaymentMethod: details && details.paymentMethodId,
                        phoneNumber: zelleDetails && zelleDetails.mobile,
                        email: zelleDetails && zelleDetails.email,
                        zelleToken: zelleDetails && zelleDetails.zelleToken || 0,
                    });
                }
            }).catch(err => {
                this.handleError();
            })
        })

    }

    selectContactMethod(_method) {
        const { details, zelleDetails } = this.props;
        this.setState({
            zelleToken: _method.zelleToken || 0,
            phoneNumber: zelleDetails && zelleDetails.mobile,
            email: zelleDetails && zelleDetails.email
        })
    }

    getSelectedContactMethodValue() {
        const { zelleDetails } = this.props;
        return zelleDetails && zelleDetails.zelleToken;
    }

    handleMobileNumberChange(e) {
        this.setState({ phoneNumber: (e.target.value) });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    resetToDefaultValues() {
        const { details, zelleDetails } = this.props;
        this.setState({
            defaultPaymentMethod: details && details.paymentMethodId,
            phoneNumber: zelleDetails && zelleDetails.mobile,
            email: zelleDetails && zelleDetails.email,
            zelleToken: zelleDetails && zelleDetails.zelleToken || 0,
        });
        console.log(this.state);
    }

    makeFieldsEditable() {
        this.setState({
            isEditable: true
        })
    }

    handleDelete() {
        this.setState({ confirmDialog: true, alertMessage: "Are you sure you want to delete your zelle account ?" })
    }

    deleteZelleAccount = () => {
        this.setState({ confirmDialog: false, loader: true }, async () => {
            const { accessToken, portbu, oeid } = this.props.user.info;
            await this.props.dispatch(deleteAccount({ accessToken, portbu, oeid, selectedPaymentId: 3 }));
            if (!this.props.error) {
                this.props.dispatch(fetchAccountDetails({ accessToken, portbu, oeid, selectedPaymentId: 3 })).then(() => {
                    const {details} = this.props;
                    this.setState({defaultPaymentMethod: details && details.paymentMethodId})
                    this.setState({ alertMessage: "Your zelle account is deleted successfully.", alertOpen: true, loader: false, email: "", phoneNumber: "", zelleToken: 0 });
                })
            } else {
                this.handleError();
            }
        })
    }

    handleRedeemDialog() {
        this.setState({ btnLoader: false, alertMessage: "", alertOpen: false, showSuccessRedeemDialog: true });
    }

    handleError(errorMessage) {
        this.setState({
            alertMessage: errorMessage ? `${errorMessage}` : 'SOMETHING WENT WRONG !', alertOpen: true, btnLoader: false, loader: false
        })
    }

    onCancelDelete() {
        this.setState({
            alertMessage: "", confirmDialog: false, btnLoader: false
        })
    }

    isZelleMethodSelected(_zelleToken) {
        const { zelleToken } = this.state;
        return zelleToken === _zelleToken;
    }

    cancelUpdate() {
        const { details, zelleDetails } = this.props;
        this.setState({
            isEditable: false,
            defaultPaymentMethod: details && details.paymentMethodId,
            phoneNumber: zelleDetails && zelleDetails.mobile,
            email: zelleDetails && zelleDetails.email,
            zelleToken: zelleDetails && zelleDetails.zelleToken || 0,
        })
    }

    // handleContactChange(e) {
    //     this.setState({ phoneNumber: e.target.value.replace(/[\s.;^!@%$#&*,?%a-zA-Z)() ]/, '') });
    // }

    handleEmailChange(e) {
        this.setState({ email: e.target.value.replace(/[\s;^!%$#&*,?%)() ]/, '') });
    }

    onCancelRedeemAlert() {
        this.setState({
            showConfirmRedeemDialog: false
        })
    }

    validateZelleFields() {
        const { phoneNumber, email, zelleToken } = this.state;
        console.log(phoneNumber)
        let errors = [];
        let re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if(zelleToken === 0 && ((phoneNumber && phoneNumber.replace(/[^0-9]/g, '').length !== 10) || phoneNumber === null || phoneNumber.length != 10)) {
            errors.push("Phone number must be of 10 digits")
        }
        if (zelleToken === 1 && (!email || email === null || email === undefined || email.length === 0)) {
            errors.push("Invalid email address.")
        }
        // if (phoneNumber && phoneNumber.length !== 10 && zelleToken === 0) {
        //     errors.push("Phone number must be of 10 digits")
        // }
        if ((email && !email.length > 0 || email && email.match(re) === null) && zelleToken === 1) {
            console.log(re.test(String(email).toLowerCase()));
            errors.push("Invalid email address.")
        }
        this.setState({ errors: errors });
        return errors;
    }

    onConfirmRedeem = () => {
        this.setState({isRedeemDisabled: true}, () => {
           //call redeem API
           const { accessToken, portbu, oeid } = this.props.user.info;
           console.log(this.state.rewardsList)
           const rewardIds = this.state.rewardsList.filter(item => item.IsExpired === 0).map(item => item.RewardId);
           const totalReward = this.props.redeem.list ? (this.props.redeem.list[0] ? this.props.redeem.list[0].TotalRewards : 0) : 0;

           this.props.dispatch(redeemRewards({ rewardIds: rewardIds.join(), accessToken, paymentMethodId: 3 })).then(response => {
               this.setState({ showConfirmRedeemDialog: false, isRedeemDisabled: false })
               if (!response) {
                   this.handleError();
                   return false;
               }
               this.props.history.push('/redeem', { fromManageAccount: true, totalReward: totalReward, isZelle: true });
           }).catch(err => {
               this.handleError();
           })
        })
    }

    handleZellePopups(response, message) {
        if (response && response.Data && response.Data.responseCode && response.Data.responseCode === 1) {
            this.setState({
                btnLoader: false,
                isEditable: false,
                alertMessage: ``,
                heading: "",
                zelleErrorAlert: true,
            }, () => this.resetToDefaultValues());
        } else {
            const fromRedeem = this.props.location.state && this.props.location.state.fromRedeem;
            const rewardsList = this.props.location.state && this.props.location.state.rewardsList;
            if (fromRedeem) {
                this.setState({
                    btnLoader: false,
                    isEditable: false,
                    alertMessage: `Would you like to continue redeeming $240`,
                    heading: "Your Zelle account was successfully setup.",
                    showConfirmRedeemDialog: true,
                    rewardsList
                });
            } else {
                    this.setState({ btnLoader: false, isEditable: false, alertMessage: message, alertOpen: true });
            }
        }
    }

    addZelleAccount(message) {
        const errors = this.validateZelleFields();
        if (errors && errors.length === 0) {
            const { details } = this.props;
            const { zelleToken } = this.state;
            const { email, phoneNumber, defaultPaymentMethod } = this.state;
            const { accessToken, portbu, oeid } = this.props.user.info;
            let phone = zelleToken === 0 && phoneNumber && phoneNumber.replace(/[^0-9]/g, '');
            let _email = zelleToken === 1 && email;
            console.log(zelleToken)
            this.setState({ btnLoader: true }, async () => {
                this.props.dispatch(updateAccount({ accessToken, portbu, oeid, paymentDetails: details, lEmail: _email, lMobile: phone, lZelleToken: zelleToken, lPaymentMethodId: defaultPaymentMethod, lSelectedPaymentId: 3 })).then((response) => {
                    if (response) {
                        
                        console.log('response',response)
                        if(response.Data && response.Data.responseData ==="Failed"){
                            console.log('response',response.Data.responseCode)
                            this.handleError(response.Data.responseCode);
                            return
                        }
                        this.props.dispatch(fetchAccountDetails({ accessToken, portbu, oeid, selectedPaymentId: 3 })).then(() => {
                            const { details } = this.props;
                            console.log(details)
                            this.setState({defaultPaymentMethod: details && details.paymentMethodId})
                            this.handleZellePopups(response, message);
                        })
                    } else {
                       
                    }
                })
            })
        }

    }

    render() {
        const { email, phoneNumber, contactMethods, defaultPaymentMethod, isEditable, alertOpen, btnLoader, confirmDialog, loader, zelleToken, showConfirmRedeemDialog, errors, zelleErrorAlert, showSuccessRedeemDialog } = this.state;
        const { configs } = this.props.clientConfig;
        let buttonPrimaryColor = getColorCodeByClientCode(configs, "C00015");
		let buttonSecondaryColor = getColorCodeByClientCode(configs, "C00019");
		let buttonPrimartTextColor = getColorCodeByClientCode(configs, "C00020");
        return (
            <Grid container className="zelleWrapper">
                {!loader ? 
                       <div style={{ width: "100%" }}>
                        {!isEditable && this.isZelleDetailsExist() &&
                            <Grid item container md={12} justify="flex-end" style={{ justifyContent: "flex-end" }}>
                                <Grid item>
                                    <Link href="javascript:void(0);" className="editLinkBtn" onClick={this.makeFieldsEditable.bind(this)}>EDIT</Link>
                                </Grid>
                                <Grid item>
                                    <Link href="javascript:void(0);" className="editLinkBtn" onClick={this.handleDelete.bind(this)}>DELETE</Link>
                                </Grid>
                            </Grid>}
                        <div>
                        {
                        <div className="preText" style={!isEditable && this.isZelleDetailsExist() ? {opacity: 0.6} : undefined}>
                            Enter your email or a phone number registered with Zelle.
                            <div style={{ color: "rgba(0, 0, 0, 0.87)", fontSize: "15px", margin: "4px 0", fontWeight: 400 }}>Not enrolled with Zelle?  Download the Zelle app @ <a style={{ fontWeight: 400 }} href="#" onClick={(e) => { e.preventDefault(); window.open("https://www.zellepay.com/go/zelle", '_blank'); }}>https://www.zellepay.com/go/zelle</a> or to go to <a style={{ fontWeight: 400 }} href="#" onClick={(e) => { e.preventDefault(); window.open("https://www.clearxchange.com/receive/", '_blank'); }}>https://www.clearxchange.com/receive/</a> to get started.</div>
                        </div>}
                        <div className="mrow">
                            {contactMethods.map(method =>
                                <span className="zelleRadio">
                                    <FormControlLabel value={method.value} control={<Radio
                                        disabled={!isEditable && this.isZelleDetailsExist()}
                                        checked={this.isZelleMethodSelected(method.zelleToken)}
                                        onChange={() => this.selectContactMethod(method)}
                                        value={method.value}
                                        color="#286787"
                                        name="radio-button-contact"
                                        inputProps={{ 'aria-label': 'B' }}
                                    />} label={method.label} />
                                </span>)}
                        </div>
                        <div className="mrow">
                            {zelleToken === 0 ? <label  
                            for="phoneNumber" 
                            id="inputLabelx1" 
                            class="countryCode preTextFied" 
                            style={!isEditable && 
                            this.isZelleDetailsExist() ? {opacity: 0.5}: undefined}>+1</label> : 
                            <label id="inputLabelx2" for="emailId" className="hiddenLabel">Email</label>
                            }
                            <TextField
                                placeholder={`${zelleToken === 0 ? "(XXX) - XXX - XXXX" : "abc@email.com"}`}
                                className={""}
                                disabled={!isEditable && this.isZelleDetailsExist()}
                                autoComplete="off"
                                variant="outlined"
                                value={zelleToken === 0 ? this.formatPhoneNumber(phoneNumber) : email || ""}
                                onChange={this.handleValueChange.bind(this)}
                                onInput={(e) => { zelleToken === 0 ? e.target.value = e.target.value.replace(/[^0-9]/g, '') : e.target.value = e.target.value.replace(/[\s;^!%$#&*,?%)() ]/, "") }}
                                inputProps={{
                                    maxLength: zelleToken === 0 ? 16 : 48,
                                    ref: el => this.RewardsId = el
                                }}
                                id={zelleToken === 0 ? 'phoneNumber': 'emailId'}
                                aria-labelledby={zelleToken === 0 ? 'inputLabelx1': 'inputLabelx2'}
                            />
                        </div>
                        {<div className="mrow">
                            <FormControlLabel value="email" control={<Radio
                                checked={defaultPaymentMethod === 3}
                                disabled={!isEditable && this.isZelleDetailsExist()}
                                onChange={this.handleSetDefaultRadio.bind(this)}
                                value="setasdefault"
                                color="#286787"
                                name="radio-button-contact"
                                inputProps={{ 'aria-label': 'B' }}
                            />} label="Set As Default" />
                        </div>}
                        {(isEditable || !this.isZelleDetailsExist()) && <div className="mrow">
                            {!btnLoader ?
                                <div>
                                    <Grid container spacing={2} >
                                        <Grid item>
                                            <Button style={{color: buttonPrimartTextColor, backgroundColor: buttonPrimaryColor}}  variant="contained" onClick={() => 
                                                this.isZelleDetailsExist() ? 
                                                    this.addZelleAccount("Zelle account updated successfully"): 
                                                    this.addZelleAccount("Zelle account added successfully")
                                                } color="primary" className="btnCreate">
                                                {this.isZelleDetailsExist() ? "Update" : "Save"}
                                            </Button>
                                        </Grid>
                                        {this.isZelleDetailsExist() && <Grid item >
                                            <Button style={{ color: buttonPrimartTextColor, backgroundColor: buttonSecondaryColor}} variant="contained" onClick={this.cancelUpdate.bind(this)} color="primary" className="btnCancel" >Cancel</Button>
                                        </Grid>}
                                    </Grid>
                                    <Grid>
                                        <Box py={1} px={1} mb={1}>
                                            <ul>{errors && errors.map(error => <li className="errorMessage">{error}</li>)}</ul>
                                        </Box>
                                    </Grid>
                                </div> :
                                <CircularProgress color="primary" />
                            }
                        </div>}
                    </div>
                    {alertOpen && this.returnAlertDialog()}
                    {confirmDialog && this.returnConfirmDialog()}
                    {/* {showConfirmRedeemDialog && this.returnFromRedeemDialog()} */}
                    {showConfirmRedeemDialog && this.renderRedeemDialog('Your Account is Successfully setup!', 'Would you like to continue to Redeem?')}
                    {zelleErrorAlert && this.renderZelleErrorAlert()}
                </div> : <CircularProgress color="primary" />}
            </Grid>
        )
    }

    returnFromRedeemDialog() {
        const { alertMessage, heading } = this.state;
        return <AlertDialog outsideClick={true} success={true} title={heading} showCancelBtn={true} clickOutsideToClose={this.onCancelRedeemAlert.bind(this)} message={alertMessage} onConfirm={this.handleRedeemDialog.bind(this)} onCancel={this.onCancelRedeemAlert.bind(this)} />
    }

    renderRedeemDialog = (title, message) => {
        const {isRedeemDisabled} = this.state;
        return <AlertDialog redeemDisabled={isRedeemDisabled} outsideClick={true} success={true} showCancelBtn={true} title={title} message={message} confirmText="Redeem"
            onConfirm={this.onConfirmRedeem} onCancel={this.onCancelRedeemAlert.bind(this)}  clickOutsideToClose={this.onCancelRedeemAlert.bind(this)} >
            </AlertDialog>
    }

    renderZelleErrorAlert() {
        const { alertMessage, heading } = this.state;
        return <AlertDialog onClose={() => { this.setState({ btnLoader: false, alertMessage: "", alertOpen: false, zelleErrorAlert: false }) }} title={heading} message={alertMessage} confirmText="Dismiss" onConfirm={() => {console.log(this.props); this.setState({ btnLoader: false, alertMessage: "", alertOpen: false, zelleErrorAlert: false}) }}>
            <div> 
                <Box className="popup-title">Sorry!</Box>
                <p>The email address or Phone number entered is not enrolled with the Zelle® network.</p>
                <p>Click on the Zelle® link to enroll to complete the setup -  <a href="#" onClick={(e) => { e.preventDefault(); window.open("https://www.clearxchange.com/receive/", '_blank'); }}>https://www.clearxchange.com/receive/</a>
                <div> or download the Zelle app @ <a href="#" onClick={(e) => { e.preventDefault(); window.open("https://www.zellepay.com/go/zelle", '_blank'); }}>https://www.zellepay.com/go/zelle</a> to get started.</div>
                </p>
            </div>
        </AlertDialog>
    }


    returnAlertDialog = () => {
        const { alertMessage } = this.state;
        return <AlertDialog title={""} success={true} message={alertMessage} onConfirm={() => { this.setState({ btnLoader: false, alertMessage: "", alertOpen: false }) }} />
    }

    returnConfirmDialog() {
        const { alertMessage } = this.state;
        return <ConfirmDialog success={true} onCancel={this.onCancelDelete.bind(this)} title={""} message={alertMessage} onConfirm={this.deleteZelleAccount.bind(this)} />
    }
}

export default connect(state => (
    { ...state.user, ...state.redeem, ...state.manageAccount, ...state.clientConfig }
))(ZelleView)