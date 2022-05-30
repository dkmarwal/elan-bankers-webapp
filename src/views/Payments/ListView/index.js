import React, { Component, Fragment } from 'react'
import { MenuItem, TextField, Icon, InputAdornment, OutlinedInput, Grid, Paper, Box, Button, Collapse, CircularProgress, Table, TableHead, TableRow, TableBody, TableFooter, TablePagination, TableCell, TableSortLabel } from '@material-ui/core'
import { StyledTableHead, StyledTableRow, StyledTableCell, StyledTableFooter } from '~/components/StyledTable'
import FilterListIcon from '@material-ui/icons/FilterList';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import moment from 'moment-timezone'
import FundOverview from '~/components/FundOverview'
import { fetchPaymentsList, fetchRedeemRewards, fetchRewardsOverview } from '~/redux/actions/payments';
import {GetPaymentMethods} from "~/redux/helpers/paymentmethod"
import { withRouter } from 'react-router-dom';
// import { checkW9FormExistance } from "~/redux/helpers/redeem.js";
import { createTicket } from '~/redux/actions/support';
import DatePicker from "react-datepicker";
import currency from 'currency.js';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import './styles.scss'
import payment from '~/redux/reducers/payment';
import RedeemRewards from '~/components/Steppers/redeemRewards';
import CurrencyInput from '~/components/CurrencyInput';
import { AlertDialog } from '~/components/Dialogs'
import { getColorCodeByClientCode } from "~/services/config/index";

const PaymentStatusList = [{
	label: 'Initialized',
	value: 'INITIALIZED'
}, {
	label: 'Draft',
	value: 'DRAFT'
}, {
	label: 'Open',
	value: 'OPEN'
}, {
	label: 'In Progress',
	value: 'IN PROGRESS'
}, {
	label: 'Closed',
	value: 'CLOSED'
}, {
	label: 'Expired',
	value: 'EXPIRED'
}]

