import React, { Component, Fragment } from 'react';
import ReactDOM from "react-dom";
import { MenuItem, TextField, Icon, InputAdornment, OutlinedInput, Grid, Paper, Box, Button, Collapse, CircularProgress, Table, TableHead, TableRow, TableBody, TableFooter, TablePagination, TableCell, TableSortLabel } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import moment from 'moment';

import { fetchTaxDetails, saveW9Form, submitW9Form, cancelW9HDForm, resubmitW9Form, reviewedW9Form, checkW9Resubmit } from '~/redux/actions/taxation';
import { checkSSNExistance, mergeProfile } from "~/redux/actions/redeem";
import { downloadSampleW9form, downloadSSNPDF } from "~/redux/helpers/redeem";
import Notification from '~/components/Notification'
import { ConfirmDialog, AlertDialog } from '~/components/Dialogs'
import currency from 'currency.js';
import TaxForm from "./W9Form";
import './styles.scss';
import { getColorCodeByClientCode } from "~/services/config/index";
//import { getClientInfoFromConfig } from '~/config/clients';
import Cookies from 'universal-cookie';
import { logout } from '~/redux/actions/user';

const cookies = new Cookies(window.document.cookie)

class TaxationView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            formData: null,
            processingView: false,
            processingEdit: false,
            processingDraft: false,
            processingSubmit: false,
            processingDownload: false,
            processingSSNPDFDownload: false,
            formPageNo: 1,
            alertMessage: "",
            error: "",
            errors: null,
            valid: false,
            editOEID: null,
            editPBU: null,
            canEditSSN: true,
            canSubmit: false,
            canResubmit: false,
            totalReward: "",
            fromSSNModal: false,
            openRedeemModal: false,
            openSSNModal: false,
            openMergePopup: false,
            showMergeSuccessPopup: false,
            ssn: { one: "", two: "", three: "", value: "" },
            oeids: "",
            canReview: false,
            openReviewAlert: false,
            clientInfo: null,
            openSubmitAlert: false,
            openSubmitModalHD: false,
            isEditVisible: false,
        };

        this.ssn1 = React.createRef();
        this.ssn2 = React.createRef();
        this.ssn3 = React.createRef();
    }

    componentDidMount = () => {
        const { client } = this.props.user.info;
        this.setState({
            processingView: true,
            processingEdit: false
        }, () => {
            //this.fetchDetails(true);//send true in case of first page refresh
            if (cookies.get("client") !== "hd") {
                this.fetchDetails(true);//send true in case of first page refresh
            } else {
                this.fetchDetailsW9();
            }
        });

        const { configs } = this.props.clientConfig;
        //const lblOeid = getColorCodeByClientCode(configs, "C00020");
        //const lblSsnOeid = getColorCodeByClientCode(configs, "C00021");
        const lblOeid = "OEID";
        const lblSsnOeid = "Officer/Employee Identification (OEID)";
        this.setState({ clientInfo: { lblSSNOEID: lblSsnOeid, lblOEID: lblOeid } });
    }

    openReviewAlert = () => {
        this.setState({ openReviewAlert: true });
    }

    closeReviewAlert = () => {
        this.setState({ openReviewAlert: false });
    }

    fetchDetails = (flag) => {
        const { accessToken, portbu, oeid } = this.props.user.info;
        const { fromSSNModal, totalReward } = this.props;
        const { history } = this.props;
        const { location } = history;
        const { state } = location;
        this.props.dispatch(fetchTaxDetails({ pbu: portbu, oeid: oeid })).then((response) => {
            //set state here on success
            if (!response) {
                this.setState({ processingView: false, error: this.props.taxations.error });
                return false;
            }
            const formData = this.props.taxations.formData;
            if (response) {
                this.setState({ formData: null });
            }
            // W9 does not exists and user is coming from Redeem page.
            if (!fromSSNModal && !formData) {
                this.openSSNModal();
            }
            if (flag) {
                this.props.dispatch(checkW9Resubmit({ pbu: portbu, oeid: oeid })).then((response) => {
                    if (response) {
                        this.setState({ canReview: true, openReviewAlert: true });
                    }
                });
            }
            this.setState({
                ssn: state && state["ssn"] || this.state.ssn,
                formData: {
                    ...formData,
                    SSN: formData && formData["SSN"] || state && state["ssn"] && state["ssn"]["value"] || ""
                },
                processingView: false,
                processingEdit: !formData,
                error: "",
                totalReward,
                fromSSNModal,
                editOEID: oeid,
                editPBU: portbu,
                //canEditSSN:(formData && formData.Status=="Submitted" ? false:true ), //assign value from response
                canSubmit: (formData && formData.Status == "Submitted" ? false : true), //assign value from response
            })
            if (cookies.get("client") === "bmw") {
                this.setState({
                    ssn: state && state["ssn"] || this.state.ssn,
                    formData: {
                        ...formData,
                        SSN: formData && formData["SSN"] || state && state["ssn"] && state["ssn"]["value"] || ""
                    },
                    processingView: false,
                    processingEdit: !formData,
                    error: "",
                    totalReward,
                    fromSSNModal,
                    editOEID: oeid,
                    editPBU: portbu,
                    canEditSSN: false, //assign value from response
                    //canSubmit:(formData && formData.Status=="Submitted" ? false:true ), //assign value from response
                })
            }
            if (cookies.get("client") === "acg") {
                this.setState({
                    ssn: state && state["ssn"] || this.state.ssn,
                    formData: {
                        ...formData,
                        SSN: formData && formData["SSN"] || state && state["ssn"] && state["ssn"]["value"] || ""
                    },
                    processingView: false,
                    processingEdit: !formData,
                    error: "",
                    totalReward,
                    fromSSNModal,
                    editOEID: oeid,
                    editPBU: portbu,
                    canEditSSN: false, //assign value from response
                    //canSubmit:(formData && formData.Status=="Submitted" ? false:true ), //assign value from response
                })
            }
            if (cookies.get("client") === "hd") {
                this.setState({
                    // formData: formData,
                    formData: formData,
                    processingView: false,
                    // processingEdit:!formData,
                    processingEdit: true,
                    error: "",
                    totalReward,
                    fromSSNModal,
                    editOEID: oeid,
                    editPBU: portbu,
                    canEditSSN: true, //assign value from response
                    //canSubmit:(formData && formData.Status=="Submitted" ? false:true ), //assign value from response
                })
            }
        })

    }

    fetchDetailsW9 = (flag) => {
        const { accessToken, portbu, oeid } = this.props.user.info;
        const { fromSSNModal, totalReward } = this.props;
        this.props.dispatch(fetchTaxDetails({ pbu: portbu, oeid: oeid })).then((response) => {
            //set state here on success
            if (!response) {
                this.setState({ processingView: false, error: this.props.taxations.error });
                return false;
            }
            // W9 does not exists and user is coming from Redeem page.
            const formData = this.props.taxations.formData;
            if (!fromSSNModal && !formData) {
                this.openSSNModal();
            }
            if (flag) {
                this.props.dispatch(checkW9Resubmit({ pbu: portbu, oeid: oeid })).then((response) => {
                    if (response) {
                        this.setState({ canReview: true, openReviewAlert: true });
                    }
                });
            }
            if (cookies.get("client") === "hd") {
                this.setState({
                    formData: null,
                    processingView: false,
                    processingEdit: true,
                    error: "",
                    totalReward,
                    fromSSNModal,
                    editOEID: oeid,
                    editPBU: portbu,
                    canEditSSN: true, //assign value from response
                    //canSubmit:(formData && formData.Status=="Submitted" ? false:true ), //assign value from response
                })
            }
        })

    }

    hideAlertMessage = () => {
        this.setState({
            alertMessage: null,
            error: "",
            showMergeSuccessPopup: false,
        })
    }

    findColor = (statusId) => {
        let textColor = "#ebba8f";
        switch (parseInt(statusId)) {
            case 1:
                textColor = "#286787"
                break;
            case 2:
                textColor = "#286787"
                break;
            case 3:
                textColor = "#ebba8f"
                break;
            case 4:
                textColor = "#ebba8f"
                break;
            default:
                textColor = "#ebba8f"
                break;
        }
        return textColor;
    }

    handleClose = () => {
        this.setState({ showForm: false });
    }

    handleFormPageChange = (pageNo) => {
        this.setState({ formPageNo: pageNo });
    }

    handleDownload = () => {
        this.setState({
            processingDownload: true
        }, () => {
            downloadSampleW9form().then((response) => {
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

    handleCancel = () => {
        const { canReview } = this.state;
        this.setState({
            formData: this.props.taxations.formData,
            processingEdit: false,
            canReview: canReview ? true : false,
            canResubmit: canReview ? false : true,
        });
    }

    handleEdit = () => {
        //handle edit
        const { canReview } = this.state;

        //check if canReview flag is true then only can resubmit
        this.setState({ processingEdit: true, canResubmit: canReview ? true : false });
    }

    handleDraft = () => {
        //save Draft w9 form
        //Apply validation
        if (!this.state.processingEdit) {
            return false;
        }
        const validForm = this.validateDraft();
        this.setState({ isEditVisible: true });
        if (validForm) {
            this.setState({
                processingDraft: true,
            }, async () => {
                //save form
                const { formData, editOEID, editPBU, canEditSSN } = this.state;
                const { userInfo } = this.props.user.info;
                //save w9 form
                await this.props.dispatch(saveW9Form({ formData: formData, userId: userInfo.Id, editOEID, editPBU, status: "Draft", canEditSSN })).then(response => {
                    console.log("response save data", response);
                    if (!response) {
                        this.setState({
                            processingDraft: false,
                            processingEdit: true,
                            error: this.props.taxations.error,
                        });
                        return false;
                    }
                    this.setState({
                        processingDraft: false,
                        processingEdit: false,
                        error: "",
                        alertMessage: 'Your W9 Form was successfully saved!',
                    });
                })

                //refresh component if needed

            }
            );
        }
    }

    handleSubmit = () => {
        //Apply validation
        if (!this.state.processingEdit) {
            return false;
        }
        const validForm = this.validateForm();
        if (validForm) {
            this.submitW9FormToApi();
            if (cookies.get("client") === "hd") {
                this.setState({
                    openSubmitAlert: true,
                });
            }
        }

        // if(!validForm) {
        //     alert('test');
        //     this.setState({
        //         openRedeemModal : true,
        //     });
        // }
    }

    submitW9FormToApi() {
        this.setState({
            processingSubmit: true,
        }, async () => {
            //Submit form
            const { userInfo } = this.props.user.info;
            const { formData, editOEID, editPBU, canEditSSN, fromSSNModal } = this.state;
            //submit w9 form
            await this.props.dispatch(submitW9Form({ formData, userId: userInfo.Id, editOEID, editPBU, status: "Submitted", canEditSSN })).then(response => {
                console.log("response", response);
                if (!response) {
                    this.setState({
                        processingSubmit: false,
                        processingEdit: true,
                        error: this.props.taxations.error,
                    });
                    return false;
                }
                if (fromSSNModal) {
                    this.setState({
                        processingSubmit: false,
                        error: "",
                        processingEdit: false,
                        canEditSSN: false,
                        canSubmit: false,
                        openRedeemModal: true,
                    });
                } else {
                    this.setState({
                        processingSubmit: false,
                        error: "",
                        processingEdit: false,
                        canEditSSN: false,
                        canSubmit: false,
                        alertMessage: 'Your W9 Form was successfully submitted!',
                    });
                }
                //refresh w9 form
                this.fetchDetails(false);
            })
        }
        );
    }

    onCancelW9HDForm() {
        this.setState({
            processingSubmit: true,
        }, async () => {
            //Submit form
            const { userInfo } = this.props.user.info;
            const { formData, editOEID, editPBU, } = this.state;
            //submit w9 form
            await this.props.dispatch(cancelW9HDForm({ formData })).then(response => {
                if (!response) {
                    this.setState({
                        processingSubmit: true,
                        processingEdit: false,
                        error: this.props.taxations.error,
                    });
                    return false;
                }
                //refresh w9 form
                this.fetchDetails(true);
            })
        }
        );
    }

    /*  handleResubmit =() => {
          //Apply validation
          // if(!this.state.processingEdit){
          //     return false;
          // }
          this.onCancelW9HDForm();
          const validForm = this.validateForm();
  
          if(validForm){
              if(cookies.get("client") === "hd"){
                  this.setState({
                      openSubmitAlert : true
                  });
              }
              else {
                  this.closeReviewAlert();
                  this.submitW9FormToApi();
              }
          }
  
      }*/

    handleResubmit = () => {

        //Apply validation
        if (!this.state.processingEdit) {
            return false;
        }
        const validForm = this.validateForm();

        if (validForm) {
            this.setState({
                processingResubmit: true,
            }, async () => {
                //Submit form
                const { userInfo } = this.props.user.info;
                const { formData, editOEID, editPBU } = this.state;
                //submit w9 form
                await this.props.dispatch(resubmitW9Form({ formData, userId: userInfo.Id, editOEID, editPBU, status: "Submitted" })).then(response => {
                    console.log("response", response);
                    if (!response) {
                        this.setState({
                            processingResubmit: false,
                            processingEdit: true,
                            error: this.props.taxations.error,
                        });
                        return false;
                    }
                    this.setState({
                        processingResubmit: false,
                        processingEdit: false,
                        error: "",
                        canReview: false,
                        canResububmit: false,
                        canEditSSN: false,
                        alertMessage: 'Your W9 Form was successfully Resubmitted!',
                    });

                    //refresh w9 form
                    this.fetchDetails(false);
                })

            }
            );
        }

    }

    handleReview = () => {
        if (this.state.processingEdit) {
            return false;
        }
        this.setState({
            processingReview: true,
        }, async () => {
            //Submit form
            const { userInfo } = this.props.user.info;
            const { formData, editOEID, editPBU, canEditSSN } = this.state;
            //submit w9 form
            await this.props.dispatch(reviewedW9Form({ formData, userId: userInfo.Id, editOEID, editPBU, status: "Submitted" })).then(response => {
                console.log("response", response);
                if (!response) {
                    this.setState({
                        processingReview: false,
                        error: this.props.taxations.error,
                    });
                    return false;
                }
                this.setState({
                    processingReview: false,
                    error: "",
                    canReview: false,
                    alertMessage: 'Your W9 Form was successfully Reviewed!',
                });

                //refresh w9 form
                this.fetchDetails(false);
            })
        }
        );

    }

    _openMergeW9Form = () => {
        this.setState({ openMergePopup: true, openSSNModal: false })
    }

    _closeMergeW9Form = () => {
        this.setState({ openMergePopup: false })
    }

    openMergeProfileSuccess = () => {
        this.setState({ openMergePopup: false, showMergeSuccessPopup: true })
    }

    closeMergeProfileSuccess = () => {
        this.setState({ showMergeSuccessPopup: true })
    }

    _checkSSNExistance = () => {
        const { accessToken, portbu, oeid } = this.props.user.info;
        const { ssn, totalRewards, formData } = this.state;
        if (ssn.value.length == 9) {
            this.props.dispatch(checkSSNExistance({ PBU: portbu, OEID: oeid, SSN: ssn.value, accessToken })).then((response) => {
                if (!response) {
                    this.setState({ error: this.props.redeem.error, openSSNModal: false, }) // error handling
                    return false;
                }
                const { SSNData } = this.props.redeem;
                if (SSNData) {
                    //SSN Exists
                    this.setState({ openSSNModal: false, oeids: (SSNData.OEID || "") }, () => {
                        //show merge popup with OEIDs received in response.
                        this._openMergeW9Form();
                        // if selected merge -> call merge API and show success message. --> then show redeem popup with payment methods.
                    })
                } else {
                    this.setState({ openSSNModal: false, formData: { ...formData, SSN: ssn && ssn.value }, canEditSSN: false })
                }
            })
        }
    }

    _openRedeemModal = () => {
        this.setState({ openRedeemModal: true })
    }

    _closeRedeemModal = () => {
        this.setState({ openRedeemModal: false })
    }

    onConfirmRedeem = () => {
        this.props.history.push("/redeem", { fromW9Form: true });
    }

    returnRedeemModal = (heading, message) => {
        return <AlertDialog outsideClick={true} success={true} title={heading} message={message} showCancelBtn={true} onConfirm={() => this.onConfirmRedeem()} clickOutsideToClose={() => this._closeRedeemModal()} />
    }



    openSSNModal = () => {
        this.setState({ openSSNModal: true, ssn: { one: "", two: "", three: "", value: "" } });
    }
    closeSSNModal = () => {
        this.setState({ openSSNModal: false });
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


    handlePDFDownload = () => {
        this.setState({
            processingSSNPDFDownload: true
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
                this.setState({ processingSSNPDFDownload: false });
            }).catch(error => {
                this.setState({ processingSSNPDFDownload: false });
            })

        });
    }

    returnSSNModal = () => {
        const { ssn, processingSSNPDFDownload, clientInfo } = this.state;
        const isClientELAN = cookies.get("client") === "elan";
        const isClientBMW = cookies.get("client") === "bmw";
        const isClientACG = cookies.get("client") === "acg";
        const clientTitle = isClientELAN ? "ELAN" : isClientBMW ? "BMW" : isClientACG && "ACG";
        return (
            <AlertDialog dialogClassName="ssn-box" onClose={() => this.closeSSNModal()} clickOutsideToClose={false} success={false} title={""} confirmText="Continue" px={10} py={4} btnDisabled={ssn.value.length != 9} onConfirm={() => this._checkSSNExistance()} >
                <Box display="inline-flex" flexDirection="column" justifyContent="center">
                    <div className="alert-dialog-title">Note</div>
                    <div className="content">
                        {`${clientTitle} requires IRS Form W-9 on an annual basis. The CA$H IN system does not have record of a 2021 W-9 tied to this ${clientInfo && clientInfo.lblSSNOEID} . To redeem your rewards, please continue and complete IRS Form W-9.`}
                        <div className="content" style={{ marginTop: "6px", fontWeight: "bold" }}>To begin Form W-9, please enter your Social Security Number.</div>
                        <div className="SSNinputWrapper" style={{ display: "block", textAlign: "center" }} flexDirection="column" justifyContent="center">
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
                                <Grid item xs={12} md={2}>
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
                                    <Link to="#" onClick={() => this.handlePDFDownload()} className="alert-dialog-link">Why am I seeing this?</Link>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Box>
            </AlertDialog>)
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
            //refresh w9 form
            this.fetchDetails(false);
        }))
    }

    returnMergePopup(title, message) {
        return (<AlertDialog title={title}
            message={message}
            showCancelBtn={true}
            clickOutsideToClose={() => this._closeMergeW9Form()}
            outsideClick={true}
            success={true}
            confirmText={"Confirm"}
            onConfirm={() => this._mergeProfile()}
        />)
    }

    validateDraft = () => {

        const { formData } = this.state;

        let valid = true;
        let otherValidations = {};

        const vldMsg = "The input must be in valid format:\n CITY,ST,ZIP CODE \n Example: Milwaukee,WI,53202";
        let cityMsg = "";

        if (!formData) {
            otherValidations.csz = 'Form fields could not be left empty.';
            valid = false;
        }
        if (formData && formData.City && formData.City.trim().length > 30) {
            //otherValidations.city = 'Maximum character length allowed for City is 30.';
            cityMsg = 'Maximum character length allowed for City is 30.';
            valid = false;
        }
        if (formData && formData.State && formData.State.trim().length != 2) {
            //otherValidations.state = 'State Code must be of 2 Letters.';
            cityMsg = cityMsg ? (cityMsg + '\rState Code must be of 2 Letters.') : 'State Code must be of 2 Letters.';
            valid = false;
        }
        if (formData && formData.ZipCode && formData.ZipCode.trim().length > 16) {
            //otherValidations.zipCode = 'ZIP Code must be less than or requal to 16 digits.';
            cityMsg = cityMsg ? (cityMsg + '\rZIP Code must be less than or \requal to 16 digits.') : 'ZIP Code must be less than or \requal to 16 digits.';
            valid = false;
        }

        if (cityMsg !== "") {
            otherValidations.csz = vldMsg + "\n\n Note: " + cityMsg;
        }
        //if(formData && formData.ListAccountNumber && formData.ListAccountNumber.trim()!== ''){
        //  const ac_nos = formData.ListAccountNumber.split(",");
        //for(let ac_no of ac_nos){
        //  if(isNaN(ac_no) || ac_no.trim().trim().length !=16){
        //    otherValidations.listAccountNumber = 'Account Number must be of 16 digits.';
        //  valid = false;
        //}
        //}
        //}
        if (formData && formData.SSN && formData.SSN.trim() !== '') {
            if (isNaN(formData.SSN) || formData.SSN.length != 9) {
                otherValidations.ssn = "SSN must be of 9 digits.";
                valid = false;
            }
        }

        if (formData && formData.EmployerIdentificationNumber && formData.EmployerIdentificationNumber.trim() !== '') {
            if (isNaN(formData.EmployerIdentificationNumber) || formData.EmployerIdentificationNumber.length != 9) {
                otherValidations.ein = "Employer identification number must be of 9 digits.";
                valid = false;
            }
        }

        this.setState({ valid: valid }, () => {
            if (!valid) {
                const items = otherValidations && Object.values(otherValidations);
                const msg = items.length && <Box py={1} px={1} color="error.main">
                    <ul className="error">
                        {items.map((err) => {
                            let newText = err.split('\n').map((item, i) => {
                                if (i == 0) {
                                    return item;
                                }

                                let subText = item.split('\r').map((subitem, subind) => {
                                    if (subind == 0) {
                                        return <p key={subind}>{subitem}&nbsp;</p>;
                                    }
                                    return <p key={subind} style={{ paddingLeft: "40px" }}>{subitem}&nbsp;</p>;
                                });
                                return item ? subText : <span style={{ display: "block", height: "5px" }}>&nbsp;</span>;
                            });
                            return <li key={err}>{newText}</li>
                        }
                        )}
                    </ul>
                </Box>

                this.setState({ error: msg });
            } else {
                this.setState({ error: null });
            }
        });

        return valid;
    }

    validateForm = () => {
        const { formData } = this.state;
        let errors = {};
        let valid = true;
        let missingFlag = false;
        let otherValidations = {};

        if (!formData || !formData.Name || formData.Name.trim() === '') {
            errors.name = 'Name is required.';
            missingFlag = true;
            valid = false;
        }
        //if(!formData.BusinessName || formData.BusinessName.trim()=== ''){
        //errors.businessName='Business Name is required.';
        //valid = true;
        //}
        if (!formData || !formData.FederalTaxClassificationId) {
            errors.federalTaxClassificationId = 'Please, select at least one Federal tax classification.';
            missingFlag = true;
            valid = false;
        } else {
            //Check corresponding text box value
            if (formData.FederalTaxClassificationId == "L" && (!formData.LimitedLiability || formData.LimitedLiability.trim() === '')) {
                errors.limitedLiability = "Please fill limited liability field.";
                missingFlag = true;
                valid = false;
            }
            if (formData.FederalTaxClassificationId == "O" && (!formData.OthersText || formData.OthersText.trim() === '')) {
                errors.othersText = "Please fill limited liability field.";
                missingFlag = true;
                valid = false;
            }
        }
        if (!formData || !formData.Address1 || formData.Address1.trim() === '') {
            errors.address1 = 'Address is required.';
            missingFlag = true;
            valid = false;
        }
        if (!formData || (!formData.City || formData.City.trim() === '') && (!formData.State || formData.State.trim() === '') && (!formData.ZipCode || formData.ZipCode.trim() === '')) {
            errors.csz = 'City, State and ZIP code is required.';
            missingFlag = true;
            valid = false;
        } else {
            const vldMsg = "The input must be in valid format:\n CITY,ST,ZIP CODE \n Example: Milwaukee,WI,53202";
            let cityMsg = "";
            if (!formData.City || formData.City.trim() === '' || !formData.State || formData.State.trim() === '' || !formData.ZipCode || formData.ZipCode.trim() === '') {
                otherValidations.csz = "The input must be in valid format:\n CITY,ST,ZIP CODE \n Example: Milwaukee,WI,53202";
                valid = false;
            }

            if (!formData.City || formData.City.trim() === '') {
                errors.csz = 'City is required.';
                //otherValidations.city = 'The input must be in valid format: CITY,ST,ZIP CODE Example: Milwaukee,WI,53202';
                //missingFlag=true;
                valid = false;
            } else {
                if (formData.City.trim().length > 30) {
                    errors.csz = 'Maximum character length allowed for City is 30.';
                    ///otherValidations.city ='Maximum character length allowed for City is 30.';
                    cityMsg = 'Maximum character length allowed for City is 30.';
                    valid = false;
                }
            }
            if (!formData.State || formData.State.trim() === '') {
                errors.csz = 'State is required.';
                //otherValidations.city = 'The input must be in valid format: CITY,ST,ZIP CODE Example: Milwaukee,WI,53202';
                //missingFlag=true;
                valid = false;
            } else {
                if (formData.State.trim().length != 2) {
                    errors.csz = 'State Code must be of 2 Letters.';
                    ///otherValidations.state = 'state code must 2 Letters.';
                    cityMsg = cityMsg ? (cityMsg + '\rState Code must be of 2 Letters.') : 'State Code must be of 2 Letters.';
                    valid = false;
                }
            }
            if (!formData.ZipCode || formData.ZipCode.trim() === '') {
                errors.csz = 'ZIP code is required.';
                //otherValidations.city = 'The input must be in valid format: CITY,ST,ZIP CODE Example: Milwaukee,WI,53202';
                //missingFlag=true;
                valid = false;
            } else {
                if (formData.ZipCode.trim().length > 16) {
                    errors.csz = 'Zip Code must be of 16 digits.';
                    ///otherValidations.zipCode = 'Zip Code must be of 16 digits.';
                    cityMsg = cityMsg ? (cityMsg + '\rZIP Code must be less than or \requal to 16 digits.') : 'ZIP Code must be less than or \requal to 16 digits.';
                    valid = false;
                }
            }

            if (cityMsg !== "") {
                otherValidations.csz = vldMsg + "\n\n Note: " + cityMsg;
            }
        }

        //if(formData && formData.ListAccountNumber && formData.ListAccountNumber.trim()!== ''){
        //  const ac_nos = formData.ListAccountNumber.split(",");
        //for(let ac_no of ac_nos){
        //  if(isNaN(ac_no) || ac_no.trim().trim().length !=16){
        //    errors.listAccountNumber = 'Account Number must be of 16 digits.';
        //  otherValidations.listAccountNumber = 'Account Number must be of 16 digits.';
        //valid = false;
        //}
        //}
        //}
        console.log(formData);
        if (!formData || !formData.SSN || formData.SSN.trim() === '') {
            errors.ssn = "Missing Mandatory field SSN.";
            missingFlag = true;
            valid = false;
        } else if (isNaN(formData.SSN) || formData.SSN.length != 9) {
            errors.ssn = "SSN must be of 9 digits.";
            otherValidations.ssn = "SSN must be of 9 digits.";
            valid = false;
        }

        if (formData && formData.EmployerIdentificationNumber && formData.EmployerIdentificationNumber.trim() !== '') {
            if (isNaN(formData.EmployerIdentificationNumber) || formData.EmployerIdentificationNumber.length != 9) {
                errors.ein = 'Employer identification number must be of 9 digits.';
                otherValidations.ein = "Employer identification number must be of 9 digits.";
                valid = false;
            }
        }
        if (!formData || !formData.SignatureText || formData.SignatureText.trim() === '') {
            errors.signatureText = 'Signature is required.';
            missingFlag = true;
            valid = false;
        } else if (formData.SignatureText.trim().toLowerCase() != formData.Name.trim().toLowerCase()) {
            errors.signatureText = 'Name and Signature must be same.';
            otherValidations.signatureText = "Name and Signature must be same.";
            valid = false;
        }

        //if(!formData || !formData.SignatureDate || formData.SignatureDate.trim()=== ''){
        //errors.signatureDate='Signature Date is required.';
        //valid = false;
        //}

        this.setState({ errors: errors, valid: valid }, () => {
            if (!valid) {
                const items = otherValidations && Object.values(otherValidations);
                if (missingFlag) {
                    items.unshift("Missing Mandatory Fields.");
                }
                const msg = items.length && <Box py={1} px={1} color="error.main">
                    <ul className="error">
                        {items.map((err) => {
                            let newText = err.split('\n').map((item, i) => {
                                if (i == 0) {
                                    return item;
                                }
                                let subText = item.split('\r').map((subitem, subind) => {
                                    if (subind == 0) {
                                        return <p key={subind}>{subitem}&nbsp;</p>;
                                    }
                                    return <p key={subind} style={{ paddingLeft: "40px" }}>{subitem}&nbsp;</p>;
                                });
                                return item ? subText : <span style={{ display: "block", height: "5px" }}>&nbsp;</span>;
                            });
                            return <li key={err}>{newText}</li>
                        }
                        )}
                    </ul>
                </Box>

                this.setState({ error: msg });
            } else {
                this.setState({ error: null });
            }
        });

        return valid;
    }

    handleChange = (field, event, position) => {
        const { formData } = this.state;
        const newData = { ...formData };
        switch (field) {
            case 'csz':
                const csz = event.target.value;
                newData[field] = event.target.value;
                const cszValues = csz.split(",");
                console.log(cszValues);
                newData["City"] = cszValues[0] ? cszValues[0].trim() : "";
                newData["State"] = cszValues[1] ? cszValues[1].trim() : "";
                newData["ZipCode"] = cszValues[2] ? cszValues[2].trim() : "";

                break;
            case 'SSN':
                const ssnString = formData && formData.SSN || "";
                const strArray = ssnString.split("");
                strArray[position] = event.target.value;
                newData[field] = strArray.join("");
                break;
            case 'EmployerIdentificationNumber':
                const einString = formData && formData.EmployerIdentificationNumber || "";
                const einArray = einString.split("");
                einArray[position] = event.target.value;
                newData[field] = einArray.join("");
                // newData[field] =  formData && formData.EmployerIdentificationNumber.concat("", event.target.value)|| event.target.value;
                break;
            case 'LimitedLiability':
            case 'ExemptPayeeCode':
            case 'FATCACode':
                newData[field] = event.target.value.toUpperCase();
                break;

            default:
                newData[field] = event.target.value;
                break
        }

        this.setState({ formData: { ...newData } });
    }

    onCancelApprove = () => {
        this.fetchDetails(true);
        // this.onCancelW9HDForm();
        this.setState({
            openSubmitAlert: false
        })
    }

    onConfirmApprove = () => {
        // this.submitW9FormToApi();
        this.onCancelApprove();
        this.props.dispatch(logout());
        this.props.history.push("/logout");
    }

    render() {
        const { clientInfo, showMergeSuccessPopup, formPageNo, processingView, processingEdit, processingDraft, processingSubmit, processingDownload,
            formData, showForm, canSubmit, canResubmit, canEditSSN, alertMessage, taxationData, errors, error, openRedeemModal, totalReward,
            openSSNModal, openMergePopup, canReview, oeids, openReviewAlert, openSubmitAlert, openSubmitModalHD, isEditVisible } = this.state;
        const { portbu, oeid } = this.props.user.info;
        const { user, taxations } = this.props;

        const cookies = new Cookies(window.document.cookie);

        return (
            <Fragment>
                <Grid container justify="center" id="taxation-list-view">
                    <Grid item md={12}>
                        <Paper square display="flex" >
                            {this.displayForm(errors, formPageNo, processingView, processingEdit, processingDraft, processingSubmit, processingDownload, formData, canReview, canSubmit, canResubmit, canEditSSN, isEditVisible)}
                        </Paper>
                    </Grid>
                    { }
                    {error && this.renderErrorMessage("", error)}
                    {alertMessage && cookies.get("client") !== "hd" ? this.renderAlertMessage('', alertMessage) : null}
                    {openRedeemModal && this.returnRedeemModal("Your W9 form was successfully submitted!", `Would you like to continue redeeming ${currency(totalReward, { formatWithSymbol: true }).format()}?`)}
                    {openSSNModal && cookies.get("client") !== "hd" ? this.returnSSNModal() : null}
                    {openMergePopup && this.returnMergePopup(`Your W9 Form already exists with the ${clientInfo && clientInfo.lblOEID} ${oeids}`, `You do not need to submit another W9 form and your profile of ${clientInfo && clientInfo.lblOEID} ${oeid} and ${oeids} will be merged from here on. For any questions/concerns reach out to support contact.`)}
                    {showMergeSuccessPopup && this.renderAlertMessage('', `Your profile have been merged successfully.`)}
                    {openReviewAlert && this.returnReviewAlert("", "Please review your W-9 form. Click “Edit” to make changes or “Acknowledge” to confirm that the information provided is accurate.")}
                    {openSubmitAlert && this.renderApproveDialog("Thank you for registering.", `For security purposes, we recommend closing your browser.`)}
                    {/* {openSubmitModalHD && this.returnReviewAlert("Your W9 form was successfully submitted!", `Would you like to continue redeeming ${currency(totalReward, { formatWithSymbol: true }).format()}?`)} */}
                </Grid>
            </Fragment>
        )
    }

    logout() {
        this.props.dispatch(logout());
        this.props.history.push("/logout");
        //this.setState({ title: "Thank you!", message: "You have successfully logged out.", dialogActive: true });
    }

    openSubmitModalHD = (title, message) => {
        return (<AlertDialog dialogClassName="alert-review-popup" success={false} title={title} message={message} confirmText={"Ok"} onConfirm={() => this.closeReviewAlert()} onClose={() => this.closeReviewAlert()} />)
    }

    renderApproveDialog = (title, message) => {
        return <ConfirmDialog title={title} message={message} okLabel="Ok" cancelLabel="Cancel" onCancel={this.onCancelApprove} onConfirm={this.onConfirmApprove} isIconVisible="true" />
    }

    returnReviewAlert = (title, message) => {
        return (<AlertDialog dialogClassName="alert-review-popup" success={false} title={title} message={message} confirmText={"Ok"} onConfirm={() => this.closeReviewAlert()} onClose={() => this.closeReviewAlert()} />)
    }

    renderErrorMessage = (title, message) => {
        return <AlertDialog dialogClassName="alert-dialoge-root" success={false} title={title} message={message} onConfirm={() => this.hideAlertMessage()} />
    }

    renderAlertMessage = (title, message) => {
        return <AlertDialog success={true} title={title} message={message} onConfirm={() => this.hideAlertMessage()} />
    }

    displayForm = (errors, formPageNo, processingView, processingEdit, processingDraft, processingSubmit, processingDownload, formData, canReview, canSubmit, canResubmit, canEditSSN, isEditVisible) => {
        return <TaxForm
            title=""
            py={5}
            canReview={canReview}
            canSubmit={canSubmit}
            canResubmit={canResubmit}
            canEditSSN={canEditSSN}
            formPageNo={formPageNo}
            processingView={processingView}
            processingEdit={processingEdit}
            processingDraft={processingDraft}
            processingSubmit={processingSubmit}
            processingDownload={processingDownload}
            formData={formData}
            onConfirm={this.handleClose}
            clickOutsideToClose={false}
            handleFormPageChange={(pageNo) => this.handleFormPageChange(pageNo)}
            handleEdit={(event) => this.handleEdit(event)}
            handleDraft={(event) => this.handleDraft(event)}
            handleSubmit={(event) => this.handleSubmit(event)}
            handleResubmit={(event) => this.handleResubmit(event)}
            handleReview={(event) => this.handleReview(event)}
            handleChange={this.handleChange}
            handleDownload={this.handleDownload}
            handleCancel={this.handleCancel}
            errors={errors}
            onClose={this.handleClose}
            isEditVisible={isEditVisible} />
    }
}

export default connect(state => ({ ...state.user, ...state.taxations, ...state.redeem, ...state.clientConfig }))(TaxationView)