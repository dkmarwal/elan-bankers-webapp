
const initialState = {
    clientConfig: {
        error: null,
        data: {},
        configs:null
    }
};

export default function clientConfig(state = initialState, action = {}) {
    switch (action.type) {
        case 'CONFIG_THEME_FETCH_SUCCESS':
            return {
                ...state,
                clientConfig: {
                    ...state.clientConfig,
                    error: null,
                    data: action.payload
                }
            };

        case 'CONFIG_THEME_FETCH_FAILED':
            return {
                ...state,
                clientConfig: {
                    ...state.clientConfig,
                    error: action.payload,
                    data: {}
                }
            };
        case 'CONFIG_FETCH_SUCCESS':
            return {
                ...state,
                clientConfig: {
                    ...state.clientConfig,
                    error: null,
                    configs: action.payload
                }
            };

        case 'CONFIG_FETCH_FAILED':
            return {
                ...state,
                clientConfig: {
                    ...state.clientConfig,
                    configs: null,
                    error: action.payload
                }
            };
        default:
            return {
                ...state
            };

    }
}