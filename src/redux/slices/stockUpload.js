import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    error: '',

};


const slice = createSlice({
    name: 'stockUpload',
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
    }

});



// Reducer
export default slice.reducer;


// Actions
export const {

} = slice.actions;
