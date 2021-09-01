import { createSlice } from '@reduxjs/toolkit';
import specialOfferService from 'src/services/specialOfferService';
import { cacheMissingCompanies, getCachedCompany, getMissingCompaniesFromAPI } from 'src/services/common/utilService';
import { GetData } from 'src/utils/LocalStorage';
import constants from 'src/utils/constants';

// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    error: '',
    specialOffers: [],
    companies: new Map(),
    offerProducts: [],
    selectedOffer: null,
    filter: "",
    searchSize: 0,

};


const slice = createSlice({
    name: 'specialOffer',
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

        getSpecialOffersLiveSuccess(state, action) {
            state.isLoading = false;
            state.specialOffers = action.payload.specialOffers;
            state.companies = action.payload.companies;
            state.error = '';
        },

        getSpecialOfferDetailsSuccess(state, action) {
            state.isLoading = false;
            state.offerProducts = action.payload.offerDetails.products;
            state.searchSize = action.payload.offerDetails.searchSize;
            state.error = '';
        },

        setSelectedOffer(state, action) {
            state.selectedOffer = action.payload.selectedOffer;
        },

        setFilter(state, action) {
            state.filter = action.payload.filter;
        },
    }

});



// Reducer
export default slice.reducer;


// Actions
export const {
    setSelectedOffer,
    setFilter
} = slice.actions;



export function getSpecialOffersLive(latest = false) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            let params = latest ? {latest:true} : {};
            const { data: specialOffers } = await specialOfferService.getSpecialOffersLive(params);
            let selectedCompanies = new Set();
            specialOffers.forEach(element => {
                selectedCompanies.add(element.companyId);
            });

            const recentCompanyData = await GetData(constants.COMPANYIES);
            var cachedCompanies = new Map();

            getCachedCompany(recentCompanyData, selectedCompanies, cachedCompanies);

            var tempCompanies = new Map();
            await getMissingCompaniesFromAPI(tempCompanies, selectedCompanies);

            cacheMissingCompanies(recentCompanyData, tempCompanies);

            let newCompanies = new Map([...cachedCompanies, ...tempCompanies]);

            dispatch(slice.actions.getSpecialOffersLiveSuccess({ specialOffers: specialOffers, companies: newCompanies }));
        } catch (error) {
            dispatch(slice.actions.hasError(error.response?.data));
        }
    };
};

export function getSpecialOfferDetails(specialOfferId, offset, max, filter) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const { data: offerDetails } = await specialOfferService.getSpecialOfferDetails({ specialOfferId, offset, max, filter });
            dispatch(slice.actions.getSpecialOfferDetailsSuccess({ offerDetails: offerDetails }));
        } catch (error) {
            dispatch(slice.actions.hasError(error.response?.data));
        }
    };
}

