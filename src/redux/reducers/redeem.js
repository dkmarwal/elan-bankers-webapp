var initialState = {
    redeem: {
        list: [],
        SSNData: null,
        mergeStatus: "",
        error: null
    },
}

export default function redeem(state = initialState, action = {}) {
    switch (action.type) {
        case 'REDEEM_LIST_FETCH_SUCCESS':
            return {
                ...state,
                redeem: {
                    ...state.redeem,
                    list: action.payload,
                }
            }
        case 'REDEEM_LIST_FETCH_FAILED':
            return {
                ...state,
                redeem: {
                    ...state.redeem,
                    fetchListError: action.payload
                }
            }

        case 'REDEEM_DETAIL_FETCH_SUCCESS':
            return {
                ...state,
                redeem: {
                    ...state.redeem,
                    details: {
                        ...action.payload,
                    },
                    fetchDetailError: null
                }
            }
        case 'REDEEM_DETAIL_FETCH_FAILED':
            return {
                ...state,
                redeem: {
                    ...state.redeem,
                    details: {},
                    fetchDetailError: action.payload
                }
            }
        case 'CREATE_REDEEM_START':
            return {
                ...state,
                redeem: {
                    ...state.redeem,
                    details: {},
                    createError: null,
                }
            }
        case 'CREATE_REDEEM_SUCCESS':
            return {
                ...state,
                redeem: {
                    ...state.redeem,
                    details: {
                        ...action.payload,
                    },
                    createError: null
                }
            }
        case 'CREATE_REDEEM_FAILED':
            return {
                ...state,
                redeem: {
                    ...state.redeem,
                    details: {},
                    createError: action.payload
                }
            }
        case 'UPDATE_REDEEM_SUCCESS':
            return {
                ...state,
                redeem: {
                    ...state.redeem,
                    details: {
                        ...action.payload,
                    },
                    updateError: null,
                    fetchDetailError: null
                }
            }
        case 'UPDATE_REDEEM_FAILED':
            return {
                ...state,
                redeem: {
                    ...state.redeem,
                    details: {},
                    updateError: action.payload,
                    fetchDetailError: null
                }
            }
        case 'REDEEM_REWARDS_SUCCESS':
            return {
                ...state,
                redeem: {
                    ...state.redeem,
                    list: [],
                    error: null
                }
            }
        case 'REDEEM_REWARDS_FAILED':
            return {
                ...state,
                redeem: {
                    ...state.redeem,
                    error: action.payload
                }
            }
        case 'SSN_CHECK_SUCCESS':
            return {
                ...state,
                redeem: {
                    ...state.redeem,
                    SSNData: action.payload,
                    error: null
                }
            }
        case 'SSN_CHECK_FAILED':
            return {
                ...state,
                redeem: {
                    ...state.redeem,
                    error: action.payload
                }
            }

        case 'MERGE_PROFILE_SUCCESS':
            return {
                ...state,
                redeem: {
                    ...state.redeem,
                    mergeStatus: action.payload,
                    error: null
                }
            }
        case 'MERGE_PROFILE_FAILED':
            return {
                ...state,
                redeem: {
                    ...state.redeem,
                    error: action.payload
                }
            }
        default:
            return {
                ...state
            }
    }
}