import React, { Component, Fragment } from 'react'
import { Grid, Box } from '@material-ui/core';
import './styles.scss'
import currency from 'currency.js';

export default class FundOverview extends Component {
    
    findColor=(rewardId) => {
        const selectColor = [{
            color: '#286787',
            value: 4
        }, {
            color: '#a0bccb',
            value: 6
        }, {
            color: '#a0bccb',
            value: 7
        }, {
            color: '#a0bccb',
            value: 8
        }, {
            color: '#d8667f',
            value: 12
        }, {
            color: '#4ba3c3',
            value: 11
        }, {
            color: '#d8d8d8',
            value: 14
        }, {
            color: '#a0bccb',
            value: 9
        }
        , {
            color: '#f39F90',
            value: 10
        }];
        const searchColor= selectColor.find(k => k.value==parseInt(rewardId));
        return searchColor == undefined? "#fff" :searchColor.color;
    }

	render() {
		const params = this.props.params || {
			showTitle: true,
		}

        const assignedFunds = this.props.assignedFunds;
        const fundTotal = assignedFunds && assignedFunds.data && assignedFunds.data.reduce(function (accumulator, currentValue) {
                            return accumulator + currentValue.RewardAmount;
                        }, 0);
		const expiredFunds = this.props.expiredFunds;
        
		return (
			<div id="fundOverview">
				<div className="fundsContainer">
					<Grid container>
						{params.title && (
							<Grid item md={12}>
								<div className="fundoverViewtext">
									{params.title}
								</div>
							</Grid>
						)}
						{assignedFunds && (
							<Fragment>
								<Grid container justify="flex-end" direction="row" alignItems="center">
									{assignedFunds.data && assignedFunds.data.map((item, index) => (
                                        <Box m={2} key={index}>
											<div className="statusWrap">
												<div className="statusText"> <span className="statusColor" style={{ backgroundColor: item.BackgroundColor || "#fff" }}></span>{item.RewardStatusName}</div>
												<div className="statusAmount">{currency(item.RewardAmount, { formatWithSymbol: true }).format()}</div>
											</div>
										</Box>
									))}
								</Grid>
								<Grid container>
									<Grid item md={12}>
										{assignedFunds.data && (
											<div className="statusBarColor">
												{assignedFunds.data.map((item, index) => {
                                                    let newWidth =0;
                                                    if(fundTotal >0){
                                                         newWidth = (item.RewardAmount / fundTotal * 100);
                                                    }
													return <div key={index} className="statusProcessColor" style={{ backgroundColor: item.BackgroundColor || "#fff", width:`${newWidth}%`  }}></div>
												}
                                                )}
											</div>
										)}
									</Grid>
								</Grid>
							</Fragment>
						)}
						{expiredFunds && (
							<Fragment>
								<Grid container justify="flex-end" direction="row" alignItems="center">
									{expiredFunds.data && expiredFunds.data.map(item => (
										<Grid item md={1}>
											<div className="statusWrap">
												<div className="statusText"> <span className="statusColor" style={{ backgroundColor: `${item.color}` }}></span>{item.name}</div>
												<div className="statusAmount">{`$${item.value}`}</div>
											</div>
										</Grid>
									))}
								</Grid>
								<Grid container className="section-container">
									<Grid item md={3} className="section-title"> {expiredFunds.total && `Expired Funds - ${expiredFunds.total}`}</Grid>
									<Grid item md={9}>
										{expiredFunds.data && (
											<div className="statusBarColor">
												{expiredFunds.data.map(item => (
													<div className="statusProcessColor" style={{ backgroundColor: `${item.color}`, width: `${item.value / assignedFunds.total * 100}%` }}></div>
												))}
											</div>
										)}
									</Grid>
								</Grid>
							</Fragment>
						)}
					</Grid>
				</div>
			</div>
		)

	}
}

