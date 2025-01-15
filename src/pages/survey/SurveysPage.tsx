import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSurveys,
  deleteSurvey,
  ISurvey,
  createSurvey,
  updateSurvey,
} from "../../redux/surveySlice.ts";
import { AppDispatch } from "../../redux/store.ts";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  deleteAssignment,
  fetchAssignments,
} from "../../redux/assignmentSlice.ts";
import SurveysForm from "./SurveysForm.tsx";
import { ISurveyFormData } from "../../types.ts";
import styles from "./style.module.css";

export const useAppDispatch = () => useDispatch<AppDispatch>();

const SurveysPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const surveys = useSelector((state: any) => state.surveys.items);
  const surveyStatus = useSelector((state: any) => state.surveys.status);
  const assignments = useSelector((state: any) => state.assignments.items);
  const assignmentStatus = useSelector(
    (state: any) => state.assignments.status
  );

  useEffect(() => {
    if (surveyStatus === "idle") {
      dispatch(fetchSurveys());
    }
    if (assignmentStatus === "idle") {
      dispatch(fetchAssignments());
    }
  }, [surveyStatus, assignmentStatus, dispatch]);

  const initialFormData = {
    name: "",
    description: "",
    openingTime: new Date(Date.now()),
    closingTime: new Date(Date.now()),
  };

  const [formData, setFormData] = useState<ISurveyFormData>({
    ...initialFormData,
  });

  const [surveyIdForEdit, setSurveyIdForEdit] = useState<number>(null);

  const handleChange = (value, property) => {
    const newFormData = { ...formData };
    newFormData[property] = value;
    setFormData(newFormData);
  };

  const handleReset = () => {
    setFormData({ ...initialFormData });
    setSurveyIdForEdit(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, openingTime, closingTime } = formData;
    const newSurveyData = {
      id: surveyIdForEdit !== null ? surveyIdForEdit : Math.random(),
      name,
      description,
      openingTime,
      closingTime,
    };
    dispatch(
      surveyIdForEdit !== null
        ? updateSurvey(newSurveyData)
        : createSurvey(newSurveyData)
    );
    handleReset();
  };

  const handleEdit = ({
    id,
    name,
    description,
    openingTime,
    closingTime,
  }: ISurvey) => {
    setSurveyIdForEdit(id);
    const prefilledFormData = {
      name,
      description,
      openingTime,
      closingTime,
    };
    setFormData(prefilledFormData);
  };

  const handleDelete = (id) => {
    dispatch(deleteSurvey(id));
    // clear assignments related to that survey
    const assignmentIdsForSurvey = assignments
      .filter((assignment) => assignment.surveyId === id)
      .map((assignment) => assignment.id);
    assignmentIdsForSurvey.forEach((id) => {
      dispatch(deleteAssignment(id));
    });
  };

  return (
    <div className={styles.surveyContainer}>
      <div className="survey-list">
        <h3>List</h3>
        {surveys.map((survey: ISurvey) => (
          <div
            className={`${styles.survey} ${
              survey.id === surveyIdForEdit ? styles.active : ""
            }`}
            key={survey.id}
            onClick={() => navigate(`/assignments/${survey.id}`)}
          >
            <b>{survey.name}</b>
            <i>
              {` (${new Date(survey.openingTime).toLocaleString()} - ${new Date(
                survey.closingTime
              ).toLocaleString()})`}
              :
            </i>{" "}
            <span className={styles.surveyActions}>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(survey);
                }}
              >
                <FaPencil />
              </span>{" "}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(survey.id);
                }}
              >
                <FaTrashCan />
              </span>
            </span>
            <br />
            {survey.description}
          </div>
        ))}
      </div>
      <SurveysForm
        surveyIdForEdit={surveyIdForEdit}
        handleChange={handleChange}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
        setFormData={setFormData}
        formData={formData}
      />
    </div>
  );
};

export default SurveysPage;
