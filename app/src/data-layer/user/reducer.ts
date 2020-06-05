import * as ActionTypes from 'data-layer/user/constants';

interface UserInitialState {
  location: any
}

const initialState = {
  location: [],
};

export default function reducer(state: UserInitialState = initialState, action: any) {
  const { type, data } = action;

  switch (type) {
    case ActionTypes.USER_LOCATION_SUCCESS:
      return {
        ...state,
        location: data,
      };
    default:
      return state;
  }
}
