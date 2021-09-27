import { createSlice } from '@reduxjs/toolkit';
import partSearchService from 'src/services/partSearchService';

// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    error: '',
    data: [],
    selectedQuotation:null
};


const slice = createSlice({
    name: 'quotationsReport',
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

        getQuotationReportSuccess(state, action) {
            state.data = action.payload;
            state.isLoading = false;
        },

        setSelectedQuotation(state, action){
            state.selectedQuotation = action.payload;
        }
    }

});



// Reducer
export default slice.reducer;


// Actions
export const {
    setSelectedQuotation
} = slice.actions;


export function getQuotationReport(year, month) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const { data: quotationReport } = await partSearchService.getQuotationReport(year, month);
            dispatch(slice.actions.getQuotationReportSuccess(quotationReport));
        } catch (error) {
            dispatch(slice.actions.hasError(error.response?.data));
        }
    };
}