import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  mockSurveyQuestionRelations,
  mockSurveyUserRelations,
} from "../mockData.ts";

const API_URL = "/api/assignments";

export type IAssignment =
  | {
      id: number;
      surveyId: number;
      questionId: number;
      questionOrder: number;
    }
  | {
      id: number;
      surveyId: number;
      userId: number;
    };

export interface AssignmentState {
  items: IAssignment[];
  status: "idle" | "loading" | "success" | "error";
  error: string | undefined;
}

const initialState: AssignmentState = {
  items: [],
  status: "idle", // 'idle', 'loading', 'success', 'error'
  error: undefined,
};

export const fetchAssignments = createAsyncThunk(
  "assignments/fetchAssignments",
  async () => {
    try {
      // const response = await axios.get(API_URL);
      const response = {
        data: [...mockSurveyQuestionRelations, ...mockSurveyUserRelations],
      };

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const createAssignment = createAsyncThunk(
  "assignments/createAssignment",
  async (newAssignment: IAssignment) => {
    // const response = await axios.post(API_URL, newAssignment);
    const response = { data: newAssignment };
    return response.data;
  }
);

export const updateAssignmentsOrder = createAsyncThunk(
  "assignments/updateAssignmentsOrder",
  async (newAssignments: IAssignment[]) => {
    // const response = await axios.post(API_URL, newAssignment);
    const response = { data: newAssignments };
    return response.data;
  }
);

export const deleteAssignment = createAsyncThunk(
  "assignments/deleteAssignment",
  async (id: number) => {
    // await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Assignments
      .addCase(fetchAssignments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      // Create Assignment
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update Assignments Order
      .addCase(updateAssignmentsOrder.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      // Delete Assignment
      .addCase(
        deleteAssignment.fulfilled,
        (state, action: { payload: number }) => {
          state.items = state.items.filter(
            (assignment: IAssignment) => assignment.id !== action.payload
          );
        }
      );
  },
});

export default assignmentSlice.reducer;
