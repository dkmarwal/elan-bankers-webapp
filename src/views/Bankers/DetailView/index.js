import React, { Component, Fragment } from 'react';
import { Box, Table, TableHead, TableRow, TableBody, TableFooter, TablePagination, TableCell, TableSortLabel, CircularProgress } from '@material-ui/core';
import { StyledTableHead, StyledTableRow, StyledTableCell, StyledTableFooter } from '~/components/StyledTable';
import moment from 'moment';
import currency from 'currency.js';
import Cookies from "universal-cookie";
const cookies = new Cookies(window.document.cookie);

const DetailView = (props) => {
    const {clientInfo, data, totalCount, SortColumn, SortOrder, rowsPerPage, onChangePage, onChangeRowsPerPage, page, handleSorting} = props;

    if(data.length==0) {
        return(
            <Box display="flex" justifyContent="center" alignItems="center">No Record Found</Box>
        );
    }

    return(
        <Table>
            <StyledTableHead>
                <TableRow>
                    <StyledTableCell>
                        <TableSortLabel
                            active={SortColumn === "RewardID"}
                            direction={SortColumn === "RewardID" ? SortOrder : 'asc'}
                            onClick={() => handleSorting("RewardID")}
                        >
                            Reward ID
                         {SortColumn === "RewardID" ? (
                                <span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
                                    {SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                    <StyledTableCell>
                        <TableSortLabel
                            active={SortColumn === "PortBu"}
                            direction={SortColumn === "PortBu" ? SortOrder : 'asc'}
                            onClick={() => handleSorting("PortBu")}
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
                            onClick={() => handleSorting("PortfolioName")}
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
                            onClick={() => handleSorting("LocationCode")}
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
                            onClick={() => handleSorting("OfficerId")}
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
                            onClick={() => handleSorting("OfficerName")}
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
                            onClick={() => handleSorting("RewardEarned")}
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
                            onClick={() => handleSorting("RewardRedeemed")}
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
                        <TableSortLabel
                            active={SortColumn === "PromotionName"}
                            direction={SortColumn === "PromotionName" ? SortOrder : 'asc'}
                            onClick={() => handleSorting("PromotionName")}
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
                            active={SortColumn === "Date"}
                            direction={SortColumn === "Date" ? SortOrder : 'asc'}
                            onClick={() => handleSorting("Date")}
                        >
                            Rewards Available Date
                         {SortColumn === "Date" ? (
                                <span style={{ border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1, }}>
                                    {SortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                </TableRow>
            </StyledTableHead>
            <TableBody>
                {data.length==0 ? (
                    <TableRow>
                        <TableCell colSpan={10} style={{borderBottomWidth:0}}>
                            <Box display="flex" justifyContent="center" alignItems="center">No Record Found</Box>
                        </TableCell>
                    </TableRow>
                ) : (
                    data && data.map((item, index) => (
                        <Fragment key={index}>
                            <StyledTableRow>
                                <StyledTableCell>{item.RewardID}</StyledTableCell>
                                <StyledTableCell>{item.PortBu}</StyledTableCell>
                                <StyledTableCell>{item.PortfolioName}</StyledTableCell>
                                <StyledTableCell>{item.LocationCode}</StyledTableCell>
                                <StyledTableCell>{item.OfficerId}</StyledTableCell>
                                <StyledTableCell>{item.OfficerName}</StyledTableCell>
                                <StyledTableCell>{currency(item.RewardEarned, { formatWithSymbol: true }).format()}</StyledTableCell>
                                <StyledTableCell>{currency(item.RewardRedeemed, { formatWithSymbol: true }).format()}</StyledTableCell>
                                <StyledTableCell>{item.PromotionName}</StyledTableCell>
                                <StyledTableCell>{item.Date ? moment.utc(item.Date).local().format("MM/DD/YYYY") : ""}</StyledTableCell>
                            </StyledTableRow>
                        </Fragment>
                    ))
                )}
            </TableBody>
            <StyledTableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        colSpan={10}
                        count={totalCount || 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                        }}
                        onChangePage={onChangePage}
                        onChangeRowsPerPage={onChangeRowsPerPage}
                    />
                </TableRow>
            </StyledTableFooter>
        </Table>
    )
}

export default DetailView;