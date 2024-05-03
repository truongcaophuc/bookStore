import axios from "axios";

import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    const token=JSON.parse(localStorage.getItem('token'))

    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("https://backend-bookstore-se81.onrender.com/api/v1/order/new", order,	{
     headers: {
                'Authorization': `Bearer ${token}`
              },      
    withCredentials: true // Cấu hình Axios để bao gồm cookie trong yêu cầu
      }, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error,
    });
  }
};

// Get curretly logged in user orders
export const myOrders = () => async (dispatch) => {
  try {
    const token=JSON.parse(localStorage.getItem('token'))

    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get("https://backend-bookstore-se81.onrender.com/api/v1/orders/me",	{
     headers: {
                'Authorization': `Bearer ${token}`
              },      
    withCredentials: true // Cấu hình Axios để bao gồm cookie trong yêu cầu
      },);

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error,
    });
  }
};

// Get order details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    const token=JSON.parse(localStorage.getItem('token'))

    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`https://backend-bookstore-se81.onrender.com/api/v1/order/${id}`,	{
     headers: {
                'Authorization': `Bearer ${token}`
              },      
    withCredentials: true // Cấu hình Axios để bao gồm cookie trong yêu cầu
      },);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error,
    });
  }
};

// Get all orders - ADMIN
export const allOrders = () => async (dispatch) => {
  try {
    const token=JSON.parse(localStorage.getItem('token'))

    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get(`https://backend-bookstore-se81.onrender.com/api/v1/admin/orders`,	{
     headers: {
                'Authorization': `Bearer ${token}`
              },      
    withCredentials: true // Cấu hình Axios để bao gồm cookie trong yêu cầu
      },);

    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: "Lỗi",
    });
  }
};

// update order
export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    const token=JSON.parse(localStorage.getItem('token'))

    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `https://backend-bookstore-se81.onrender.com/api/v1/admin/order/${id}`,
      orderData,
      {
				 headers: {
                'Authorization': `Bearer ${token}`
              },    
        withCredentials: true // Cấu hình Axios để bao gồm cookie trong yêu cầu
			  },
      config
    );

    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error,
    });
  }
};

// Delete order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    const token=JSON.parse(localStorage.getItem('token'))

    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`https://backend-bookstore-se81.onrender.com/api/v1/admin/order/${id}`,	{
     headers: {
                'Authorization': `Bearer ${token}`
              },      
    withCredentials: true // Cấu hình Axios để bao gồm cookie trong yêu cầu
      },);

    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
