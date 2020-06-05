import _ from 'lodash';

export const getLocation = (state: any) => (!_.isEmpty(state.user) && state.user.location) || [];
