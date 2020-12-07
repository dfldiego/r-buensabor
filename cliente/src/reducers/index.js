import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import adminReducer from './adminReducer';
import userReducer from './userReducer';

export default combineReducers({
    home: homeReducer,
    admin: adminReducer,
    user: userReducer
});