import { createSlice } from '@reduxjs/toolkit';
import partSearchService from 'src/services/partSearchService';

// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    error: '',
    data: [],
    selectedQuotation: null,
    quotationsReportStatus: false,
};


const slice = createSlice({
    name: 'quotationsReport',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
            state.quotationsReportStatus = false;
        },

        // HAS ERROR
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        getQuotationReportSuccess(state, action) {
            state.data = action.payload;
            state.isLoading = false;
            state.quotationsReportStatus = true;
        },

        setSelectedQuotation(state, action) {
            state.selectedQuotation = action.payload;
        },

        cleanup(state) {
            state.isLoading = false;
            state.error = '';
            state.data = [];
            state.selectedQuotation = null;
            state.quotationsReportStatus = false;
        }
    }

});



// Reducer
export default slice.reducer;


// Actions
export const {
    setSelectedQuotation,
    cleanup
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