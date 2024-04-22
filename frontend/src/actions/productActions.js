import axios from "axios";

import {
	ALL_PRODUCTS_REQUEST,
	ALL_PRODUCTS_SUCCESS,
	ALL_PRODUCTS_FAIL,
	ADMIN_PRODUCTS_REQUEST,
	ADMIN_PRODUCTS_SUCCESS,
	ADMIN_PRODUCTS_FAIL,
	NEW_PRODUCT_REQUEST,
	NEW_PRODUCT_SUCCESS,
	NEW_PRODUCT_FAIL,
	DELETE_PRODUCT_REQUEST,
	DELETE_PRODUCT_SUCCESS,
	DELETE_PRODUCT_FAIL,
	UPDATE_PRODUCT_REQUEST,
	UPDATE_PRODUCT_SUCCESS,
	UPDATE_PRODUCT_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_SUCCESS,
	NEW_REVIEW_FAIL,
	GET_REVIEWS_REQUEST,
	GET_REVIEWS_SUCCESS,
	GET_REVIEWS_FAIL,
	DELETE_REVIEW_REQUEST,
	DELETE_REVIEW_SUCCESS,
	DELETE_REVIEW_FAIL,
	CLEAR_ERRORS,
} from "../constants/productConstants";

export const getProducts =
	(keyword = "", currentPage = 1, price, category, rating = 0) =>
		async (dispatch) => {
			try {
				dispatch({ type: ALL_PRODUCTS_REQUEST });

				let link = `http://localhost:4000/api/v1/products?page=${currentPage}`;
				if (keyword) {
					link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;
				}

				if (category) {
					link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
				}

				const { data } = await axios.get(link);
               console.log(data)
				dispatch({
					type: ALL_PRODUCTS_SUCCESS,
					payload: data,
				});
			} catch (error) {
				dispatch({
					type: ALL_PRODUCTS_FAIL,
					payload: error,
				});
			}
		};

export const newProduct = (productData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_PRODUCT_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(
			`http://localhost:4000/api/v1/admin/product/new`,
			productData,
			{
				withCredentials: true // Cấu hình Axios để bao gồm cookie trong yêu cầu
			  },
			config
		);
		dispatch({
			type: NEW_PRODUCT_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: NEW_PRODUCT_FAIL,
			payload: error,
		});
	}
};

// Delete product (Admin)
export const deleteProduct = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_PRODUCT_REQUEST });

		const { data } = await axios.delete(`http://localhost:4000/api/v1/admin/product/${id}`,	{
			withCredentials: true // Cấu hình Axios để bao gồm cookie trong yêu cầu
		  });

		dispatch({
			type: DELETE_PRODUCT_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: DELETE_PRODUCT_FAIL,
			payload: error,
		});
	}
};

// Update Product (ADMIN)
export const updateProduct = (id, productData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PRODUCT_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.put(
			`http://localhost:4000/api/v1/admin/product/${id}`,
			productData,
			{
				withCredentials: true // Cấu hình Axios để bao gồm cookie trong yêu cầu
			  },
			config
		);

		dispatch({
			type: UPDATE_PRODUCT_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_PRODUCT_FAIL,
			payload: error,
		});
	}
};

export const getProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });

		const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`,	{
			withCredentials: true // Cấu hình Axios để bao gồm cookie trong yêu cầu
		  });

		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data.product,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload: error,
		});
	}
};

export const newReview = (reviewData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_REVIEW_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.put(`http://localhost:4000/api/v1/review`, reviewData, 	{
			withCredentials: true // Cấu hình Axios để bao gồm cookie trong yêu cầu
		  },config);

		dispatch({
			type: NEW_REVIEW_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: NEW_REVIEW_FAIL,
			payload: error,
		});
	}
};

export const getAdminProducts = () => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_PRODUCTS_REQUEST });

		const { data } = await axios.get(`http://localhost:4000/api/v1/admin/products`,	{
			withCredentials: true // Cấu hình Axios để bao gồm cookie trong yêu cầu
		  },);

		dispatch({
			type: ADMIN_PRODUCTS_SUCCESS,
			payload: data.products,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_PRODUCTS_FAIL,
			payload: error,
		});
	}
};

// Get product reviews
export const getProductReviews = (id) => async (dispatch) => {
	try {
		dispatch({ type: GET_REVIEWS_REQUEST });

		const { data } = await axios.get(`http://localhost:4000/api/v1/reviews?id=${id}`,	{
			withCredentials: true // Cấu hình Axios để bao gồm cookie trong yêu cầu
		  },);

		dispatch({
			type: GET_REVIEWS_SUCCESS,
			payload: data.reviews,
		});
	} catch (error) {
		dispatch({
			type: GET_REVIEWS_FAIL,
			payload: error,
		});
	}
};

// Delete product review
export const deleteReview = (id, productId) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_REVIEW_REQUEST });

		const { data } = await axios.delete(
			`http://localhost:4000/api/v1/reviews?id=${id}&productId=${productId}`,	{
				withCredentials: true // Cấu hình Axios để bao gồm cookie trong yêu cầu
			  },
		);

		dispatch({
			type: DELETE_REVIEW_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		console.log(error.response);

		dispatch({
			type: DELETE_REVIEW_FAIL,
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
