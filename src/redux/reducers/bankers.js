const initialState = {
    bankers: {
        list: [],
        error: null,
        rewardList: [],
        rewardTotalCount:0,
        totalCount:0,
        subtotalCount:0,
        details:[],
    }
}

export default function bankers(state = initialState, action = {}) {
    switch (action.type) {
        case 'FETCH_BANKERS_REWARDS_YTD_LIST_FETCH_SUCCESS':
            return {
                ...state,
                bankers: {
                    ...state.bankers,
                    rewardList: action.payload,
                    error: null,
                    rewardTotalCount:action.totalCount,
                }
            }
        case 'FETCH_BANKERS_REWARDS_YTD_LIST_FETCH_FAILED':
            return {
                ...state,
                bankers: {
                    ...state.bankers,
                    error: action.payload.error
                }
            }
        case 'FETCH_BANKERS_REWARDS_LIST_FETCH_SUCCESS':
            return {
                ...state,
                bankers: {
                    ...state.bankers,
                    list: action.payload,
                    error: null,
                    totalCount:action.totalCount,
                }
            }
        case 'FETCH_BANKERS_REWARDS_LIST_FETCH_FAILED':
            return {
                ...state,
                bankers: {
                    ...state.bankers,
                    error: action.payload.error
                }
            }
         case 'FETCH_BANKERS_REWARDS_DETAILS_LIST_FETCH_SUCCESS':
            return {
                ...state,
                bankers: {
                    ...state.bankers,
                    details: action.payload,
                    subtotalCount:action.totalCount,
                    error: null
                }
            }
        case 'FETCH_BANKERS_REWARDS_DETAILS_LIST_FETCH_FAILED':
            return {
                ...state,
                bankers: {
                    ...state.bankers,
                    error: action.payload.error
                }
            }
        default:
            return {
                ...state
            }
    }
}