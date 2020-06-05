import _ from 'lodash';

export const getCountry = (state: any) => (!_.isEmpty(state.search)
    && state.search.title) || '';
export const getCity = (state: any) => (!_.isEmpty(state.search)
    && state.search.parent.title) || '';
export const getCoords = (state: any) => (!_.isEmpty(state.search)
    && state.search.latt_long) || '';
export const getResults = (state: any) => (!_.isEmpty(state.search)
    && state.search.consolidated_weather) || [];
export const getTemp = (state: any) => (!_.isEmpty(state.search)
    && state.search.consolidated_weather[0].the_temp) || 0;
