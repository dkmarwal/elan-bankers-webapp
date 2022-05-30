import Cookies from 'universal-cookie'
import axios from 'axios'
import config from '~/config'
import { getAccessToken } from '~/redux/helpers/user'

export const GetPaymentMethods = async () => {
	const accessToken = await getAccessToken()
	//const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3J0YnUiOiIzNzI1MSIsIm9laWQiOiIxOTk5OSIsImlhdCI6MTU3NDQxNTMzN30.fO07D0wn-I5NHH_WobI9s830_gQrLriSM8N65ZMO4fs'
	try{
		const response = await axios({
			url: `${config.base_url}/api/Redeem/GetPaymentMethod`,
			//url: `https://g8gsgwy2x0.execute-api.us-east-2.amazonaws.com/dev/GetPaymentMethod`,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${accessToken}`,
			}
		})
        console.log("redeem awards respon", response);
		return await response.data
	}catch(error){
		return {
			error: (error.response && error.response.data.error) || 'Something went wrong!'
		}
	}
	// return [{paymentTypeId:2, paymentMethodName: "Bank Account", masked_AccountNumber:"******2345", default:true},
	// {paymentTypeId:3, paymentMethodName: "Zelle", masked_AccountNumber: "", default:false}]
}

export const GetPaymentMethodsByClientId = async ({ PBU, OEID }) => {
	const accessToken = await getAccessToken()
	//const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3J0YnUiOiIzNzI1MSIsIm9laWQiOiIxOTk5OSIsImlhdCI6MTU3NDQxNTMzN30.fO07D0wn-I5NHH_WobI9s830_gQrLriSM8N65ZMO4fs'
	try {
		const response = await axios({
			url: `${config.base_url}/api/Redeem/GetPaymentMethodByClientId`,
			//url: `https://g8gsgwy2x0.execute-api.us-east-2.amazonaws.com/dev/GetPaymentMethodByClientId`,
			method: 'POST',
			data: JSON.stringify({
				"pclient_id": 1,
				"lOEID": OEID,
				"lPBU": PBU
			}),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${accessToken}`,
			}
		})
		console.log("redeem awards respon", response);
		return await response.data
	} catch (error) {
		return {
			error: (error.response && error.response.data.error) || 'Something went wrong!'
		}
	}
	// return [{paymentTypeId:2, paymentMethodName: "Bank Account", masked_AccountNumber:"******2345", default:true},
	// {paymentTypeId:3, paymentMethodName: "Zelle", masked_AccountNumber: "", default:false}]
}

export const GetW9Year = async ({ accessToken}) => {
	//const accessToken = await getAccessToken()
	//const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3J0YnUiOiIzNzI1MSIsIm9laWQiOiIxOTk5OSIsImlhdCI6MTU3NDQxNTMzN30.fO07D0wn-I5NHH_WobI9s830_gQrLriSM8N65ZMO4fs'
	try {
		const response = await axios({
			url: `${config.base_url}/api/Redeem/W9GetYear`,
			//url: `https://7j6vnigzd7.execute-api.us-east-2.amazonaws.com/dev/W9GetYear`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${accessToken}`,
			}
		})
		console.log("year response", response);
		return await response.data
	} catch (error) {
		return {
			error: (error.response && error.response.data.error) || 'Something went wrong!'
		}
	}
	// return [{paymentTypeId:2, paymentMethodName: "Bank Account", masked_AccountNumber:"******2345", default:true},
	// {paymentTypeId:3, paymentMethodName: "Zelle", masked_AccountNumber: "", default:false}]
}