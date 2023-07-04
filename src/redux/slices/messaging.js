import { createSlice } from '@reduxjs/toolkit';
import messagingService from 'src/services/messagingService';

// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    error: null
};


const slice = createSlice({
    name: 'messaging',
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

        // dashboard metrics
        messageSentSuccess(state) {
            state.isLoading = false;
            state.error = null;
        },
    }

});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function contactUsMessage({ name, email, mobile, countryId, companyName, notes }) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await messagingService.contactUs({
                name, email, mobile, countryId, companyName, notes
            });
            dispatch(slice.actions.messageSentSuccess());
        } catch (error) {
            dispatch(slice.actions.hasError({ data: error.response?.data, status: error.response?.status }));

        }

    };
}