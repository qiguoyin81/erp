// Store初始化
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

export type AppDispatch = typeof store.dispatch;

const store: any = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
