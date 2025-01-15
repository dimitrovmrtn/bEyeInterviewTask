import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchQuestions,
  deleteQuestion,
  IQuestion,
  createQuestion,
  updateQuestion,
} from "../../redux/questionSlice.ts";
import { AppDispatch } from "../../redux/store.ts";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { fetchAssignments } from "../../redux/assignmentSlice.ts";
import QuestionsForm from "./QuestionsForm.tsx";
import styles from "./style.module.css";

export interface IQuestionFormData {
  text: string;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();

const Questions = () => {
  const dispatch = useAppDispatch();
  const questions = useSelector((state: any) => state.questions.items);
  const questionStatus = useSelector((state: any) => state.questions.status);
  const assignments = useSelector((state: any) => state.assignments.items);
  const assignmentStatus = useSelector(
    (state: any) => state.assignments.status
  );

  useEffect(() => {
    if (questionStatus === "idle") {
      dispatch(fetchQuestions());
    }
    if (assignmentStatus === "idle") {
      dispatch(fetchAssignments());
    }
  }, [questionStatus, assignmentStatus, dispatch]);

  const initialFormData = {
    text: "",
  };

  const [formData, setFormData] = useState<IQuestionFormData>({
    ...initialFormData,
  });

  const [questionIdForEdit, setQuestionIdForEdit] = useState<number>(null);

  const handleChange = (value, property) => {
    const newFormData = { ...formData };
    newFormData[property] = value;
    setFormData(newFormData);
  };

  const handleReset = () => {
    setFormData({ ...initialFormData });
    setQuestionIdForEdit(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { text } = formData;
    const newQuestionData = {
      id: questionIdForEdit !== null ? questionIdForEdit : Math.random(),
      text,
    };
    dispatch(
      questionIdForEdit !== null
        ? updateQuestion(newQuestionData)
        : createQuestion(newQuestionData)
    );
    handleReset();
  };

  const handleEdit = ({ id, text }: IQuestion) => {
    setQuestionIdForEdit(id);
    const prefilledFormData = {
      text,
    };
    setFormData(prefilledFormData);
  };

  const handleDelete = (id) => {
    dispatch(deleteQuestion(id));
    // clear assignments related to that question
    const assignmentIdsForQuestion = assignments
      .filter((assignment) => assignment.questionId === id)
      .map((assignment) => assignment.id);
    assignmentIdsForQuestion.forEach((id) => {
      dispatch(deleteQuestion(id));
    });
  };

  return (
    <div className={styles.questionContainer}>
      <div>
        <h3>List</h3>
        <div className={styles.questionList}>
          {questions.map((question: IQuestion) => (
            <div
              className={`${styles.question} ${
                question.id === questionIdForEdit ? styles.active : ""
              }`}
              key={question.id}
            >
              <div>{question.text}</div>
              <span className={styles.questionActions}>
                <span onClick={() => handleEdit(question)}>
                  <a href="#form">
                    <FaPencil />
                  </a>
                </span>
                {"  "}
                <span onClick={() => handleDelete(question.id)}>
                  <FaTrashCan />
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <QuestionsForm
        formData={formData}
        questionIdForEdit={questionIdForEdit}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleReset={handleReset}
      />
    </div>
  );
};

export default Questions;
