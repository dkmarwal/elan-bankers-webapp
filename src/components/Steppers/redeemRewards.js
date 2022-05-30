import React from 'react';
import {Box, Link, CircularProgress} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepIcon from '@material-ui/core/StepIcon';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import Tooltip from '@material-ui/core/Tooltip';

import moment from "moment-timezone";
import "./styles.scss"
const styles = theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
});

function getSteps() {
  return [
        {
            "RewardID": 78,
            "PromotionID": 20,
            "RewardStatusID": 3,
            "RewardStatus": "Reward Available",
            "RewardIndicator": "active",
            "OtherDetails": "Fulfilment date 4/10/2020"        
        },
        {
            "RewardID": 90,
            "PromotionID": 40,
            "RewardStatusID": 4,
            "RewardStatus": "Payment in progress",
            "RewardIndicator": "completed",
            "OtherDetails": "10:10 AM 4/10/2020"        
        },
        {
            "RewardID": 78,
            "PromotionID": 20,
            "RewardStatusID": 3,
            "RewardStatus": "Reward Funded",
            "RewardIndicator": "completed",
            "OtherDetails": "Fulfilment date 4/10/2020"        
        },
        {
            "RewardID": 90,
            "PromotionID": 40,
            "RewardStatusID": 4,
            "RewardStatus": "Expired",
            "RewardIndicator": "error",
            "OtherDetails": "Routing number incorrect"        
        }
    ];
}

//https://stackoverflow.com/questions/40262564/how-to-export-mapstatetoprops-and-redux-form
const handleSubmit = (values, dispatch ) => {
  alert(JSON.stringify(values));  // { email: 'foo@bar.com', password: '1forest1' }

};


const gotoNext = (validate, gotoNex) => {
  //if (validate)
     //gotoNex();
}

class RedeemRewards extends React.Component {
    state = {
        activeStep: -1,
    };

    render() {
        const { classes, data, paymentDetail, createTicketProgress } = this.props;
        //const steps = getSteps();
        const steps = data;
        const { activeStep } = this.state;
        const isExpired = data.filter((item, index)=> {
            if ((item.RewardStatusID==14 || item.RewardStatusID==16)&& item.RewardIndicator==='completed') {
                return data[index-1].RewardIndicator==='disabled'?true:false;
            }
        }).length;

        const tz = moment.tz(moment.tz.guess()).zoneAbbr();

        return (
        <div className={classes.root} id="payment-tracker">
            <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                {steps.map((item, index) => {
                    const stepProps  = {};
                    const labelProps = {};
                    let tipmsg = "";

                    if(paymentDetail.PaymentMethodID==2 && ( item.RewardStatusID== 12 )){
                        tipmsg = item.RewardIndicator==='error' ? <Tooltip title={"Return:"+(item.ReturnErrorCode || "" ) + ":"+(item.ReturnErrorDescription || "")}><InfoRoundedIcon color="error" /></Tooltip> :null;
                    }

                    if(paymentDetail.PaymentMethodID== 3 && ( item.RewardStatusID== 12 && (item.ReturnErrorCode || item.ReturnErrorDescription ))){
                        const errCode = item.ReturnErrorCode ? (":"+item.ReturnErrorCode) :"";
                        const errDesc = item.ReturnErrorDescription ? (":"+item.ReturnErrorDescription) :"";
                        tipmsg = item.RewardStatusID== 12 ? <Tooltip title={"Error"+ errCode + errDesc} ><InfoRoundedIcon color="error" /></Tooltip> :null;
                    } else {
                        if(item.RewardStatusID== 11 && item.ReturnErrorCode && item.ReturnErrorDescription){
                            tipmsg = item.RewardStatusID== 11 ? <Tooltip title={"NOC:"+(item.ReturnErrorCode ||"") + ":"+ (item.ReturnErrorDescription || "")}><InfoRoundedIcon color="error" /></Tooltip> :null;
                        }
                    }

                    labelProps.optional = (
                        <div className="datetimelabel">
                            <div className="date">{item.OtherDetails ? moment.utc(item.OtherDetails).local().format("M/DD/YYYY hh:mm A ")+ tz : ""} {tipmsg} </div>
                        </div>
                    );

                    if (item.RewardIndicator==='disabled') {
                        labelProps.disabled = true;
                    }
                    if (item.RewardIndicator==='error') {
                        labelProps.error = true;
                    }
                    if (item.RewardIndicator==='completed') {
                        stepProps.completed = true;
                    }

                    return (
                        <Step key={item.RewardStatus} {...stepProps} data={(item.RewardStatusID==4 && isExpired )? "first":"other"}>
                          <StepLabel {...labelProps}>{item.RewardStatus}</StepLabel>
                        </Step>
                    );
                })}

                {createTicketProgress ? (
                        <Box width="100px" display="flex" mt={1.875} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
                    ) : (
                    <Box pl={5} display="inline" visibility={paymentDetail.StatusId ==12? "visible" :"hidden"}>
                        <Link className={"createSupportLink"} color="primary" href="javascript:void(0);" onClick={this.props.createTicket}>Create Support Ticket</Link>
                    </Box>
                )}
            </Stepper>
        </div>
        );

    }
}

export default withStyles(styles)(RedeemRewards);