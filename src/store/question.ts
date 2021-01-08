import { Action } from 'redux';

export interface Question {
  title: string;
  creationDate: Date;
  author: string;
  link: string;
  body: string;
}

export interface LoadingState {
    questions: boolean;
}
export interface hasMore{
  hasMore: Boolean;
}

export interface ApplicationState {
  loading: LoadingState;
  hasMore: Boolean;
  questions: Question[];
}

export interface GetQuestionsRequest extends Action {
  type: 'getQuestionsRequest';
}

export interface GetQuestionsSuccess extends Action {
  type: 'getQuestionsSuccess';
  questions: Question[];
  hasMore: Boolean
}

export interface GetQuestionsError extends Action {
  type: 'getQuestionsError';
}

export type ApplicationAction =
  | GetQuestionsRequest
  | GetQuestionsSuccess
  | GetQuestionsError;