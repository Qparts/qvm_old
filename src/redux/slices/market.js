import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
    isLoading: false,
    error: '',
    products: [
        { id: 1, brand: 'Toyota', brandAr: 'تيوتا', partNumber: 123456789, price: 240, name: 'Oil Filter', nameAr: 'فلتر زيت', img: '/static/icons/QVM-logo.png', qunatity: 7 },
        { id: 2, brand: 'KIA', brandAr: 'كيا', partNumber: 123456780, price: 300, name: 'Oil Filter', nameAr: 'فلتر زيت', img: '/static/icons/QVM-whiteV.svg', qunatity: 1 },
        { id: 3, brand: 'Honda', brandAr: 'هوندا', partNumber: 123456781, price: 120, name: 'Oil Filter', nameAr: 'فلتر زيت', img: '/static/icons/QVM-whiteV.svg', qunatity: 6 },
        { id: 4, brand: 'Geely', brandAr: 'جيلى', partNumber: 123456782, price: 200, name: 'Oil Filter', nameAr: 'فلتر زيت', img: '/static/icons/QVM-whiteV.svg', qunatity: 50 },
        { id: 5, brand: 'Toyota', brandAr: 'تيوتا', partNumber: 123456789, price: 240, name: 'Oil Filter', nameAr: 'فلتر زيت', img: '/static/icons/QVM-logo.png', qunatity: 17 },
        { id: 6, brand: 'KIA', brandAr: 'كيا', partNumber: 123456780, price: 300, name: 'Oil Filter', nameAr: 'فلتر زيت', img: '/static/icons/QVM-whiteV.svg', qunatity: 70 },
        { id: 7, brand: 'Honda', brandAr: 'هوندا', partNumber: 123456781, price: 120, name: 'Oil Filter', nameAr: 'فلتر زيت', img: '/static/icons/QVM-whiteV.svg', qunatity: 4 },
        { id: 8, brand: 'Geely', brandAr: 'جيلى', partNumber: 123456782, price: 200, name: 'Oil Filter', nameAr: 'فلتر زيت', img: '/static/icons/QVM-whiteV.svg', qunatity: 10 },
        { id: 9, brand: 'Toyota', brandAr: 'تيوتا', partNumber: 123456789, price: 240, name: 'Oil Filter', nameAr: 'فلتر زيت', img: '/static/icons/QVM-logo.png', qunatity: 30 },
        { id: 10, brand: 'KIA', brandAr: 'كيا', partNumber: 123456780, price: 300, name: 'Oil Filter', nameAr: 'فلتر زيت', img: '/static/icons/QVM-whiteV.svg', qunatity: 7 },
        { id: 11, brand: 'Honda', brandAr: 'هوندا', partNumber: 123456781, price: 120, name: 'Oil Filter', nameAr: 'فلتر زيت', img: '/static/icons/QVM-whiteV.svg', qunatity: 7 },
        { id: 12, brand: 'Geely', brandAr: 'جيلى', partNumber: 123456782, price: 200, name: 'Oil Filter', nameAr: 'فلتر زيت', img: '/static/icons/QVM-whiteV.svg', qunatity: 7 },

    ],
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    billingAddress: localStorage.getItem("billingAddress") ? JSON.parse(localStorage.getItem("billingAddress")) : null,
};


const slice = createSlice({
    name: 'market',
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

        updateCartItems(state, action) {
            state.cartItems = action.payload;
            localStorage.setItem("cartItems", JSON.stringify(action.payload));

        },

        updateBillingAddress(state, action) {
            state.billingAddress = action.payload;
            localStorage.setItem("billingAddress", JSON.stringify(action.payload));
        }
    }

});



// Reducer
export default slice.reducer;


// Actions
export const {
    updateCartItems,
    updateBillingAddress
} = slice.actions;
