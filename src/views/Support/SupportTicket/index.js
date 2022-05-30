import React, { Component } from 'react' 
import { Link, Grid, Container, Box, Paper, TextField, Button, CircularProgress, withStyles, Dialog } from '@material-ui/core'; 
import { connect } from 'react-redux'
import {Link as Rlink} from 'react-router-dom'; 
import { updateTicket, fetchCategoryList, fetchStatusList} from '~/redux/actions/support';
import {AlertDialog } from '~/components/Dialogs';
import Notification from '~/components/Notification';
 
const styles = theme => ({ 
    backBtn:{ 
        color:'#193b85', padding:'10px 40px', fontSize:'14px', fontWeight:'500', border:'1px solid #193b85',
        '&:hover':{ 
            textDecoration: 'none',
        }        
    }, 
    categoryLink:{ 
        background:'#fcfefe', color:'#676767', padding:'1rem', marginBottom:'5px', border:'1px solid #dfe2e4', 
        '&:last-child':{ 
            marginBottom:'0' 
        }, 
        '&:hover':{ 
            textDecoration: 'none',
            border:'2px solid #93b2c2', 
            boxSizing:'content-box' 
        } 
    },
    inactiveCategoryLink:{ 
        background:'#fcfefe', color:'#676767', padding:'1rem', marginBottom:'5px', border:'1px solid #dfe2e4', 
        '&:last-child':{ 
            marginBottom:'0' 
        }, 
        '&:hover':{ 
            textDecoration: 'none',
        } 
    },
    activeCategoryLink:{
        background:'#fcfefe', color:'rgba(0, 0, 0, 0.87)', padding:'1rem', marginBottom:'5px', border:'1px solid #dfe2e4', 
        '&:last-child':{ 
            marginBottom:'0' 
        },
        textDecoration: 'none',
        border:'2px solid #93b2c2', 
        boxSizing:'content-box',
        '&:hover':{ 
            textDecoration: 'none',
        }
    } 
}) 
 
 
class SupportTicket extends Component{ 

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false, 
            fetchingList: false,
            createTicketProgress:false,
            alertMessage: null,
            alertMessageCallbackType: null,
            errors: [],
            TicketNo:null,
            category:"",
            subject:"",
            description:"",
            rewardId:"",
            rewardName:"",
            PromotionName:"",
            fromPaymentPage:false,
            categoryList:null,
        }
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

	getCategoryList = () => {
		this.props.dispatch(fetchCategoryList()).then((response) => {
				//set state here on success
                if(!response)
                    return false;
                this.setState({
					categoryList: response
				})
			})
	}

    selectCategory = (category) => {
        if(!this.state.PromotionName){
            this.setState({
                category:category.value
            });
        }
    }

    validateTicket = () => {
        let errors = [];
        const { category, subject, description, rewardId } = this.state;
        if(!category || category.toString().trim() === ''){
            errors.push('Please Select any Category.');
        }
        if(!subject || subject.toString().trim() === ''){
            errors.push('Subject is required.');
        }
        if(!description || description.toString().trim() === ''){
            errors.push('Issue comment is required.');
        }
        if(category==1 && (!rewardId || rewardId.toString().trim() === '')){
            errors.push('Reward ID is required for payment issue.');
        }
        const msg = <Box py={1} px={1} color="error.main">
                        <ul className="error">
                            {errors.map(err => <li key={err}>{err}</li>)}
                        </ul>
                    </Box>

        if(errors.length >0) {
            this.setState({
                alertMessage: msg,
                alertMessageCallbackType: "hide"
            });
        }
        return errors;
    }

    handleCreateTicket = ()=> {
        const { category, subject, description, rewardId, TicketNo, fromPaymentPage } = this.state;
        const { accessToken, portbu, oeid } = this.props.user.info;
        //Validaton here
        this.setState({
            createTicketProgress: true
        }, async () => {
            const errors = this.validateTicket();
            if(errors.length){
                this.setState({
                    errors,
                    createTicketProgress: false,
                })
            } else {
               await this.props.dispatch(updateTicket({TicketNo, subject, category, description, rewardId, oeid, portbu})).then(response => {
                    if(!response) {
                        this.setState({
                            createTicketProgress: false,
                        });
                       return false;
                    }
                    this.setState({
                        createTicketProgress: false,
                        errors:[],
                        alertMessage: `Your ticket number ${TicketNo} has been successfully submited!`,
                        alertMessageCallbackType: 'REDIRECT'
                    });
                })
            }
        })
    }

	componentDidMount() {
        const { accessToken, portbu, oeid } = this.props.user.info;
        //Get rewared id from promotion page
        const { rewardId }  = this.props.match.params;
        const TicketNo      = this.props.location.state && this.props.location.state.TicketNo;
        const PromotionName = this.props.location.state && this.props.location.state.paymentDetail && this.props.location.state.paymentDetail.PromotionName;
        const RewardName = this.props.location.state && this.props.location.state.paymentDetail && this.props.location.state.paymentDetail.RewardName;
        console.log("promotion name", PromotionName);
        this.setState({
            rewardId: rewardId,
            rewardName: RewardName,
            fromPaymentPage: rewardId,
            TicketNo: TicketNo,
            PromotionName: PromotionName,
            category:PromotionName ?1:0,
            subject:PromotionName ?"Payment failed":""
        })

        this.getCategoryList();
    }

    render() {
        const {PromotionName, errors, isLoading, categoryList, fetchingList, createTicketProgress, alertMessage, alertMessageCallbackType, subject, description, category, rewardId, rewardName, fromPaymentPage, TicketNo} = this.state;
        const { classes, support } = this.props;
        const catStyle = PromotionName? classes.inactiveCategoryLink: classes.categoryLink;

        if(isLoading) {
            return <Box display="flex" p={10} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
        }
        return ( 
            <div id="supportTicket"> 
                <Container>  
                <Box display="flex" my={2} alignItems="flex-end">  
                    <Box flexGrow={1} fontWeight={500} fontSize="18px"> Create a Support Ticket  </Box> 
                    <Box><Rlink to="/support" className={classes.backBtn}> Back</Rlink> </Box> 
                </Box>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={4}>
                        <Paper> <Box px={2} pt={2} px={3} fontSize={16}> Choose a category</Box>
                            <Box display="flex" flexDirection="column" p={1}>
                             {categoryList ? categoryList.map(item => (
                                <Link href="javascript:void(0);" key={item.value} className={item.value == category? classes.activeCategoryLink:catStyle} onClick={()=>this.selectCategory(item)}> {item.label}</Link>
                                )):
                                (
                                    <Box width="100px" display="flex" mt={1.875} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
                                 )
                             }
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8}>  
                        <Paper style={{ padding:'0.5rem'}}>  
                            <Box border={2} borderColor="#93b2c2" bgcolor="#fafafa" p={{xs:'1rem', sm:'1.5rem', md:'2rem'}}>  
                            <Box fontSize={14} fontWeight={500}> Ticket No. {TicketNo} </Box>
                            {PromotionName && <Box mt={1} fontSize={14} fontWeight={500}> Promotion Name: {PromotionName} </Box>}
                            <TextField 
                                label="Reward ID" 
                                variant="outlined" 
                                margin="normal" 
                                style={{backgroundColor:'#fff'}} 
                                fullWidth={true}
                                disabled={fromPaymentPage}
                                //value={rewardName}
                                value={rewardId}
                                onChange={event => this.setState({ rewardId: event.target.value })}
                                inputProps={{
                                    ref: el => this.rewardId = el
                                }}
                                id="rewardid"
                            />
                            <TextField
                                label="Sub"
                                variant="outlined" 
                                margin="normal"
                                style={{backgroundColor:'#fff'}} 
                                fullWidth={true}
                                disabled={PromotionName?true:false}
                                value={subject}
                                onChange={event => this.setState({ subject: event.target.value })}
                                inputProps={{
                                    ref: el => this.subject = el
                                }}
                                id="sub"
                            />
                            <TextField label="Comments" 
                                variant="outlined"  
                                margin="normal" 
                                multiline 
                                rows="6" 
                                style={{backgroundColor:'#fff'}} 
                                fullWidth={true}
                                value={description}
                                onChange={event => this.setState({ description: event.target.value })}
                                inputProps={{
                                    ref: el => this.description = el
                                }}
                                id="comments"
                            />
                            {createTicketProgress ?
                            (<Box width="100px" display="flex" mt={1.875} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>)
                            :(
                               <Link href="javascript:void(0);" > <Button variant="contained" color="primary" style={{margin:'1.5rem 0'}} onClick={this.handleCreateTicket}>  Submit Ticket</Button> </Link>     
                                )
                             }
                            
                            </Box>
                         </Paper> 
                    </Grid>
                    
                </Grid>
                {support.error && this.renderSnackbar(support.error)}
                {alertMessage && this.renderAlertMessage('', alertMessage, alertMessageCallbackType)} 
                </Container>
                
            </div> 
        ) 
    }

    renderAlertMessage = (title, message, callbackType) => {
        return <AlertDialog title={title} message={message} onConfirm={callbackType === 'REDIRECT' ? this.goBack : this.hideAlertMessage} />
    }

    renderSnackbar = message => {
        return <Notification variant="error" message={message} />
    } 
} 
export default connect(state => ({ ...state.user, ...state.support })) (withStyles(styles)(SupportTicket));