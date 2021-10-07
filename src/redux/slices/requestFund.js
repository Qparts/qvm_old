import { createSlice } from '@reduxjs/toolkit';
import paymentService from 'src/services/paymentService';

// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    error: null,
    fundRequests: [],
    pendingRequest: null,
};


const slice = createSlice({
    name: 'requestFund',
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

        getFundRequests(state, action) {
            const fundRequests = action.payload;
            const pendingRequest = fundRequests.find(x => x.status == 'N');
            console.log("fundRequests", fundRequests);
            console.log("pendingRequests", pendingRequest);
            state.fundRequests = fundRequests;
            state.pendingRequest = pendingRequest;
            state.isLoading = false;
        }
    }

});



// Reducer
export default slice.reducer;


// Actions
export const {

} = slice.actions;


export function getfundRequests() {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const { data: fundRequest } = await paymentService.getfundRequests();
            dispatch(slice.actions.getFundRequests(fundRequest));
        } catch (error) {
            dispatch(slice.actions.hasError(error.response?.data));
        }
    };
}