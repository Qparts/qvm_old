import { createSlice } from '@reduxjs/toolkit';
import partSearchService from 'src/services/partSearchService';

// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    error: '',
    mostSearchedProducts: [],
    mostSearchedCatalog: [],
    mostActiveCompaniesOnStock: [],
    monthlySearchCountOnStock: [],
    mostSearchedProductsOnStock: [],
    numOfParts: 0,
    numOfStockParts: 0,
    partsSearchCount: 0
};


const slice = createSlice({
    name: 'dashboard',
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
        getDashboardMetricsSuccess(state, action) {
            state.isLoading = false;
            state.mostSearchedProducts = action.payload.dashboardMetrics.mostSearchedProducts;
            state.mostSearchedCatalog = action.payload.dashboardMetrics.mostSearchedCatalogBrands;
            state.mostActiveCompaniesOnStock = action.payload.dashboardMetrics.mostActiveCompaniesOnStock;
            state.monthlySearchCountOnStock = action.payload.dashboardMetrics.monthlySearchCountOnStock;
            state.mostSearchedProductsOnStock = action.payload.dashboardMetrics.mostSearchedProductsOnStock;
            state.numOfParts = action.payload.dashboardMetrics.numberOfProducts;
            state.numOfStockParts = action.payload.dashboardMetrics.numberOfStockProducts;
            state.partsSearchCount = action.payload.dashboardMetrics.productSearchCount;
            state.error = '';
        },
    }

});

// Reducer
export default slice.reducer;

export function getDashboardMetrics() {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const { data: dashboardMetrics } = await partSearchService.getDashboardMetrics();
            dispatch(slice.actions.getDashboardMetricsSuccess({ dashboardMetrics: dashboardMetrics }));
        } catch (error) {
            dispatch(slice.actions.hasError(error.response?.data));
        }
    };
}