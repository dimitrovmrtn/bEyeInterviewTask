import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  IUser,
  createUser,
  updateUser,
} from "../../redux/userSlice.ts";
import { AppDispatch } from "../../redux/store.ts";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { fetchAssignments } from "../../redux/assignmentSlice.ts";
import UsersForm from "./UsersForm.tsx";
import styles from "./style.module.css";

export interface IUserFormData {
  firstName: string;
  lastName: string;
  email: string;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const users = useSelector((state: any) => state.users.items);
  const userStatus = useSelector((state: any) => state.users.status);
  const assignments = useSelector((state: any) => state.assignments.items);
  const assignmentStatus = useSelector(
    (state: any) => state.assignments.status
  );

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUsers());
    }
    if (assignmentStatus === "idle") {
      dispatch(fetchAssignments());
    }
  }, [userStatus, assignmentStatus, dispatch]);

  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formData, setFormData] = useState<IUserFormData>({
    ...initialFormData,
  });

  const [userIdForEdit, setUserIdForEdit] = useState<number>(null);

  const handleChange = (value, property) => {
    const newFormData = { ...formData };
    newFormData[property] = value;
    setFormData(newFormData);
  };

  const handleReset = () => {
    setFormData({ ...initialFormData });
    setUserIdForEdit(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email } = formData;
    const newUserData = {
      id: userIdForEdit !== null ? userIdForEdit : Math.random(),
      firstName,
      lastName,
      email,
    };
    dispatch(
      userIdForEdit !== null ? updateUser(newUserData) : createUser(newUserData)
    );
    handleReset();
  };

  const handleEdit = ({ id, firstName, lastName, email }: IUser) => {
    setUserIdForEdit(id);
    const prefilledFormData = {
      firstName,
      lastName,
      email,
    };
    setFormData(prefilledFormData);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));

    // clear assignments related to that user
    const assignmentIdsForUser = assignments
      .filter((assignment) => assignment.userId === id)
      .map((assignment) => assignment.id);
    assignmentIdsForUser.forEach((id) => {
      dispatch(deleteUser(id));
    });
  };

  return (
    <div className={styles.userContainer}>
      <div>
        <h3>List</h3>
        <div className={styles.userList}>
          {users.map((user: IUser) => (
            <div
              className={`${styles.user} ${
                user.id === userIdForEdit ? styles.active : ""
              }`}
              key={user.id}
            >
              <p>
                <b>
                  {user.firstName} {user.lastName}
                </b>
              </p>
              <p>{user.email}</p>
              <span className={styles.userActions}>
                <span onClick={() => handleEdit(user)}>
                  <FaPencil />
                </span>{" "}
                <span onClick={() => handleDelete(user.id)}>
                  <FaTrashCan />
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <UsersForm
        userIdForEdit={userIdForEdit}
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleReset={handleReset}
      />
    </div>
  );
};

export default UsersPage;
