import React, { Component, Fragment } from 'react'
import { MenuItem, Icon, InputAdornment, OutlinedInput, CircularProgress, TextField, Container, Paper, Button, Grid, Box, Table, TableRow, TableBody, TablePagination, TableCell, withStyles, TableSortLabel } from '@material-ui/core'
import { StyledTableHead, StyledTableRow, StyledTableCell, StyledTableFooter } from '~/components/StyledTable'
import DatePicker from "react-datepicker";
import DateRangeIcon from '@material-ui/icons/DateRange';
import { connect } from 'react-redux'
import moment from 'moment-timezone'
import { Link } from "react-router-dom";
import { createTicket, fetchSupportList, fetchCategoryList, fetchStatusList } from '~/redux/actions/support';
import Notification from '~/components/Notification';
import './styles.scss';
import { AlertDialog } from '~/components/Dialogs';
import Cookies from 'universal-cookie'
import { getColorCodeByClientCode } from "~/services/config/index";

const styles = theme => ({
    filterBg: {
        backgroundColor: '#f0f5f7',
        width: '100%'
    },
    inputBg: {
        backgroundColor: '#fff',
        padding: '0.5rem'
    }
})

class SupportListView extends Component {

    state = {
        isLoading: true,
        fetchingList: false,
        showFilter: false,
        page: 0,
        rowsPerPage: 10,
        filterOpen: false,
        TicketNo: '',
        Status: "",
        CreatedDate: null,
        ResponseDate: null,
        Category: "",
        categoryList: null,
        statusList: null,
        createTicketProgress: false,
        errorDialog: false,
        SortColumn: "",
        SortOrder: ""
    }

    filterCliCkFun = () => {
        this.setState({
            filterOpen: !this.state.filterOpen
        })
    }

    handleError() {
        this.setState({ errorDialog: true })
    }

    clearFilter = () => {
        this.setState({
            TicketNo: '',
            Status: "",
            CreatedDate: null,
            ResponseDate: null,
            Category: "",
        }, () => this.getSupportList())
    }

    handlePageChange = (event, page) => {
        const { SortColumn, SortOrder } = this.state;
		let newSortOrder = SortOrder === "asc" ? "ASC" : "DESC";
        this.setState({
            page
        }, () => this.getSupportList(SortColumn, newSortOrder))
    }

    handleRowsPerPageChange = (event) => {
        const { SortColumn, SortOrder } = this.state;
		let newSortOrder = SortOrder === "asc" ? "ASC" : "DESC";
        this.setState({
            page: 0,
            rowsPerPage: parseInt(event.target.value, 10)
        }, () => this.getSupportList(SortColumn, newSortOrder))
    }

    handleSorting(SortColumn) {
        const { SortOrder } = this.state;
        let newSortOrder = SortOrder === "asc" ? "desc" : "asc";
        this.setState({ SortColumn: SortColumn, SortOrder: newSortOrder, fetchingList: true }, () => {
            this.getSupportList(SortColumn, newSortOrder === "asc" ? "ASC" : "DESC");
        });
    }

    getSupportList = (SortColumn, SortOrder) => {
        let OEID = new Cookies().get("oeid");
		let PortBu = new Cookies().get("portbu");
        const { TicketNo, Status, CreatedDate, ResponseDate, Category, page, rowsPerPage } = this.state;
        this.setState({
            fetchingList: true
        }, () => {
            this.props.dispatch(fetchSupportList({ TicketNo, Status, CreatedDate, ResponseDate, Category, PageNo: page + 1, PageSize: rowsPerPage, OEID, PBU: PortBu, SortColumn, SortOrder })).then((res) => {
                this.setState({
                    isLoading: false,
                    fetchingList: false
                });
                if (!res) this.handleError();
            }).catch(err => {
                this.handleError();
            })
        })
    }

    getCategoryList = () => {
        this.props.dispatch(fetchCategoryList()).then((response) => {
            //set state here on success
            if (!response) {
                this.handleError();
                return false;
            }
            this.setState({
                categoryList: response
            })
        }).catch(err => {
            this.handleError();
        })
    }

    getStatusList = () => {
        this.props.dispatch(fetchStatusList()).then((response) => {
            //set state here on success
            if (!response) {
                this.handleError();
                return false;
            }
            this.setState({
                statusList: response
            })
        }).catch(err => {
            this.handleError();
        })
    }

    supportDetail = (item) => {
        this.props.history.push('/support/status', { supportDetail: item });
    }

