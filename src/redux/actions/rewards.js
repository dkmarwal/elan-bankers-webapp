import Cookies from 'universal-cookie'
import axios from 'axios'
import config from '~/config'
import { getAccessToken } from '~/redux/helpers/user';
import moment from "moment";
import currency from 'currency.js';

export const fetchRewardsList = ({ RewardID, PortBu, PortfolioName, LocationCode, OfficeId, OfficeName, RewardCurrency, Rewards, RewardStatus, CreatedDate, PromotionID, PageNo, PageSize }) => async (dispatch) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Rewards/getrewardslist`,
            //url: `https://1ryw9njki8.execute-api.us-east-2.amazonaws.com/Dev/getrewardslist`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({
                RewardID: RewardID || 0,
                PortBu: PortBu || "",
                PortfolioName: PortfolioName || "",
                LocationCode: LocationCode || "",
                OfficeId: OfficeId || "",
                OfficeName: OfficeName || "",
                RewardCurrency: RewardCurrency || "",
                Rewards: Rewards === "" ? "" : currency(Rewards).value,
                RewardStatus: RewardStatus || "",
                CreatedDate: CreatedDate ? moment(CreatedDate).utc().format("YYYY-MM-DD HH:mm:ss") : "",
                PromotionID: PromotionID || "",
                PageNo: PageNo || 1,
                PageSize: PageSize || 10
            })
        })
        const responseBody = await response.data;
        if (!responseBody.error) {
            dispatch({
                type: 'REWARDS_LIST_FETCH_SUCCESS',
                payload: responseBody.lstpromotion,
                totalCount: responseBody.TotalCount
            })
            return true
        }
        dispatch({
            type: 'REWARDS_LIST_FETCH_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'REWARDS_LIST_FETCH_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}

export const fetchRewardTypeList = () => async (dispatch) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Reward/GetRewardType`,
            //url: `https://boeeaptso4.execute-api.us-east-2.amazonaws.com/dev/GetRewardType`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
        })
        const responseBody = await response.data;
        if (!responseBody.error) {
            dispatch({
                type: 'REWARD_TYPE_LIST_FETCH_SUCCESS',
                payload: responseBody.Data,
            })
            return responseBody.Data
        }
        dispatch({
            type: 'REWARD_TYPE_LIST_FETCH_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'REWARD_TYPE_LIST_FETCH_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}