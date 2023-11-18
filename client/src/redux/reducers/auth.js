import {AUTH,LOGOUT} from '../types/actionTypes';

const authReducer = (state = {authData: null}, action) => {
  switch (action.type) {
    case AUTH:
      // console.log(action.data); 
      localStorage.setItem('user-profile', JSON.stringify({...action?.data}));
      return {...state,authData: action?.data};
    case LOGOUT:
      localStorage.removeItem('user-profile');
      return {...state,authData: null};
    
    default:
      return state; 
  }
}
export default authReducer;