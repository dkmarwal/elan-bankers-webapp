import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import RewardsTabs from './RewardsTabs/index';
import './styles.scss'

export class Payments extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path='/payments' component={RewardsTabs} />
                    {/* <Route exact path='/rewards/upload' component={FileUpload} /> */}
                    {/* <Route exact path='/rewards/upload/status/:FileRecordID' component={RewardsUploadStatus} />

                    {
                        // <Route exact path='/promotion/update/:promotionId' component={PromotionUpdateView} />
                    } */}
                </Switch>
            </Fragment>
        )
    }
}

export default Payments;