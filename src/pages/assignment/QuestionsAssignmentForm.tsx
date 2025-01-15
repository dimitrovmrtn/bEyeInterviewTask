import React, { Dispatch, SetStateAction } from "react";
import {
  FaTrashCan,
  FaArrowUp,
  FaArrowDown,
  FaCirclePlus,
} from "react-icons/fa6";
import { IAssignedQuestion, IQuestion } from "../../redux/questionSlice";
import styles from "./style.module.css";

interface IQuestionsAssignmentForm {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    type: "SQ" | "SU"
  ) => void;
  handleDelete: (id: number, type: "SQ" | "SU") => void;
  moveQuestionUp: (index: number) => void;
  moveQuestionDown: (index: number) => void;
  questions: IQuestion[];
  selectedQuestion: IQuestion;
  setSelectedQuestion: Dispatch<SetStateAction<IQuestion>>;
  assignedQuestionsForSelectedSurvey: IAssignedQuestion[];
}

const QuestionsAssignmentForm = ({
  handleSubmit,
  handleDelete,
  moveQuestionUp,
  moveQuestionDown,
  selectedQuestion,
  setSelectedQuestion,
  questions,
  assignedQuestionsForSelectedSurvey,
}: IQuestionsAssignmentForm) => {
  return (
    <form
      onSubmit={(e) => handleSubmit(e, "SQ")}
      className={styles.assignmentForm}
    >
      <h3>Assigned questions:</h3>
      {assignedQuestionsForSelectedSurvey.length ? (
        assignedQuestionsForSelectedSurvey.map((question, index) => (
          <span
            key={question.id}
            className={`${styles.assigned} ${styles.question}`}
          >
            <b>{question.text}</b>
            <span className={styles.actionsContainer}>
              <span
                onClick={() => handleDelete(question.id, "SQ")}
                className={styles.delete}
              >
                <FaTrashCan />
              </span>
              <span onClick={() => moveQuestionUp(index)}>
                {index !== 0 && <FaArrowUp />}{" "}
              </span>
              <span onClick={() => moveQuestionDown(index)}>
                {index !== assignedQuestionsForSelectedSurvey.length - 1 && (
                  <FaArrowDown />
                )}
              </span>
            </span>
          </span>
        ))
      ) : (
        <h4>No assigned questions for this survey</h4>
      )}
      <div className={styles.formInput}>
        <label htmlFor="questions">Questions</label>
        <select
          placeholder="Pick a question from the dropdown"
          name="questions"
          value={selectedQuestion?.id}
          onChange={(e) => {
            setSelectedQuestion(
              questions.find(
                (question) => question.id === Number(e.target.value)
              )
            );
          }}
          id="questions"
        >
          <option value="0" selected>
            ---Select your option---
          </option>
          {questions
            .filter(
              (question) =>
                assignedQuestionsForSelectedSurvey.find(
                  (assignedQuestion) => assignedQuestion.id === question.id
                ) === undefined
            )
            .map((question: IQuestion) => (
              <option key={question.id} value={question.id}>
                {question.text}
              </option>
            ))}
        </select>
      </div>
      <div className={styles.actionButtons}>
        <button
          disabled={!selectedQuestion}
          className={styles.saveButton}
          type="submit"
        >
          <FaCirclePlus />
          Save
        </button>
      </div>
    </form>
  );
};

export default QuestionsAssignmentForm;
