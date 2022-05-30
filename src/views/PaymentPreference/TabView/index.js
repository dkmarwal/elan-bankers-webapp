import React from "react";
import { connect } from "react-redux";
import { Paper, AppBar, Tabs, Tab, Box, Grid, Button } from "@material-ui/core";
import { TabPanel, a11yProps } from "~/components/TabPanel/index";
import PaymentPreferenceListView from "../ListView/index";
import TaxationView from "../TaxForm/index";
import { getColorCodeByClientCode } from "~/services/config/index";
import Cookies from 'universal-cookie';

import "./styles.scss";

class TabView extends React.Component {

    state = {
        selectedTab: 0,
        fromSSNModal: false,
        totalRewards: ""
    };

    componentDidMount = () => {
        let fromSSNModal = this.props && this.props.history && this.props.history.location && this.props.history.location.state && this.props.history.location.state.fromSSNModal;
        let totalRewards = this.props && this.props.history && this.props.history.location && this.props.history.location.state && this.props.history.location.state.totalRewards;
        const selectW9Form = this.props && this.props.history && this.props.history.location && this.props.history.location.state && this.props.history.location.state.selectW9Form;
        if(fromSSNModal || selectW9Form) {
            this.setState({selectedTab: 1, fromSSNModal, totalRewards})
        } else {
            this.setState({selectedTab: 0, fromSSNModal, totalRewards})
        }
    }

    render() {
        const { selectedTab} = this.state;
        const { user} = this.props;
        const { configs } = this.props.clientConfig.clientConfig
        console.log(this.props)
        let getSelectedTabBackgroundColor = getColorCodeByClientCode(configs, "C00018");
        console.log(getSelectedTabBackgroundColor)
        const activeTabColor = { backgroundColor: `${getSelectedTabBackgroundColor}` };
        console.log(activeTabColor);
       const handleChange = (event, newValue) => {
            this.setState({ selectedTab: newValue});
        };

        const cookies = new Cookies(window.document.cookie);
    
        return (
            <Grid container justify="center" className="manageAccountWrapper">
                <Grid item xs={11} md={12}>
                    <Box  my={cookies.get("client") !== "hd" ? 5 : 0} justifyContent="center">
                        <div position="static" className="tabHeader">
                            {
                                cookies.get("client") == "hd" ? 
                                    <div className="hdHeaderMessage">
                                        <h2>Harley-Davidson® Visa® Employee Challenge Incentive Registration </h2>
                                        {/* <h3>Fire up your Employee Challenge incentive</h3>
                                        <h4>Complete the information below to register for the incentive bonuses you earn with each H-D<sup className="suph4">TM</sup> Visa Account activated</h4> */}
                                        <p>Fill in your information below to ensure you receive incentives earned through Employee Challenges. This form needs to be completed and submitted in one session. If you close the browser, you will lose all entered information.</p>
                                    </div> 
                                    :
                                    null
                            }
                            <Grid container spacing={2}>
                                <Grid item md={12}>
                                    {cookies.get("client") !== "hd" ? 
                                        <>
                                            <Tabs
                                        TabIndicatorProps={{ style: { background: `${getSelectedTabBackgroundColor}` } }}
                                        value={selectedTab}
                                        onChange={handleChange}
                                        aria-label="Manage Account"
                                    >
                                        <Tab label="Payment Method" {...a11yProps(0)} style={selectedTab === 0 ? activeTabColor : {}}/>
                                        <Tab label="W9 Form" {...a11yProps(1)} style={selectedTab === 1 ? activeTabColor : {}}/>
                                    </Tabs>
                                        </>
                                       : null
                                       }
                                    {/* <Tabs
                                        TabIndicatorProps={{ style: { background: `${getSelectedTabBackgroundColor}` } }}
                                        value={selectedTab}
                                        onChange={handleChange}
                                        aria-label="Manage Account"
                                    >
                                        <Tab label="Payment Method" {...a11yProps(0)} style={selectedTab === 0 ? activeTabColor : {}}/>
                                        <Tab label="W9 Form" {...a11yProps(1)} style={selectedTab === 1 ? activeTabColor : {}}/>
                                    </Tabs> */}
                                </Grid>
                                <Grid item md={12}>
                                    <div className="tabContent" >
                                    {/* <TabPanel value={selectedTab} index={0} >
                                            <PaymentPreferenceListView rewardsList={this.props.rewardsList} history={this.props.history} location={this.props.location}/>
                                        </TabPanel>
                                        <TabPanel value={selectedTab} index={1}>
                                            <TaxationView history={this.props.history} location={this.props.location} totalReward={this.state.totalRewards} fromSSNModal={this.state.fromSSNModal}/>
                                        </TabPanel> */}
                                    {cookies.get("client") !== "hd" ? 
                                    
                                    <>
                                        <TabPanel value={selectedTab} index={0} >
                                            <PaymentPreferenceListView rewardsList={this.props.rewardsList} history={this.props.history} location={this.props.location}/>
                                        </TabPanel>
                                        <TabPanel value={selectedTab} index={1}>
                                            <TaxationView history={this.props.history} location={this.props.location} totalReward={this.state.totalRewards} fromSSNModal={this.state.fromSSNModal}/>
                                        </TabPanel>
                                    </>
                                    : 
                                    <TabPanel>
                                        <TaxationView history={this.props.history} location={this.props.location} totalReward={this.state.totalRewards}/>
                                    </TabPanel>
                                    }
                                    </div>
                                </Grid>
                            </Grid>
                        </div>

                    </Box>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    uses: state.user,
    clientConfig: state.clientConfig
});

export default connect(mapStateToProps, {

})(TabView);
