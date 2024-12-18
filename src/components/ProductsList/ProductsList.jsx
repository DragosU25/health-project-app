import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectorsAuth";
import {
  getConsumedInfoForSpecificDay,
  deleteConsumedProductForUser,
} from "../../redux/products/productOperations";
import Modal from "../common/Modal/Modal";
import AddConsumedProductForm from "../AddConsumedProductForm/AddConsumedProductForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { HiPlus, HiX } from "react-icons/hi";
import styles from "./ProductsList.module.css";
import Button from "../common/Button/Button";
import Notiflix from "notiflix";
import { getCurrentUser } from "../../redux/auth/authOperations";

const ProductsList = ({ selectedDate, handleChange }) => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const datePickerRef = useRef(null);
  const consumedProducts = currentUser?.consumedProducts || [];

  useEffect(() => {
    const fetchData = async () => {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      if (selectedDate) {
        await dispatch(getConsumedInfoForSpecificDay(formattedDate));
      }
    };
    fetchData();
  }, [selectedDate, dispatch]);

  const filteredProducts = consumedProducts.filter((product) => {
    const productDate = new Date(product.date).toISOString().split("T")[0];
    const selectedDateStr = selectedDate.toISOString().split("T")[0];
    return productDate === selectedDateStr;
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

  const getFirstTwoWords = (name) => {
    const words = name.split(" ");
    return words.slice(0, 2).join(" ");
  };

  return (
    <div className={styles.container}>
      <div className={styles.dateContainer}>
        <span className={styles.currentDate}>
          {selectedDate.toLocaleDateString()}
        </span>
        <FaCalendarAlt
          className={styles.calendarIcon}
          onClick={() => datePickerRef.current.setOpen(true)}
        />
        <DatePicker
          ref={datePickerRef}
          selected={selectedDate}
          onChange={handleChange}
          maxDate={new Date()}
          dateFormat="yyyy-MM-dd"
          className={styles.datePicker}
        />
      </div>

      <AddConsumedProductForm
        extraClass={styles.addContainer}
        date={selectedDate}
      />

      <Modal
        isVisible={isAddModalVisible}
        handleModalClose={() => setIsAddModalVisible(false)}
        extraClass={styles.mobileModal}
      >
        <AddConsumedProductForm onClose={() => setIsAddModalVisible(false)} />
      </Modal>

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
