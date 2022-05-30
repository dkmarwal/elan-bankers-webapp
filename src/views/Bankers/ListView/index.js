import React, { Fragment } from "react";
import { MenuItem, TextField, Icon, InputAdornment, OutlinedInput, Grid, Paper, Box, Button, Collapse, CircularProgress, Table, TableHead, TableRow, TableBody, TableFooter, TablePagination, TableCell, TableSortLabel } from '@material-ui/core'
import { StyledTableHead, StyledTableRow, StyledTableCell, StyledTableFooter } from '~/components/StyledTable'
import DateRangeIcon from '@material-ui/icons/DateRange';
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import { fetchBankersRewards, fetchBankerDetails } from "~/redux/actions/bankers.js";
import { downloadBankerRewards } from "~/redux/helpers/banker.js";
import "./styles.scss";
import Cookies from "universal-cookie";
import moment from "moment-timezone";
import currency from 'currency.js';
import CurrencyInput from '~/components/CurrencyInput';
import { AlertDialog } from '~/components/Dialogs';
import DetailView from "../DetailView/";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { getColorCodeByClientCode } from "~/services/config/index";
const cookies = new Cookies(window.document.cookie);

class ListView extends React.Component {
	DateError = false;
	state = {
		loading: true,
		page: 0,
		detailPage: 0,
		rowsPerPage: 10,
		detailRowsPerPage: 10,
		filterOpen: false,
		RewardId: 0,
		LocationCode: "",
		OfficerId: "",
		OfficerName: "",
		PortBu: 0,
		LocationCode: "",
		OfficerId: "",
		OfficerName: "",
		RewardEarned: "",
		RewardRedeemed: "",
		PromotionName: "",
		PortfolioName: "",
		_Date: null,
		IAM: "",
		Todate: null,
		errorDialog: false,
        downloadProgress:false,
        fetchingDetail: false,
        expandedItem: null,
        bankerDetails: [],
        viewDetailPortBu    : "",
        viewDetailOfficerId: "",
        viewDetailPortfolioName: "",
        viewDetailPromotionName: "",
        viewDetailLocationCode: "",
        DSortColumn:"",
        DSortOrder:"",
        subTotal:0,
        errorMsg:null,
        clientInfo:null,
	}

    componentDidMount() {
		this.fetchData();
        const { configs } = this.props.clientConfig;
		//const lblOeid = getColorCodeByClientCode(configs, "C00022");
		const lblOeid = cookies.get("client") === "acg" ? 'P-ID' : 'Officer ID';
        this.setState({ clientInfo: {lblOEID: lblOeid } });
	}

    toggleListItem = (item, index) => {
		let { expandedItem } = this.state;
		if (expandedItem === index) {
			expandedItem = null
		} else {
			expandedItem = index
		}

		this.setState({
			fetchingDetail: true,
			expandedItem,
            viewDetailPortBu: item.PortBu,
            viewDetailOfficerId:item.OfficerId,
            viewDetailPortfolioName:item.PortfolioName,
            viewDetailPromotionName:item.PromotionName,
            viewDetailLocationCode:item.LocationCode,
		}, () => {
			this.fetchBankerDetails();
        });
	}

    fetchBankerDetails = ()=> {
        const {viewDetailPortBu, viewDetailOfficerId, viewDetailLocationCode, viewDetailPortfolioName, viewDetailPromotionName, DSortColumn, DSortOrder, detailPage, detailRowsPerPage} = this.state;
        const newSortOrder = DSortOrder === "asc" ? "ASC" : "DESC";

        this.props.dispatch(fetchBankerDetails({ PortBu:viewDetailPortBu, OfficerId: viewDetailOfficerId, LocationCode:viewDetailLocationCode, PortfolioName:viewDetailPortfolioName, PromotionName:viewDetailPromotionName, SortColumn: DSortColumn, SortOrder: newSortOrder, PageNo: detailPage + 1, PageSize: detailRowsPerPage})).then((res) => {

            this.setState({
                fetchingDetail: false,
                bankerDetails: this.props.bankers.details,
                subTotal: this.props.bankers.subtotalCount,
            }, () => {
                setTimeout(() => {
                    this.setState({ fetchingDetail: false })
                }, 1000)
            });

            if (!res) this.handleError();

        }).catch(err => {
            this.handleError();
        })
    }

    handleError() {
		this.setState({ errorDialog: true, fetchingDetail:false });
	}

