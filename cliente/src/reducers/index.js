import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import adminReducer from './adminReducer';

export default combineReducers({
    home: homeReducer,
    admin: adminReducer,
});