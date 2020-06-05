import { all } from 'redux-saga/effects';
import search from 'data-layer/search/saga';
import user from 'data-layer/user/saga';

export default function* rootSaga() {
  yield all([
    ...search,
    ...user,
  ]);
}
