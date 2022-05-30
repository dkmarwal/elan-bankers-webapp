import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { fetchBankerFAQ } from "~/redux/actions/faq";
import "./styles.scss"
import { CircularProgress, Box } from '@material-ui/core';

/*const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));*/

class FAQs extends React.Component {

  state = {
    loading: true
  }

  componentDidMount() {
    this.props.dispatch(fetchBankerFAQ()).then(res => {
      this.setState({ loading: false })
    })
  }
  

  render() {
    console.log(this.props);
    const { data } = this.props.faq;
    const { loading } = this.state;
    console.log('FAQs', data);
    return (
      <div id="FAQs">
        <Grid container
          direction="row"
          justify="center"
          alignItems="center">
          <Grid item xs={11}>
            <h2>Frequently Asked Questions</h2>
            <Paper>
              {loading ?
                <Box width="100%" display="flex" mt={1.875} justifyContent="center" alignItems="center"><CircularProgress color="primary" style={{textAlign: "center"}}/></Box> :
                <div>
                  {data && data.map((obj, index) =>
                    <ExpansionPanel>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography color="primary">{`0${index + 1} ${obj.Question}`}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails style={{ display: "block" }}>
                        {obj && obj.Answer && obj.Answer.map(answer =>
                          <div style={{ display: "list-item" }}>
                            <Typography>
                              {answer}
                            </Typography>
                          </div>)}
                      </ExpansionPanelDetails>
                    </ExpansionPanel>)}
                  {/* <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography color="primary">02. How soon after a designated employee promotion ends will my earned incentive rewards be available in my CA$H IN account?  </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                Rewards will be posted to CA$H IN accounts approximately 8 weeks after a promotion end date for eligible employees.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography color="primary">03. How can I redeem my incentive reward?  </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                To claim an incentive reward, an eligible employee who has earned incentive must log into their Elan Client Resource Center account and then navigate to the CA$H IN page. An eligible employee will be able to view all earned incentive rewards and claim those incentive rewards.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography color="primary">04. How long will my incentive rewards remain available?</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                Incentive rewards must be claimed within 6 months of when they are posted to the employee CA$H IN account or the incentive will be forfeited.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography color="primary">05. What happens to my incentive rewards if I am no longer employed by this financial institution?</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                Any incentive rewards not claimed by an eligible employee before the employee’s employment with a participating financial institution is terminated will be forfeited.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography color="primary">06. Will I have to pay taxes on the income that I earn from Elan promotions?</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                Yes, the cash value of all rewards and/or prizes that you receive from Elan promotions during a calendar year should be included on your tax return. If the cumulative, yearly value of rewards and/or prizes is $600 or more in a calendar year, Elan must file a Form 1099-MISC with the internal Revenue Service.  
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>


            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography color="primary">07. How will I know the total amount I will need to report on my taxes?</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                Elan will send a copy of the 1099-MISC form to you by mail if you reach the $600 threshold, postmarked by January 31st of the year following the year in which said rewards and/or prizes were paid (allow up to 14 business days for mail delivery). 
Further requirements for reporting Miscellaneous Income can be found at http://www.irs.gov/uac/Reporting-Miscellaneous-Income or consult your tax advisor.
  
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography color="primary">08. What type of account can I transfer my incentive rewards into?</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                A checking or savings account and bank routing number are required.
  
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography color="primary">09. Is there a minimum or maximum dollar value I can transfer?</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                You must transfer your full CA$H IN balance.
  
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography color="primary">10. If I change my mind after I transfer my incentive reward, can the transfer be cancelled?</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                No. All transactions are final.
  
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography color="primary">11. How long will it take for the incentive reward to appear in my checking or savings account?</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                Incentive rewards will be deposited into the designated account via ACH deposit within 3 business days after they are claimed.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography color="primary">12. What if I have general questions about the Elan credit card program?</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                Ask your manager or contact Elan Client Services by phone or email.<br/>
                Elan Client Services<br/>
                1-800-523-5354<br/>
                clientservices@elanfs.com
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel> */}
                </div>}
            </Paper>
          </Grid>
        </Grid>

      </div>
    );
  }
}
// const mapStateToProps = state => ({ ...state.faq })
// const mapDispatchToProps = (dispatch)=>{
//   return {
//     fetchBankerFAQ : ()=>dispatch({type:''})
//   }
// }
export default connect(state => ({ ...state.faq }))(FAQs);