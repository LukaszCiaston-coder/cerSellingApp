// utils.js

export const generateImageUrl = (imageName) => {
  // Add the full path to images based on the server configuration
  return `http://localhost:3000/uploads/${imageName}`;
};
