import React from "react";
import {
  Grid,
  Paper,
  Box,
  CircularProgress,
  Tabs,
  Tab,
  Typography,
  makeStyles
} from "@material-ui/core";
import ListView from "../../Payments/ListView";
import TaxationHistory from "../TaxationHistory";
import { getColorCodeByClientCode } from "~/services/config/index";
import { connect } from 'react-redux'
import "./styles.scss";

class RewardsTabs extends React.Component {
  state = {
    selectedTab: 0
  };

  handleTabChange(id) {
    this.setState({ selectedTab: id });
  }

  render() {
    const { selectedTab } = this.state;
    const { configs } = this.props.clientConfig;
    let getSelectedTabBackgroundColor = getColorCodeByClientCode(configs, "C00018");
    console.log(getSelectedTabBackgroundColor);
    const activeTabColor = { backgroundColor: `${getSelectedTabBackgroundColor}` };
    return (
      <div className={"RewardsTabContainer"}>
        <Grid item xs={4} md={4} lg={4} >
          <Box py={3}>
            <Box p={2} fontWeight={500}></Box>
            <Tabs
              orientation="horizontal"
              //TabIndicatorProps={{ style: { background: `${getSelectedTabBackgroundColor}` } }}
              variant="standard"
              value={selectedTab}
              aria-label="Payment Method"
            >
              <Tab
                style={selectedTab == 0 ? activeTabColor : {}}
                onClick={() => this.handleTabChange(0)}
                label={"Payments"}
              />
              <Tab 
                style={selectedTab == 1 ? activeTabColor : {}}
                onClick={() => this.handleTabChange(1)} 
                label={"Taxation History"} />
            </Tabs>
          </Box>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
        
            <Box p={4}>
              {selectedTab === 0 && <div value={0} index={0}>
                <ListView history={this.props.history}/>
              </div>}
              {selectedTab === 1 && <div value={1} index={1}>
                 <TaxationHistory history={this.props.history}/>
              </div>}
            </Box>
         
        </Grid>
      </div>
    );
  }
}


export default connect(state => (
  {...state.clientConfig }
))(RewardsTabs)