import React from "react";
import { FaCircleXmark, FaCirclePlus } from "react-icons/fa6";
import { IQuestionFormData } from "./QuestionsPage";
import styles from "./style.module.css";

interface IQuestionsFormProps {
  formData: IQuestionFormData;
  questionIdForEdit: number;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (value: string, property: string) => void;
  handleReset: () => void;
}

const QuestionsForm = ({
  formData,
  questionIdForEdit,
  handleSubmit,
  handleChange,
  handleReset,
}: IQuestionsFormProps) => {
  return (
    <form id="form" onSubmit={(e) => handleSubmit(e)} className="question-form">
      <h3>{questionIdForEdit !== null ? "Edit" : "Add"} a Question</h3>
      <div className={styles.formInput}>
        <input
          value={formData.text}
          onChange={(e) => handleChange(e.target.value, "text")}
          required
          placeholder="Enter text..."
          name="text"
          type="text"
        />
      </div>
      <div className={styles.actionButtons}>
        <button className={styles.clearButton} onClick={handleReset}>
          <FaCircleXmark />
          Clear
        </button>
        <button className={styles.saveButton} type="submit">
          <FaCirclePlus />
          {questionIdForEdit !== null ? "Save" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default QuestionsForm;
