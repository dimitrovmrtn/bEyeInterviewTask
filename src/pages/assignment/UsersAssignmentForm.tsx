import React from "react";
import { FaTrashCan, FaCirclePlus } from "react-icons/fa6";
import { ISUFormData } from "./AssignmentsPage";
import { IUser } from "../../redux/userSlice";
import styles from "./style.module.css";

interface IUsersAssignmentForm {
  assignedUsersForSelectedSurvey: IUser[];
  SUFormData: ISUFormData;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    type: "SQ" | "SU"
  ) => void;
  handleDelete: (id: number, type: "SQ" | "SU") => void;
  handleChange: (value: string, property: string, type: "SQ" | "SU") => void;
}

const UsersAssignmentForm = ({
  handleSubmit,
  assignedUsersForSelectedSurvey,
  handleDelete,
  handleChange,
  SUFormData,
}: IUsersAssignmentForm) => {
  return (
    <form
      onSubmit={(e) => handleSubmit(e, "SU")}
      className={styles.assignmentForm}
    >
      <h3>Assigned users:</h3>
      {assignedUsersForSelectedSurvey.length ? (
        assignedUsersForSelectedSurvey.map((user) => (
          <span key={user.id} className={`${styles.assigned} ${styles.user}`}>
            <b>{`${user.firstName} ${user.lastName}`}</b>
            {`${user.email}`}
            <span
              onClick={() => handleDelete(user.id, "SU")}
              className={styles.delete}
            >
              <FaTrashCan />
            </span>
          </span>
        ))
      ) : (
        <h4>No assigned users for this survey</h4>
      )}
      <div className={styles.formInput}>
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => handleChange(e.target.value, "email", "SU")}
          value={SUFormData.email}
          required
          placeholder="Enter a valid email..."
          type="email"
        />
      </div>
      <div className={styles.actionButtons}>
        <button className={styles.saveButton} type="submit">
          <FaCirclePlus />
          Save
        </button>
      </div>
    </form>
  );
};

export default UsersAssignmentForm;
