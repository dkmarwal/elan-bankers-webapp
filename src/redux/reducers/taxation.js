var initialState = {
    taxations: {
        error: null,
        formData:null,
        resubmitted:false,
        reviewed:false
    },
}

export default function taxations(state = initialState, action = {}) {

    switch (action.type) {
        case 'W9FORM_FETCH_SUCCESS':
            return {
                ...state,
                taxations: {
                    ...state.taxations,
                    formData: action.payload,
                    error: null,
                }
            }
        case 'W9FORM_FETCH_FAILED':
            return {
                ...state,
                taxations: {
                    ...state.taxations,
                    error: action.payload
                }
            }
         case 'W9FORM_SAVE_SUCCESS':
            return {
                ...state,
                taxations: {
                    ...state.taxations,
                    formData: action.payload,
                    error: null,
                }
            }
        case 'W9FORM_SAVE_FAILED':
            return {
                ...state,
                taxations: {
                    ...state.taxations,
                    error: action.payload
                }
            }
        case 'W9FORM_RESUBMIT_SUCCESS':
            return {
                ...state,
                taxations: {
                    ...state.taxations,
                    resubmitted: action.payload,
                    error: null,
                }
            }
        case 'W9FORM_RESUBMIT_FAILED':
            return {
                ...state,
                taxations: {
                    ...state.taxations,
                    error: action.payload
                }
            }
        case 'W9FORM_REVIEWED_SUCCESS':
            return {
                ...state,
                taxations: {
                    ...state.taxations,
                    reviewed: action.payload,
                    error: null,
                }
            }
        case 'W9FORM_REVIEWED_FAILED':
            return {
                ...state,
                taxations: {
                    ...state.taxations,
                    error: action.payload
                }
            }
        default:
            return {
                ...state
            }
    }
}