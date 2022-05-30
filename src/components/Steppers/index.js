import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),

    },

    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    //console.log("pdd", this.props.data);
    
    return ['Rewards available', 'Initiated', 'Payment In Progress', 'Settled', 'Expired'];
}

export default function CustomizedSteppers() {
    const classes = useStyles();

    const steps = getSteps();
  return (
        <div className={classes.root}>
            <Stepper alternativeLabel activeStep={steps.length}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

  </div>
    );
}
