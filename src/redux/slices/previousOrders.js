import { createSlice } from '@reduxjs/toolkit';
import chatService from 'src/services/chatService';
import { loadMissingCompanies } from 'src/services/common/utilService';

// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    error: null,
    previousOrders: null,
    previousOrdersTable: [],
    currentCompnaies: null
    // searchSize: 0,
    // latest: false
};


const slice = createSlice({
    name: 'previousOrders',
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

        getPreviousOrdersSuccess(state, action) {
            state.isLoading = false;
            state.previousOrders = action.payload.previousOrders;
            state.previousOrdersTable = action.payload.previousOrdersTable;
            state.currentCompnaies = action.payload.currentCompnaies;
            state.error = null;
        },

    }

});



// Reducer
export default slice.reducer;


// Actions
export const {
} = slice.actions;


export function getPreviousOrders(companyId, page, count) {
    return async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
            const { data: previousOrders } = await chatService.getPreviousOrders(companyId, page, count);
            const subscribers = JSON.parse(localStorage.getItem('loginObject')).company.subscribers;
            let selectedCompanies = new Set();
            previousOrders.docs.forEach(element => {
                selectedCompanies.add(JSON.parse(element.text).companyId);
            });

            const currentCompnaies = await loadMissingCompanies(selectedCompanies);
            console.log("currentCompnaies", currentCompnaies);
            const ordersTable = [];

            previousOrders.docs.forEach(element => {
                const company = currentCompnaies.get(JSON.parse(element.text).companyId);
                const subscriber = subscribers.find(x => x.id == parseInt(element.sender));
                ordersTable.push({
                    sender: subscriber.name,
                    companyName: company.name,
                    companyNameAr: company.nameAr,
                    status: element.status == 'A' ? 'Accepted' : element.status == 'R' ? 'Rejected' : 'Pending',
                    created: element.createdAt,
                    text: element.text,
                    _id: element._id
                })
                selectedCompanies.add(JSON.parse(element.text).companyId);
            });
            dispatch(slice.actions.getPreviousOrdersSuccess({
                previousOrders: previousOrders,
                currentCompnaies: currentCompnaies,
                previousOrdersTable: ordersTable
            }));
        } catch (error) {
            dispatch(slice.actions.hasError(error.response?.data));
        }
    };
}

