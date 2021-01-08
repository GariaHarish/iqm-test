import produce from 'immer';
import { ApplicationState, ApplicationAction } from './question';

export const initialState: ApplicationState = {
  loading: {
    questions: false,
  },
  questions: [],
  hasMore: false
}

const reducer = (state = initialState, action: ApplicationAction) => {
  switch (action.type) {
    case "getQuestionsRequest":
      return produce(state, draft => {
        draft.loading.questions = true;
      });
    case "getQuestionsSuccess":
      return produce(state, draft => {
        draft.loading.questions = false;
        draft.questions = draft.questions.concat(action.questions);
        draft.hasMore = action.hasMore;
      });
    case "getQuestionsError":
      return produce(state, draft => {
        draft.loading.questions = false;
      });
  }
}

export default reducer;