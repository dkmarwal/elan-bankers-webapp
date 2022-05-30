import Cookies from 'universal-cookie'
import axios from 'axios'
import config from '~/config'
import { getAccessToken } from '~/redux/helpers/user'

export const fetchAccountDetails = ({ accessToken, portbu, oeid, selectedPaymentId }) => async (dispatch) => {

	try{
		//const accessToken = await getAccessToken()
		//let url = `${config.apiBase}/${promotionId}`
		const response = await axios({
            url: `${config.base_url}/api/PaymentPreference/BankAccountDetailsById`,
            //url: "https://g8gsgwy2x0.execute-api.us-east-2.amazonaws.com/dev/BankAccountDetailsById",
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({ lPBU: portbu, lOEID: oeid, lSelectedPaymentId: selectedPaymentId || 0})
        })

		const responseBody = await response.data;
		if(!responseBody.error){
			dispatch({
				type: 'MANAGE_ACCOUNT_FETCH_SUCCESS',
				payload: {
                    zelleDetails: responseBody.Data.length ? { 
                        email: responseBody.Data[0]? responseBody.Data[0].email: null,
                        mobile: responseBody.Data[0]? responseBody.Data[0].mobile : null,
                        zelleToken: responseBody.Data[0]? responseBody.Data[0].zelle_token : null 
                    }: null,
                    details: responseBody.Data.length? {
                        paymentMethodId:responseBody.Data[0]? responseBody.Data[0].PaymentMethodTypeID:null,
                        routing_no: responseBody.Data[0]?String(responseBody.Data[0].RoutingNumber):"",
                        acc_no: responseBody.Data[0]?String(responseBody.Data[0].AccountNumber):"",
                        confirm_acc_no: responseBody.Data[0]?String(responseBody.Data[0].ConfirmAccountNumber):"",
                        acc_type: responseBody.Data[0]?responseBody.Data[0].AccountType:null,
                        client_id: 1,
                        status: responseBody.Data[0]?responseBody.Data[0].STATUS:null,
                        oeID: oeid,
                        pbuID: portbu,
                    }:null
                }
			})
			return true
		}
		dispatch({
			type: 'MANAGE_ACCOUNT_FETCH_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
		})
		return false
	}catch(error){
		dispatch({
			type: 'MANAGE_ACCOUNT_FETCH_FAILED',
			payload: error.message || "An error has occured."
		})
		return false
	}
}

export const updateAccount= ({accessToken, portbu, oeid, paymentDetails, lEmail, lMobile, lZelleToken, lPaymentMethodId, lSelectedPaymentId }) => async (dispatch) => {
    try {
        dispatch({
            type: 'MANAGE_ACCOUNT_UPDATE_START'
        })
        //const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/PaymentPreference/CreateUpdateBankAccountDetails`,
            //url: `https://g8gsgwy2x0.execute-api.us-east-2.amazonaws.com/dev/CreateUpdateBankAccountDetails`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
                //'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3J0YnUiOiIzNzI1MSIsIm9laWQiOiIxOTk5OSIsImlhdCI6MTU3NDQxNTMzN30.fO07D0wn-I5NHH_WobI9s830_gQrLriSM8N65ZMO4fs',
            },
            data: JSON.stringify({
                lRoutingNumber: paymentDetails && paymentDetails.routing_no || "",
                lAccountNumber: paymentDetails && paymentDetails.acc_no || "",
                lConfirmAccountNumber: paymentDetails && paymentDetails.confirm_acc_no || "",
                lAccountType: paymentDetails && paymentDetails.acc_type || "" ,
                lClientID: 1,
                lStatus: 1,
                lOEID: oeid || null,
                lPBU: portbu || null,
                lEmail: lEmail || "",
                lMobile: lMobile || "",
                lZelleToken : lZelleToken || 0,
                lPaymentMethodId : lPaymentMethodId || 0,
                lSelectedPaymentId: lSelectedPaymentId || 0
            })
        })
        const responseBody = await response.data;
        //console.log("update account", responseBody);
        if (!responseBody.error) {
            if(responseBody.Data.responseCode === 0) {
                dispatch({
                    type: 'MANAGE_ACCOUNT_UPDATE_SUCCESS',
                    payload: {
                        details:{...paymentDetails, paymentMethodId: lPaymentMethodId}, 
                        zelleDetails: {
                        email: lEmail,
                        mobile: lMobile,
                        zelleToken: lZelleToken
                    }}
                });
            } 
            return responseBody;
        } else {
            
            dispatch({
                type: 'MANAGE_ACCOUNT_UPDATE_FAILED',
                payload: responseBody.error || "Oops! Something went wrong."
            });
            return false;           
        }
    } 
//         catch (e) {
    
// }
catch (error) {
    console.log("errrr");
    dispatch({
        type: 'MANAGE_ACCOUNT_UPDATE_FAILED',
        payload: error.message || "An error has occured."
    });
    return false;
}
}

export const deleteAccount = ({ accessToken, portbu, oeid, selectedPaymentId}) => async (dispatch) => {
    try {
        dispatch({
            type: 'MANAGE_ACCOUNT_DELETE_START'
        })
        //const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/PaymentPreference/UpdateStatusBankAccountDetails`,
            //url:  "https://g8gsgwy2x0.execute-api.us-east-2.amazonaws.com/dev/UpdateStatusBankAccountDetails",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({ lPBU: portbu, lOEID: oeid, lSelectedPaymentId: selectedPaymentId})
        })
        const responseBody = await response.data

console.log("delete response", responseBody);
        if (!responseBody.error) {
            dispatch({
                type: 'MANAGE_ACCOUNT_DELETE_SUCCESS',
                payload: {details:null, zelleDetails: null}
            })
        } else {
            dispatch({
                type: 'MANAGE_ACCOUNT_DELETE_FAILED',
                payload: responseBody.error || "Oops! Something went wrong."
            })            
        }
    } catch (error) {
        dispatch({
            type: 'MANAGE_ACCOUNT_DELETE_FAILED',
            payload: error.message || "An error has occured."
        })
    }
}

export const fetchAccountTypes = (accessToken) => async (dispatch) => {

	try{
		const accessToken = await getAccessToken()
		//let url = `${config.apiBase}/${promotionId}`
		const response = await axios({
            url: `${config.base_url}/api/PaymentPreference/GetAccountType`,
            //url: "https://g8gsgwy2x0.execute-api.us-east-2.amazonaws.com/dev/GetAccountType",
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				 'Authorization': `${accessToken}`,
            },
        })

		const responseBody = await response.data;
        //console.log("account types", responseBody.Data);

		if(!responseBody.error){
			dispatch({
				type: 'ACCOUNT_TYPES_FETCH_SUCCESS',
				payload: {
                    acc_types: responseBody.Data
                }
			})
			return true
		}
		dispatch({
			type: 'ACCOUNT_TYPES_FETCH_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
		})
		return false
	}catch(error){
		dispatch({
			type: 'ACCOUNT_TYPES_FETCH_FAILED',
			payload: error.message || "An error has occured."
		})
		return false
	}
}