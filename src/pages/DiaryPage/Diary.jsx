import React, { useState, useEffect } from "react";
import ProductsList from "../../components/ProductsList/ProductsList";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { getConsumedInfoForSpecificDay } from "../../redux/products/productOperations";
import { getCurrentUser } from "../../redux/auth/authOperations";

const Diary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();

  // Fetch data based on the selected date
  useEffect(() => {
    const fetchData = async () => {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      if (selectedDate) {
        await dispatch(getConsumedInfoForSpecificDay(formattedDate));
        dispatch(getCurrentUser()); // Ensure user data is refreshed
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
      <Sidebar selectedDate={selectedDate} />
    </>
  );
};

export default Diary;
