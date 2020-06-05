import * as ActionTypes from 'data-layer/user/constants';

export const location = ({ value }: { value: string }) => (dispatch: Function) => dispatch({
  type: ActionTypes.USER_LOCATION_REQUEST,
  data: { value },
});
