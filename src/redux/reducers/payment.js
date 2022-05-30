var initialState = {
    payments: {
        list: [],
        details: {},
        fetchListError: null,
        fetchDetailError: null,
        createError: null,
        updateError: null,
        totalCount: 0
    },
    taxationHistory: {
        list: [],
        details: {},
        fetchListError: null,
        fetchDetailError: null,
        createError: null,
        updateError: null,
        totalCount: 0,
        rollupAmount: 0
    },
    redeemRewards:[],
    rewardsOverview:[],
    statusList:null,
    error:null
}

export default function payments(state = initialState, action = {}) {
    switch (action.type) {
        case 'REWARDS_LIST_FETCH_SUCCESS':
            return {
                ...state,
                payments: {
                    ...state.payments,
                    list: action.payload,
                    totalCount: action.totalCount,
                    fetchListError: null,
                }
            }
        case 'REWARDS_LIST_FETCH_FAILED':
            return {
                ...state,
                payments: {
                    ...state.payments,
                    fetchListError: action.payload.error
                }
            }

        case 'REWARDS_DETAIL_FETCH_SUCCESS':
            return {
                ...state,
                payments: {
                    ...state.payments,
                    details: {
                        ...action.payload,
                    },
                    fetchDetailError: null
                }
            }
        case 'REWARDS_DETAIL_FETCH_FAILED':
            return {
                ...state,
                payments: {
                    ...state.payments,
                    details: {},
                    fetchDetailError: action.payload
                }
            }
        case 'CREATE_REWARDS_START':
            return {
                ...state,
                payments: {
                    ...state.payments,
                    details: {},
                    createError: null,
                }
            }
        case 'CREATE_REWARDS_SUCCESS':
            return {
                ...state,
                payments: {
                    ...state.payments,
                    details: {
                        ...action.payload,
                    },
                    createError: null
                }
            }
        case 'CREATE_REWARDS_FAILED':
            return {
                ...state,
                payments: {
                    ...state.payments,
                    details: {},
                    createError: action.payload
                }
            }
        case 'UPDATE_REWARDS_SUCCESS':
            return {
                ...state,
                payments: {
                    ...state.payments,
                    details: {
                        ...action.payload,
                    },
                    updateError: null,
                    fetchDetailError: null
                }
            }
        case 'UPDATE_REWARDS_FAILED':
            return {
                ...state,
                payments: {
                    ...state.payments,
                    details: {},
                    updateError: action.payload,
                    fetchDetailError: null
                }
            }
        case 'REDEEM_REWARDS_FETCH_SUCCESS':
            return {
                ...state,
                payments: {
                    ...state.payments,
                    redeemRewards: action.payload,
                    error: null
                }
            }
        case 'REDEEM_REWARDS_FETCH_FAILED':
            return {
                ...state,
                payments: {
                    ...state.payments,
                    redeemRewards: [],
                    error: action.payload
                }
            }
        case 'REWARDS_OVERVIEW_START':
            return {
                ...state,
                payments: {
                    ...state.payments,
                    rewardsOverview: [],
                    error: null
                }
            }
        case 'REWARDS_OVERVIEW_FETCH_SUCCESS':
            return {
                ...state,
                payments: {
                    ...state.payments,
                    rewardsOverview: action.payload,
                    error: null
                }
            }
        case 'REWARDS_OVERVIEW_FETCH_FAILED':
            return {
                ...state,
                payments: {
                    ...state.payments,
                    rewardsOverview: [],
                    error: action.payload
                }
            }
        case 'PAYMENT_STATUS_LIST_FETCH_SUCCESS':
			return {
                ...state,
                payments: {
                    ...state.payments,
                    statusList: action.payload,
                    error: null,
                }
            }
        case 'PAYMENT_STATUS_LIST_FETCH_FAILED':
			return {
                ...state,
                payments: {
                    ...state.payments,
                    error: action.payload.error
                }
            }
        case "TAXATION_HISTORY_FETCH_SUCCESS":
            return {
                ...state,
                taxationHistory: {
                    ...state.taxationHistory,
                    list: action.payload,
                    totalCount: action.totalCount,
                    rollupAmount: action.rollupAmount,
                    error: null
                }
            }
        case "TAXATION_HISTORY_FETCH_FAILED":
            return {
                ...state,
                taxationHistory: {
                    ...state.taxationHistory,
                    error: action.payload.error
                }
            }
        default:
            return {
                ...state
            }
    }
}