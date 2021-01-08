import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer, { initialState } from './store/reducers';
import QuestionList from './components/questionList';
const middlewares = [thunk]
let composeEnhancers = compose
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));
function App() {
  return (
    <Provider store={store}>
     <QuestionList/>
    </Provider>
  );
}

export default App;
