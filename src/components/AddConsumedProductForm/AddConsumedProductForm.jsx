import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  addConsumedProduct,
} from "../../redux/products/productOperations"; // Import actions
import styles from "./AddConsumedProductForm.module.css"; // CSS for styling
import { selectProducts } from "../../redux/products/productSelectors"; // Import selectors
import { getCurrentUser } from "../../redux/auth/authOperations";
import { HiPlus } from "react-icons/hi";
import Button from "../common/Button/Button";
import Notiflix from "notiflix";

const AddConsumedProductForm = ({ onClose, extraClass = "", date }) => {
  const dispatch = useDispatch();

  // State to hold form data
  const [productName, setProductName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [weight, setWeight] = useState(0);
  const [showSelect, setShowSelect] = useState(true);

  // Get all products from the Redux store
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getAllProducts()); // Fetch products on component mount
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  // Filter products based on the entered product name
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(productName.toLowerCase())
  );

  // Handle product selection from dropdown
  const handleProductSelect = (e) => {
    const selectedProductId = e.target.value;
    const product = products.find(
      (product) => product._id === selectedProductId
    );
    setSelectedProduct(product);
    setProductName(product.title);
    setShowSelect(false); // Hide the select dropdown
  };

  // Handle input change
  const handleInputChange = (e) => {
    setProductName(e.target.value);
    setShowSelect(true); // Show the select dropdown when typing
  };

  // Handle weight change
  const handleWeightChange = (e) => {
    const newWeight = e.target.value;
    setWeight(newWeight);
    if (selectedProduct) {
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedProduct || weight <= 0) {
      Notiflix.Notify.failure("Please fill in all fields correctly.");
      return;
    }

    const newConsumedProduct = {
      product: selectedProduct._id,
      date: date, // Set the current date
      quantity: weight, // Change quantity to weight
      kcal: (selectedProduct.calories / 100) * weight, // Calculate calories based on weight
      name: selectedProduct.title, // Add the title of the selected product
      weight: weight, // Use the weight input value directly
    };

    // Dispatch action to save consumed product to the Redux store
    dispatch(addConsumedProduct(newConsumedProduct))
      .unwrap()
      .then(() => {
        Notiflix.Notify.success("Product added successfully.");

        setProductName("");
        setSelectedProduct(null);
        setWeight(0);

        dispatch(getCurrentUser());

        // Close the modal after submission
        if (onClose) onClose();
      })
      .catch((error) => {
        Notiflix.Notify.failure("Failed to add product. Please try again.");
        console.error(error);
      });
  };

  return (
    <div className={`${styles.formContainer} ${extraClass}`}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            id="product"
            value={productName}
            onChange={handleInputChange}
            className={styles.input}
            placeholder="Start typing product name"
          />
          <label htmlFor="product" className={styles.label}>
            Enter product name
          </label>
          {productName && showSelect && (
            <div className={styles.customSelect}>
              <select
                value={selectedProduct ? selectedProduct._id : ""}
                onChange={handleProductSelect}
                className={styles.select}
              >
                <option value="">Select a product</option>
                {filteredProducts.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className={styles.inputContainer}>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={handleWeightChange}
            className={styles.input}
            placeholder="Enter weight"
          />
          <label htmlFor="weight" className={`${styles.label} ${styles.grams}`}>
            Grams
          </label>
        </div>

        <Button
          text={<HiPlus className={styles.icon} />}
          extraClass={styles.addButton}
        />
      </form>
    </div>
  );
};

export default AddConsumedProductForm;
