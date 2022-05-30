import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import _ from 'lodash'
import { Container, Grid, Paper, Button, CircularProgress, Box, Table, TableHead, TableRow, TableBody, TableFooter, TablePagination, TableCell } from '@material-ui/core';
import { StyledTableHead, StyledTableRow, StyledTableCell, StyledTableFooter } from '~/components/StyledTable'
import { Link } from "react-router-dom"
import { getFileRewards, getFileValidationStatus, getFileErrorByStatus, approveRejectFile } from '~/redux/helpers/upload'
import Notification from '~/components/Notification'
import { ConfirmDialog, AlertDialog } from '~/components/Dialogs'
import { getColorCodeByClientCode } from "~/services/config/index";
import './styles.scss'
import currency from 'currency.js';

class RewardsUploadStatus extends Component {
    state = {
        FileRecordID: this.props.match.params.FileRecordID,
        fetchingDetails: true,
        fetchingValidationStatus: false,
        fetchingError: {},
        FileStatus: null,
        FileDetails: {},
        FileErrors: {},
        error: false,
        validationError: null,
        processingApproveReject: false,
        showApproveConfirm: false,
        showRejectConfirm: false,
    }
    componentDidMount(){
        const { FileRecordID } = this.state
        this.fetchRewardDetails()
    }
    onConfirmApprove = () => {
        this.processApproveReject('Approve')
    }
    onConfirmReject = () => {
        this.processApproveReject('Reject')
    }
    onCancelApprove = () => {
        this.setState({
            showApproveConfirm: false
        })
    }
    onCancelReject = () => {
        this.setState({
            showRejectConfirm: false
        })
    }
    fetchRewardDetails = () => {
        const { FileRecordID } = this.state
        this.setState({
            fetchingDetails: true
        }, () => {
            getFileRewards(FileRecordID)
            .then(response => {
                if(response.Data.length == 0){
                    setTimeout(this.fetchRewardDetails, 5000)
                }else{
                    if(!response.error){
                        let validationError = null
                        if(response.Data[0].PromotionFund < response.Data[0].TotalRewards){
                            validationError = 'The sum of the total Rewards in this file is greater than the assigned fund value for this promotion. Please correct the assigned funds for this promotion and resubmit the file.'
                        }
                        if(response.Data[0].PromotionFund == 0 && response.Data[0].TotalRewardees == 0 && response.Data[0].TotalRewards == 0){
                            validationError = 'The sum of the total Rewards in this file is greater than the assigned fund value for this promotion. Please correct the assigned funds for this promotion and resubmit the file.'
                        }
                        this.setState({
                            FileDetails: response.Data[0],
                            fetchingDetails: false,
                            validationError: validationError
                        }, () => !validationError ? this.fetchValidationStatus() : null)
                    }else{
                        this.setState({
                            fetchingDetails: false,
                            error: response.error
                        })
                    }                    
                }
            })
        })
    }
    fetchValidationStatus = () => {
        const { FileRecordID, FileErrors } = this.state
        this.setState({
            fetchingDetails: true,
            fetchingValidationStatus: true
        }, () => {
            getFileValidationStatus(FileRecordID)
            .then(response => {
                if(!response.error){
                    let isError = false, FileErrors = {}
                    response.Data.map(item => {
                        if(item.StatusID != 1 && item.StatusID != 5){
                            isError = true
                        }
                        FileErrors[item.StatusID] = {
                            isLoading: true,
                            Description: item.Description,
                            Data: []
                        }
                        this.fetchFileError(FileRecordID, item.StatusID, item.Description)
                    })
                    this.setState({
                        fetchingDetails: false,
                        fetchingValidationStatus: false,
                        FileErrors,
                        isError
                    })
                }
            })
        })
    }
    fetchFileError = (FileRecordID, StatusID, Description) => {
        getFileErrorByStatus(FileRecordID, StatusID)
        .then(response => {
            if(!response.error){
                const { FileErrors } = this.state
                this.setState({
                    FileErrors: {
                        ...FileErrors,
                        [StatusID]: {
                            isLoading: false,
                            Description: Description,
                            Data: response.Data
                        }
                    }
                }, () => console.log(this.state.FileErrors))
            }
        })
    }
    handleApproveRejectFile = (Status) => {
        if(Status == 'Approve'){
            this.setState({
                showApproveConfirm: true
            })
        }else{
            this.setState({
                showRejectConfirm: true
            })
        }
    }
    processApproveReject = (Status) => {
        const { FileRecordID, FileErrors } = this.state
        this.setState({
            processingApproveReject: true,
            showRejectConfirm: false,
            showApproveConfirm: false
        }, () => {
            approveRejectFile(FileRecordID, Status)
            .then(response => {
                if(!response.error){
                    this.props.history.push('/rewards/upload')
                }
            })
        })
    }
    render() {
        const { FileDetails, FileRecordID, FileErrors, fetchingDetails, fetchingValidationStatus, error, isError, showApproveConfirm, showRejectConfirm, processingApproveReject, validationError } = this.state;
        const { configs } = this.props.clientConfig;
        let buttonPrimaryColor = getColorCodeByClientCode(configs, "C00015");
		let buttonSecondaryColor = getColorCodeByClientCode(configs, "C00019");
		let buttonPrimartTextColor = getColorCodeByClientCode(configs, "C00020");
        if (fetchingDetails) {
            return <Box display="flex" p={10} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
        }
        // console.log("FileErrors", FileErrors)
        return (
            <div id="fileUploadCont">
                <Container>
                    <Link to="/rewards/upload">  <Button style={{ color: buttonPrimartTextColor, backgroundColor: buttonSecondaryColor}} variant="contained" className="backBtn">Back</Button> </Link>
                    <Paper square className="mainContainer">
                        <Grid container>
                            <Grid item md={12}> <div className="headingText">  Upload Fulfilment file </div>
                                <div className="subhead">{validationError ? 'We have encountered some errors.' : isError ? 'There are few discrepency in the records for your review.' : 'File seems to be correct.'}</div>
                            </Grid>
                            {fetchingDetails ? (
                                <Box display="flex" p={10} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
                            ) : (
                                <Grid item md={7} xs={12}> <input type="text" disabled className="inputField" value={FileDetails.FileName} /></Grid>
                            )}

                            <Grid container>
                                <Grid item md={7}>
                                    <Grid container>
                                    {fetchingDetails ? (
                                        <Box display="flex" p={10} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
                                    ): (
                                        <Fragment>
                                            <Grid item md={4} xs={12}>
                                                <div className="programIdText"> Program ID</div>
                                                <div className="programHeaderText">{FileDetails.PromotionID}</div>
                                            </Grid>
                                            <Grid item md={4} xs={12}>
                                                <div className="programIdText"> Total Rewards</div>
                                                <div className="programHeaderText">{currency(FileDetails.TotalRewards, { formatWithSymbol: true }).format()}</div>
                                            </Grid>
                                            <Grid item md={4} xs={12}>
                                                <div className="programIdText"> Total Rewardees</div>
                                                <div className="programHeaderText">{`${FileDetails.TotalRewardees}`}</div>
                                            </Grid>
                                        </Fragment>
                                    )}
                                    </Grid>

                                </Grid>
                                <hr className="hr" />
                                {validationError ? (
                                    <Fragment>
                                        <Grid item md={12}>
                                            <div className="subhead">Rejected</div>
                                        </Grid>
                                        <Grid item md={12}>
                                            <Box>{validationError}</Box>
                                        </Grid>
                                        
                                    </Fragment>
                                ) : (
                                    isError ? (
                                        <Grid item md={12}> <div className="warningText"> Exception </div>
                                            {_.map(FileErrors, (error, key) => (
                                                <Fragment key={key}>
                                                    <div className="subhead">{error.Description}</div>
                                                    {error.isLoading ? (
                                                        <Box display="flex"><CircularProgress color="primary" /></Box>
                                                    ) : (
                                                        <Table>
                                                            <StyledTableHead>
                                                                <TableRow>
                                                                {_.map(error.Data[0], (value, key) => <StyledTableCell>{key}</StyledTableCell>)}
                                                                </TableRow>
                                                            </StyledTableHead>
                                                            <TableBody>
                                                            {error.Data.map((item, index) => (
                                                                    <Fragment key={index}>
                                                                        <StyledTableRow>
                                                                            {_.map(item, (value, key) => <StyledTableCell>{value}</StyledTableCell>)}
                                                                        </StyledTableRow>
                                                                    </Fragment>
                                                            ))}
                                                            </TableBody>
                                                        </Table>
                                                    )}
                                                </Fragment>
                                            ))}
                                        </Grid>
                                    ) : (
                                        <div className="subhead">No Errors or Exception found</div>
                                    )
                                )}

                                <hr className="hr" />
                                <Grid container item md={12} xs={12}>
                                {processingApproveReject ? (
                                    <Box display="flex" justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
                                ) : (
                                    (isError || validationError) ? (
                                        <Button style={{ color: buttonPrimartTextColor, backgroundColor: buttonPrimaryColor}} className="approveBtn" xs={6} onClick={() => this.processApproveReject('Reject')}>Resubmit File</Button>
                                    ) : (
                                        <Fragment>
                                            <Button style={{ color: buttonPrimartTextColor, backgroundColor: buttonSecondaryColor}} className="rejectBtn" xs={6} onClick={() => this.handleApproveRejectFile('Reject')}>Reject</Button>
                                            <Button style={{ color: buttonPrimartTextColor, backgroundColor: buttonPrimaryColor}} className="approveBtn" xs={6} onClick={() => this.handleApproveRejectFile('Approve')}>Approve</Button>
                                        </Fragment>
                                    )
                                )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
                {error && this.renderSnackbar(error)}
                {showApproveConfirm && this.renderApproveDialog('', 'All the users email  IDs registered in Notification management will be notified by email on the successful uploadstatus of this fulfillment file. Do you want to proceed?')}
                {showRejectConfirm && this.renderRejectDialog('', 'The fulfillment file will be Rejected and needs to be re uploaded. Do you want to Reject this file?')}
            </div>
        )
    }
    renderApproveDialog = (title, message) => {
        return <ConfirmDialog title={title} message={message} onCancel={this.onCancelApprove} onConfirm={this.onConfirmApprove} />
    }
    renderRejectDialog = (title, message) => {
        return <ConfirmDialog title={title} message={message} onCancel={this.onCancelReject} onConfirm={this.onConfirmReject} />
    }
    renderSnackbar = message => {
        return <Notification variant="error" message={message} />
    }
}

export default connect(state => (
    { ...state.user, ...state.promotion, ...state.clientConfig }
))(RewardsUploadStatus)