// src/selectors/carSelectors.js
export const getAllCars = (state) => state.cars.cars;
export const getCarById = (state, carId) =>
  state.cars.cars.find((car) => car._id === carId);
export const getUserCars = (state, userId) =>
  state.cars.cars.filter((car) => car.owner === userId);
export const getFavoriteCars = (state, userId) =>
  state.cars.cars.filter((car) => car.favoriteBy.includes(userId));
export const getNewlyAddedCar = (state) =>
  state.cars.cars[state.cars.cars.length - 1];
