import React, { Component } from "react"; 
import {IconButton,ListItemSecondaryAction, TextField, Grid, Container, Box, Paper, Button, CircularProgress, List, ListItem, ListItemIcon, Divider, ListItemText, Typography, withStyles} from "@material-ui/core"; 
import CommentIcon from '@material-ui/icons/Comment';
import { connect } from 'react-redux'
import moment from 'moment'
import { Link } from "react-router-dom";
import Notification from '~/components/Notification';
import { fetchSupportHistoryList, saveComment } from '~/redux/actions/support';
import {AlertDialog } from '~/components/Dialogs';
import './styles.scss';
 
const styles = theme => ({ 
  backBtn: { 
    border:"1px solid #1b4a6b",
    color: "#1b4a6b", 
    padding: "10px 40px", 
    fontSize: "14px", 
    fontWeight: "500" 
  }, 
  textHead: { 
    "&  h3": { 
      fontWeight: "500", 
      margin: "1.5rem 0 0 0", 
      color: "#3a3b3f", 
      fontSize: "14px" 
    }, 
 
    "& p": { 
      fontWeight: "300", 
      margin: "0", 
      color: "#3a3b3f", 
      fontSize: "14px" 
    } 
  }, 
  statusWrap: { 
    border: "solid 1px #f8a0a0", 
    padding: "2px 5px", 
    fontSize: "14px", 
    textAlign: "center", 
    color: "#3a3b3f", 
    margin: '0 25px' 
  }, 
  padding: { 
    padding: "1.5rem", 
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    paddingBottom:0,
    marginTop:10,
  },
  inline: {
    display: 'inline',
  },
}); 
 
class StatusView extends Component { 
    state = { 
        isLoading: false, 
        fetchingList: false,
        showComment:false,
        saveCommentProgress:false,
        comment:"",
        alertMessage: null,
        alertMessageCallbackType: null,
        errors: [],
    } 

    goBack = () => {
        this.props.history.push('/support')
    }

    hideAlertMessage = () => {
        this.setState({
            alertMessage: null,
            alertMessageCallbackType: null,
        })
    }

    handleClose =() =>{
        this.setState({showComment:true});
        
    }

    validateComment = comment => {
        let errors = []
        if(!comment || comment.trim() === ''){
            errors.push('Comment is required.')
        }
        return errors
    }

    handleComment = ()=> {
        const { comment } = this.state;
        //Validaton here
        this.setState({
            saveCommentProgress: true
        }, async () => {
            const errors = this.validateComment(comment);
            if(errors.length){
                this.setState({
                    errors,
                    saveCommentProgress: false,
                })
            } else {
                await this.props.dispatch(saveComment({rewardId:0, raisedBy:0, userId:0, comment})).then(response => {
                    if(!response) {
                        this.setState({
                            saveCommentProgress: false,
                        });
                       return false;
                    }
                    this.setState({
                        saveCommentProgress: false,
                        alertMessage: 'Your comments successfully submited to the Banker!',
                        alertMessageCallbackType: 'REDIRECT'
                    });
                })
            }
        })
    }

	componentDidMount() {
        const { accessToken, portbu, oeid } = this.props.user.info;
        const supportDetails = this.props.location.state && this.props.location.state.supportDetail;
console.log("support history", this.props.support.supportHistory);
console.log("Portbu details", portbu);
		if(supportDetails ) {
            this.setState({
                fetchingList: true
            }, () => {
                this.props.dispatch(fetchSupportHistoryList({ TicketNo:supportDetails.TicketNo, OEID:oeid, PORTBU: portbu})).then((response) => {
                    this.setState({
                        isLoading: false,
                        fetchingList: false
                    })
                })
            })
        }
    }

