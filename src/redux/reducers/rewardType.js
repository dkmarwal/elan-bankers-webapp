var initialState = {
    rewardType: {
        error: null,
        data : []
    },
}

export default function rewardType(state = initialState, action = {}) {

    switch (action.type) {
        case 'REWARD_TYPE_LIST_FETCH_SUCCESS':
			return {
                ...state,
                rewardType: {
                    data: action.payload,
                    error: null,
                }
            }
        case 'REWARD_TYPE_LIST_FETCH_FAILED':
			return {
                ...state,
                rewardType: {
                    ...state.rewardType,
                    error: action.payload,
                }
            }
        default:
            return {
                ...state
            }
    }
}