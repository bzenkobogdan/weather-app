import http from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import * as ActionTypes from 'data-layer/user/constants';

const apiSearchByCoords = async ({ value }: { value: string }) => await http.get(`https://www.metaweather.com/api/location/search/?lattlong=${value}`);
function* location(action: any) {
  try {
    const res = yield call(apiSearchByCoords, action.data);
    yield put({ type: ActionTypes.USER_LOCATION_SUCCESS, data: res.data });
  } catch (err) {
    // yield put({ type: ActionTypes.SEARCH_FAILURE, data: err.message });
  }
}

export default [
  takeLatest(ActionTypes.USER_LOCATION_REQUEST, location),
];
