import { createSlice } from '@reduxjs/toolkit';
import partSearchService from 'src/services/partSearchService';
import settingService from 'src/services/settingService';
import helper from 'src/utils/helper';


// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    branches: JSON.parse(localStorage.getItem("loginObject")).company.branches,
    error: '',
};


const slice = createSlice({
    name: 'branches',
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


        loadBranchesSuccess(state, action) {
            state.isLoading = false;
            state.branches = action.payload.branches;
            state.error = '';
        },


        cleanup(state) {
            state.isLoading = false;
            state.error = '';
        }
    }

});



// Reducer
export default slice.reducer;


// Actions
export const {
    cleanup,
} = slice.actions;


export function createBranch(branchName, countryId, regionId, cityId, location, countries) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const loginObject = JSON.parse(localStorage.getItem("loginObject"));

            let branch = {
                cityId: cityId,
                companyId: loginObject.company.id,
                countryId: countryId,
                latitude: location.latitude,
                longitude: location.longitude,
                mapZoom: location.mapZoom,
                name: branchName,
                nameAr: branchName,
                regionId: regionId,
            };

            const { data: branchData } = await settingService.addBranch(branch);
            const newBranches = loginObject.company.branches;
            newBranches.push(branchData);
            loginObject.company.branches = newBranches;
            localStorage.setItem("loginObject", JSON.stringify(loginObject));
            let branches = getBranches(countries);
            dispatch(slice.actions.loadBranchesSuccess({ branches }));

        } catch (error) {
            dispatch(slice.actions.hasError(error.response?.data));
        }
    };
}


export function loadBranches(countries) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {

            let branches = getBranches(countries);

            dispatch(slice.actions.loadBranchesSuccess({ branches }));

        } catch (error) {
            dispatch(slice.actions.hasError(error.response?.data));
        }
    };
}


const getBranches = (countries) => {
    const loginObject = JSON.parse(localStorage.getItem("loginObject"));
    let branches = [];
    const defaultBranchId = loginObject.company.defaultBranchId;

    loginObject.company.branches.forEach((b) => {
        let location = helper.getLocation(countries, b, 0, 0, 0);
        let branchUsers = loginObject.company.subscribers.filter(e => e.defaultBranch == b.id
            || (e.defaultBranch == null && defaultBranchId == b.id));

        if (location != null) {
            let branchInfo = {
                id: b.id,
                branchNameAr: b.nameAr,
                countryNameAr: location.country.nameAr,
                regionNameAr: location.region.nameAr,
                cityNameAr: location.city.nameAr,
                branchName: b.name,
                countryName: location.country.name,
                regionName: location.region.name,
                cityName: location.city.name,
                users: branchUsers
            };
            branches.push(branchInfo);
        }
    });

    return branches;
}