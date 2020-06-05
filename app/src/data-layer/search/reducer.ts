import * as ActionTypes from 'data-layer/search/constants';


export default function reducer(state: any = {}, action: any) {
  const { type, data } = action;

  switch (type) {
    case ActionTypes.SEARCH_DETAILS_SUCCESS:
      return data;
    default:
      return state;
  }
}
