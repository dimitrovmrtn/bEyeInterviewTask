import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { mockSurveys } from "../mockData.ts";

const API_URL = "/api/surveys";

export interface ISurvey {
  id: number;
  name: string;
  description: string;
  openingTime: Date;
  closingTime: Date;
}

export interface SurveyState {
  items: ISurvey[];
  status: "idle" | "loading" | "success" | "error";
  error: string | undefined;
}

const initialState: SurveyState = {
  items: [],
  status: "idle", // 'idle', 'loading', 'success', 'error'
  error: undefined,
};

export const fetchSurveys = createAsyncThunk(
  "surveys/fetchSurveys",
  async () => {
    try {
      // const response = await axios.get(API_URL);
      const response = { data: mockSurveys };
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const createSurvey = createAsyncThunk(
  "surveys/createSurvey",
  async (newSurvey: ISurvey) => {
    // const response = await axios.post(API_URL, newSurvey);
    const response = { data: newSurvey };
    return response.data;
  }
);

export const updateSurvey = createAsyncThunk(
  "surveys/updateSurvey",
  async (updatedSurvey: ISurvey) => {
    const { id, ...rest } = updatedSurvey;
    // const response = await axios.put(`${API_URL}/${id}`, rest);
    const response = { data: updatedSurvey };
    return response.data;
  }
);

export const deleteSurvey = createAsyncThunk(
  "surveys/deleteSurvey",
  async (id: number) => {
    // await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const surveySlice = createSlice({
  name: "surveys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Surveys
      .addCase(fetchSurveys.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSurveys.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchSurveys.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      // Create Survey
      .addCase(createSurvey.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // Update Survey
      .addCase(updateSurvey.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (survey) => survey.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      // Delete Survey
      .addCase(deleteSurvey.fulfilled, (state, action: { payload: number }) => {
        state.items = state.items.filter(
          (survey: ISurvey) => survey.id !== action.payload
        );
      });
  },
});

export default surveySlice.reducer;