	fetchData(SortColumn, SortOrder) {
		let IAM = Number(new Cookies().get("am") && new Cookies().get("am"));
        let PortBu = new Cookies().get("portbu") && new Cookies().get("portbu");
		const { RewardId, LocationCode, OfficerId, OfficerName, RewardEarned, RewardRedeemed, PromotionName, PortfolioName, _Date, page, rowsPerPage, Todate } = this.state;
		this.setState({
			loading: true
		}, () => {
			this.props.dispatch(fetchBankersRewards({ RewardId, PortBu, PromotionName, PortfolioName, LocationCode, OfficerId, OfficerName, RewardEarned, RewardRedeemed, _Date, IAM, PageNo: page + 1, PageSize: rowsPerPage, Todate, SortColumn, SortOrder })).then((res) => {
				this.setState({
					loading: false
				})
				if (res === false) {
					this.handleError();
				}
			}).catch(err => {
				this.handleError();
			})
		})
    }

	handlePageChange = (event, page) => {
		const { SortColumn, SortOrder } = this.state;
		let newSortOrder = SortOrder === "asc" ? "ASC" : "DESC";
		this.setState({
			page,
			loading: true
		}, () => this.fetchData(SortColumn, newSortOrder))
	}

	handleSorting(SortColumn) {
		const { SortOrder } = this.state;
		let newSortOrder = SortOrder === "asc" ? "desc" : "asc";
		this.setState({ SortColumn: SortColumn, SortOrder: newSortOrder, loading: true }, () => {
			this.fetchData(SortColumn, newSortOrder === "asc" ? "ASC" : "DESC");
		});
	}

	handleDetailPageChange = (event, detailPage) => {
		this.setState({
			detailPage,
			fetchingDetail: true
		}, () => this.fetchBankerDetails())
	}

    handleDetailSorting=(SortColumn)=> {
        const { DSortOrder } = this.state;
        const newSortOrder = DSortOrder === "asc" ? "desc" : "asc";

		this.setState({ DSortColumn: SortColumn, DSortOrder: newSortOrder, fetchingDetail: true }, () => {
			this.fetchBankerDetails();
		});
	}

	handleDetailRowsPerPageChange = (event) => {

		this.setState({
			detailPage: 0,
			detailRowsPerPage: parseInt(event.target.value, 10),
			fetchingDetail: true
		}, () => this.fetchBankerDetails())
	}

	search() {
		const { _Date, Todate } = this.state;
		this.DateError = (_Date != null && Todate == null) || (Todate != null && _Date == null) ? true : false;
		if (!this.DateError) {
			this.setState({
				loading: true,
                expandedItem:null
			}, () => this.fetchData())
		}
	}

	clear() {
		this.DateError = false;
		this.setState({
			loading: true,
			page: 0,
			rowsPerPage: 10,
			RewardId: 0,
			PortBu: 0,
			_Date: null,
			Todate: null,
			LocationCode: "",
			OfficerId: "",
			OfficerName: "",
			RewardEarned: "",
			RewardRedeemed: "",
			PromotionName: "",
			PortfolioName: "",
            expandedItem:null,
            errorMsg:null,
            viewDetailPortBu: "",
            viewDetailOfficerId: "",
            viewDetailPortfolioName: "",
            viewDetailPromotionName: "",
            viewDetailLocationCode: "",
            DSortColumn:"",
            DSortOrder:"",
            subTotal:0,
		}, () => this.fetchData())
	}

	handleRowsPerPageChange = (event) => {
		const { SortColumn, SortOrder } = this.state;
		let newSortOrder = SortOrder === "asc" ? "ASC" : "DESC";
		this.setState({
			page: 0,
			rowsPerPage: parseInt(event.target.value, 10),
			loading: true
		}, () => this.fetchData(SortColumn, newSortOrder))
	}

