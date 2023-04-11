import axios from 'axios'
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

    STOCK_UPDATE_REQUEST,
    STOCK_UPDATE_SUCCESS,
    STOCK_UPDATE_FAIL,

} from '../constants/stockConstants'


export const listStocks = () => async (dispatch, getState) => {
    try {
        dispatch({ type: STOCK_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/stocks/`, config)

        dispatch({
            type: STOCK_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STOCK_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const listStockDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: STOCK_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/stocks/${id}`)

        dispatch({
            type: STOCK_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STOCK_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteStock = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STOCK_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/stocks/delete/${id}/`,
            config
        )

        dispatch({
            type: STOCK_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: STOCK_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const createStock = (stock) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STOCK_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/stocks/create/`,
            stock,
            config
        )
        dispatch({
            type: STOCK_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: STOCK_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateStock = (changes) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STOCK_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const  { data }  = await axios.put(
            `/api/stocks/update/`,
            changes,
            config
        )
        dispatch({
            type: STOCK_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: STOCK_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: STOCK_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
