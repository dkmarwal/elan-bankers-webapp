import React from "react";
import { connect } from "react-redux";
import { Paper, AppBar, Tabs, Tab, Box, Grid, Button } from "@material-ui/core";
import { TabPanel, a11yProps } from "~/components/TabPanel/index";

import ListView from "../ListView/index";
import RewardsView from "../RewardsView/index";
import "./styles.scss";

class TabView extends React.Component {

    state = {
        selectedTab: 0
    };

    componentDidMount = () => {

    }

    render() {
        const { selectedTab} = this.state;
        const { user} = this.props;
        const handleChange = (event, newValue) => {
            this.setState({ selectedTab: newValue});
        };

        return (
            <Grid container justify="center" className="employeeRewardsWrapper">
                <Grid item xs={11} md={12}>
                    <Box my={5} justifyContent="center">
                        <AppBar position="static" className="tabHeader">
                            <Grid container spacing={2}>
                                <Grid item md={12}>
                                    <Tabs
                                        value={selectedTab}
                                        onChange={handleChange}
                                        aria-label="Employee Rewards"
                                    >
                                       <Tab label="Promotion Rewards" {...a11yProps(0)} />
                                       <Tab label="Promotion Rewards YTD" {...a11yProps(1)} />
                                    </Tabs>
                                </Grid>
                                <Grid item md={12}>
                                    <div className="tabContent" >
                                        <TabPanel value={selectedTab} index={0} >
                                            <RewardsView history={this.props.history} location={this.props.location} />
                                        </TabPanel>
                                        <TabPanel value={selectedTab} index={1}>
                                            <ListView history={this.props.history} location={this.props.location} />
                                        </TabPanel>
                                    </div>
                                </Grid>
                            </Grid>
                        </AppBar>
                    </Box>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    uses: state.user
});

export default connect(mapStateToProps, {

})(TabView);
