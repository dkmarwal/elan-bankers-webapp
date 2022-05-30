var initialState = {
	user: {
		error: null,
		isLoggedIn: false,
		info: {
			portbu: null,
			oeid: null
		}
	},
}

export default function user(state = initialState, action = {}) {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return {
				...state,
				user: {
					info: {
						...action.payload
					},
					error: null,
					isLoggedIn: true,
				}
			}
		case 'LOGIN_FAILED':
			return {
				...state,
				user: {
					error: action.payload,
					info: {},
					isLoggedIn: false,
				}
			}
		case 'UPDATE_PASSWORD_SUCCESS':
			return {
				...state,
				user: {
					...state.user,
					info: {
						...state.user.info,
						...action.payload
					},
					updatePasswordError: null,
				}
			}
		case 'UPDATE_PASSWORD_FAILED':
			return {
				...state,
				user: {
					...state.user,
					updatePasswordError: action.payload,
				}
			}
		case 'LOGOUT_SUCCESS':
			return {
				...state,
				user: {
					isLoggedIn: false,
					info: {},
					error: null,
				}
			}
		default:
			return {
				...state
			}
	}
}