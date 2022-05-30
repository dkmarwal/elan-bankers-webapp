import Cookies from 'universal-cookie'
import axios from 'axios'
import config from '~/config'
import { getAccessToken } from '~/redux/helpers/user'

export const maskedAccountNumber = async ({ accessToken, portbu, oeid}) => {
	//const accessToken = await getAccessToken()
	//const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3J0YnUiOiIzNzI1MSIsIm9laWQiOiIxOTk5OSIsImlhdCI6MTU3NDQxNTMzN30.fO07D0wn-I5NHH_WobI9s830_gQrLriSM8N65ZMO4fs'
	try{
		const response = await axios({
			url: `${config.base_url}/api/PaymentPreference/MaskBankAccountNumber`,
		    //url: `https://g8gsgwy2x0.execute-api.us-east-2.amazonaws.com/dev/MaskBankAccountNumber`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${accessToken}`,
			},
			data: JSON.stringify({
				lOEID : oeid || null,
    			lPBU : portbu || null
			})
		})
		return await response.data || '****1234'
	}catch(error){
		return {
			error: (error.response && error.response.data.error) || 'Something went wrong!'
		}
	}
}