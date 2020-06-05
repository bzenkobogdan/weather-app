import http from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';
import * as ActionTypes from 'data-layer/search/constants';

const apiSearchDetails = async ({ value }: { value: string }) => await http.get(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${value}`);
function* searchDetails(action: any) {
  try {
    const { data } = yield call(apiSearchDetails, action.data);
    yield put({ type: ActionTypes.SEARCH_DETAILS_SUCCESS, data });
  } catch (err) {
    yield put({ type: ActionTypes.SEARCH_DETAILS_FAILURE, data: err.message });
  }
}

const apiSearchByQuery = async ({ value }: { value: string }) => await http.get(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${value}`);
function* search(action: any) {
  try {
    const res = yield call(apiSearchByQuery, action.data);
    yield call(searchDetails, { data: { value: res.data[0].woeid } });
  } catch (err) {
    // yield put({ type: ActionTypes.SEARCH_FAILURE, data: err.message });
  }
}

export default [
  takeLatest(ActionTypes.SEARCH_REQUEST, search),
  takeLatest(ActionTypes.SEARCH_DETAILS_REQUEST, searchDetails),
];
