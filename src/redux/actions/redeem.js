import Cookies from 'universal-cookie'
import axios from 'axios'
import config from '~/config'
import { getAccessToken } from '~/redux/helpers/user'

export const fetchRewardsList = ({accessToken, portbu, oeid}) => async (dispatch) => {
    try {
        //const accessToken = await getAccessToken()
        //const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3J0YnUiOiIzNzI1MSIsIm9laWQiOiIxOTk5OSIsImlhdCI6MTU3NDQxNTMzN30.fO07D0wn-I5NHH_WobI9s830_gQrLriSM8N65ZMO4fs'
        const response = await axios({
            url: `${config.base_url}/api/Redeem/RedeemListRewards`,
            //url: "https://p8s2ss9rkd.execute-api.us-east-2.amazonaws.com/dev/RedeemListRewards",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({
                lPBU : portbu,
                lOEID: oeid
            })
        })
        const responseBody = await response.data;

        if (!responseBody.error) {
            dispatch({
                type: 'REDEEM_LIST_FETCH_SUCCESS',
                payload: responseBody.Data
            })
            return true
        }
        dispatch({
            type: 'REDEEM_LIST_FETCH_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'REDEEM_LIST_FETCH_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}

export const redeemRewards = ({rewardIds, accessToken, paymentMethodId}) => async (dispatch) => {
    try {
        const response = await axios({
            url: `${config.base_url}/api/Redeem/updateRewardStatus`,
            //url: `https://p8s2ss9rkd.execute-api.us-east-2.amazonaws.com/dev/updateRewardStatus`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({
                "pRewardId" : rewardIds,
                "pPaymentMethodID" : paymentMethodId || 0
			})
        })
        const responseBody = await response.data;
        if (!responseBody.error) {
            dispatch({
                type: 'REDEEM_REWARDS_SUCCESS',
                payload: responseBody.Data
            })
            return true
        }
        dispatch({
            type: 'REDEEM_REWARDS_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'REDEEM_REWARDS_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}


export const checkSSNExistance = ({PBU, OEID, SSN, accessToken}) => async (dispatch) => {
    try{
        const response = await axios({
        	url: `${config.base_url}/api/Redeem/W9CheckSSNExists`,
        	//url: `https://7j6vnigzd7.execute-api.us-east-2.amazonaws.com/dev/W9CheckSSNExists`,
        	method: 'POST',
        	headers: {
        		'Content-Type': 'application/json',
        		'Authorization': `${accessToken}`,
        	},
        	data: JSON.stringify({
        		"lPBU": PBU,
        		"lOEID": OEID,
        		"lYear": new Date().getFullYear(),
        		"lSSN": SSN			
        	})
        })
        const responseBody = await response.data;
        if (!responseBody.error) {
            dispatch({
                type: 'SSN_CHECK_SUCCESS',
                payload: responseBody.Data && responseBody.Data[0] || null
            });
            return true
        }
        dispatch({
            type: 'SSN_CHECK_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        console.log("catch error")
        dispatch({
            type: 'SSN_CHECK_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}


export const mergeProfile = ({PBU, OEID, SSN, accessToken}) => async (dispatch) => {
    try{
        const response = await axios({
        	url: `${config.base_url}/api/Redeem/W9MergeUser`,
        	//url: `https://7j6vnigzd7.execute-api.us-east-2.amazonaws.com/dev/W9MergeUser`,
        	method: 'POST',
        	headers: {
        		'Content-Type': 'application/json',
        		'Authorization': `${accessToken}`,
        	},
        	data: JSON.stringify({
        		"lPBU": PBU,
        		"lOEID": OEID,
        		"lYear": new Date().getFullYear(),
        		"lSSN": SSN			
        	})
        })
        const responseBody = await response.data;
        if (!responseBody.error) {
            dispatch({
                type: 'MERGE_PROFILE_SUCCESS',
                payload: responseBody.Data && responseBody.Data[0] && responseBody.Data[0].Status || ""
            })
            return true
        }
        dispatch({
            type: 'MERGE_PROFILE_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'MERGE_PROFILE_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}