    handleDownload =(e) =>{
         const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
         const fileName = "Employee Rewards Report";
         const fileExtension = '.xlsx';

         this.setState(
             {downloadProgress:true},
                 () => {
                     //download functionality
                     const {portbu } = this.props.user.info;
                     const IAM = Number(new Cookies().get("am") && new Cookies().get("am"));
                     const { SortColumn, SortOrder, RewardId, LocationCode, OfficerId, OfficerName, RewardEarned, RewardRedeemed, PromotionName, PortfolioName, _Date, page, rowsPerPage, Todate } = this.state;
                     const newSortOrder = SortOrder === "asc" ? "ASC" : "DESC";

                     downloadBankerRewards({ RewardId, PortBu:portbu, PromotionName, PortfolioName, LocationCode, OfficerId, OfficerName, RewardEarned, RewardRedeemed, _Date, IAM, PageNo: page + 1, PageSize: rowsPerPage, Todate, SortColumn, SortOrder:newSortOrder }).then((response) => {
                         if (response.error) {
                             //just return false in case of API though any error
                             //error message
                             this.setState({downloadProgress:false});
                             this.handleError();
                             return false;
                         }
                         if(response.data.length) {
                             const ws = XLSX.utils.json_to_sheet(response.data);
                             const wb = { Sheets: { 'Employee Rewards Report': ws }, SheetNames: ['Employee Rewards Report'] };
                             const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                             const data = new Blob([excelBuffer], {type: fileType});
                             FileSaver.saveAs(data, fileName + fileExtension);
 
                             this.setState({downloadProgress:false});
                         } else {
                             //error message
                             this.setState({
                                 downloadProgress:false,
                                 errorMsg:"No Records to download"
                             });
                             this.handleError();
                         }
                     })
             }
         );
     }

