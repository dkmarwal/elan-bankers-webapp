import Cookies from 'universal-cookie'
import axios from 'axios'
import config from '~/config'
import { getAccessToken } from '~/redux/helpers/user'

const cookies = new Cookies(window.document.cookie)

export const userInfo = () => async (dispatch) => {
	try {
		const accessToken = await getAccessToken()
		if (accessToken) {
			const response = await axios({
                url: `${config.base_url}/api/GetWelcomeName`,
				//url: `https://99pjhup0s9.execute-api.us-east-2.amazonaws.com/dev/GetWelcomeName`,
				method: 'POST',
				data: JSON.stringify({
					"Pbu": cookies.get('portbu'),
					"Oeid": cookies.get('oeid')
				}),
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `${accessToken}`,
				}
			})
			const responseBody = await response.data
			console.log(responseBody);
			if (!responseBody.error) {
				dispatch({
					type: 'LOGIN_SUCCESS',
					payload: {
						accessToken,
						userInfo: responseBody,
						portbu: cookies.get('portbu'),
						oeid: cookies.get('oeid'),
						am: cookies.get('am'),
						refreshToken: cookies.get('refreshToken'),
						client: cookies.get('client')
					}
				})
				return true;
			}
		}
		return logout();
	} catch (error) {
        	cookies.remove('accessToken');
            cookies.remove('refreshToken');
            cookies.remove('portbu');
            cookies.remove('oeid');
			cookies.remove('am');
			// cookies.remove('client');
		dispatch({
			type: 'LOGIN_FAILED',
			payload: error.message || "An error has occured."
		})
		return false
	}
}

export const processLogin = ({ accessToken, refreshToken, portbu, oeid, am, client }) => async (dispatch) => {
	try {
		let cookies = new Cookies(window.document.cookie)
		cookies.set('accessToken', accessToken, { path: '/' })
		cookies.set('refreshToken', refreshToken, { path: '/' })
		cookies.set('portbu', portbu, { path: '/' })
		cookies.set('oeid', oeid, { path: '/' })
		cookies.set('am', am, { path: '/' })
        cookies.set('client', client, { path: '/' })
		dispatch({
			type: 'LOGIN_SUCCESS',
			payload: {
				accessToken,
				refreshToken,
				portbu,
				oeid,
				am,
				client
			}
		})
	} catch (error) {
		dispatch({
			type: 'LOGIN_FAILED',
			payload: {
				error: (error.response && error.response.data.error) || "An error has occured."
			}
		})
		return false
	}
}

export const setNewPassword = (credentials) => async (dispatch) => {
	try {
		const accessToken = await getAccessToken()
		const response = await axios({
			url: `${config.base_url}/api/OAuth/oauth/updatePassword`,
			//url: `https://azhcutalsc.execute-api.us-east-2.amazonaws.com/dev/oauth/updatePassword`,
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${accessToken}`,
			},
			data: JSON.stringify(credentials)
		})
		const responseBody = await response.data
		if (!responseBody.error) {
			dispatch({
				type: 'UPDATE_PASSWORD_SUCCESS',
				payload: {
					PasswordChangedDate: new Date()
				}
			})
		} else {
			dispatch({
				type: 'UPDATE_PASSWORD_FAILED',
				payload: responseBody.error || 'Oops! Something went wrong.'
			})
		}
	} catch (error) {
		dispatch({
			type: 'UPDATE_PASSWORD_FAILED',
			payload: (error.response && error.response.data.error) || "An error has occured."
		})
	}
}

export const fetchClientConfigSettings = (data) => async (dispatch) => {
	try {
		const accessToken = await getAccessToken()
		const response = await axios({
			url: `${config.base_url}/api/getBankerCodeWiseClientConfig`,
			//url: `https://ma4pjac42i.execute-api.us-east-2.amazonaws.com/dev/getBankerCodeWiseClientConfig`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${accessToken}`,
			},
			data: {"Code":"C00001"}
			
		})
		const responseBody = await response.data
		console.log("responseBody", responseBody);
		if (!responseBody.error) {
			console.log("CONFIG_THEME_FETCH_SUCCESS");
			dispatch({
				type: 'CONFIG_THEME_FETCH_SUCCESS',
				payload: responseBody.ClientConfigs[0]
			})
			return true
		} else {
			console.log("CONFIG_THEME_FETCH_FAILED");
			dispatch({
				type: 'CONFIG_THEME_FETCH_FAILED',
				payload: responseBody.error || 'Oops! Something went wrong.'
			})
			return false;
		}
	} catch (error) {
		dispatch({
			type: 'CONFIG_THEME_FETCH_FAILED',
			payload: (error.response && error.response.data.error) || "An error has occured."
		})
	return false;
	}
}

export const fetchClientConfig = () => async (dispatch) => {
	try {
		const accessToken = await getAccessToken()
		if (accessToken) {
			const response = await axios({
				url: `${config.base_url}/api/getAllClientConfigs`,
				//url: `https://wj0yq02ibj.execute-api.us-east-2.amazonaws.com/dev/getAllClientConfigs`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `${accessToken}`,
				},

			})
			const responseBody = await response.data
			if (!responseBody.error) {
				dispatch({
					type: 'CONFIG_FETCH_SUCCESS',
					payload: responseBody.ClientConfigs
				})
				return true
			}
            dispatch({
                type: 'CONFIG_FETCH_FAILED',
                payload: responseBody.error || 'Oops! Something went wrong.'
            })
            return false;
		}
	} catch (error) {
		dispatch({
			type: 'CONFIG_FETCH_FAILED',
			payload: error.message || "An error has occured."
		})
		return false
	}
}


export const logout = () => {
	let cookies = new Cookies(window.document.cookie)
	cookies.remove('accessToken');
	cookies.remove('refreshToken');
	cookies.remove('portbu');
    cookies.remove('oeid');
	cookies.remove('am');
	// cookies.remove('client');
	return {
		type: 'LOGOUT_SUCCESS',
		payload: {}
	}
}