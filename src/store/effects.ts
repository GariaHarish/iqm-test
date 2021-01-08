import { ThunkAction } from 'redux-thunk';
import { ApplicationState, ApplicationAction, Question } from './question';
import { getQuestionsRequest, getQuestionsSuccess, getQuestionsError } from './action';
import {questionService }from '../services/questionService';

type Effect = ThunkAction<any, ApplicationState, any, ApplicationAction>;

export const getQuestions = (filter: string): Effect => (dispatch, getState) => {
  dispatch(getQuestionsRequest());
  // assume userService.loadUsers returns a Promise<User[]>
  return questionService.getQuestions(filter)
    .then(({questions , hasMore })=> dispatch(getQuestionsSuccess(questions, hasMore)))
    .catch(() => dispatch(getQuestionsError()));
};