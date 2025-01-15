import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { mockQuestions } from "../mockData.ts";

const API_URL = "/api/questions";

export interface IQuestion {
  id: number;
  text: string;
}

export interface IAssignedQuestion {
  id: number;
  text: string;
  questionOrder: number;
}

export interface QuestionState {
  items: IQuestion[];
  status: "idle" | "loading" | "success" | "error";
  error: string | undefined;
}

const initialState: QuestionState = {
  items: [],
  status: "idle", // 'idle', 'loading', 'success', 'error'
  error: undefined,
};

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    try {
      // const response = await axios.get(API_URL);
      const response = { data: mockQuestions };
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const createQuestion = createAsyncThunk(
  "questions/createQuestion",
  async (newQuestion: IQuestion) => {
    // const response = await axios.post(API_URL, newQuestion);
    const response = { data: newQuestion };
    return response.data;
  }
);

export const updateQuestion = createAsyncThunk(
  "questions/updateQuestion",
  async (updatedQuestion: IQuestion) => {
    const { id, ...rest } = updatedQuestion;
    // const response = await axios.put(`${API_URL}/${id}`, rest);
    const response = { data: updatedQuestion };
    return response.data;
  }
);

export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (id: number) => {
    // await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Questions
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      // Create Question
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // Update Question
      .addCase(updateQuestion.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (question) => question.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      // Delete Question
      .addCase(
        deleteQuestion.fulfilled,
        (state, action: { payload: number }) => {
          state.items = state.items.filter(
            (question: IQuestion) => question.id !== action.payload
          );
        }
      );
  },
});

export default questionSlice.reducer;
