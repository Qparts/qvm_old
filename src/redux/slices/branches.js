import { createSlice } from '@reduxjs/toolkit';
import partSearchService from 'src/services/partSearchService';
import settingService from 'src/services/settingService';
import helper from 'src/utils/helper';


// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    branches: JSON.parse(localStorage.getItem("loginObject"))?.company.branches,
    verificationMode: null,
    verifiedEmail: null,
    error: null,
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

        resetError(state) {
            state.isLoading = false;
            state.error = null;
        },


        loadBranchesSuccess(state, action) {
            state.isLoading = false;
            state.branches = action.payload.branches;
            state.error = null;
        },

        addUserSuccess(state, action) {
            state.isLoading = false;
            state.verificationMode = action.payload.verificationMode;
            state.verifiedEmail = action.payload.verifiedEmail;
            state.error = null;
        },


        cleanup(state) {
            state.isLoading = false;
            state.error = null;
            state.verificationMode = null;
            state.verifiedEmail = null;

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
            dispatch(slice.actions.hasError({ data: error.response?.data, status: error.response?.status }));
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
            dispatch(slice.actions.hasError({ data: error.response?.data, status: error.response?.status }));
        }
    };
}


export const getBranches = (countries) => {
    const loginObject = JSON.parse(localStorage.getItem("loginObject"));
    let branches = [];
    const defaultBranchId = loginObject.company.defaultBranchId;

    loginObject.company.branches.forEach((b) => {
        let location = helper.getLocation(countries, b, 0, 0, 0);
        let branchUsers = loginObject.company.subscribers.filter(e => e.defaultBranch == b.id
            || (b.id == defaultBranchId && e.defaultBranch == null));

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


export function addUser(email, mobile, countryId, password, name, defaultBranch) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {

            const { data: userData } = await settingService.addUser({
                email: email, mobile: mobile, countryId: countryId,
                password: password, name: name, defaultBranch: defaultBranch
            });

            dispatch(slice.actions.addUserSuccess({ verifiedEmail: email, verificationMode: userData.mode }));

        } catch (error) {
            dispatch(slice.actions.hasError({ data: error.response?.data, status: error.response?.status }));
        }
    };
}


export function verifyUser(code) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {

            await settingService.verifyUser({
                code: code
            });

            dispatch(slice.actions.resetError());

        } catch (error) {
            dispatch(slice.actions.hasError({ data: error.response?.data, status: error.response?.status }));
        }
    };
}