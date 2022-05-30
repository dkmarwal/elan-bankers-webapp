import Cookies from 'universal-cookie'
import axios from 'axios'
import config from '~/config'
import { getAccessToken } from '~/redux/helpers/user'

export const getSignedUrl = async (data) => {
	const accessToken = await getAccessToken()
	try {
		const response = await axios({
			url: `${config.base_url}/api/Reward/getSignedUrl`,
			//url: `https://dkmkaqkh34.execute-api.us-east-1.amazonaws.com/develop/getSignedUrl`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${accessToken}`,
			},
			data: JSON.stringify(data)
		})
		return await response.data
	} catch (error) {
		return {
			error: (error.response && error.response.data.error) || 'Something went wrong!'
		}
	}
}

export const processUploadedFile = async (FileID) => {
	const accessToken = await getAccessToken()
	try {
		const response = await axios({
			url: `${config.base_url}/api/Reward/rewarduploadfiledata`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${accessToken}`,
			},
			data: JSON.stringify({
				FileID
			})
		})
		return await response.data
	} catch (error) {
		return {
			error: (error.response && error.response.data.error) || 'Something went wrong!'
		}
	}
}

export const getFileUploadHistory = async (PageNo, PageSize) => {
	const accessToken = await getAccessToken()
	try {
		const response = await axios({
			url: `${config.base_url}/api/Reward/getrewardfilehistory`,
			//url: `https://dkmkaqkh34.execute-api.us-east-1.amazonaws.com/develop/getrewardfilehistory`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${accessToken}`,
			},
			data: JSON.stringify({
				PageNo: PageNo || 1,
				PageSize: PageSize || 10
			})
		})
		return await response.data
	} catch (error) {
		return {
			error: (error.response && error.response.data.error) || 'Something went wrong!'
		}
	}
}

export const approveRejectFile = async (FileRecordID, Status) => {
	const accessToken = await getAccessToken()
	try {
		const response = await axios({
			url: `${config.base_url}/api/approverejectrewardfile`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${accessToken}`,
			},
			data: JSON.stringify({
				FileID: FileRecordID,
				Status: Status
			})
		})
		return await response.data
	} catch (error) {
		return {
			error: (error.response && error.response.data.error) || 'Something went wrong!'
		}
	}
}

export const getFileRewards = async (FileRecordID) => {
	const accessToken = await getAccessToken()
	try {
		const response = await axios({
			url: `${config.base_url}/api/Reward/totalrewardsbyprmotionid`,
			//url: `https://dkmkaqkh34.execute-api.us-east-1.amazonaws.com/develop/totalrewardsbyprmotionid?filerecordid=${FileRecordID}`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${accessToken}`,
			},
			data: JSON.stringify({
				filerecordid: FileRecordID
			})
			// data: JSON.stringify({
			// 	filerecordid: FileRecordID
			// })
		})
		return await response.data
	} catch (error) {
		return {
			error: (error.response && error.response.data.error) || 'Something went wrong!'
		}
	}
}

export const getFileValidationStatus = async (FileRecordID) => {
	const accessToken = await getAccessToken()
	try {
		const response = await axios({
			url: `${config.base_url}/api/Reward/rewardValidationStatus`,
			//url: `https://dkmkaqkh34.execute-api.us-east-1.amazonaws.com/develop/rewardValidationStatus?filerecordid=${FileRecordID}`,
			method: 'POST',
			data: JSON.stringify({
				filerecordid: FileRecordID
			}),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${accessToken}`,
			}
		})
		return await response.data
	} catch (error) {
		return {
			error: (error.response && error.response.data.error) || 'Something went wrong!'
		}
	}
}

export const getFileErrorByStatus = async (FileRecordID, StatusId) => {
	const accessToken = await getAccessToken()
	try {
		const response = await axios({
			url: `${config.base_url}/api/Reward/rewardsfileErrordata`,
			//url: `https://dkmkaqkh34.execute-api.us-east-1.amazonaws.com/develop/rewardsfileErrordata?filerecordid=${FileRecordID}&statusid=${StatusId}`,
			method: 'POST',
			data: JSON.stringify({
				filerecordid: FileRecordID,
				statusid: StatusId
			}),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `${accessToken}`,
			}
		})
		return await response.data
	} catch (error) {
		return {
			error: (error.response && error.response.data.error) || 'Something went wrong!'
		}
	}
}