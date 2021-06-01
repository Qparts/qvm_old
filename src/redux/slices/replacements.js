import { createSlice } from '@reduxjs/toolkit';
import partSearchService from 'src/services/partSearchService';


// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    error: '',
    partReplacements: []

};


const slice = createSlice({
    name: 'replacements',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },

        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        // part replacements search
        getPartReplacementsSuccess(state, action) {
            state.isLoading = false;
            state.partReplacements = action.payload.partReplacements;
            state.error = '';
        },
        cleanup(state) {
            state.isLoading = false;
            state.error = '';
            state.partReplacements = []
        }
    }

});



// Reducer
export default slice.reducer;


// Actions
export const {
    cleanup
} = slice.actions;


export function getPartReplacements(query) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const { data: replacements } = await partSearchService.getPartReplacements(query);
            dispatch(slice.actions.getPartReplacementsSuccess({ partReplacements: replacements.articles }));
        } catch (error) {
            dispatch(slice.actions.hasError(error.response?.data));
        }
    };
}