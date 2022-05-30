import Cookies from 'universal-cookie'
import axios from 'axios'
import config from '~/config'
import { getAccessToken } from '~/redux/helpers/user';
import moment from "moment";

export const fetchSupportList = ({ TicketNo, Status, Category, CreatedDate, ResponseDate, PageNo, PageSize, OEID, PBU, SortColumn, SortOrder }) => async (dispatch) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Support/SupportTicketList`,
            //url: `https://qqdwgclje0.execute-api.us-east-1.amazonaws.com/develop/SupportTicketList`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({
                TicketNo: TicketNo || 0,
                Status: Status || "",
                Category: Category || "",
                CreatedDate: CreatedDate ? moment(CreatedDate).utc().format("YYYY-MM-DD HH:mm:ss") : "",
                ResponseDate: ResponseDate ? moment(ResponseDate).utc().format("YYYY-MM-DD HH:mm:ss") : "",
                PageNo: PageNo || 1,
                PageSize: PageSize || 10,
                SortColumn: SortColumn || "",
                SortOrder: SortOrder || "",
                OEID: OEID || "",
                PBU: PBU || ""
            })
        })
        const responseBody = await response.data;
        if (!responseBody.error) {
            dispatch({
                type: 'SUPPORT_LIST_FETCH_SUCCESS',
                payload: responseBody.Data,
                totalCount: responseBody.Data.length > 0 ? responseBody.Data[0].TotalCount : 0
            })
            return true
        }
        dispatch({
            type: 'SUPPORT_LIST_FETCH_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'SUPPORT_LIST_FETCH_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}

export const fetchSupportHistoryList = ({ TicketNo, OEID, PORTBU }) => async (dispatch) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Support/SupportTicketDetails`,
            //url: `https://qqdwgclje0.execute-api.us-east-1.amazonaws.com/develop/SupportTicketDetails`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({
                ticketNo: TicketNo || 0,
                lOEID: OEID || 0,
                IPBU: PORTBU || 0,
                IUserId: 0
            })
        })
        const responseBody = await response.data;
        if (!responseBody.error) {
            dispatch({
                type: 'SUPPORT_HISTORY_FETCH_SUCCESS',
                payload: responseBody.Data[0],
            })
            return responseBody.Data[0]
        }
        dispatch({
            type: 'SUPPORT_HISTORY_FETCH_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'SUPPORT_HISTORY_FETCH_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}

export const saveComment = ({ rewardId, raisedBy, userId, comment }) => async (dispatch) => {

    try {
        dispatch({
            type: 'SAVE_COMMENT_START'
        })
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Support/savecomment`,
            //url: ` https://yaykhniyk4.execute-api.us-east-2.amazonaws.com/dev/savecomment`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({
                RewardID: rewardId || 0,
                RaisedBy: raisedBy || 0,
                UserID: userId || 0,
                comment: comment || "",
            })

        })
        const responseBody = await response.data
        if (!responseBody.error) {
            dispatch({
                type: 'SAVE_COMMENT_SUCCESS',
                payload: comment
            })
            return true
        } else {
            dispatch({
                type: 'SAVE_COMMENT_FAILED',
                payload: responseBody.error || "Oops! Something went wrong."
            })
            return false
        }
    } catch (error) {
        dispatch({
            type: 'SAVE_COMMENT_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}

export const createTicket = () => async (dispatch) => {
    try {
        dispatch({
            type: 'CREATE_TICKET_START'
        })
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Support/CreateSupportTicket`,
            //url: `https://qqdwgclje0.execute-api.us-east-1.amazonaws.com/develop/CreateSupportTicket`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
        })
        const responseBody = await response.data
        if (!responseBody.error) {
            dispatch({
                type: 'CREATE_TICKET_SUCCESS',
                payload: responseBody.Data[0].ticketNo
            })
            return responseBody.Data[0];
        } else {
            dispatch({
                type: 'CREATE_TICKET_FAILED',
                payload: responseBody.error || "Oops! Something went wrong."
            })
            return false
        }
    } catch (error) {
        dispatch({
            type: 'CREATE_TICKET_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}

export const updateTicket = ({ TicketNo, subject, category, description, rewardId, oeid, portbu }) => async (dispatch) => {

    try {
        dispatch({
            type: 'UPDATE_TICKET_START'
        })
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Support/UpdateSupportTicketData`,
            //url: ` https://qqdwgclje0.execute-api.us-east-1.amazonaws.com/develop/UpdateSupportTicketData`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({
                lticketNo: TicketNo || null,
                lSubject: subject || "",
                lCategory: category || "",
                lBankerDescription: description || "",
                lRewardID: rewardId || 0,
                lOEID: oeid || 0,
                lPortBU: portbu || 0,
            })

        })
        const responseBody = await response.data
        if (!responseBody.error) {
            dispatch({
                type: 'UPDATE_TICKET_SUCCESS',
                payload: responseBody.Data[0]
            })
            return true
        } else {
            dispatch({
                type: 'UPDATE_TICKET_FAILED',
                payload: responseBody.error || "Oops! Something went wrong."
            })
            return false
        }
    } catch (error) {
        dispatch({
            type: 'UPDATE_TICKET_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}

export const fetchCategoryList = () => async (dispatch) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Support/SupportTicketCategoryType`,
            //url: `https://qqdwgclje0.execute-api.us-east-1.amazonaws.com/develop/SupportTicketCategoryType`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
        })
        const responseBody = await response.data;
        if (!responseBody.error) {
            dispatch({
                type: 'CATEGORY_LIST_FETCH_SUCCESS',
                payload: responseBody.Data,
            })
            return responseBody.Data
        }
        dispatch({
            type: 'CATEGORY_LIST_FETCH_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'CATEGORY_LIST_FETCH_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}

export const fetchStatusList = () => async (dispatch) => {

    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Support/SupportTicketStatus`,
            //url: `https://qqdwgclje0.execute-api.us-east-1.amazonaws.com/develop/SupportTicketStatus`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
        })
        const responseBody = await response.data;
        if (!responseBody.error) {
            dispatch({
                type: 'STATUS_LIST_FETCH_SUCCESS',
                payload: responseBody.Data,
            })
            return responseBody.Data
        }
        dispatch({
            type: 'STATUS_LIST_FETCH_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'STATUS_LIST_FETCH_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}