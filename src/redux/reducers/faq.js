
const initialState = {
    faq: {
        error: null,
        data: []
    }
};

export default function clientConfig(state = initialState, action = {}) {
    switch (action.type) {
        case 'FETCH_BANKERS_FAQ_SUCCESS':
            return {
                ...state,
                faq: {
                    ...state.faq,
                    error: null,
                    data: action.payload
                }
            };

        case 'FETCH_BANKERS_FAQ_FAILED':
            return {
                ...state,
                faq: {
                    ...state.faq,
                    error: action.payload,
                    data: []
                }
            };
        default:
            return {
                ...state
            };

    }
}