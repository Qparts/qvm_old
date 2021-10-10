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
    filteredSpecialOffers: [],
    tags: [],
    companies: new Map(),
    offerProducts: [],
    selectedOffer: null,
    filter: "",
    searchSize: 0,
    latest: false
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
            state.filteredSpecialOffers = action.payload.specialOffers;
            state.companies = action.payload.companies;
            state.tags = action.payload.tags;
            state.latest = action.payload.latest;
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

        setFilteredSepcialOffer(state, action) {
            state.filteredSpecialOffers = action.payload.filteredSpecialOffers;
        },

        setTags(state, action) {
            state.tags = action.payload.tags;
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
    setFilter,
    setFilteredSepcialOffer
} = slice.actions;



export function getSpecialOffersLive(latest = false) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            let params = latest ? { latest: true } : {};
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
            let tags = ['all'];
            const specialOffersTags = specialOffers.map(sp => sp.tag);
            for (var i = 0; i < specialOffersTags.length; i++) {
                for (var j = 0; j < specialOffersTags[i].length; j++) {
                    if (tags.indexOf(specialOffersTags[i][j]) == -1) {
                        tags.push(specialOffersTags[i][j])
                    }
                }
            };
            dispatch(slice.actions.getSpecialOffersLiveSuccess({ specialOffers: specialOffers, tags: tags, latest: latest, companies: newCompanies }));
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