	render() {
		const {clientInfo, errorMsg, subTotal, detailPage, detailRowsPerPage, downloadProgress, expandedItem, fetchingDetail, loading, page, rowsPerPage, 
        filterOpen, RewardId, PortBu, LocationCode, OfficerId, OfficerName, RewardEarned, RewardRedeemed, 
        PromotionName, PortfolioName, _Date, Todate, errorDialog, SortColumn, SortOrder, DSortColumn, DSortOrder } = this.state;
		const { user, bankers } = this.props;

		const { configs } = this.props.clientConfig;
        let buttonPrimaryColor = getColorCodeByClientCode(configs, "C00015");
		let buttonSecondaryColor = getColorCodeByClientCode(configs, "C00019");
		let buttonPrimartTextColor = getColorCodeByClientCode(configs, "C00020");

		return (
			<Fragment>
				<Grid container id="bankers_wrapper">
					<Grid item xs={12}>
						<div className="list-header">
                            <Grid item xs={12}>
								<Box display="flex" justifyContent="flex-end" alignItems="center">
									{downloadProgress ? (
                                         <Box width="100px" display="flex" mt={1.875} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
                                         ) : (
                                         <Box display="flex" justifyContent="flex-start" alignItems="flex-start">
                                             <Button style={{color: buttonPrimartTextColor, backgroundColor: buttonPrimaryColor}} color={`${buttonPrimaryColor}`} variant="contained" color={`${buttonPrimaryColor}`} className="btns save" onClick={(event)=>this.handleDownload(event)} >Download</Button>
                                         </Box>
                                     )}
                                    <Box justifyContent="flex-end" alignItems="flex-end">
                                        <img className="filter-button" onClick={() => this.setState({ filterOpen: !filterOpen })} src={require('~/assets/images/filter-icon.png')} alt="filter-icon" />
                                    </Box>
								</Box>
							</Grid>
						</div>
					</Grid>
					<Grid item xs={12}>
						<Collapse hidden={!filterOpen} in={filterOpen}>
							<Grid container={true} justify="space-between" hidden className="filterWrap">
								<Grid item xs={6} sm={3}>
                                    <Box mx={1}>
                                        <label className="inputLabel">Portfolio Name</label>
                                        <TextField
                                            fullWidth={true}
                                            autoComplete="off"
                                            variant="outlined"
                                            value={PortfolioName || ""}
                                            onChange={event => {
                                                this.setState({
                                                    ...this.state,
                                                    PortfolioName: event.target.value
                                                })
                                            }}
                                            inputProps={{
                                                ref: el => this.PortfolioName = el
                                            }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={6} sm={3}>
									<Box mx={1} id="reward-amount">
										<label className="inputLabel">Location Code</label>
										<TextField
											fullWidth={true}
											autoComplete="off"
											variant="outlined"
											value={LocationCode || ""}
											onChange={event => {
												this.setState({
													...this.state,
													LocationCode: event.target.value
												})
											}}
											inputProps={{
												ref: el => this.LocationCode = el
											}}
										/>
									</Box>
								</Grid>
								<Grid item xs={6} sm={3}>
									<Box mx={1}>
										<label className="inputLabel">{`${clientInfo && clientInfo.lblOEID}`}</label>
										<TextField
											fullWidth={true}
											autoComplete="off"
											variant="outlined"
											value={OfficerId || ""}
											onChange={event => {
												this.setState({
													...this.state,
													OfficerId: event.target.value
												})
											}}
											inputProps={{
												ref: el => this.OfficerId = el
											}}
										/>
									</Box>
								</Grid>

								<Grid item xs={6} sm={3}>
									<Box mx={1}>
										<label className="inputLabel">
											{cookies.get("client") === "acg" ? 'Producer Name' : 'Officer Name' }
										</label>
										<TextField
											fullWidth={true}
											autoComplete="off"
											variant="outlined"
											value={OfficerName || ""}
											onChange={event => {
												console.log(event.target.value);
												this.setState({
													...this.state,
													OfficerName: event.target.value
												});
												console.log(this.state);
											}}
											inputProps={{
												ref: el => this.OfficerName = el
											}}
										/>
									</Box>
								</Grid>
								<Grid item xs={6} sm={3}>
									<Box mx={1}>
										<label className="inputLabel">Reward Earned($)</label>
										<CurrencyInput placeholder="" type="text"
											value={RewardEarned || ''}
											onChange={event => this.setState({ RewardEarned: event.target.value })}
										/>
									</Box>
								</Grid>
                                <Grid item xs={6} sm={3}>
									<Box mx={1}>
										<label className="inputLabel">Reward Redeemed($)</label>
										<CurrencyInput placeholder="" type="text"
											value={RewardRedeemed || ''}
											onChange={event => this.setState({ RewardRedeemed: event.target.value })}
										/>
									</Box>
								</Grid>
								
								<Grid item xs={6} sm={6}>
									<Box mx={1} display="flex" justifyContent="flex-end" alignItems="center">
										<Link to="#" style={{ marginTop: '30px' }}> <Button onClick={() => this.clear()} variant="outlined" style={{color: buttonPrimartTextColor, backgroundColor: buttonSecondaryColor}} color={`${buttonSecondaryColor}`}   className="clearBtn">Clear</Button> </Link>
										{loading ? (
											<Box width="100px" display="flex" mt={1.875} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
										) : (
												<Link to="#" style={{ marginTop: '30px' }}> <Button onClick={() => this.search()} variant="contained" style={{color: buttonPrimartTextColor, backgroundColor: buttonPrimaryColor}} color={`${buttonPrimaryColor}`}  >Search</Button> </Link>
											)}
									</Box>
								</Grid>
							</Grid>
						</Collapse>
					</Grid>

					<Grid item xs={12} style={{overflowX: 'auto'}} >
						<Table>
							<StyledTableHead>
								<TableRow>
									<StyledTableCell>
										<TableSortLabel
											active={SortColumn === "PortBu"}
											direction={SortColumn === "PortBu" ? SortOrder : 'asc'}
											onClick={() => this.handleSorting("PortBu")}
										>
											Port BU
                                         {SortColumn === "PortBu" ? (
												<span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
													{SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
												</span>
											) : null}
										</TableSortLabel>
									</StyledTableCell>
									<StyledTableCell>
										<TableSortLabel
											active={SortColumn === "PortfolioName"}
											direction={SortColumn === "PortfolioName" ? SortOrder : 'asc'}
											onClick={() => this.handleSorting("PortfolioName")}
										>
											Portfolio Name
                                         {SortColumn === "PortfolioName" ? (
												<span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
													{SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
												</span>
											) : null}
										</TableSortLabel>
									</StyledTableCell>
									<StyledTableCell>
										<TableSortLabel
											active={SortColumn === "LocationCode"}
											direction={SortColumn === "LocationCode" ? SortOrder : 'asc'}
											onClick={() => this.handleSorting("LocationCode")}
										>
											Location Code
                                         {SortColumn === "LocationCode" ? (
												<span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
													{SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
												</span>
											) : null}
										</TableSortLabel>
									</StyledTableCell>
									<StyledTableCell>
										<TableSortLabel
											active={SortColumn === "OfficerId"}
											direction={SortColumn === "OfficerId" ? SortOrder : 'asc'}
											onClick={() => this.handleSorting("OfficerId")}
										>
                                        {`${clientInfo && clientInfo.lblOEID}`}
                                         {SortColumn === "OfficerId" ? (
												<span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
													{SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
												</span>
											) : null}
										</TableSortLabel>
									</StyledTableCell>
									<StyledTableCell>
										<TableSortLabel
											active={SortColumn === "OfficerName"}
											direction={SortColumn === "OfficerName" ? SortOrder : 'asc'}
											onClick={() => this.handleSorting("OfficerName")}
										>
											{cookies.get("client") === "acg" ? 'Producer Name' : 'Officer Name' }
                                         {SortColumn === "OfficerName" ? (
												<span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
													{SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
												</span>
											) : null}
										</TableSortLabel>
									</StyledTableCell>
									<StyledTableCell>
										<TableSortLabel
											active={SortColumn === "RewardEarned"}
											direction={SortColumn === "RewardEarned" ? SortOrder : 'asc'}
											onClick={() => this.handleSorting("RewardEarned")}
										>
											Reward Earned($)
                                         {SortColumn === "RewardEarned" ? (
												<span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
													{SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
												</span>
											) : null}
										</TableSortLabel>
									</StyledTableCell>
                                    <StyledTableCell>
										<TableSortLabel
											active={SortColumn === "RewardRedeemed"}
											direction={SortColumn === "RewardRedeemed" ? SortOrder : 'asc'}
											onClick={() => this.handleSorting("RewardRedeemed")}
										>
											Reward Redeemed($)
                                         {SortColumn === "RewardRedeemed" ? (
												<span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
													{SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
												</span>
											) : null}
										</TableSortLabel>
									</StyledTableCell>
                                    <StyledTableCell>
                                        Action
                                    </StyledTableCell>
								</TableRow>
							</StyledTableHead>
							<TableBody>
								{loading ? (
									<TableRow>
										<TableCell colSpan={8}>
											<Box display="flex" p={5} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
										</TableCell>
									</TableRow>
								) : (
										bankers.list && bankers.list.map((item, index) => (
											<Fragment key={index}>
												<StyledTableRow>
													<StyledTableCell>{item.PortBu}</StyledTableCell>
													<StyledTableCell>{item.PortfolioName}</StyledTableCell>
													<StyledTableCell>{item.LocationCode}</StyledTableCell>
													<StyledTableCell>{item.OfficerId}</StyledTableCell>
													<StyledTableCell>{item.OfficerName}</StyledTableCell>
													<StyledTableCell>{currency(item.RewardEarned, { formatWithSymbol: true }).format()}</StyledTableCell>
													<StyledTableCell>{currency(item.RewardRedeemed, { formatWithSymbol: true }).format()}</StyledTableCell>
                                                    <StyledTableCell>
                                                        <Button style={{width:"124px", color: `${buttonPrimartTextColor}`, backgroundColor: buttonPrimaryColor}} color={`${buttonPrimaryColor}`}  variant="contained" size="small" startIcon={<RemoveRedEyeOutlinedIcon />} onClick={e => this.toggleListItem(item, index)} >
                                                            View Details
                                                        </Button>
                                                    </StyledTableCell>
												</StyledTableRow>
												<TableRow>
													<TableCell colSpan={8} className="no-padding">
														<Collapse hidden={!(expandedItem === index)} in={expandedItem === index}>
															<div className="expanded-view">
																{fetchingDetail ? (
																	<Box display="flex" p={3} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
																) : (
																		<DetailView
                                                                            clientInfo={clientInfo}
                                                                            totalCount={subTotal}
                                                                            page={detailPage}
                                                                            SortColumn={DSortColumn}
                                                                            SortOrder={DSortOrder}
                                                                            data={this.state.bankerDetails}
                                                                            handleSorting={this.handleDetailSorting}
                                                                            fetchingDetail={fetchingDetail}
                                                                            rowsPerPage={detailRowsPerPage}
                                                                            onChangePage={this.handleDetailPageChange}
                                                                            onChangeRowsPerPage={this.handleDetailRowsPerPageChange}
                                                                        />
																	)
                                                                }
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
										colSpan={8}
										count={bankers.totalCount || 0}
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
				{errorDialog && <AlertDialog title={"OOPS!"} message={errorMsg || "Something went wrong, We're working on getting this fixed as soon as we can."} onConfirm={() => { this.setState({ errorDialog: false }) }} />}
			</Fragment>
		)
	}
}

export default connect(state => ({ ...state.user, ...state.bankers, ...state.clientConfig }))(ListView);