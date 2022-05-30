import Cookies from 'universal-cookie'
import axios from 'axios'
import config from '~/config'
import { getAccessToken } from '~/redux/helpers/user';
import moment from "moment";
import currency from 'currency.js';

export const fetchBankersRewards = ({ RewardId, PortBu, PromotionName, PortfolioName, LocationCode, OfficerId, OfficerName, RewardEarned, RewardRedeemed, _Date, IAM, PageNo, PageSize, Todate, SortColumn, SortOrder }) => async (dispatch) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Bankers/TrackBankerRewardsConsolidated`,
            //url: `https://xyxctgjuca.execute-api.us-east-2.amazonaws.com/dev/TrackBankerRewardsConsolidated`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({
                PortBu: PortBu || "",
                PortfolioName: PortfolioName || "",
                LocationCode: LocationCode || 0,
                OfficerId: OfficerId || "",
                OfficerName: OfficerName || "",
                RewardEarned: RewardEarned === "" ? "" : currency(RewardEarned).value,
                RewardRedeemed: RewardRedeemed === "" ? "" : currency(RewardRedeemed).value,
                SortColumn: SortColumn || "",
                SortOrder: SortOrder || "",
                Pageno: PageNo || 1,
                Pagesize: PageSize || 10
            })
        })
        const responseBody = await response.data;
        if (!responseBody.error) {
            dispatch({
                type: 'FETCH_BANKERS_REWARDS_LIST_FETCH_SUCCESS',
                payload: responseBody.Data,
                totalCount: responseBody.TotalCount || 0
            })
            return true
        }
        dispatch({
            type: 'FETCH_BANKERS_REWARDS_LIST_FETCH_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'FETCH_BANKERS_REWARDS_LIST_FETCH_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}

export const fetchBankerDetails = ({ PortBu, OfficerId, LocationCode, PortfolioName, PromotionName: PromotionName, PageNo, PageSize, SortColumn, SortOrder}) => async (dispatch) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Bankers/ViewBankerRewards`,
            //url: `https://xyxctgjuca.execute-api.us-east-2.amazonaws.com/dev/ViewBankerRewards`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({
                PortBu: PortBu || "",
                OfficerId: OfficerId || "",
                LocationCode: LocationCode || "",
                PortfolioName: PortfolioName || "",
                //PromotionName: PromotionName || "",
                SortColumn: SortColumn || "Date",
                SortOrder: SortOrder || "",
                Pageno: PageNo || 1,
                Pagesize: PageSize || 10
            })
        })
        const responseBody = await response.data;
        if (!responseBody.error) {
            dispatch({
                type: 'FETCH_BANKERS_REWARDS_DETAILS_LIST_FETCH_SUCCESS',
                payload: responseBody.Data,
                totalCount: responseBody.TotalCount || 0
            })
            return true
        }
        dispatch({
            type: 'FETCH_BANKERS_REWARDS_DETAILS_FETCH_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'FETCH_BANKERS_REWARDS_DETAILS_FETCH_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}

export const fetchBankersRewardList = ({ RewardId, PortBu, PromotionName, PortfolioName, LocationCode, OfficerId, OfficerName, RewardEarned, RewardRedeemed, _Date, IAM, PageNo, PageSize, Todate, SortColumn, SortOrder }) => async (dispatch) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Bankers/TrackBankerRewards`,
            //url: `https://xyxctgjuca.execute-api.us-east-2.amazonaws.com/dev/TrackBankerRewards`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({
                RewardID: RewardId || 0,
                PortBu: PortBu || "",
                PromotionName: PromotionName || "",
                PortfolioName: PortfolioName || "",
                LocationCode: LocationCode || 0,
                OfficerId: OfficerId || "",
                OfficerName: OfficerName || "",
                RewardEarned: RewardEarned === "" ? "" : currency(RewardEarned).value,
                RewardRedeemed: RewardRedeemed === "" ? "" : currency(RewardRedeemed).value,
                Date: _Date ? moment(_Date).utc().format("YYYY-MM-DD HH:mm:ss") : "",
                lAM: "",
                Todate : Todate ? moment(Todate).utc().format("YYYY-MM-DD HH:mm:ss") : "",
                SortColumn: SortColumn || "Date",
                SortOrder: SortOrder || "DESC",
                Pageno: PageNo || 1,
                Pagesize: PageSize || 10
            })
        })
        const responseBody = await response.data;
        if (!responseBody.error) {
            dispatch({
                type: 'FETCH_BANKERS_REWARDS_YTD_LIST_FETCH_SUCCESS',
                payload: responseBody.Data,
                totalCount: responseBody.TotalCount || 0
            })
            return true
        }
        dispatch({
            type: 'FETCH_BANKERS_REWARDS_YTD_LIST_FETCH_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'FETCH_BANKERS_REWARDS_YTD_LIST_FETCH_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}