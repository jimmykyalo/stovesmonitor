import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    userLoginReducer,
    userRegisterReducer,
    userOTPReducer,
    verifyOTPReducer,
    // userDetailsReducer,
    // userUpdateProfileReducer,
    // userListReducer,
    // userDeleteReducer,
    // userUpdateReducer,
    // userEmailReducer,
} from './reducers/userReducers'
import {
    productListReducer,
    productCreateReducer,
    productUpdateReducer,
    productDeleteReducer

} from './reducers/productReducers'

import {
    supplierListReducer,
    supplierCreateReducer,
    supplierUpdateReducer,
    supplierDeleteReducer

} from './reducers/supplierReducers'

import {
    stockListReducer,
    stockCreateReducer,
    stockUpdateReducer,
    stockDeleteReducer

} from './reducers/stockReducers'

import {
    saleListReducer,
    saleCreateReducer,
    salesPerProductReducer,
    salesPerClusterReducer,
    salesTrendReducer,
    productSalesTrendReducer,
    saleDeleteReducer,
    saleUpdateReducer,
    salesPerCountyReducer,
    salesPerCustomerReducer,
    subscriptionListReducer

} from './reducers/saleReducers'

import {
    customerListReducer,
    customerCreateReducer,
    customerUpdateReducer,
    customerDeleteReducer,
    notifyCustomerReducer

} from './reducers/customerReducers'

import { countyDropdownReducer } from './reducers/dropdownReducers'

const userInfoFromStorage = sessionStorage.getItem('userInfo') ?
    JSON.parse(sessionStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userOTP: userOTPReducer,
    verifyOTP: verifyOTPReducer,
    
    
    supplierList: supplierListReducer,    
    supplierCreate: supplierCreateReducer,
    supplierUpdate: supplierUpdateReducer,
    supplierDelete: supplierDeleteReducer,

    productList: productListReducer,    
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,

    stockList: stockListReducer,    
    stockCreate: stockCreateReducer,
    stockUpdate: stockUpdateReducer,
    stockDelete: stockDeleteReducer,

    saleList: saleListReducer,
    saleCreate: saleCreateReducer,
    salesTrend: salesTrendReducer,
    salesPerProduct: salesPerProductReducer,
    productSalesTrend: productSalesTrendReducer,
    saleUpdate: saleUpdateReducer,
    saleDelete: saleDeleteReducer,
    salesPerCluster: salesPerClusterReducer,
    salesPerCounty: salesPerCountyReducer,
    salesPerCustomer: salesPerCustomerReducer,
    subscriptionList: subscriptionListReducer,

    customerList: customerListReducer,    
    customerCreate: customerCreateReducer,
    customerUpdate: customerUpdateReducer,
    customerDelete: customerDeleteReducer,
    notifyCustomer: notifyCustomerReducer,
    
    countyDropdown: countyDropdownReducer,
})
    
const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store
