export type ISurveyFormData = {
  name: string;
  description: string;
  openingTime: Date;
  closingTime: Date;
};
export type IQuestionFormData = {
  text: string;
};
export type IUserFormData = {
  firstName: string;
  lastName: string;
  email: string;
};
export type AssignmentState = {
  items: IAssignment[];
  status: "idle" | "loading" | "success" | "error";
  error: string | undefined;
};

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

export type IQuestion = {
  id: number;
  text: string;
};

export type IAssignedQuestion = {
  id: number;
  text: string;
  questionOrder: number;
};

export type QuestionState = {
  items: IQuestion[];
  status: "idle" | "loading" | "success" | "error";
  error: string | undefined;
};
export type ISurvey = {
  id: number;
  name: string;
  description: string;
  openingTime: Date;
  closingTime: Date;
};

export type SurveyState = {
  items: ISurvey[];
  status: "idle" | "loading" | "success" | "error";
  error: string | undefined;
};
export type IUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserState = {
  items: IUser[];
  status: "idle" | "loading" | "success" | "error";
  error: string | undefined;
};
