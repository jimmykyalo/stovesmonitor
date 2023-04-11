import {
    STOCK_LIST_REQUEST,
    STOCK_LIST_SUCCESS,
    STOCK_LIST_FAIL,

    STOCK_DETAILS_REQUEST,
    STOCK_DETAILS_SUCCESS,
    STOCK_DETAILS_FAIL,

    STOCK_DELETE_REQUEST,
    STOCK_DELETE_SUCCESS,
    STOCK_DELETE_FAIL,

    STOCK_CREATE_REQUEST,
    STOCK_CREATE_SUCCESS,
    STOCK_CREATE_FAIL,
    STOCK_CREATE_RESET,

    STOCK_UPDATE_REQUEST,
    STOCK_UPDATE_SUCCESS,
    STOCK_UPDATE_FAIL,
    STOCK_UPDATE_RESET,

} from '../constants/stockConstants'


export const stockListReducer = (state = { stocks: [], distributors:[], stockists:[], producers:[], installers:[], selectOptions: [] }, action) => {
    switch (action.type) {
        case STOCK_LIST_REQUEST:
            return { loading: true, stocks: [], distributors:[], stockists:[], producers:[], installers:[],selectOptions: [] }

        case STOCK_LIST_SUCCESS:
            const stockists = action.payload.filter(l=>l.category=='Stockist')
            const producers = action.payload.filter(item=>item.category=='Producer')
            const installers = action.payload.filter(l=>l.category=='Installer')
            const distributors = action.payload.filter(l=>l.category=='Distributor')
            
            const countyArray = [...new Set(action.payload.map(item => item.county))];
            return {
                loading: false,
                stocks: action.payload,
                selectOptions: countyArray.map((item)=> { return {label:item, value:item}} ),
                stockists,
                producers,
                installers,
                distributors
            }

        case STOCK_LIST_FAIL:
            return { loading: false, error: action.payload, distributors:[], stockists:[], producers:[], installers:[], selectOptions: [] }

        default:
            return state
    }
}



export const stockDetailsReducer = (state = { stock: { reviews: [] } }, action) => {
    switch (action.type) {
        case STOCK_DETAILS_REQUEST:
            return { loading: true, ...state }

        case STOCK_DETAILS_SUCCESS:
            return { loading: false, stock: action.payload }

        case STOCK_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const stockCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case STOCK_CREATE_REQUEST:
            return { loading: true }

        case STOCK_CREATE_SUCCESS:
            return { loading: false, success: true, stock: action.payload }

        case STOCK_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case STOCK_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const stockDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case STOCK_DELETE_REQUEST:
            return { loading: true }

        case STOCK_DELETE_SUCCESS:
            return { loading: false, success: true }

        case STOCK_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const stockUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case STOCK_UPDATE_REQUEST:
            return { loading: true }

        case STOCK_UPDATE_SUCCESS:
            return { loading: false, success: true, response: action.payload }

        case STOCK_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case STOCK_UPDATE_RESET:
            return { state: {} }

        default:
            return state
    }
}


