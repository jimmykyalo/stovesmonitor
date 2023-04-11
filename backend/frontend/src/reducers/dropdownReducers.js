import {
        PRODUCT_TYPE_DROPDOWN_REQUEST,
        PRODUCT_TYPE_DROPDOWN_SUCCESS,
        PRODUCT_TYPE_DROPDOWN_FAIL,

        CUSTOMER_TYPE_DROPDOWN_REQUEST,
        CUSTOMER_TYPE_DROPDOWN_SUCCESS,
        CUSTOMER_TYPE_DROPDOWN_FAIL,

        COUNTY_DROPDOWN_REQUEST,
        COUNTY_DROPDOWN_SUCCESS,
        COUNTY_DROPDOWN_FAIL,

        PRODUCT_DROPDOWN_REQUEST,
        PRODUCT_DROPDOWN_SUCCESS,
        PRODUCT_DROPDOWN_FAIL,

        CUSTOMER_DROPDOWN_REQUEST,
        CUSTOMER_DROPDOWN_SUCCESS,
        CUSTOMER_DROPDOWN_FAIL,
    } 
    from '../constants/dropdownConstants'


export const productTypeDropdownReducer = (state = { productTypes: []}, action) => {
    switch (action.type) {
        case PRODUCT_TYPE_DROPDOWN_REQUEST:
            return { loading: true, productTypes: [] }

        case PRODUCT_TYPE_DROPDOWN_SUCCESS:
            const typeArray = [...new Set(action.payload.map(item => item.type))];
            return {
                loading: false,
                productTypes: typeArray.map((item)=> { return {value:item, label:item}} ),
                
            }

        case PRODUCT_TYPE_DROPDOWN_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const customerTypeDropdownReducer = (state = { customerTypes: []}, action) => {
    switch (action.type) {
        case CUSTOMER_TYPE_DROPDOWN_REQUEST:
            return { loading: true, customerTypes: [] }

        case CUSTOMER_TYPE_DROPDOWN_SUCCESS:
            
            
            const typeArray = [...new Set([...['Stockist', 'Retailer','Installer', 'School/Institution/University', 'Individual'], ...[...new Set(action.payload.map(item => item.type))]])]

            return {
                loading: false,
                customerTypes: typeArray.map((item)=> { return {value:item, label:item}} ),
                
            }

        case CUSTOMER_TYPE_DROPDOWN_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const countyDropdownReducer = (state = { counties: [], wards:[]}, action) => {
    switch (action.type) {
        case COUNTY_DROPDOWN_REQUEST:
            return { loading: true, counties: [], wards:[] }

        case COUNTY_DROPDOWN_SUCCESS:
            const countyArray = [...new Set(action.payload.map(item => item.county))];
            return {
                loading: false,
                counties: countyArray.map((item)=> { return {value:item, label:item}} ),
                wards: action.payload
                
            }

        case COUNTY_DROPDOWN_FAIL:
            return { loading: false, error: action.payload, wards:[] }

        default:
            return state
    }
}

export const productDropdownReducer = (state = { products: []}, action) => {
    switch (action.type) {
        case PRODUCT_DROPDOWN_REQUEST:
            return { loading: true, products: [] }

        case PRODUCT_DROPDOWN_SUCCESS:
            
            return {
                loading: false,
                products: action.payload.map((item)=> { return {value:item._id, label:item.productName}} ),
                
            }

        case PRODUCT_DROPDOWN_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const customerDropdownReducer = (state = { customers: []}, action) => {
    switch (action.type) {
        case CUSTOMER_DROPDOWN_REQUEST:
            return { loading: true, customers: [] }

        case CUSTOMER_DROPDOWN_SUCCESS:
            
            return {
                loading: false,
                customers: action.payload.map((item)=> { return {value:item._id, label:item.name}} ),
                
            }

        case CUSTOMER_DROPDOWN_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}