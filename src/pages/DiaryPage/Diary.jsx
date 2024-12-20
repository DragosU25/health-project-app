// Diary.js
import React, { useState, useEffect } from "react";
import ProductsList from "../../components/ProductsList/ProductsList";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { getConsumedInfoForSpecificDay } from "../../redux/products/productOperations";
import { getCurrentUser } from "../../redux/auth/authOperations";
import Notiflix from "notiflix";

const Diary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedDate) return;

    const fetchData = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        localStorage.setItem("date", formattedDate);
        await dispatch(getConsumedInfoForSpecificDay(formattedDate)).unwrap();
        await dispatch(getCurrentUser()).unwrap();
      } catch (error) {
        Notiflix.Notify.failure(
          "Failed to fetch consumed products. Please try again."
        );
        console.error(error);
      }
    };

    fetchData();
  }, [selectedDate, dispatch]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <ProductsList
        selectedDate={selectedDate}
        handleChange={handleDateChange}
      />
      <Sidebar />
    </>
  );
};

export default Diary;
