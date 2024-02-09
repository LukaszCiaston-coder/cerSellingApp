import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import AddCarForm from "../../components/AddCarForm/AddCarForm";
import styles from "./AddCarPage.module.css";

const AddCarPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => (state.auth ? state.auth.user : null));

  const handleAddCar = (car) => {
    console.log("Car added successfully:", car);

    // Dodaj obsługę przekierowania po dodaniu ogłoszenia
    navigate("/search");

    // Wyświetl komunikat za pomocą react-toastify
    toast.success("Car added successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className={styles.addCarPage}>
      <AddCarForm user={user} onSubmit={handleAddCar} />
      <ToastContainer />
    </div>
  );
};

export default AddCarPage;
