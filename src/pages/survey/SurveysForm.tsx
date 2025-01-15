import React, { Dispatch, SetStateAction } from "react";
import { FaCircleXmark, FaCirclePlus } from "react-icons/fa6";
import DatetimeRangePicker from "react-datetime-range-picker";
import { ISurveyFormData } from "../../types";
import styles from "./style.module.css";

interface ISurveyFormProps {
  surveyIdForEdit: number;
  handleSubmit: (e) => void;
  handleChange: (value, property) => void;
  handleReset: () => void;
  formData: ISurveyFormData;
  setFormData: Dispatch<SetStateAction<ISurveyFormData>>;
}

const SurveysForm = ({
  surveyIdForEdit,
  handleSubmit,
  handleChange,
  handleReset,
  formData,
  setFormData,
}: ISurveyFormProps) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.surveyForm}>
      <h3>{surveyIdForEdit !== null ? "Edit" : "Add"} a Survey</h3>
      <div className={styles.formInput}>
        <label htmlFor="name">Name</label>
        <input
          value={formData.name}
          onChange={(e) => handleChange(e.target.value, "name")}
          required
          placeholder="Enter name..."
          name="name"
          type="text"
        />
      </div>
      <div className={styles.formInput}>
        <label htmlFor="description">Description</label>
        <input
          onChange={(e) => handleChange(e.target.value, "description")}
          value={formData.description}
          required
          placeholder="Enter description..."
          type="text"
        />
      </div>
      <div>
        <label htmlFor="range">Available dates</label>
        <DatetimeRangePicker
          onChange={(dates: { start: Date; end: Date }) => {
            setFormData({
              ...formData,
              openingTime: dates.start,
              closingTime: dates.end,
            });
          }}
        />
      </div>
      <div className={styles.actionButtons}>
        <button className={styles.clearButton} onClick={handleReset}>
          <FaCircleXmark />
          Clear
        </button>
        <button className={styles.saveButton} type="submit">
          <FaCirclePlus />
          {surveyIdForEdit !== null ? "Save" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default SurveysForm;