    render() {
        const {errors,isLoading, fetchingList, showComment, saveCommentProgress, alertMessage, alertMessageCallbackType, comment} = this.state;
        const { classes, support } = this.props;

        if(isLoading) {
            return <Box display="flex" p={10} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
        }

        return ( 
            <Container id="support-status-view" justify="center"> 
              <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={12}>
                            <Box mt={4}> 
                                <Link to="/support" className={classes.backBtn}> Back </Link> 
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Paper square className={classes.padding} elevation="2">
                                <Box fontSize={14} fontWeight={500}> 
                                  Ticket Information 
                                </Box> 
                                <Grid container> 
                                  <Grid item xs={12} md={6}> 
                                    <div className={classes.textHead}> 
                                      <h3> Reward ID</h3> 
                                      <p> {support.details?(support.details.RewardID?support.details.RewardID:''): ''}</p> 
                                    </div> 
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <div className={classes.textHead}>
                                      <h3>Created Date</h3>
                                      <p>{support.details?(support.details.CreatedDate? moment(support.details.CreatedDate, 'DD/MM/YYYY').format('MM/DD/YYYY'):''):''}</p>
                                    </div>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <div className={classes.textHead}>
                                      <h3> Category</h3>
                                      <p> {support.details?support.details.Category: ''}</p>
                                    </div>
                                  </Grid>
                                  {support.details&&support.details.ClosedDate ?
                                      <Grid item xs={12} md={6}>
                                        <div className={classes.textHead}>
                                          <h3>Resolved Date</h3>
                                          <p>{support.details.ClosedDate?moment(support.details.ClosedDate, 'DD/MM/YYYY').format('MM/DD/YYYY'):''}</p>
                                        </div>
                                      </Grid>:null
                                  }
                                  {support.details && support.details.ClosedBy ?
                                      <Grid item xs={12} md={6}>
                                        <div className={classes.textHead}>
                                          <h3>Closed By</h3>
                                          <p>{support.details?support.details.ClosedBy: ''}</p>
                                        </div>
                                      </Grid>: null
                                  }
                                </Grid> 
                            </Paper>
                        </Grid>
                    </Grid>
                   
                </Grid>
                <Grid item xs={12} md={8}> 
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} id="ticket-detail">
                             <Box mt={1} fontWeight={500} fontSize="20px">
                                Ticket No. {support.details?support.details.TicketNo: ''} 
                                <span className={classes.statusWrap}> {support.details?support.details.Status: ''} </span> 
                              </Box>
                              <Box display="flex" flexDirection="row" alignItems="center">
                                  <Box flexGrow={1} fontWeight={500} fontSize="20px">
                                      {support.details?support.details.Subject: ''}
                                  </Box>
                              </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            {fetchingList ? (
                                <Box width="100px" display="flex" mt={1.875} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
                            ) : (
                            <List className={classes.list}>
                               {support.details &&
                               <React.Fragment >
                                   <ListItem alignItems="flex-start">
                                        <ListItemText
                                          primary={"Issue Details"}
                                          secondary={
                                            <React.Fragment>
                                              <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                              >
                                              </Typography>
                                              {support.details.BankerDescription}
                                            </React.Fragment>
                                          }
                                        />
                                    </ListItem>
                                    <Divider variant="fullWidth" className="list-divider" light={true} component="li" />
                                </React.Fragment>
                                }
                                {support.details && support.details.AdminComments &&
                               <React.Fragment >
                                   <ListItem alignItems="flex-start">
                                        <ListItemText
                                          primary={"Elan Admin Comments"}
                                          secondary={
                                            <React.Fragment>
                                              <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                              >
                                              </Typography>
                                              {support.details.AdminComments}
                                            </React.Fragment>
                                          }
                                        />
                                    </ListItem>
                                    
                                </React.Fragment>
                                }
                                </List>
                            )}
                        </Grid>
                    </Grid>
                </Grid>               
              </Grid>
              {support.error && this.renderSnackbar(support.error)}
              {alertMessage && this.renderAlertMessage('', alertMessage, alertMessageCallbackType)}
            </Container>
    ); 
  }
    renderAlertMessage = (title, message, callbackType) => {
        return <AlertDialog title={title} message={message} onConfirm={callbackType === 'REDIRECT' ? this.goBack : this.hideAlertMessage()} />
    }

    renderSnackbar = message => {
        return <Notification variant="error" message={message} />
    }  
} 

export default connect(state => ({ ...state.user, ...state.support })) (withStyles(styles)(StatusView));