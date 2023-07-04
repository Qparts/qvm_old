import { createSlice } from '@reduxjs/toolkit';
import { cacheMissingCompanies, getCachedCompany, getMissingCompaniesFromAPI } from 'src/services/common/utilService';
import locationService from 'src/services/locationService';
import partSearchService from 'src/services/partSearchService';
import constants from 'src/utils/constants';
import { GetData, SaveData } from 'src/utils/LocalStorage';

// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    error: '',
    productResult: [],
    productInfoResult: [],
    locationOptions: [],
    locationFilters: [],
    filter: "",
    companies: null,
    searchSize: 0,
    selectedPart: null,
    selectedProduct: null,
    page: 0,
    rowsPerPage: 5,
    query: "",
    locationQuery: "",
    orders: localStorage.getItem("companiesOrders") ?
        JSON.parse(localStorage.getItem("companiesOrders")) : []
};


const slice = createSlice({
    name: 'PartSearch',
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

        // part Search
        partSearchSuccess(state, action) {
            state.isLoading = false;
            state.productResult = action.payload.productResult.companyProducts;
            state.searchSize = action.payload.productResult.searchSize;
            state.companies = action.payload.companies;
            state.query = action.payload.query;
            state.error = '';
        },

        // Product Search
        getProductInfoSuccess(state, action) {
            state.isLoading = false;
            state.productInfoResult = action.payload.productInfoResult;
            // state.error = '';
        },
        // search location
        searchLocationSuccess(state, action) {
            state.isLoading = false;
            state.locationOptions = action.payload.locationOptions;
            state.locationQuery = action.payload.locationQuery;
            state.error = '';
        },

        setSelectedPart(state, action) {
            state.selectedPart = action.payload.selectedPart;
        },

        setLocationQuery(state, action) {
            state.locationQuery = action.payload.locationQuery;
        },

        setFilter(state, action) {
            state.filter = action.payload.filter;
        },

        AddLocationfilter(state, action) {
            const values = action.payload.values
            let locationFilter = {
                type: "",
                countryId: 0,
                regionId: 0,
                cityId: 0
            };
            locationFilter.type = values.type;
            let itemExist = false;

            itemExist = state.locationFilters.some(x => x.type == values.type && x.object.id == values.object.id)

            if (!itemExist)
                state.locationFilters.push(values);
            state.locationOptions = [];
            state.locationQuery = "";
        },


        deleteLocationfilter(state, action) {
            const locationFilter = action.payload.locationFilter;

            let index = state.locationFilters.findIndex(e => e.type == locationFilter.type && e.object.id == locationFilter.object.id);
            state.locationFilters.splice(index, 1);
        },

        cleanup(state) {
            // localStorage.setItem("companiesOrders", JSON.stringify(state.orders));
            state.isLoading = false;
            state.error = '';
            state.productResult = [];
            state.productInfoResult = [];
            state.locationOptions = [];
            state.locationFilters = [];
            state.filter = "";
            // state.companies = null;
            state.searchSize = 0;
            state.selectedPart = null;
            state.selectedProduct = null;
            state.page = 0;
            state.query = "";
            state.locationQuery = ""
        },

        resetLocationfilter(state) {
            state.locationFilters = [];
        },


        setSelectedProduct(state, action) {
            state.selectedProduct = action.payload.selectedProduct;
        },
        handleChangePage(state, action) {
            state.page = action.payload.newPage;
        },

        handleChangeRowsPerPage(state, action) {
            state.page = 0;
            state.rowsPerPage = action.payload.rowsPerPage;
        },

        //add order item to company purchase order.
        addOrder(state, action) {
            const newOrder = action.payload;
            let newOrders = state.orders;
            let companyIndex = newOrders.findIndex(x => x.companyId == newOrder.companyId);
            if (companyIndex != -1) {
                newOrders[companyIndex].orders.push({ quantity: newOrder.quantity, order: newOrder.order })
            } else {
                newOrders.push({ companyId: newOrder.companyId, orders: [{ quantity: newOrder.quantity, order: newOrder.order }] })
            }
            state.orders = newOrders;
            localStorage.setItem("companiesOrders", JSON.stringify(newOrders));
        },

        updateOrderItemQuantity(state, action) {
            const item = action.payload.item;
            const newQuantity = action.payload.newQuantity;
            let newOrders = state.orders;
            const companyId = item.order.companyId;
            newOrders.find(x => x.companyId == companyId)
                .orders.find(x => x.order.id == item.order.id).quantity = newQuantity;
            state.orders = newOrders;
            localStorage.setItem("companiesOrders", JSON.stringify(newOrders));
        },

        updateCompaniesOrders(state, action) {
            let newOrders = action.payload;
            state.orders = newOrders;
            localStorage.setItem("companiesOrders", JSON.stringify(newOrders));
        },

        deleteOrderFromCompany(state, action) {
            const order = action.payload;
            let companyIndex = state.orders.findIndex(x => x.companyId == order.companyId);
            let orderIndex = state.orders[companyIndex].orders.findIndex(x => x.order.id == order.id);
            state.orders[companyIndex].orders.splice(orderIndex, 1);
            localStorage.setItem("companiesOrders", JSON.stringify(state.orders));
        }
    }

});