    handleCreateTicket = () => {
        this.setState({
            createTicketProgress: true
        }, async () => {
            await this.props.dispatch(createTicket()).then((response) => {
                if (!response.error) {
                    const TicketNo = response.ticketNo;
                    this.props.history.push('/support/ticket', { TicketNo: TicketNo });
                } else {
                    this.handleError();
                    this.setState({
                        createTicketProgress: false
                    })
                }
            }).catch(err => {
                this.handleError();
            })
        })
    }
    componentDidMount() {
        this.getSupportList();
        this.getCategoryList();
        this.getStatusList();
    }

    render() {
        const { createTicketProgress, filterOpen, isLoading, categoryList, statusList, fetchingList, TicketNo, Status, ResponseDate, CreatedDate, Category, page, rowsPerPage, errorDialog, SortColumn, SortOrder } = this.state;
        const { classes, user, support } = this.props;
		const { configs } = this.props.clientConfig;
        let buttonPrimaryColor = getColorCodeByClientCode(configs, "C00015");
		let buttonSecondaryColor = getColorCodeByClientCode(configs, "C00019");
        let buttonPrimartTextColor = getColorCodeByClientCode(configs, "C00020");
        
        if (isLoading) {
            return <Box display="flex" p={10} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
        }
        return (
            <Container id="support-list-view">
                <Grid container >
                    <Grid item xs={12}>
                        <Box display="flex" mt={2} mb={2} justifyContent="flex-end" alignItems="center" >
                            <img className="filter-button" onClick={this.filterCliCkFun} src={require('~/assets/images/filter-icon.png')} alt="filter-icon" />
                        </Box>
                    </Grid>
                </Grid>

                <Grid container={filterOpen} hidden className="filterWrap">
                    <Box display="flex">
                        <Grid container>
                            <Grid item xs={12} md={4}>
                                <Box mx={1}>
                                    <label className="inputLabel" for="ticketno">Ticket No.</label>
                                    <TextField
                                        fullWidth={true}
                                        autoComplete="off"
                                        variant="outlined"
                                        value={TicketNo}
                                        onChange={event => this.setState({ TicketNo: event.target.value })}
                                        id="ticketno"
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box mx={1}>
                                    <label className="inputLabel" for="status">Status</label>
                                    <TextField
                                        fullWidth={true}
                                        id="status"
                                        select
                                        value={Status}
                                        autoComplete="off"
                                        variant="outlined"
                                        onChange={event => this.setState({ Status: event.target.value })}
                                        inputProps={{
                                            ref: el => this.Status = el
                                        }}
                                    >
                                        {statusList ? statusList.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        )) :
                                            (
                                                <Box width="100px" display="flex" mt={1.875} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
                                            )
                                        }
                                    </TextField>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box mx={1}>
                                    <label className="inputLabel" for="category">Category</label>
                                    <TextField
                                        fullWidth={true}
                                        id="category"
                                        select
                                        value={Category}
                                        autoComplete="off"
                                        variant="outlined"
                                        onChange={event => this.setState({ Category: event.target.value })}
                                        inputProps={{
                                            ref: el => this.Category = el
                                        }}
                                    >
                                        {categoryList ? categoryList.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        )) :
                                            (
                                                <Box width="100px" display="flex" mt={1.875} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
                                            )
                                        }
                                    </TextField>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box mx={1}>
                                    <label className="inputLabel" for="createddate">Created Date</label>
                                    <DatePicker
                                        customInput={<OutlinedInput
                                            variant="outlined"
                                            className="full-width"
                                            endAdornment={<InputAdornment position="end"><DateRangeIcon /></InputAdornment>}
                                        />}
                                        className="datePicdesign dateField"
                                        selected={CreatedDate}
                                        onChange={CreatedDate => this.setState({ CreatedDate })}
                                        id="createddate"
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box mx={1}>
                                    <label className="inputLabel" for="responsedate">Response Date</label>
                                    <DatePicker
                                        customInput={<OutlinedInput
                                            variant="outlined"
                                            className="full-width"
                                            endAdornment={<InputAdornment position="end"><DateRangeIcon /></InputAdornment>}
                                        />}
                                        className="datePicdesign dateField"
                                        selected={ResponseDate}
                                        onChange={ResponseDate => this.setState({ ResponseDate })}
                                        id="responsedate"
                                    />
                                </Box>
                            </Grid>

                            <Grid item>
                                <Box mx={1} display="flex" justifyContent="flex-end" alignItems="center">
                                    <Link to="#" style={{ marginTop: '30px' }}> <Button style={{color: buttonPrimartTextColor, backgroundColor: buttonSecondaryColor}} color={`${buttonPrimaryColor}`} onClick={()=>this.clearFilter()} variant="outlined" className="clearBtn">Clear</Button> </Link>
                                    {fetchingList ? (
                                        <Box width="100px" display="flex" mt={1.875} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
                                    ) : (
                                            <Link to="#" style={{ marginTop: '30px' }}> <Button onClick={()=>this.getSupportList()} variant="contained" style={{color: buttonPrimartTextColor, backgroundColor: buttonPrimaryColor}} color={`${buttonPrimaryColor}`}>Search</Button> </Link>
                                        )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Grid item >
                    {createTicketProgress ? (
                        <Box width="100px" display="flex" mt={1.875} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
                    ) : (
                            <Box display="flex" mb={2} justifyContent="flex-start" alignItems="center" >
                                <Button size="medium" onClick={() => this.handleCreateTicket()} variant="contained" style={{color: buttonPrimartTextColor, backgroundColor: buttonPrimaryColor}} color={`red`} >Create Ticket</Button>
                            </Box>
                        )}
                    <Table>
                        <StyledTableHead>
                            <TableRow>
                                <StyledTableCell>
                                    <TableSortLabel
                                        active={SortColumn === "TicketNumber"}
                                        direction={SortColumn === "TicketNumber" ? SortOrder : 'asc'}
                                        onClick={() => this.handleSorting("TicketNumber")}
                                    >
                                        Ticket No.
                                         {SortColumn === "TicketNumber" ? (
                                            <span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
                                                {SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </span>
                                        ) : null}
                                    </TableSortLabel>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <TableSortLabel
                                        active={SortColumn === "Status"}
                                        direction={SortColumn === "Status" ? SortOrder : 'asc'}
                                        onClick={() => this.handleSorting("Status")}
                                    >
                                        Status
                                         {SortColumn === "Status" ? (
                                            <span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
                                                {SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </span>
                                        ) : null}
                                    </TableSortLabel>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <TableSortLabel
                                        active={SortColumn === "Subject"}
                                        direction={SortColumn === "Subject" ? SortOrder : 'asc'}
                                        onClick={() => this.handleSorting("Subject")}
                                    >
                                        Subject
                                         {SortColumn === "Subject" ? (
                                            <span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
                                                {SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </span>
                                        ) : null}
                                    </TableSortLabel>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <TableSortLabel
                                        active={SortColumn === "CreatedDate"}
                                        direction={SortColumn === "CreatedDate" ? SortOrder : 'asc'}
                                        onClick={() => this.handleSorting("CreatedDate")}
                                    >
                                        Created Date
                                         {SortColumn === "CreatedDate" ? (
                                            <span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
                                                {SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </span>
                                        ) : null}
                                    </TableSortLabel>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <TableSortLabel
                                        active={SortColumn === "ResponseDate"}
                                        direction={SortColumn === "ResponseDate" ? SortOrder : 'asc'}
                                        onClick={() => this.handleSorting("ResponseDate")}
                                    >
                                        Response Date
                                         {SortColumn === "ResponseDate" ? (
                                            <span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
                                                {SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </span>
                                        ) : null}
                                    </TableSortLabel>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <TableSortLabel
                                        active={SortColumn === "Category"}
                                        direction={SortColumn === "Category" ? SortOrder : 'asc'}
                                        onClick={() => this.handleSorting("Category")}
                                    >
                                        Category
                                         {SortColumn === "Category" ? (
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
                                    <TableCell colSpan={6}>
                                        <Box display="flex" p={5} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                    support.list && support.list.map((item, index) => (
                                        <Fragment key={item.TicketNo}>
                                            <StyledTableRow onClick={e => this.supportDetail(item)}>
                                                <StyledTableCell>{item.TicketNo}</StyledTableCell>
                                                <StyledTableCell>{item.Status}</StyledTableCell>
                                                <StyledTableCell>{item.Subject}</StyledTableCell>
                                                <StyledTableCell>{item.CreatedDate ? moment.utc(item.CreatedDate).local().format("MM/DD/YYYY") : ""}</StyledTableCell>
                                                <StyledTableCell>{item.ResponseDate ? moment.utc(item.ResponseDate).local().format("MM/DD/YYYY") : ""}</StyledTableCell>
                                                <StyledTableCell>{item.Category}</StyledTableCell>
                                            </StyledTableRow>
                                        </Fragment>
                                    ))
                                )}
                        </TableBody>
                        <StyledTableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                                    colSpan={6}
                                    count={support.totalCount || 0}
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
                {support.error && this.renderSnackbar(support.error)}
                {errorDialog && <AlertDialog title={"OOPS!"} message={"Something went wrong, We're working on getting this fixed as soon as we can."} onConfirm={() => { this.setState({ errorDialog: false }) }} />}
            </Container>
        )
    }

    renderSnackbar = message => {
        return <Notification variant="error" message={message} />
    }
}

export default connect(state => ({ ...state.user, ...state.support,  ...state.clientConfig  }))(withStyles(styles)(SupportListView));