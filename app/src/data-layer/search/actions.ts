import * as ActionTypes from 'data-layer/search/constants';

export const search = ({ value }: { value: string }) => (dispatch: Function) => dispatch({
  type: ActionTypes.SEARCH_REQUEST,
  data: { value },
});

export const searchDetails = ({ value }: { value: string }) => (dispatch: Function) => dispatch({
  type: ActionTypes.SEARCH_DETAILS_REQUEST,
  data: { value },
});
