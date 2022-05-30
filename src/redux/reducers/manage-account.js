var initialState = {
    details: null,
    zelleDetails: null,
    acc_types:[],
    error: null,
    status: null,
}

export default function manageAccount(state = initialState, action = {}) {
	switch (action.type) {
		case 'MANAGE_ACCOUNT_FETCH_FAILED':
			return {
				...state,
				error: action.payload
            }
		case 'MANAGE_ACCOUNT_FETCH_SUCCESS':
			return {
				...state,
                details: action.payload.details,
                zelleDetails: action.payload.zelleDetails,
                error: null,
			}
            
        case 'MANAGE_ACCOUNT_UPDATE_START':
            return {
                ...state,
                error: null,
            }
        case 'MANAGE_ACCOUNT_UPDATE_SUCCESS':
            return {
                ...state,
                details: {
                        ...action.payload.details,
                    },
            }
        case 'MANAGE_ACCOUNT_UPDATE_FAILED':
            return {
                ...state,
                error: action.payload
            }
        case 'MANAGE_ACCOUNT_DELETE_START':
            return {
                ...state,
                error:null
            }
        case 'MANAGE_ACCOUNT_DELETE_SUCCESS':
            return {
                ...state,
                details:null,
                error:null
            }
        case 'MANAGE_ACCOUNT_DELETE_FAILED':
            return {
                ...state,
                error: action.payload
            }
        case 'ACCOUNT_TYPES_FETCH_FAILED':
			return {
				...state,
				error: action.payload
            }
		case 'ACCOUNT_TYPES_FETCH_SUCCESS':
			return {
				...state,
				acc_types: action.payload.acc_types,
                error: null,
			}
		default:
			return {
				...state
			}
	}
}