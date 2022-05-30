import React, { Component, Fragment } from 'react'
import { MenuItem, TextField, Icon, InputAdornment, OutlinedInput, Grid, Paper, Box, Button, Collapse, CircularProgress, Table, TableHead, TableRow, TableBody, TableFooter, TablePagination, TableCell, TableSortLabel } from '@material-ui/core'
import { StyledTableHead, StyledTableRow, StyledTableCell, StyledTableFooter } from '~/components/StyledTable'
import './styles.scss';
import { GetW9Year } from '~/redux/helpers/paymentmethod';
import { fetchTaxationHistory } from "~/redux/actions/payments";
import moment from 'moment';
import CurrencyInput from '~/components/CurrencyInput';
import { connect } from 'react-redux';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import {AlertDialog} from "~/components/Dialogs/index";
import { GetPaymentMethods } from "~/redux/helpers/paymentmethod";
import {fetchRewardTypeList} from "~/redux/actions/rewards";
import currency from 'currency.js';
import { getColorCodeByClientCode } from "~/services/config/index";

class TaxationHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
            isLoading: false,
            SortColumn: "",
            SortOrder:  "ASC",
            fetchingList: false,
            rowsPerPage: 10,
			page: 1,
			filterOpen: false,
			year: new Date().getFullYear(),
			years: [],
			PromotionName: "",
			RewardId: "",
			RewardAmount: 0,
			PaymentMethod: "",
			RewardType: 0,
			RedeemDate: "",
			RewardAvailabledate: "",
			errorDialog: false,
			paymentMethods: [],
			rewardTypeList: []
		}
	}

	componentDidMount() {
	    const { accessToken } = this.props.user.info;
        this.setState({isLoading: true}, () => {
            this._fetchTaxationHistory().then(() => {
				GetW9Year({accessToken}).then(response => {
					GetPaymentMethods().then(_res => {
					this.setState({paymentMethods: _res.Data})
					this.setState({years: response.Data }, () => {
						const { years } = this.state;
						let year = Math.max.apply(Math, years && years.map(function(o) { return o.value; }));
						this.setState({year});
					})
				    this.setState({isLoading: false})		
					})
					this._fetchRewardTypeList();		
				})
            })
        })
	}

	_fetchRewardTypeList () {
		this.props.dispatch(fetchRewardTypeList()).then((response) => {
			if (!response)
				return false;
			this.setState({
				rewardTypeList: response
			})            
		})
	}

	clearFilter() {
		this.setState({
			isLoading: true,	
			PromotionName: "",
		    RewardId: "",
		    RewardAmount: 0,
		    PaymentMethod: "",
			RewardType: "",
			year: new Date().getFullYear(),
			RedeemDate: "",
			RewardAvailabledate: ""
		}, () => {
			console.log(this._fetchTaxationHistory())
			this._fetchTaxationHistory().then(() => {
				this.setState({isLoading: false})
			})
		})
	}

    handleError() {
       this.setState({errorDialog: true})
    }

    _fetchTaxationHistory = async (SortColumn, SortOrder) => {
        const { accessToken, portbu, oeid } = this.props.user.info;
        const {page, rowsPerPage, year, PromotionName, RewardId, RewardAmount, PaymentMethod, RewardType, RedeemDate, RewardAvailabledate} = this.state
       return this.props.dispatch(fetchTaxationHistory({PromotionName, RewardId, RewardAmount, PaymentMethod, RewardType, RedeemDate, accessToken, portbu: portbu, oeid: oeid, pageNo: page, pageSize: rowsPerPage, year: year, SortColumn: SortColumn || "", SortOrder: SortOrder || "", RewardAvailabledate}));
    }

	handlePageChange = (event, page) => {
		const { SortColumn, SortOrder } = this.state;
		let newSortOrder = SortOrder === "asc" ? "ASC" : "DESC";
		this.setState({
			page: page + 1,
			isLoading: true
		}, () => this._fetchTaxationHistory(SortColumn, newSortOrder).then(() => {
			this.setState({isLoading: false})
		}))
	}

	handleRowsPerPageChange = (event) => {
		const { SortColumn, SortOrder } = this.state;
		let newSortOrder = SortOrder === "asc" ? "ASC" : "DESC";
		this.setState({
			page: 1,
			isLoading: true,
			rowsPerPage: parseInt(event.target.value, 10)
		}, () => this._fetchTaxationHistory(SortColumn, newSortOrder).then(() => {
			this.setState({ isLoading: false})
		}))
	}

	
	handleSorting(SortColumn) {
		const { SortOrder } = this.state;
		let newSortOrder = SortOrder === "asc" ? "desc" : "asc";
		this.setState({ SortColumn: SortColumn, SortOrder: newSortOrder, isLoading: true, expandedItem : null }, () => {
			this._fetchTaxationHistory(SortColumn, newSortOrder === "asc" ? "ASC" : "DESC").then(() => {
				this.setState({isLoading: false})
			})
		});
	}

	toggleFilter() {
		this.setState({filterOpen: !this.state.filterOpen});
	}

	renderAlertDialog(title, message) {
		return <AlertDialog title={title} message={message}>
			
		</AlertDialog>
	}

	render() {
        const { SortColumn, SortOrder, isLoading, fetchingList, page, rowsPerPage, rewards, year, years, filterOpen, PromotionName, RewardId, RewardAmount, RewardType, PaymentMethod, RedeemDate, errorDialog, RewardAvailabledate, paymentMethods, rewardTypeList  } = this.state;
		const { taxationHistory } = this.props;
		const { configs } = this.props.clientConfig;
        let buttonPrimaryColor = getColorCodeByClientCode(configs, "C00015");
		let buttonSecondaryColor = getColorCodeByClientCode(configs, "C00019");
		let buttonPrimartTextColor = getColorCodeByClientCode(configs, "C00020");

		if (isLoading) {
			return <Box display="flex" p={10} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
		}
		return (
			<Grid container justify="center" id="taxationHistory-list-view">
				
                 <Grid item xs={12} id={"payment-tracker"} style={{overflowX: 'auto'}}>
                    <Box style={{float: "right"}} display="flex" p={1} justifyContent="right" alignItems="right">
					<label className="hiddenLabel" for="year">Year</label>
                       <TextField
                        select
                        style={{width: "200px", backgroundColor:"#fff"}}
					   	fullWidth={false}
					   	autoComplete="off"
					   	variant="outlined"
					   	value={year || ""}
					   	onChange={(val) => {
							   this.setState({year: val.target.value, isLoading: true}, () => {
								   this._fetchTaxationHistory().then(() => {
									   this.setState({isLoading: false})
								   })
							   })
						   }}
						id="year"
					   	// inputProps={{
					   	// 	ref: el => this.PaymentMethodId = el
					   	// }}
					   	>
					   	   {years && years.map(obj => <MenuItem value={obj.value}>{obj.label}</MenuItem>)}
					   	</TextField>
                    </Box>
                </Grid>

				<Grid item xs={12} id={"payment-tracker"} style={{overflowX: 'auto'}}>
					<div className="list-header">
                        <Grid item xs={5}>
                            <span className="item-count">YTD Total {currency(taxationHistory.rollupAmount, { formatWithSymbol: true }).format()}</span>
                        </Grid>
						<Grid item xs={2}>
							<Box style={{float: "right" }} display="flex" py={0} px={1} justifyContent="flex-end" alignItems="right">
								<img className="filter-button" onClick={this.toggleFilter.bind(this)} src={require('~/assets/images/filter-icon.png')} alt="filter-icon" />
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
											value={RewardId || ""}
											onChange={event => this.setState({ RewardId: event.target.value })}
											inputProps={{
												ref: el => this.RewardId = el
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
											value={PaymentMethod || ""}
											onChange={event => this.setState({ PaymentMethod: event.target.value })}
											inputProps={{
												ref: el => this.PaymentMethod = el
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
										<label className="inputLabel" for="rewardtype">Reward Type</label>
										<TextField
											select
											fullWidth={true}
											autoComplete="off"
											variant="outlined"
											value={RewardType || ""}
											onChange={event => this.setState({ RewardType: event.target.value })}
											inputProps={{
												ref: el => this.RewardType = el
											}}
											id="rewardtype"
										>
											{rewardTypeList && rewardTypeList.map(elm => 
											<MenuItem value={elm.value}>{elm.label}</MenuItem> )}
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

								<Grid item xs={6} sm={3}>
									<Box mx={1}>
										<label className="inputLabel" for="rewardavailable">Reward Available date</label>
										<DatePicker
											customInput={<OutlinedInput
												variant="outlined"
												className="full-width"
												endAdornment={<InputAdornment position="end"><DateRangeIcon /></InputAdornment>}
											/>}
											inputProps={{
												ref: el => this.RewardAvailabledate = el
											}}
											className="datePicdesign dateField"
											selected={RewardAvailabledate || ""}
											onChange={RewardAvailabledate => this.setState({ RewardAvailabledate })}
											id="rewardavailable"
										/>
									</Box>
								</Grid>

								<Grid item xs={6} sm={3}>
								 <Box mx={1} display="flex" justifyContent="flex-end" alignItems="center" className={"filter_buttons"}>
								  <Link to="#" style={{ marginTop: '30px' }}> 
								        <Button style={{color: buttonPrimartTextColor, backgroundColor: buttonSecondaryColor}} className={"button clear"} onClick={this.clearFilter.bind(this)} variant="outlined" color="primary" className="clearBtn">Clear</Button> 
								  </Link>
								  {fetchingList ? (
										<Box width="100px" display="flex" mt={1.875} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
										) : (
									<Link to="#" style={{ marginTop: '30px' }}>
										<Button style={{color: buttonPrimartTextColor, backgroundColor: buttonPrimaryColor}} className={"button search"}  onClick={() =>  
											this.setState({fetchingList: true, isLoading: true}, () => {
												this._fetchTaxationHistory().then(() => {
													this.setState({fetchingList: false, isLoading: false})
											    })
										})} variant="contained" color="primary">Search
										</Button> 
									</Link>)}
									</Box> 
								</Grid>
							</Grid>
						</Collapse>
					</Grid>
				<Grid item xs={12} id={"payment-tracker"} style={{overflowX: 'auto'}}>
					<Table>
						<StyledTableHead>
							<TableRow>
                                <StyledTableCell sortDirection={SortColumn === 'PromotionName' ? SortOrder : false}>
                                    <TableSortLabel
                                        active={SortColumn === 'PromotionName'}
                                        direction={SortColumn === 'PromotionName'  ? SortOrder : 'asc'}
                                        onClick={() => this.handleSorting('PromotionName')}
                                    >
                                        Promotion Name
                                     {SortColumn === 'PromotionName' ? (
                                            <span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
                                                {SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </span>
                                        ) : null}
                                    </TableSortLabel>
                                </StyledTableCell>

                                <StyledTableCell sortDirection={SortColumn === "portbu" ? SortOrder : false}>
                                    <TableSortLabel
                                        active={SortColumn === 'RewardId'}
                                        direction={SortColumn === 'RewardId' ? SortOrder : 'asc'}
                                        onClick={() => this.handleSorting('RewardId')}
                                    >
                                        Reward ID
                                     {SortColumn === 'RewardId' ? (
                                            <span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
                                                {SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </span>
                                        ) : null}
                                    </TableSortLabel>
                                </StyledTableCell>

                                <StyledTableCell sortDirection={SortColumn === 'RewardAmount' ? SortOrder : false}>
                                    <TableSortLabel
                                        active={SortColumn === 'RewardAmount'}
                                        direction={SortColumn === 'RewardAmount' ? SortOrder : 'asc'}
                                        onClick={() => this.handleSorting('RewardAmount')}
                                    >
                                        Reward Amount
                                     {SortColumn === 'RewardAmount' ? (
                                            <span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
                                                {SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </span>
                                        ) : null}
                                    </TableSortLabel>
                                </StyledTableCell>
								
								<StyledTableCell>
									<TableSortLabel
										active={SortColumn === 'PaymentMethod'}
										direction={SortColumn === 'PaymentMethod' ? SortOrder : 'asc'}
										onClick={() => this.handleSorting('PaymentMethod')}
									>
										Payment Method
                                         {SortColumn === 'PaymentMethod' ? (
											<span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
												{SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
											</span>
										) : null}
									</TableSortLabel>
								</StyledTableCell>

								<StyledTableCell>
									<TableSortLabel
										active={SortColumn === 'RewardType'}
										direction={SortColumn === 'RewardType' ? SortOrder : 'asc'}
										onClick={() => this.handleSorting('RewardType')}
									>
										Reward Type
                                         {SortColumn === 'RewardType' ? (
											<span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
												{SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
											</span>
										) : null}
									</TableSortLabel>
								</StyledTableCell>

								<StyledTableCell>
									<TableSortLabel
										active={SortColumn === 'RedeemDate'}
										direction={SortColumn === 'RedeemDate' ? SortOrder : 'asc'}
										onClick={() => this.handleSorting('RedeemDate')}
									>
										Redeemed Date
                                         {SortColumn === 'RedeemDate' ? (
											<span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
												{SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
											</span>
										) : null}
									</TableSortLabel>
								</StyledTableCell>

								<StyledTableCell sortDirection={SortColumn === 'RewardAvailabledate' ? SortOrder : false}>
                                    <TableSortLabel
                                        active={SortColumn === 'RewardAvailabledate'}
                                        direction={SortColumn === 'RewardAvailabledate'  ? SortOrder : 'asc'}
                                        onClick={() => this.handleSorting('RewardAvailabledate')}
                                    >
                                 	Reward Available date
                                     {SortColumn === 'RewardAvailabledate' ? (
                                            <span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
                                                {SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </span>
                                        ) : null}
                                    </TableSortLabel>
                                </StyledTableCell>
							
							</TableRow>
						</StyledTableHead>
						<TableBody>
							{isLoading ? (
								<TableRow>
									<TableCell colSpan={10}>
										<Box display="flex" p={5} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
									</TableCell>
								</TableRow>
							) : (
									taxationHistory.list && taxationHistory.list.map((item, index) => (
										<Fragment key={item.rewardid}>
											<StyledTableRow onClick={() => {}}>
												<StyledTableCell>{item.PromotionName}</StyledTableCell>
												<StyledTableCell>{item.RewardName}</StyledTableCell>
									            <StyledTableCell>{currency(item.rewards, { formatWithSymbol: true }).format()}</StyledTableCell>
                                                <StyledTableCell>{item.PaymentMethodCode}</StyledTableCell>
                                                <StyledTableCell><span className={`bubble ${item.RewardType === "RW" ? "rw" : "ss"}`}>{item.RewardType}</span></StyledTableCell>
												<StyledTableCell>{item.RedeemedDate ? moment.utc(item.RedeemedDate).local().format("MM/DD/YYYY") : ""}</StyledTableCell>
												<StyledTableCell>{item.RewardAvailabledate ? moment.utc(item.RewardAvailabledate).local().format("MM/DD/YYYY") : ""}</StyledTableCell>
											</StyledTableRow>
										</Fragment>
									))
								)}
						</TableBody>
						<StyledTableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[10, 25, 50, 100]}
									colSpan={12}
                                    count={taxationHistory.list &&
                                         taxationHistory.list[0] && 
                                         taxationHistory.list[0].TotalCount || 0}
									rowsPerPage={rowsPerPage}
									page={page - 1}
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
				{errorDialog && this.renderAlertDialog("title", "message")}
			</Grid >
        )
	}
}

export default connect(state => (
	{ ...state.user, ...state.payments, ...state.rewardType, ...state.clientConfig }
))(TaxationHistory)
