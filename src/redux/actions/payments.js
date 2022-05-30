import Cookies from 'universal-cookie'
import axios from 'axios'
import config from '~/config'
import { getAccessToken } from '~/redux/helpers/user';
import moment from "moment";
import currency from 'currency.js';

export const fetchPaymentsList = ({accessToken, PBU, OEID, PromotionId, PromotionName, RewardsId,
    RewardAmount, PaymentMethodId, RedeemDate, PageNo, PageSize, SortColumn, SortOrder }) => async (dispatch) => {

        try {
            console.log('from Payments action fetchPaymentsList');
            //const accessToken = await getAccessToken()
            const response = await axios({
                url: `${config.base_url}/api/Payments/PaymentList`,
                //url: `https://11yp9c0lud.execute-api.us-east-2.amazonaws.com/dev/PaymentList`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${accessToken}`,
                },
                data: JSON.stringify({
                    PBU: PBU,
                    OEID: OEID,
                    PromotionName: PromotionName || "",
                    PromotionId: PromotionId || 0,
                    RewardsId: RewardsId || 0,
                    RewardAmount: RewardAmount === "" ? "" : currency(RewardAmount).value,
                    PaymentMethodId: PaymentMethodId || 0,
                    RedeemDate:  RedeemDate ? moment(RedeemDate).utc().format("YYYY-MM-DD HH:mm:ss") : "",
                    PageNo: PageNo || 1,
                    PageSize: PageSize || 10,
                    SortColumn: SortColumn || "",
                    SortOrder: SortOrder || ""
                })
            })

            const responseBody = await response.data;
            console.log("responseBody", responseBody);
            if (!responseBody.error) {
                dispatch({
                    type: 'REWARDS_LIST_FETCH_SUCCESS',
                    payload: responseBody.Data,
                    totalCount: responseBody.Data[0] ? responseBody.Data[0].TotalCount:0
                })
                console.log("success");
                return true
            }
            dispatch({
                type: 'REWARDS_LIST_FETCH_FAILED',
                payload: responseBody.error || "Oops! Something went wrong."
            })
            return false
        } catch (error) {
            console.log("error", error);
            dispatch({
                type: 'REWARDS_LIST_FETCH_FAILED',
                payload: error.message || "An error has occured."
            })
            return false
        }
    }

export const fetchPaymentsList1 = ({ RewardID, PortBu, PortfolioName, LocationCode, OfficeId, OfficeName, RewardCurrency, Rewards, RewardStatus, CreatedDate, PromotionID, PageNo, PageSize }) => async (dispatch) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Payments/PaymentList`,
            //url: `https://11yp9c0lud.execute-api.us-east-2.amazonaws.com/dev/PaymentList`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `${accessToken}`,
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
                totalCount: responseBody.TotalCount || 0
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

export const fetchRedeemRewards = ({accessToken, portbu, oeid, rewardId}) => async (dispatch) => {
    try {
        console.log('redeem rewards history');
        const response = await axios({
            url: `${config.base_url}/api/Payments/TrackingRedeemRewards`,
            //url: `https://11yp9c0lud.execute-api.us-east-2.amazonaws.com/dev/TrackingRedeemRewards`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({
                lPBU: portbu,
                lOEID: oeid,
                lRewardID: rewardId
            })
        })

        const responseBody = await response.data;
        console.log("rewared history", responseBody);
        if (!responseBody.error) {
            dispatch({
                type: 'REDEEM_REWARDS_FETCH_SUCCESS',
                payload: responseBody.Data,
            })
            return true
        }
        dispatch({
            type: 'REDEEM_REWARDS_FETCH_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'REDEEM_REWARDS_FETCH_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}

export const fetchRewardsOverview = ({accessToken, portbu, oeid}) => async (dispatch) => {
    try {
        //const accessToken = await getAccessToken()
        //const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3J0YnUiOiIzNzI1MSIsIm9laWQiOiIxOTk5OSIsImlhdCI6MTU3NDQxNTMzN30.fO07D0wn-I5NHH_WobI9s830_gQrLriSM8N65ZMO4fs'
        const response = await axios({
            url: `${config.base_url}/api/Payments/RewardsOverview`,
            //url: `https://11yp9c0lud.execute-api.us-east-2.amazonaws.com/dev/RewardsOverview`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({
                lOEID : oeid,
                lPBU  : portbu
            })
        })
        const responseBody = await response.data;
        console.log("overview response", responseBody.Data);
        if (!responseBody.error) {
            dispatch({
                type: 'REWARDS_OVERVIEW_FETCH_SUCCESS',
                payload: responseBody.Data
            })
            return true
        }
        dispatch({
            type: 'REWARDS_OVERVIEW_FETCH_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'REWARDS_OVERVIEW_FETCH_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}

export const fetchTaxationHistory = ({PromotionName, RewardId, RewardAmount, PaymentMethod, RewardType, RedeemDate, accessToken, portbu, oeid, pageNo, pageSize, year, RewardAvailabledate, SortColumn, SortOrder}) => async (dispatch) => {
    try {
        console.log('taxation history');
        const response = await axios({
            url: `${config.base_url}/api/Payments/W9TaxationHistory`,
            //url: `https://7j6vnigzd7.execute-api.us-east-2.amazonaws.com/dev/W9TaxationHistory`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({
                "PBU": portbu,
                "OEID": oeid,
                "PromotionName": PromotionName || "",
                "PromotionId": 0,
                "RewardType": RewardType || 0,
                "RewardsId": RewardId || 0,
                "RewardAmount": RewardAmount || 0,
                "PaymentMethodId": PaymentMethod || 0,
                "RedeemDate": RedeemDate ? moment(RedeemDate).utc().format("YYYY-MM-DD HH:mm:ss") : "",
                "SortColumn": SortColumn || "",
                "SortOrder": SortOrder || "",
                "PageNo": pageNo,
                "PageSize": pageSize,
                "Year":year,
                "RewardAvailabledate": RewardAvailabledate ? moment(RewardAvailabledate).utc().format("YYYY-MM-DD HH:mm:ss") : ""
            }
            )
        })

        const responseBody = await response.data;
        console.log("rewared history", responseBody);
        if (!responseBody.error) {
            dispatch({
                type: 'TAXATION_HISTORY_FETCH_SUCCESS',
                payload: responseBody.Data,
                totalCount: responseBody.TotalCount || 0,
                rollupAmount: responseBody.RollupAmount || 0
            })
            return true
        }
        dispatch({
            type: 'TAXATION_HISTORY_FETCH_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'TAXATION_HISTORY_FETCH_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}