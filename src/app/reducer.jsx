'use cliant'
export const INITIAL = {
    loading: false,
    post: {},
    error: false,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'START':
            return {
                loading: false,
                post: {},
                error: false,
            };
        case 'SUCCESS':
            return {
                loading: false,
                post: action.payload,
                error: false,
            };
        case 'ERROR':
            return {
                loading: false,
                post: {},
                error: true,
            };
        default:
            return state;
    }
}