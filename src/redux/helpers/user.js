import Cookies from 'universal-cookie'
import axios from 'axios'
import config from '~/config'

export const getAccessToken = async () => {
	const cookies = new Cookies(window.document.cookie)
	const refreshToken = cookies.get('refreshToken')
	const accessToken = cookies.get('accessToken')
	if(accessToken){
		return accessToken
	}
	if(refreshToken){
		try{
			const response = await axios({
                url: `${config.base_url}/api/BankersOAuth/oauth/bankerToken?refreshToken=${refreshToken}`,
                //url: `https://9omj8nro5d.execute-api.us-east-2.amazonaws.com/dev/oauth/bankerToken?refreshToken=${refreshToken}`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			})
			const responseBody = await response.data
			if(responseBody.success) {
				cookies.set('accessToken', responseBody.accessToken, { path: '/' })
				return responseBody.accessToken
			}
			return null
		}catch(error){
			return null
		}
	}
	return null
}

export const checkSessionTimout = async () => {
	const cookies = new Cookies(window.document.cookie);
	const accessToken = cookies.get('accessToken');

	if(accessToken){
		try{
			const response = await axios({
				url: `${config.base_url}/api/BankerAuthorizer/oauth/checkBankerSession`,
				//url: `https://d21atiytcj.execute-api.us-east-2.amazonaws.com/dev/oauth/checkBankerSession`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
                    'Authorization': `${accessToken}`,
				}
			})
			const responseBody = await response.data
			if(responseBody.success) {
                return true
			}
			return false
		}catch(error){
			return false
		}
	}
    return false
}

//Update token/session time
export const keepSessionLive = async () => {
    const cookies = new Cookies(window.document.cookie);
    const refreshToken = cookies.get('refreshToken');
    const accessToken = cookies.get('accessToken');

	if(refreshToken){
		try{
			const response = await axios({
                url: `${config.base_url}/api/BankersOAuth/oauth/bankerToken?refreshToken=${refreshToken}`,
                //url:`https://9omj8nro5d.execute-api.us-east-2.amazonaws.com/dev/oauth/bankerToken?refreshToken=${refreshToken}`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
                    'Authorization': `${accessToken}`,
				}
			})
			const responseBody = await response.data;
			if (!responseBody.error) {
                const { accessToken, refreshToken } = responseBody;
                cookies.set('accessToken', accessToken, { path: '/' });
                cookies.set('refreshToken', refreshToken, { path: '/' });
				return true;
			}
			return false;
		}catch(error){
			return false;
		}
	}
	return false;
}

export const checkLoggedIn = async () => {
	let cookies = new Cookies(window.document.cookie);
    const accessKey = cookies.get('accessToken')

    if(accessKey){
        return true;
    } else{
        return false;
    }
}