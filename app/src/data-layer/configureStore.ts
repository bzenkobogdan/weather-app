import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';

export const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(thunkMiddleware, sagaMiddleware);
export default function configureStore(preloadedState: any) {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(middleware),
  );
}
