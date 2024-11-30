import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/common/Button/Button";
import Modal from "../common/Modal/Modal";
import RecommendedDaily from "../RecommendedDaily/RecommendedDaily";
import styles from "./CalorieCalculatorForm.module.css";
import {
  selectRecommendedCalories,
  selectRestrictedAliments,
} from "../../redux/products/productSelectors";

const CalorieCalculatorForm = ({ apiCallFunction }) => {
  const recommendedCalories = useSelector(selectRecommendedCalories);
  const restrictedAliments = useSelector(selectRestrictedAliments);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    height: "",
    desiredWeight: "",
    age: "",
    currentWeight: "",
    bloodGroupIndex: "",
  });

  const [result, setResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formBloodType = ["1", "2", "3", "4"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericFormData = {
      ...formData,
      height: Number(formData.height),
      desiredWeight: Number(formData.desiredWeight),
      age: Number(formData.age),
      currentWeight: Number(formData.currentWeight),
      bloodGroupIndex: Number(formData.bloodGroupIndex),
    };

    try {
      const data = await dispatch(apiCallFunction(numericFormData));
      console.log(data);
      setResult(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>
          Calculate your daily calorie intake right now
        </h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.flexContainer}>
            <div className={styles.leftContainer}>
              <div className={styles.inputContainer}>
                <input
                  type="number"
                  id="height"
                  name="height"
                  placeholder="Height"
                  value={formData.height}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
                <label htmlFor="height" className={styles.label}>
                  Height *
                </label>
              </div>

              <div className={styles.inputContainer}>
                <input
                  type="number"
                  id="age"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
                <label htmlFor="age" className={styles.label}>
                  Age *
                </label>
              </div>

              <div className={styles.inputContainer}>
                <input
                  type="number"
                  id="currentWeight"
                  name="currentWeight"
                  placeholder="Current weight"
                  value={formData.currentWeight}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
                <label htmlFor="currentWeight" className={styles.label}>
                  Current weight *
                </label>
              </div>
            </div>

            <div className={styles.rightContainer}>
              <div className={styles.inputContainer}>
                <input
                  type="number"
                  id="desiredWeight"
                  name="desiredWeight"
                  placeholder="Desired weight"
                  value={formData.desiredWeight}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
                <label htmlFor="desiredWeight" className={styles.label}>
                  Desired weight *
                </label>
              </div>

              <div className={styles.radioContainer}>
                <label className={styles.radioLabelText}>Blood type *</label>
                <div className={styles.radioGroup}>
                  {formBloodType.map((type) => (
                    <label key={type} className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="bloodGroupIndex"
                        value={type}
                        checked={formData.bloodGroupIndex === type}
                        onChange={handleChange}
                        required
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Button
            text={"Start losing weight"}
            type={"submit"}
            extraClass={styles.button}
          />
        </form>

        {isModalOpen && result && (
          <Modal handleModalClose={handleCloseModal} isVisible={isModalOpen}>
            <RecommendedDaily
              recommendedDailyCaloriesIntake={recommendedCalories}
              restrictedAliments={restrictedAliments}
            />
          </Modal>
        )}
      </div>
    </section>
  );
};

export default CalorieCalculatorForm;
