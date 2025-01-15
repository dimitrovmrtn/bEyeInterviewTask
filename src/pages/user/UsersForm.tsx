import React from "react";
import { FaCircleXmark, FaCirclePlus } from "react-icons/fa6";
import { IUserFormData } from "./UsersPage";
import styles from "./style.module.css";

interface IUsersFormProps {
  userIdForEdit: number;
  formData: IUserFormData;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (value: string, property: string) => void;
  handleReset: () => void;
}

const UsersForm = ({
  userIdForEdit,
  formData,
  handleSubmit,
  handleChange,
  handleReset,
}: IUsersFormProps) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.userForm}>
      <h3>{userIdForEdit !== null ? "Edit" : "Add"} a User</h3>
      <div className={styles.formInput}>
        <label htmlFor="firstName">First Name</label>
        <input
          value={formData.firstName}
          onChange={(e) => handleChange(e.target.value, "firstName")}
          required
          placeholder="Enter First Name..."
          name="firstName"
          type="text"
        />
      </div>
      <div className={styles.formInput}>
        <label htmlFor="lastName">Last Name</label>
        <input
          onChange={(e) => handleChange(e.target.value, "lastName")}
          value={formData.lastName}
          required
          placeholder="Enter Last Name..."
          type="text"
        />
      </div>
      <div className={styles.formInput}>
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => handleChange(e.target.value, "email")}
          value={formData.email}
          required
          placeholder="Enter a valid email..."
          type="email"
        />
      </div>
      <div className={styles.actionButtons}>
        <button className={styles.clearButton} onClick={handleReset}>
          <FaCircleXmark />
          Clear
        </button>
        <button className={styles.saveButton} type="submit">
          <FaCirclePlus />
          {userIdForEdit !== null ? "Save" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default UsersForm;
