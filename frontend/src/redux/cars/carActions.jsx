// src/actions/carActions.js
import axios from "axios";

export const getAllCars = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_CARS_REQUEST" });
  try {
    const response = await axios.get("http://localhost:3000/api/cars");
    dispatch({ type: "GET_ALL_CARS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_ALL_CARS_FAILURE", payload: error.message });
  }
};
export const addCar = (newCar) => async (dispatch) => {
  dispatch({ type: "ADD_CAR_REQUEST" });
  try {
    const response = await axios.post(
      "http://localhost:3000/api/cars/add",
      newCar
    );
    dispatch({ type: "ADD_CAR_SUCCESS", payload: response.data.car });
  } catch (error) {
    dispatch({ type: "ADD_CAR_FAILURE", payload: error.message });
  }
};
export const getCar = (carId) => async (dispatch) => {
  dispatch({ type: "GET_CAR_REQUEST" });
  try {
    const response = await axios.get(`http://localhost:3000/api/cars/${carId}`);
    dispatch({ type: "GET_CAR_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_CAR_FAILURE", payload: error.message });
  }
};

export const updateCar = (carId, updatedCar) => async (dispatch) => {
  dispatch({ type: "UPDATE_CAR_REQUEST" });
  try {
    const response = await axios.patch(
      `http://localhost:3000/api/cars/${carId}`,
      updatedCar
    );
    dispatch({ type: "UPDATE_CAR_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "UPDATE_CAR_FAILURE", payload: error.message });
  }
};

export const deleteCar = (carId) => async (dispatch) => {
  dispatch({ type: "DELETE_CAR_REQUEST" });
  try {
    await axios.delete(`http://localhost:3000/api/cars/${carId}`);
    dispatch({ type: "DELETE_CAR_SUCCESS", payload: carId });
  } catch (error) {
    dispatch({ type: "DELETE_CAR_FAILURE", payload: error.message });
  }
};

export const toggleFavorite = (carId) => async (dispatch) => {
  dispatch({ type: "TOGGLE_FAVORITE_REQUEST" });
  try {
    const response = await axios.patch(
      `http://localhost:3000/api/cars/favorite/${carId}`
    );
    dispatch({
      type: "TOGGLE_FAVORITE_SUCCESS",
      payload: { carId, isFavorite: response.data.favorite },
    });
  } catch (error) {
    dispatch({ type: "TOGGLE_FAVORITE_FAILURE", payload: error.message });
  }
};

// carActions.js
export const searchCars = (query) => async (dispatch) => {
  dispatch({ type: "SEARCH_CARS_REQUEST" });

  try {
    const response = await axios.get(
      `http://localhost:3000/api/cars/search?query=${query}`
    );

    dispatch({ type: "SEARCH_CARS_SUCCESS", payload: response.data });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Obsługa błędu 404
      dispatch({
        type: "SEARCH_CARS_FAILURE",
        payload: "No advertisements found.",
      });
    } else {
      // Inny rodzaj błędu
      console.error("Error searching cars:", error);
      dispatch({
        type: "SEARCH_CARS_FAILURE",
        payload: "Error occurred while searching for advertisements.",
      });
    }
  }
};
