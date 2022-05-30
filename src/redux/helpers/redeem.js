import Cookies from 'universal-cookie'
import axios from 'axios'
import config from '~/config'
import { getAccessToken } from '~/redux/helpers/user'

export const redeemAwards = async ({rewardIds, accessToken}) => {
	try{
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
			"pPaymentMethodID" : 2
			})
		})
        console.log("redeem awards respon", response);
		return await response.data
	}catch(error){
		return {
			error: (error.response && error.response.data.error) || 'Something went wrong!'
		}
	}
}

export const checkW9FormExistance = async ({PBU, OEID, accessToken}) => {
	try{
		const response = await axios({
			url: `${config.base_url}/api/Redeem/W9CheckFormExists`,
			//url: `https://7j6vnigzd7.execute-api.us-east-2.amazonaws.com/dev/W9CheckFormExists`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${accessToken}`,
			},
			data: JSON.stringify({
			    "lPBU": PBU,
                "lOEID": OEID,
                "lYear": new Date().getFullYear()
			})
		})
        console.log(" respon", response);
		return await response.data
	}catch(error){
		return {
			error: (error.response && error.response.data.error) || 'Something went wrong!'
		}
	}
}

export const downloadSampleW9form = async () => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Reward/getSignedUrlForW9FormDownloadTemplate`,
            //url: `https://qj1h5xu8mj.execute-api.us-east-2.amazonaws.com/dev/getSignedUrlForW9FormDownloadTemplate`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
        })
        const responseBody = await response.data;
        console.log("download  w9form", responseBody);
        return {
            error: null,
            data: responseBody.PreSignedURL || null
        }
    } catch (error) {
        return {
            error: (error.response && error.response.data.error) || 'Something went wrong!',
            data: null
        }
    }
}

export const downloadSSNPDF = async () => {
    try {
        const accessToken = await getAccessToken()
        const response = await axios({
            url: `${config.base_url}/api/Redeem/TaxResourceDownloadTemplate`,
            //url: `https://qj1h5xu8mj.execute-api.us-east-2.amazonaws.com/dev/TaxResourceDownloadTemplate`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`,
            },
        })
        const responseBody = await response.data;
        console.log("download ssn pdf", responseBody);
        return {
            error: null,
            data: responseBody.PreSignedURL || null
        }
    } catch (error) {
        return {
            error: (error.response && error.response.data.error) || 'Something went wrong!',
            data: null
        }
    }
}