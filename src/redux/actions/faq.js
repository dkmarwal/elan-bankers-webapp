
import Cookies from 'universal-cookie'
import axios from 'axios'
import config from '~/config'
import { getAccessToken } from '~/redux/helpers/user';
import moment from "moment";
import currency from 'currency.js';

export const fetchBankerFAQ = () => async (dispatch) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Bankers/GetAllFAQsList`,
            //url: `https://m5mphetdw3.execute-api.us-east-2.amazonaws.com/dev/GetAllFAQsList`,
            //url: `https://genrf5bpu5.execute-api.us-east-2.amazonaws.com/uat/GetAllFAQsList`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            }
        })
        const responseBody = await response.data;
        if (!responseBody.error) {
            dispatch({
                type: 'FETCH_BANKERS_FAQ_SUCCESS',
                payload: responseBody.Data
            })
            return true
        }
        dispatch({
            type: 'FETCH_BANKERS_FAQ_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        console.log("error",error)
        dispatch({
            type: 'FETCH_BANKERS_FAQ_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}