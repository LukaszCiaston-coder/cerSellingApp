// src/reducers/carReducer.js
const initialState = {
  cars: [],
  car: null,
  loading: false,
  error: null,
};

const carReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_CARS_REQUEST":
    case "GET_CAR_REQUEST":
    case "UPDATE_CAR_REQUEST":
    case "DELETE_CAR_REQUEST":
    case "TOGGLE_FAVORITE_REQUEST":
    case "SEARCH_CARS_REQUEST":
      return { ...state, loading: true, error: null };

    case "GET_ALL_CARS_SUCCESS":
      return { ...state, cars: action.payload, loading: false, error: null };

    case "GET_CAR_SUCCESS":
      return { ...state, car: action.payload, loading: false, error: null };

    case "UPDATE_CAR_SUCCESS":
      return {
        ...state,
        cars: state.cars.map((car) =>
          car._id === action.payload._id ? action.payload : car
        ),
        loading: false,
        error: null,
      };

    case "DELETE_CAR_SUCCESS":
      return {
        ...state,
        cars: state.cars.filter((car) => car._id !== action.payload),
        loading: false,
        error: null,
      };

    case "TOGGLE_FAVORITE_SUCCESS":
      return {
        ...state,
        cars: state.cars.map((car) =>
          car._id === action.payload.carId
            ? {
                ...car,
                favoriteBy: action.payload.isFavorite
                  ? [...car.favoriteBy, "userId"]
                  : [],
              }
            : car
        ),
        loading: false,
        error: null,
      };

    case "SEARCH_CARS_SUCCESS":
      return {
        ...state,
        cars: action.payload.cars,
        loading: false,
        error: null,
      };

    case "GET_ALL_CARS_FAILURE":
    case "GET_CAR_FAILURE":
    case "UPDATE_CAR_FAILURE":
    case "DELETE_CAR_FAILURE":
    case "TOGGLE_FAVORITE_FAILURE":
    case "SEARCH_CARS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default carReducer;
