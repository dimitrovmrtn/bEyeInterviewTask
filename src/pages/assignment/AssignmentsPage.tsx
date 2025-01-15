import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAssignments,
  deleteAssignment,
  createAssignment,
  updateAssignmentsOrder,
} from "../../redux/assignmentSlice.ts";
import { AppDispatch } from "../../redux/store.ts";
import { fetchSurveys, ISurvey } from "../../redux/surveySlice.ts";
import { fetchUsers, IUser } from "../../redux/userSlice.ts";
import { useParams } from "react-router-dom";
import {
  fetchQuestions,
  IAssignedQuestion,
  IQuestion,
} from "../../redux/questionSlice.ts";
import QuestionsAssignmentForm from "./QuestionsAssignmentForm.tsx";
import UsersAssignmentForm from "./UsersAssignmentForm.tsx";
import styles from "./style.module.css";

export interface ISQFormData {
  surveyId: number;
  questionId: number;
  questionOrder: number;
}

export interface ISUFormData {
  email: string;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();

const AssignmentsPage = () => {
  const dispatch = useAppDispatch();
  const { id: paramId } = useParams();
  const surveys = useSelector((state: any) => state.surveys.items);
  const surveyStatus = useSelector((state: any) => state.surveys.status);
  const assignments = useSelector((state: any) => state.assignments.items);
  const users = useSelector((state: any) => state.users.items);
  const userStatus = useSelector((state: any) => state.users.status);
  const questions = useSelector((state: any) => state.questions.items);
  const questionStatus = useSelector((state: any) => state.questions.status);
  const assignmentStatus = useSelector(
    (state: any) => state.assignments.status
  );

  const initialSQFormData = {
    surveyId: null,
    questionId: null,
    questionOrder: null,
  };

  const initialSUFormData = {
    email: "",
  };

  const [SQFormData, setSQFormData] = useState<ISQFormData>({
    ...initialSQFormData,
  });

  const [SUFormData, setSUFormData] = useState<ISUFormData>({
    ...initialSUFormData,
  });

  const [selectedSurvey, setSelectedSurvey] = useState<ISurvey>(
    paramId ? surveys.find((survey) => survey.id === Number(paramId)) : null
  );

  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion>(null);

  const assignmentsForSelectedSurvey = assignments.filter(
    (assignment) => assignment.surveyId === selectedSurvey?.id
  );

  const assignedUsersForSelectedSurvey: IUser[] = assignmentsForSelectedSurvey
    .filter((assignment) => assignment.userId !== undefined)
    .map((assignment) => users.find((user) => user.id === assignment.userId));

  let assignedQuestionsForSelectedSurvey: IAssignedQuestion[] =
    assignmentsForSelectedSurvey
      .filter((assignment) => assignment.questionId !== undefined)
      .map((assignment) => {
        return {
          ...questions.find(
            (question) => question.id === assignment.questionId
          ),
          questionOrder: assignment.questionOrder,
        };
      })
      .sort((a, b) => a.questionOrder - b.questionOrder);

  useEffect(() => {
    if (assignmentStatus === "idle") {
      dispatch(fetchAssignments());
    }
    if (userStatus === "idle") {
      dispatch(fetchUsers());
    }
    if (questionStatus === "idle") {
      dispatch(fetchQuestions());
    }
    if (surveyStatus === "idle") {
      dispatch(fetchSurveys());
    }
  }, [assignmentStatus, userStatus, questionStatus, surveyStatus, dispatch]);

  useEffect(() => {
    if (selectedQuestion) handleChange("", "", "SQ");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQuestion, setSelectedQuestion]);

  const handleChange = (value, property, type: "SQ" | "SU") => {
    if (type === "SQ") {
      const newFormData = {
        surveyId: selectedSurvey.id,
        questionId: selectedQuestion.id,
        questionOrder: assignedQuestionsForSelectedSurvey.length + 1,
      };
      setSQFormData({ ...newFormData });
    } else {
      const newFormData = { ...SUFormData };
      newFormData[property] = value;
      setSUFormData(newFormData);
    }
  };

  const handleReset = (type: "SQ" | "SU") => {
    type === "SQ"
      ? setSQFormData({ ...initialSQFormData })
      : setSUFormData({ ...initialSUFormData });
  };

  const handleSubmit = (e, type: "SQ" | "SU") => {
    e.preventDefault();
    if (type === "SQ") {
      dispatch(
        createAssignment({
          id: Math.random(),
          surveyId: selectedSurvey.id,
          questionId: SQFormData.questionId,
          questionOrder: SQFormData.questionOrder,
        })
      );
      setSelectedQuestion(0);
    } else {
      const foundUser = users.find((user) => user.email === SUFormData.email);
      if (!foundUser) {
        alert("User not found");
      } else if (
        assignmentsForSelectedSurvey.find(
          (assignment) => assignment.userId === foundUser.id
        )
      ) {
        alert("This user has already been assigned to this survey");
      } else {
        dispatch(
          createAssignment({
            id: Math.random(),
            surveyId: selectedSurvey.id,
            userId: foundUser.id,
          })
        );
      }
    }
    handleReset(type);
  };

  const handleDelete = (id: number, type: "SQ" | "SU") => {
    const assignmentToDelete =
      type === "SQ"
        ? assignmentsForSelectedSurvey.find(
            (assignment) => assignment.questionId === id
          )
        : assignmentsForSelectedSurvey.find(
            (assignment) => assignment.userId === id
          );
    dispatch(deleteAssignment(assignmentToDelete.id));
    if (type === "SQ") {
      let newAssignedQuestions = assignedQuestionsForSelectedSurvey.filter(
        (question) => question.id !== id
      );
      newAssignedQuestions.forEach(
        (question, index) => (question.questionOrder = index + 1)
      );
      assignedQuestionsForSelectedSurvey = [...newAssignedQuestions];
    }
  };

  const moveQuestionUp = (index: number) => {
    let assignmentsCopy = [...assignments];
    const firstAssignmentToEdit = assignments.find(
      (assignment) =>
        assignment.surveyId === selectedSurvey.id &&
        assignment.questionOrder === index + 1
    );
    const secondAssignmentToEdit = assignments.find(
      (assignment) =>
        assignment.surveyId === selectedSurvey.id &&
        assignment.questionOrder === index
    );

    let firstAssignmentFromCopy = {
      ...assignmentsCopy.find(
        (assignment) => assignment.id === firstAssignmentToEdit.id
      ),
    };
    firstAssignmentFromCopy.questionOrder =
      firstAssignmentFromCopy.questionOrder - 1;

    let secondAssignmentFromCopy = {
      ...assignmentsCopy.find(
        (assignment) => assignment.id === secondAssignmentToEdit.id
      ),
    };
    secondAssignmentFromCopy.questionOrder =
      secondAssignmentToEdit.questionOrder + 1;
    let indexOfFirstToEdit = assignmentsCopy.indexOf(firstAssignmentToEdit);
    let indexOfSecondToEdit = assignmentsCopy.indexOf(secondAssignmentToEdit);
    assignmentsCopy[indexOfFirstToEdit] = { ...firstAssignmentFromCopy };
    assignmentsCopy[indexOfSecondToEdit] = { ...secondAssignmentFromCopy };
    dispatch(updateAssignmentsOrder(assignmentsCopy));
  };

  const moveQuestionDown = (index: number) => {
    let assignmentsCopy = [...assignments];
    const firstAssignmentToEdit = assignments.find(
      (assignment) =>
        assignment.surveyId === selectedSurvey.id &&
        assignment.questionOrder === index + 1
    );
    const secondAssignmentToEdit = assignments.find(
      (assignment) =>
        assignment.surveyId === selectedSurvey.id &&
        assignment.questionOrder === index + 2
    );

    let firstAssignmentFromCopy = {
      ...assignmentsCopy.find(
        (assignment) => assignment.id === firstAssignmentToEdit.id
      ),
    };
    firstAssignmentFromCopy.questionOrder =
      firstAssignmentFromCopy.questionOrder + 1;

    let secondAssignmentFromCopy = {
      ...assignmentsCopy.find(
        (assignment) => assignment.id === secondAssignmentToEdit.id
      ),
    };
    secondAssignmentFromCopy.questionOrder =
      secondAssignmentToEdit.questionOrder - 1;
    let indexOfFirstToEdit = assignmentsCopy.indexOf(firstAssignmentToEdit);
    let indexOfSecondToEdit = assignmentsCopy.indexOf(secondAssignmentToEdit);
    assignmentsCopy[indexOfFirstToEdit] = { ...firstAssignmentFromCopy };
    assignmentsCopy[indexOfSecondToEdit] = { ...secondAssignmentFromCopy };
    dispatch(updateAssignmentsOrder(assignmentsCopy));
  };

  return (
    <>
      <h3>Select a survey:</h3>
      <select
        placeholder="Pick a survey from the dropdown"
        name="surveys"
        value={selectedSurvey?.id}
        onChange={(e) =>
          setSelectedSurvey(
            surveys.find((survey) => survey.id === Number(e.target.value))
          )
        }
        id="surveys"
      >
        <option value="" disabled selected>
          ---Select your option---
        </option>
        {surveys.map((survey: ISurvey) => (
          <option key={survey.id} value={survey.id}>
            {survey.name}
          </option>
        ))}
      </select>
      {selectedSurvey && (
        <div className={styles.assignmentContainer}>
          <QuestionsAssignmentForm
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            moveQuestionUp={moveQuestionUp}
            moveQuestionDown={moveQuestionDown}
            questions={questions}
            selectedQuestion={selectedQuestion}
            setSelectedQuestion={setSelectedQuestion}
            assignedQuestionsForSelectedSurvey={
              assignedQuestionsForSelectedSurvey
            }
          />
          <UsersAssignmentForm
            assignedUsersForSelectedSurvey={assignedUsersForSelectedSurvey}
            SUFormData={SUFormData}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            handleChange={handleChange}
          />
        </div>
      )}
    </>
  );
};

export default AssignmentsPage;
