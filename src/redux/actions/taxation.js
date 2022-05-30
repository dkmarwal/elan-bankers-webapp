import Cookies from 'universal-cookie'
import axios from 'axios'
import config from '~/config'
import { getAccessToken } from '~/redux/helpers/user'
import currency from 'currency.js';
import moment from "moment";


export const fetchTaxDetails = ({pbu, oeid}) => async (dispatch) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Taxation/W9GetFormForBanker`,
            //url:`https://7j6vnigzd7.execute-api.us-east-2.amazonaws.com/dev/W9GetFormForBanker`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({
                lPBU: pbu || "",
                lOEID: oeid || "",
                lYear: moment().year(),
            })
        })
        const responseBody = await response.data;

        if (!responseBody.error) {
            dispatch({
                type: 'W9FORM_FETCH_SUCCESS',
                payload: responseBody.Data? responseBody.Data[0]:null
            })
            return true
        }
        dispatch({
            type: 'W9FORM_FETCH_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'W9FORM_FETCH_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}

export const saveW9Form = ({formData, userId, editOEID, editPBU, status, canEditSSN}) => async (dispatch) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Taxation/W9SaveDraftTaxFormData`,
            //url:`https://7j6vnigzd7.execute-api.us-east-2.amazonaws.com/dev/W9SaveDraftTaxFormData`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({
                "lID": formData.ID ||"",
                "lName": formData.Name ||"",
                "lBusinessName":formData.BusinessName ||"",
                "lFederalTaxClassificationId":formData.FederalTaxClassificationId ||"",
                "lExemptPayeeCode":formData.ExemptPayeeCode ||"",
                "lFATCACode":formData.FATCACode ||"",
                "lAddress1":formData.Address1 ||"",
                "lAddress2":formData.Address2 ||"",
                "lCity":formData.City ||"",
                "lState": formData.State ||"",
                "lZipCode":formData.ZipCode ||"",
                "lListAccountNumber":formData.ListAccountNumber ||"",
                "lSSN":formData.SSN ||"",
                "lOEID":formData.OEID || editOEID ||"",
                "lPBU":formData.PBU || editPBU ||"",
                "lSignatureText":formData.SignatureText ||"",
                "lSignatureDate": moment().utc().format("YYYY-MM-DD HH:mm:ss"),
                "lEmployerIdentificationNumber":formData.EmployerIdentificationNumber ||"",
                "lLimitedLiability":formData.LimitedLiability ||"",
                "lOthersText":formData.OthersText ||"",
                "lRequestersNameandAddress":formData.RequestersNameandAddress ||"",
                "lCreatedBy":null,
                "lCreatedOn":"",
                "lStatus":status,
                "YEAR":moment().year()
            })
        })
        const responseBody = await response.data;

        if (!responseBody.error) {
            const responseStatus = responseBody.Data && responseBody.Data[0] && responseBody.Data[0].Status || "";
            if(responseStatus == "Fail"){
                dispatch({
                    type: 'W9FORM_SAVE_FAILED',
                    payload: responseBody.Data[0].Message || "Oops! Something went wrong."
                })
                return false
            }
            dispatch({
                type: 'W9FORM_SAVE_SUCCESS',
                payload: formData
            })
            return true
        }
        dispatch({
            type: 'W9FORM_SAVE_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'W9FORM_SAVE_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}

export const submitW9Form = ({formData, userId, editOEID, editPBU, status, canEditSSN}) => async (dispatch) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Taxation/W9InsertUpdateTaxFormData`,
            //url:`https://7j6vnigzd7.execute-api.us-east-2.amazonaws.com/dev/W9InsertUpdateTaxFormData`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({
                "lID": formData.ID ||"",
                "lName": formData.Name ||"",
                "lBusinessName":formData.BusinessName ||"",
                "lFederalTaxClassificationId":formData.FederalTaxClassificationId ||"",
                "lExemptPayeeCode":formData.ExemptPayeeCode ||"",
                "lFATCACode":formData.FATCACode ||"",
                "lAddress1":formData.Address1 ||"",
                "lAddress2":formData.Address2 ||"",
                "lCity":formData.City ||"",
                "lState": formData.State ||"",
                "lZipCode":formData.ZipCode ||"",
                "lListAccountNumber":formData.ListAccountNumber ||"",
                "lSSN":formData.SSN ||"",
                "lOEID":formData.OEID || editOEID ||"",
                "lPBU":formData.PBU || editPBU ||"",
                "lSignatureText":formData.SignatureText ||"",
                "lSignatureDate": moment().utc().format("YYYY-MM-DD HH:mm:ss"),
                "lEmployerIdentificationNumber":formData.EmployerIdentificationNumber ||"",
                "lLimitedLiability":formData.LimitedLiability ||"",
                "lOthersText":formData.OthersText ||"",
                "lRequestersNameandAddress":formData.RequestersNameandAddress ||"",
                "lCreatedBy":null,
                "lCreatedOn":"",
                "lStatus":status,
                "YEAR":moment().year()
            })
        })
        const responseBody = await response.data;

        if (!responseBody.error) {
            const responseStatus = responseBody.Data && responseBody.Data[0] && responseBody.Data[0].Status || "";
            if(responseStatus == "Fail"){
                dispatch({
                    type: 'W9FORM_SAVE_FAILED',
                    payload: responseBody.Data[0].Message || "Oops! Something went wrong."
                })
                return false
            }

            dispatch({
                type: 'W9FORM_SAVE_SUCCESS',
                payload: formData
            })
            return true
        }
        dispatch({
            type: 'W9FORM_SAVE_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'W9FORM_SAVE_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}

export const cancelW9HDForm = (formData, params = { lOEID:"", lPBU:"", lYEAR:""}) => async (dispatch) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Taxation/W9GetFormForBanker`,
            //url:`https://7j6vnigzd7.execute-api.us-east-2.amazonaws.com/dev/W9InsertUpdateTaxFormData`,
            // url: `https://wa2rxnwr00.execute-api.us-east-2.amazonaws.com/uat/W9UpdateTaxFormDataOnCancel`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,

            },
            data: JSON.stringify({
                // "lID": formData.ID ||"",
                // "lName": formData.Name ||"",
                // "lBusinessName":formData.BusinessName ||"",
                // "lFederalTaxClassificationId":formData.FederalTaxClassificationId ||"",
                // "lExemptPayeeCode":formData.ExemptPayeeCode ||"",
                // "lFATCACode":formData.FATCACode ||"",
                // "lAddress1":formData.Address1 ||"",
                // "lAddress2":formData.Address2 ||"",
                // "lCity":formData.City ||"",
                // "lState": formData.State ||"",
                // "lZipCode":formData.ZipCode ||"",
                // "lListAccountNumber":formData.ListAccountNumber ||"",
                // "lSSN":formData.SSN ||"",
                "lOEID": "", 
                "lPBU": "",
                // "lSignatureText":formData.SignatureText ||"",
                // "lSignatureDate": moment().utc().format("YYYY-MM-DD HH:mm:ss"),
                // "lEmployerIdentificationNumber":formData.EmployerIdentificationNumber ||"",
                // "lLimitedLiability":formData.LimitedLiability ||"",
                // "lOthersText":formData.OthersText ||"",
                // "lRequestersNameandAddress":formData.RequestersNameandAddress ||"",
                // "lCreatedBy":null,
                // "lCreatedOn":"",
                // "lStatus":status,
                "lYEAR": moment().year()
            })
        })
        const responseBody = await response.data;

        if (!responseBody.error) {
            const responseStatus = responseBody.Data && responseBody.Data[0] && responseBody.Data[0].Status || "";
            if(responseStatus == "Fail"){
                dispatch({
                    type: 'W9FORM_SUBMIT_CANCEL_FAILED',
                    payload: responseBody.Data[0].Message || "Oops! Something went wrong."
                })
                return false
            }

            dispatch({
                type: 'W9FORM_SUBMIT_CANCEL_SUCCESS',
                payload: formData
            })
            return true
        }
        dispatch({
            type: 'W9FORM_SUBMIT_CANCEL_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'W9FORM_SUBMIT_CANCEL_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}


export const resubmitW9Form = ({formData, userId, editOEID, editPBU, status}) => async (dispatch) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Taxation/BankerResbmitTaxFormData`,
            //url:`https://7j6vnigzd7.execute-api.us-east-2.amazonaws.com/dev/BankerResbmitTaxFormData`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({
                "lW9TaxID": formData.ID ||"",
                "lName": formData.Name ||"",
                "lBusinessName":formData.BusinessName ||"",
                "lFederalTaxClassificationId":formData.FederalTaxClassificationId ||"",
                "lExemptPayeeCode":formData.ExemptPayeeCode ||"",
                "lFATCACode":formData.FATCACode ||"",
                "lAddress1":formData.Address1 ||"",
                "lAddress2":formData.Address2 ||"",
                "lCity":formData.City ||"",
                "lState": formData.State ||"",
                "lZipCode":formData.ZipCode ||"",
                "lListAccountNumber":formData.ListAccountNumber ||"",
                "lSSN":formData.SSN ||"",
                "lOEID":formData.OEID || editOEID ||"",
                "lPBU":formData.PBU || editPBU ||"",
                "lSignatureText":formData.SignatureText ||"",
                "lSignatureDate": moment().utc().format("YYYY-MM-DD HH:mm:ss"),
                "lEmployerIdentificationNumber":formData.EmployerIdentificationNumber ||"",
                "lLimitedLiability":formData.LimitedLiability ||"",
                "lOthersText":formData.OthersText ||"",
                "lRequestersNameandAddress":formData.RequestersNameandAddress ||"",
                "lCreatedBy":null,
                "lCreatedOn":"",
                "lStatus":status,
                "YEAR":moment().year()
            })
        })
        const responseBody = await response.data;

        if (!responseBody.error) {
            const responseStatus = responseBody.Data && responseBody.Data[0] && responseBody.Data[0].Status || "";
            if(responseStatus== "Fail"){
                dispatch({
                    type: 'W9FORM_RESUBMIT_FAILED',
                    payload: responseBody.Data[0].Message || "Oops! Something went wrong."
                })
                return false
            }

            dispatch({
                type: 'W9FORM_RESUBMIT_SUCCESS',
                payload: true
            })
            return true
        }
        dispatch({
            type: 'W9FORM_RESUBMIT_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'W9FORM_RESUBMIT_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}

export const reviewedW9Form = ({formData, userId, editOEID, editPBU, status}) => async (dispatch) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Taxation/BankerUpdateW9FormReviewed`,
            //url:`https://7j6vnigzd7.execute-api.us-east-2.amazonaws.com/dev/BankerUpdateW9FormReviewed`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({
                "lW9textFormID": formData.ID ||"",
            })
        })
        const responseBody = await response.data;

        if (!responseBody.error) {
            const responseStatus = responseBody.Data && responseBody.Data[0] && responseBody.Data[0].Status || "";
            if(responseStatus== "Fail"){
                dispatch({
                    type: 'W9FORM_REVIEWED_FAILED',
                    payload: responseBody.Data[0].Message || "Oops! Something went wrong."
                })
                return false
            }
            dispatch({
                type: 'W9FORM_REVIEWED_SUCCESS',
                payload: true
            })
            return true
        }
        dispatch({
            type: 'W9FORM_REVIEWED_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'W9FORM_REVIEWED_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}

export const checkW9Resubmit = ({pbu, oeid}) => async (dispatch) => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Taxation/BankerCheckW9ResubmitOrNot`,
            //url:`https://7j6vnigzd7.execute-api.us-east-2.amazonaws.com/dev/BankerCheckW9ResubmitOrNot`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
            data: JSON.stringify({
                lPBU: pbu || "",
                lOEID: oeid || "",
                lYEAR: moment().year(),
            })
        })
        const responseBody = await response.data;

        if (!responseBody.error) {
            dispatch({
                type: 'W9FORM_RESUBMIT_SUCCESS',
                payload: responseBody.Data && responseBody.Data[0].Result
            })
            return responseBody.Data && responseBody.Data[0].Result
        }
        dispatch({
            type: 'W9FORM_RESUBMIT_FAILED',
            payload: responseBody.error || "Oops! Something went wrong."
        })
        return false
    } catch (error) {
        dispatch({
            type: 'W9FORM_RESUBMIT_FAILED',
            payload: error.message || "An error has occured."
        })
        return false
    }
}