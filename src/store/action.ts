import { Question, GetQuestionsRequest, GetQuestionsSuccess, GetQuestionsError} from './question';

export const getQuestionsRequest = (): GetQuestionsRequest => ({
  type: 'getQuestionsRequest',
});

export const getQuestionsSuccess = (questions: Question[], hasMore: Boolean): GetQuestionsSuccess => ({
  type: 'getQuestionsSuccess',
  questions,
  hasMore
});

export const getQuestionsError = (): GetQuestionsError => ({
  type: 'getQuestionsError',
});