class PaymentsListView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			fetchingList: true,
			fetchingDetail: false,
			expandedItem: null,
			showFilter: false,
			page: 0,
			rowsPerPage: 10,
			filterOpen: false,
			PromotionId: '',
			RewardsId: '',
			RewardAmount: '',
			PaymentMethodId: '',
			RedeemDate: null,
			PromotionName: null,
			RedeemRewards: [],
			RewardsOverview: [],
			createTicketProgress: false,
			errorDialog: false,
			SortColumn: "",
			SortOrder: "",
			paymentMethods: []
		}
	}

	componentDidMount() {
		const { accessToken, portbu, oeid } = this.props.user.info;
		this.updatePaymentsList();
		this.props.dispatch(fetchRewardsOverview({ accessToken, portbu, oeid })).then((res) => {
			GetPaymentMethods().then(_res => {
				this.setState({paymentMethods: _res.Data})
				this.setState({ RewardsOverview: this.props.payments.rewardsOverview });	
			})
			if (!res) this.handleError();
		}).catch(err => {
			this.handleError();
		})
	}

	handleError() {
		this.setState({ errorDialog: true });
	}

	toggleListItem = (item, index) => {
		const { accessToken, portbu, oeid } = this.props.user.info;

		let { expandedItem } = this.state
		if (expandedItem === index) {
			expandedItem = null
		} else {
			expandedItem = index
		}

		this.setState({
			fetchingDetail: true,
			expandedItem,
		}, () => {
			this.props.dispatch(fetchRedeemRewards({ accessToken, portbu, oeid, rewardId: item.RewardId })).then((res) => {
				// checkW9FormExistance({PBU: portbu, OEID: oeid, accessToken}).then((response) => {
					// console.log(response)
				//console.log("redeem rewards step", this.props.payments.redeemRewards);
				this.setState({
					fetchingDetail: false,
					RedeemRewards: this.props.payments.redeemRewards,
				}, () => {
					setTimeout(() => {
						this.setState({ fetchingDetail: false })
					}, 1000)
				});
				if (!res) this.handleError();				
			// })
			}).catch(err => {
				this.handleError();
			})

		});
	}

	filterCliCkFun = () => {
		this.setState({
			filterOpen: !this.state.filterOpen
		})
	}

	clearFilter = () => {
		this.setState({
			PromotionId: '',
			RewardsId: '',
			RewardAmount: '',
			PaymentMethodId: '',
			RedeemDate: null,
			Status: null,
			PromotionName: ''
		}, () => this.updatePaymentsList())
	}

	handlePageChange = (event, page) => {
		const { SortColumn, SortOrder } = this.state;
		let newSortOrder = SortOrder === "asc" ? "ASC" : "DESC";
		this.setState({
			page
		}, () => this.updatePaymentsList(SortColumn, newSortOrder))
	}

	handleRowsPerPageChange = (event) => {
		const { SortColumn, SortOrder } = this.state;
		let newSortOrder = SortOrder === "asc" ? "ASC" : "DESC";
		this.setState({
			page: 0,
			rowsPerPage: parseInt(event.target.value, 10)
		}, () => this.updatePaymentsList(SortColumn, newSortOrder))
	}

	handleSorting(SortColumn) {
		const { SortOrder } = this.state;
		let newSortOrder = SortOrder === "asc" ? "desc" : "asc";
		this.setState({ SortColumn: SortColumn, SortOrder: newSortOrder, loading: true, expandedItem : null }, () => {
			this.updatePaymentsList(SortColumn, newSortOrder === "asc" ? "ASC" : "DESC");
		});
	}

	updatePaymentsList = (SortColumn, SortOrder) => {
		const { PromotionId, PromotionName, RewardsId, RewardAmount, PaymentMethodId, RedeemDate, page, rowsPerPage, RewardsOverview } = this.state
		const { accessToken, portbu, oeid } = this.props.user.info;
		this.setState({
			fetchingList: true
		}, () => {
			this.props.dispatch(fetchPaymentsList({ accessToken, PBU: portbu, OEID: oeid, PromotionId, PromotionName, RewardsId, RewardAmount, PaymentMethodId, RedeemDate, PageNo: page + 1, PageSize: rowsPerPage, SortColumn, SortOrder })).then((response) => {
				console.log("fetchPaymentsList", response);
				this.setState({
					isLoading: false,
					fetchingList: false
				});
				if (!response) this.handleError();
			}).catch(err => {
				this.handleError();
			})
		})
	}

	findColor = (rewardId) => {
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
		const searchColor = selectColor.find(k => k.value == parseInt(rewardId));
		return searchColor == undefined ? "#fff" : searchColor.color;
	}

	handleCreateTicket = (item) => {
		this.setState({
			createTicketProgress: true
		}, async () => {
			await this.props.dispatch(createTicket()).then((response) => {
				if (!response.error) {
					const { history } = this.props;
					console.log("success")
					const TicketNo = response.ticketNo;
					console.log(this.props);
					history.push({ pathname: `/support/ticket/${item.RewardId}`, state: { paymentDetail: item, TicketNo: TicketNo } });
				} else {
					this.handleError();
					this.setState({
						createTicketProgress: false
					})
				}
			}).catch(err => {
				console.log(err, "create ticket err")
				this.handleError();
			})
		})
	}

	render() {
		const { RewardsOverview, filterOpen, createTicketProgress, isLoading, fetchingList, page, rowsPerPage, expandedItem, fetchingDetail, showFilter, PBU, OEID, PromotionId, RewardsId, RewardAmount, PaymentMethodId, RedeemDate, PromotionName, errorDialog, SortColumn, SortOrder, paymentMethods } = this.state;
		const { user, payments } = this.props;
		const { configs } = this.props.clientConfig;
        let buttonPrimaryColor = getColorCodeByClientCode(configs, "C00015");
		let buttonSecondaryColor = getColorCodeByClientCode(configs, "C00019");
		let buttonPrimartTextColor = getColorCodeByClientCode(configs, "C00020");
		//console.log("payment", this.props);
		if (isLoading) {
			return <Box display="flex" p={10} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
		}

		return (
			<Fragment>

				<Grid container justify="center" id="promotion-list-view">
					{/* <Grid item md={11}> 
					<Box display="flex" justifyContent="flex-end">
						<TextField
							select
							margin="dense"
							value={0}
							
							style={{background:'#fff', width:'150px'}}
							autoComplete="off"
							variant="outlined"
							>
							<MenuItem value={0}>Last 6 months</MenuItem>
							<MenuItem value={1}>2019</MenuItem>
							<MenuItem value={2}>2018</MenuItem>
						</TextField>
					</Box>
				</Grid> */}
					<Grid item xs={12}>
						<Box my={1}>
							<Paper square display="flex">
								<FundOverview
									params={{
										title: RewardsOverview.params && RewardsOverview.params.title || "Rewards Overview",
									}}
									assignedFunds={{
										data: RewardsOverview.assignedFunds && RewardsOverview.assignedFunds.data || null,
									}}
									expiredFunds={{
									}}
								/>
							</Paper>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<div className="list-header">
							<Grid item xs={2}>
								<span className="item-count">Total {payments.totalCount}</span>
							</Grid>
							<Grid item xs={2}>
								<Box display="flex" justifyContent="flex-end" alignItems="right">
									<img className="filter-button" onClick={this.filterCliCkFun} src={require('~/assets/images/filter-icon.png')} alt="filter-icon" />
								</Box>
							</Grid>
						</div>
					</Grid>
					<Grid item xs={12}>
						<Collapse hidden={!filterOpen} in={filterOpen}>
							<Grid container={filterOpen} justify="space-between" hidden className="filterWrap">
								<Grid item xs={6} sm={3}>
									<Box mx={1}>
										<label className="inputLabel" for="promotionname">Promotion Name</label>
										<TextField
											fullWidth={true}
											autoComplete="off"
											variant="outlined"
											value={PromotionName || ""}
											onChange={event => this.setState({ PromotionName: event.target.value })}
											inputProps={{
												ref: el => this.PromotionName = el
											}}
											id="promotionname"
										/>
									</Box>
								</Grid>
								<Grid item xs={6} sm={3}>
									<Box mx={1}>
										<label className="inputLabel" for="rewardid">Reward ID</label>
										<TextField
											fullWidth={true}
											autoComplete="off"
											variant="outlined"
											value={RewardsId || ""}
											onChange={event => this.setState({ RewardsId: event.target.value })}
											inputProps={{
												ref: el => this.RewardsId = el
											}}
											id="rewardid"
										/>
									</Box>
								</Grid>
								<Grid item xs={6} sm={3}>
									<Box mx={1} id="reward-amount">
										<label className="inputLabel" for="rewardamount">Reward Amount($)</label>
										<CurrencyInput placeholder="" type="text"
											value={RewardAmount || ''}
											onChange={event => this.setState({ RewardAmount: event.target.value })}
											id="rewardamount"
										/>
									</Box>
								</Grid>
								<Grid item xs={6} sm={3}>
									<Box mx={1}>
										<label className="inputLabel" for="paymentmethod">Payment Method</label>
										<TextField
											select
											fullWidth={true}
											autoComplete="off"
											variant="outlined"
											value={PaymentMethodId || ""}
											onChange={event => this.setState({ PaymentMethodId: event.target.value })}
											inputProps={{
												ref: el => this.PaymentMethodId = el
											}}
											id="paymentmethod"
										>
											{paymentMethods && paymentMethods.map(method => 
											    <MenuItem value={method.ID}>{method.PaymentMethodName}</MenuItem>
											)}
										</TextField>
									</Box>
								</Grid>

								<Grid item xs={6} sm={3}>
									<Box mx={1}>
										<label className="inputLabel" for="redeemdate">Redeemed Date</label>
										<DatePicker
											customInput={<OutlinedInput
												variant="outlined"
												className="full-width"
												endAdornment={<InputAdornment position="end"><DateRangeIcon /></InputAdornment>}
											/>}
											inputProps={{
												ref: el => this.RedeemDate = el
											}}
											className="datePicdesign dateField"
											selected={RedeemDate || ""}
											onChange={RedeemDate => this.setState({ RedeemDate })}
											id="redeemdate"
										/>
									</Box>
								</Grid>
								<Grid item xs={6} sm={6}>
									<Box mx={1} display="flex" justifyContent="flex-end" alignItems="center">
										<Link to="#" style={{ marginTop: '30px' }}> <Button onClick={this.clearFilter} style={{color: buttonPrimartTextColor, backgroundColor: buttonSecondaryColor}} variant="outlined" color="primary" className="clearBtn">Clear</Button> </Link>
										{fetchingList ? (
											<Box width="100px" display="flex" mt={1.875} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
										) : (
												<Link to="#" style={{ marginTop: '30px' }}> <Button style={{ color: buttonPrimartTextColor, backgroundColor: buttonPrimaryColor}} onClick={() => this.updatePaymentsList()} variant="contained" color="primary">Search</Button> </Link>
											)}
									</Box>
								</Grid>
							</Grid>
						</Collapse>
					</Grid>

					<Grid item xs={12}>
						<Table>
							<StyledTableHead>
								<TableRow>
									<StyledTableCell>
										<TableSortLabel
											active={SortColumn === "PromotionName"}
											direction={SortColumn === "PromotionName" ? SortOrder : 'asc'}
											onClick={() => this.handleSorting("PromotionName")}
										>
											Promotion Name
                                         {SortColumn === "PromotionName" ? (
												<span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
													{SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
												</span>
											) : null}
										</TableSortLabel>
									</StyledTableCell>
									<StyledTableCell>
										<TableSortLabel
											active={SortColumn === "RewardId"}
											direction={SortColumn === "RewardId" ? SortOrder : 'asc'}
											onClick={() => this.handleSorting("RewardId")}
										>
											Reward ID
                                         {SortColumn === "RewardId" ? (
												<span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
													{SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
												</span>
											) : null}
										</TableSortLabel>
									</StyledTableCell>
									<StyledTableCell>
										<TableSortLabel
											active={SortColumn === "RewardAmount"}
											direction={SortColumn === "RewardAmount" ? SortOrder : 'asc'}
											onClick={() => this.handleSorting("RewardAmount")}
										>
											Reward Amount($)
                                         {SortColumn === "RewardAmount" ? (
												<span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
													{SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
												</span>
											) : null}
										</TableSortLabel>
									</StyledTableCell>
									<StyledTableCell>
										<TableSortLabel
											active={SortColumn === "PaymentMethod"}
											direction={SortColumn === "PaymentMethod" ? SortOrder : 'asc'}
											onClick={() => this.handleSorting("PaymentMethod")}
										>
											Payment Method
                                         {SortColumn === "PaymentMethod" ? (
												<span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
													{SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
												</span>
											) : null}
										</TableSortLabel>
									</StyledTableCell>
									<StyledTableCell>
										<TableSortLabel
											active={SortColumn === "RedeemDate"}
											direction={SortColumn === "RedeemDate" ? SortOrder : 'asc'}
											onClick={() => this.handleSorting("RedeemDate")}
										>
											Redeemed Date
                                         {SortColumn === "RedeemDate" ? (
												<span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
													{SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
												</span>
											) : null}
										</TableSortLabel>
									</StyledTableCell>
									<StyledTableCell>
										<TableSortLabel
											active={SortColumn === "RewardStatus"}
											direction={SortColumn === "RewardStatus" ? SortOrder : 'asc'}
											onClick={() => this.handleSorting("RewardStatus")}
										>
											Status
                                         {SortColumn === "RewardStatus" ? (
												<span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
													{SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
												</span>
											) : null}
										</TableSortLabel>
									</StyledTableCell>
								</TableRow>
							</StyledTableHead>
							<TableBody>
								{fetchingList ? (
									<TableRow>
										<TableCell colSpan={10}>
											<Box display="flex" p={5} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
										</TableCell>
									</TableRow>
								) : (
										payments.list && payments.list.map((item, index) => (
											<Fragment key={item.RewardId}>
												<StyledTableRow onClick={e => this.toggleListItem(item, index)}>
													<StyledTableCell>{item.PromotionName}</StyledTableCell>
													<StyledTableCell>{item.RewardName}</StyledTableCell>
													<StyledTableCell> {currency(item.RewardAmount, { formatWithSymbol: true }).format()}</StyledTableCell>
													<StyledTableCell>{item.PaymentMethod}</StyledTableCell>
													<StyledTableCell>{item.RedeemDate ? moment.utc(item.RedeemDate).local().format("MM/DD/YYYY") : ""}</StyledTableCell>
													<StyledTableCell><span style={{ padding: 5, backgroundColor: item.BackgroundColor }}>{item.RewardStatus}</span></StyledTableCell>
												</StyledTableRow>
												<TableRow>
													<TableCell colSpan={10} className="no-padding">
														<Collapse hidden={!(expandedItem === index)} in={expandedItem === index}>
															<div className="expanded-view">
																{fetchingDetail ? (
																	<Box display="flex" p={10} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
																) : (
																		<Fragment>
																			<RedeemRewards data={this.state.RedeemRewards} paymentDetail={item} createTicketProgress={createTicketProgress} createTicket={() => this.handleCreateTicket(item)} />
																		</Fragment>
																	)}
															</div>
														</Collapse>
													</TableCell>
												</TableRow>
											</Fragment>
										))
									)}
							</TableBody>
							<StyledTableFooter>
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[10, 25, 50, 100]}
										colSpan={10}
										count={payments.totalCount || 0}
										rowsPerPage={rowsPerPage}
										page={page}
										SelectProps={{
											inputProps: { 'aria-label': 'rows per page' },
											native: true,
										}}
										onChangePage={this.handlePageChange}
										onChangeRowsPerPage={this.handleRowsPerPageChange}
									/>
								</TableRow>
							</StyledTableFooter>
						</Table>
					</Grid>
				</Grid>
				{errorDialog && <AlertDialog title={"OOPS!"} message={"Something went wrong, We're working on getting this fixed as soon as we can."} onConfirm={() => { this.setState({ errorDialog: false }) }} />}
			</Fragment>
		)
	}
}

export default connect(state => (
	{ ...state.user, ...state.payments, ...state.clientConfig }
))(PaymentsListView)
