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
    CUSTOMER_DROPDOWN_FAIL
} 
from '../constants/dropdownConstants'
import axios from 'axios'

export const getProductTypeDropdown = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_TYPE_DROPDOWN_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/products/`, config)

        dispatch({
            type: PRODUCT_TYPE_DROPDOWN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_TYPE_DROPDOWN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getCustomerTypeDropdown = () => async (dispatch, getState) => {
    try {
        dispatch({ type: CUSTOMER_TYPE_DROPDOWN_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/customers/`, config)

        dispatch({
            type: CUSTOMER_TYPE_DROPDOWN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CUSTOMER_TYPE_DROPDOWN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getCountyDropdown = () => async (dispatch) => {
    try {
        dispatch({ type: COUNTY_DROPDOWN_REQUEST })

        

        const { data } = await axios.get(`/api/counties/`)

        dispatch({
            type: COUNTY_DROPDOWN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: COUNTY_DROPDOWN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getProductDropdown = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DROPDOWN_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/products/`, config)

        dispatch({
            type: PRODUCT_DROPDOWN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DROPDOWN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getCustomerDropdown = () => async (dispatch, getState) => {
    try {
        dispatch({ type: CUSTOMER_DROPDOWN_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/customers/`, config)

        dispatch({
            type: CUSTOMER_DROPDOWN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CUSTOMER_DROPDOWN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

