import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectorsAuth";
import {
  getConsumedInfoForSpecificDay,
  deleteConsumedProductForUser,
} from "../../redux/products/productOperations"; // pentru a obține produsele pe o dată specifică
import Modal from "../common/Modal/Modal";
import AddConsumedProductForm from "../AddConsumedProductForm/AddConsumedProductForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { HiPlus, HiX } from "react-icons/hi"; // Importăm icon-ul de calendar
import styles from "./ProductsList.module.css"; // CSS
import Button from "../common/Button/Button";
import Notiflix from "notiflix"; // Importăm Notiflix pentru notificări
import { getCurrentUser } from "../../redux/auth/authOperations";

const ProductsList = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Data selectată
  const [productToDelete, setProductToDelete] = useState(null); // Produsul selectat pentru ștergere
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const datePickerRef = useRef(null); // Creăm un ref pentru DatePicker
  const consumedProducts = currentUser.consumedProducts; // Produse consumate din Redux

  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    dispatch(getConsumedInfoForSpecificDay(formattedDate));
  }, [dispatch, selectedDate]);

  // Funcție pentru a filtra produsele pe baza datei selectate
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split("T")[0]; // formatăm data în "yyyy-MM-dd"
    dispatch(getConsumedInfoForSpecificDay(formattedDate)); // Dispecerizăm acțiunea pentru a obține produsele pentru acea dată
  };

  // Funcție pentru a filtra produsele care au aceeași dată
  const filteredProducts = consumedProducts.filter((product) => {
    // Obținem doar data (ignoram ora) din baza de date
    const productDate = new Date(product.date).toISOString().split("T")[0];
    const selectedDateStr = selectedDate.toISOString().split("T")[0];
    return productDate === selectedDateStr; // Comparăm doar data (fără ora)
  });

  const handleDeleteClick = (productId, date) => {
    setProductToDelete({ productId, date });
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      const { productId, date } = productToDelete;
      dispatch(deleteConsumedProductForUser({ productId, date }))
        .unwrap()
        .then(() => {
          Notiflix.Notify.success("Product deleted successfully.");
          dispatch(
            getConsumedInfoForSpecificDay(
              selectedDate.toISOString().split("T")[0]
            )
          );
          dispatch(getCurrentUser());
          setIsDeleteModalVisible(false);
          setProductToDelete(null);
        })
        .catch((error) => {
          Notiflix.Notify.failure(
            "Failed to delete product. Please try again."
          );
          console.error(error);
        });
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
    setProductToDelete(null);
  };

  // Funcție pentru a obține primele două cuvinte dintr-un nume
  const getFirstTwoWords = (name) => {
    const words = name.split(" ");
    return words.slice(0, 2).join(" ");
  };

  return (
    <div className={styles.container}>
      {/* Afișează data curentă */}
      <div className={styles.dateContainer}>
        <span className={styles.currentDate}>
          {selectedDate.toLocaleDateString()}
        </span>{" "}
        {/* Afișează data selectată într-un format ușor de citit */}
        {/* Iconul de calendar pentru a deschide DatePicker */}
        <FaCalendarAlt
          className={styles.calendarIcon}
          onClick={() => datePickerRef.current.setOpen(true)} // Deschide DatePicker la click pe icon
        />
        {/* DatePicker pentru selecția datei */}
        <DatePicker
          ref={datePickerRef} // Atribuim ref-ul la DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          maxDate={new Date()} // Nu permite selectarea unei date din viitor
          dateFormat="yyyy-MM-dd"
          className={styles.datePicker}
        />
      </div>

      <AddConsumedProductForm extraClass={styles.addContainer} />

      <Modal
        isVisible={isAddModalVisible}
        handleModalClose={() => setIsAddModalVisible(false)}
        extraClass={styles.mobileModal}
      >
        <AddConsumedProductForm onClose={() => setIsAddModalVisible(false)} />
      </Modal>

      {/* Afișează lista de produse consumate pe data selectată */}
      <div className={styles.consumedProductsList}>
        {filteredProducts.length > 0 ? (
          <ol className={styles.list}>
            {filteredProducts.map((product) => (
              <li key={product._id} className={styles.item}>
                <span className={styles.name}>
                  {getFirstTwoWords(product.name)}
                </span>
                <span className={styles.weight}>{product.weight}g</span>
                <span className={styles.calories}>
                  {Math.round(product.calories)}{" "}
                  <span className={styles.sub}>kcal</span>
                </span>
                <button
                  onClick={() =>
                    handleDeleteClick(product.product, product.date)
                  }
                  className={styles.deleteButton}
                >
                  <HiX className={styles.xIcon}>x</HiX>
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <p className={styles.noProductsMessage}>
            No products found for this date.
          </p>
        )}
      </div>

      <Button
        text={<HiPlus className={styles.icon} />}
        type={"submit"}
        extraClass={styles.addButton}
        handlerFunction={() => setIsAddModalVisible(true)}
      />

      {/* Modal for confirming delete */}
      <Modal
        isVisible={isDeleteModalVisible}
        handleModalClose={cancelDelete}
        extraClass={styles.mobileModal}
      >
        <div className={styles.modalContent}>
          <h2 className={styles.modalText}>
            Are you sure you want to delete this product?
          </h2>
          <div className={styles.modalButtons}>
            <Button handlerFunction={confirmDelete} text={"Yes"} />
            <Button
              handlerFunction={cancelDelete}
              text={"No"}
              extraClass={styles.cancelButton}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductsList;