// Reducer
export default slice.reducer;


// Actions
export const {
    setSelectedPart,
    setLocationQuery,
    setFilter,
    AddLocationfilter,
    deleteLocationfilter,
    resetLocationfilter,
    setSelectedProduct,
    handleChangePage,
    handleChangeRowsPerPage,
    addOrder,
    updateOrderItemQuantity,
    updateCompaniesOrders,
    deleteOrderFromCompany,
    cleanup
} = slice.actions;


export function partSearch(query, offset, max, filter, locationFilters = []) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {

            let locationFiltersValue = getLocationsValues(locationFilters);

            const { data: result } = await partSearchService.productSearch({
                query, offset, max, filter,
                locationFilters: locationFiltersValue
            });

            //create set with companies ids.
            let selectedCompanies = new Set();
            let selectedProduct = [];
            selectedProduct = result.companyProducts;

            selectedProduct.forEach(element => {
                selectedCompanies.add(element.companyId);
            });

            const recentCompanyData = await GetData(constants.COMPANYIES);
            var cachedCompanies = new Map();

            getCachedCompany(recentCompanyData, selectedCompanies, cachedCompanies);


            //get not cached companies from backend.
            var tempCompanies = new Map();
            await getMissingCompaniesFromAPI(tempCompanies, selectedCompanies);

            //add missing companies to cache.
            cacheMissingCompanies(recentCompanyData, tempCompanies);

            let newCompanies = new Map([...cachedCompanies, ...tempCompanies]);


            dispatch(slice.actions.partSearchSuccess({ productResult: result, companies: newCompanies, query: query }));
        } catch (error) {
            dispatch(slice.actions.hasError(error.response?.data));
        }
    };
}


const getLocationsValues = (locations) => {
    let locationFiltersValue = [];
    for (let location of locations) {
        let newLocation = { type: "", countryId: 0, regionId: 0, cityId: 0 };
        newLocation.type = location.type;
        if (location.type == 'C') {
            newLocation.countryId = location.object.id;
        }
        else if (location.type == 'T') {
            newLocation.cityId = location.object.id;
        }
        else {
            newLocation.regionId = location.object.id;
        }

        locationFiltersValue.push(newLocation);
    }

    return locationFiltersValue;

}


export function getProductInfo(query, filter) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const { data: productInfoResult } = await partSearchService.productInfoSearch({ query, filter });
            dispatch(slice.actions.getProductInfoSuccess({ productInfoResult: productInfoResult }));
        } catch (error) {
            dispatch(slice.actions.hasError(error.response?.data));
        }
    };
}

export function searchLocation(query) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const { data: locationOptions } = await locationService.searchLocation(query);
            dispatch(slice.actions.searchLocationSuccess({ locationOptions: locationOptions, locationQuery: query }));
        } catch (error) {
            dispatch(slice.actions.hasError(error.response?.data));
        }
    };
};

