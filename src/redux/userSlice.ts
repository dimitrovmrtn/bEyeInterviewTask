import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { mockUsers } from "../mockData.ts";

const API_URL = "/api/users";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserState {
  items: IUser[];
  status: "idle" | "loading" | "success" | "error";
  error: string | undefined;
}

const initialState: UserState = {
  items: [],
  status: "idle", // 'idle', 'loading', 'success', 'error'
  error: undefined,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    // const response = await axios.get(API_URL);
    const response = { data: mockUsers };
    return response.data;
  } catch (error) {
    return error;
  }
});

export const createUser = createAsyncThunk(
  "users/createUser",
  async (newUser: IUser) => {
    // const response = await axios.post(API_URL, newUser);
    const response = { data: newUser };
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updatedUser: IUser) => {
    const { id, ...rest } = updatedUser;
    // const response = await axios.put(`${API_URL}/${id}`, rest);
    const response = { data: updatedUser };
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number) => {
    // await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      // Create User
      .addCase(createUser.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // Update User
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (user) => user.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      // Delete User
      .addCase(deleteUser.fulfilled, (state, action: { payload: number }) => {
        state.items = state.items.filter(
          (user: IUser) => user.id !== action.payload
        );
      });
  },
});

export default userSlice.reducer;
