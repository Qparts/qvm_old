import { createSlice } from '@reduxjs/toolkit';
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
    locationQuery: ""
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
            state.error = '';
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

            // state.locationFilters = state.locationFilters.filter(e => {
            //     return e.type != locationFilter.type && e.object.id != locationFilter.object.id;
            // });

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
    handleChangeRowsPerPage
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
}

export const getCachedCompany = (recentCompanyData, selectedCompanies, cachedCompanies) => {
    const companyMapData = new Map(recentCompanyData);
    if (companyMapData != null && companyMapData.size) {
        for (let item of selectedCompanies) {
            if (companyMapData.has(item)) {
                cachedCompanies.set(item, companyMapData.get(item));
                selectedCompanies.delete(item);
            }
        }
    }
}


export const getMissingCompaniesFromAPI = async (tempCompanies, selectedCompanies) => {
    if (selectedCompanies.size > 0) {
        const array = [...selectedCompanies];
        const companiesIds = array.join();

        const { data: companies } = await partSearchService.getCompanies({ companyId: companiesIds });
        for (let compnay of companies) {
            tempCompanies.set(compnay.id, compnay);
        }

    }
}


export const cacheMissingCompanies = (recentCompanyData, tempCompanies) => {
    if (recentCompanyData != null && recentCompanyData.length) {
        const existComapny = recentCompanyData;
        SaveData(constants.COMPANYIES, Array.from(new Map([...existComapny, ...tempCompanies]).entries()));
    } else {
        SaveData(constants.COMPANYIES, Array.from(tempCompanies.entries()));

    }
}