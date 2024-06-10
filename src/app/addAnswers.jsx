'use cliant'
export const INITIAL = {
    addAnswers: [],
};

export const handleAddAnswers = (state, action) => {
    switch (action.type) {
        case 'ADD_ANSWER':
            return {
                ...state,
                addAnswers: [...state.addAnswers, action.payload],
            };
        case 'RESULT':
            return {
                ...state,
            };

        default:
            return state;
    }
}