const initialState = {
    support:{
        list: [],
        details: null,
        supportHistory:[],
        totalCount:0,
        comment:null,
        ticketDetail:null,
        categoryList:null,
        statusList:null,
        error: null,
    }
}

export default function support(state = initialState, action = {}) {
	switch (action.type) {
		case 'SUPPORT_LIST_FETCH_SUCCESS':
			return {
                ...state,
                support: {
                    ...state.support,
                    list: action.payload,
                    totalCount:action.totalCount,
                    error: null,
                }
            }
        case 'SUPPORT_LIST_FETCH_FAILED':
			return {
                ...state,
                support: {
                    ...state.support,
                    error: action.payload.error
                }
            }
        case 'SUPPORT_HISTORY_FETCH_SUCCESS':
			return {
                ...state,
                support: {
                    ...state.support,
                    details: action.payload,
                    error: null,
                }
            }
        case 'SUPPORT_HISTORY_FETCH_FAILED':
			return {
                ...state,
                support: {
                    ...state.support,
                    error: action.payload.error
                }
            }
        case 'SAVE_COMMENT_START':
            return {
                ...state,
                support: {
                    ...state.support,
                    comment: null,
                    error: null,
                }
            }
        case 'SAVE_COMMENT_SUCCESS':
            return {
                ...state,
                support: {
                    ...state.support,
                    comment: action.payload,
                    error: null
                }
            }
        case 'SAVE_COMMENT_FAILED':
            return {
                ...state,
                support: {
                    ...state.support,
                    error: action.payload
                }
            }
        case 'CREATE_TICKET_START':
            return {
                ...state,
                support: {
                    ...state.support,
                    ticketDetail: null,
                    error: null,
                }
            }
        case 'CREATE_TICKET_SUCCESS':
            return {
                ...state,
                support: {
                    ...state.support,
                    ticketDetail: {
                        ...state.ticketDetail,
                        TicketNo:action.payload,
                    },
                    error: null
                }
            }
        case 'CREATE_TICKET_FAILED':
            return {
                ...state,
                support: {
                    ...state.support,
                    error: action.payload
                }
            }
        case 'UPDATE_TICKET_START':
            return {
                ...state,
                support: {
                    ...state.support,
                    ticketDetail: null,
                    error: null,
                }
            }
        case 'UPDATE_TICKET_SUCCESS':
            return {
                ...state,
                support: {
                    ...state.support,
                    ticketDetail: null,
                    error: null
                }
            }
        case 'UPDATE_TICKET_FAILED':
            return {
                ...state,
                support: {
                    ...state.support,
                    error: action.payload
                }
            }
		case 'CATEGORY_LIST_FETCH_SUCCESS':
			return {
                ...state,
                support: {
                    ...state.support,
                    categoryList: action.payload,
                    error: null,
                }
            }
        case 'CATEGORY_LIST_FETCH_FAILED':
			return {
                ...state,
                support: {
                    ...state.support,
                    error: action.payload.error
                }
            }
		case 'STATUS_LIST_FETCH_SUCCESS':
			return {
                ...state,
                support: {
                    ...state.support,
                    statusList: action.payload,
                    error: null,
                }
            }
        case 'STATUS_LIST_FETCH_FAILED':
			return {
                ...state,
                support: {
                    ...state.support,
                    error: action.payload.error
                }
            }
		default:
			return {
				...state
			}
	}
}