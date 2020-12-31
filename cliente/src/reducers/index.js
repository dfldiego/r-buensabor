import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import adminReducer from './adminReducer';
import catalogoReducer from './catalogoReducer';

export default combineReducers({
    home: homeReducer,
    admin: adminReducer,
    catalogo: catalogoReducer,
});