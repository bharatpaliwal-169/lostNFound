import * as api from '../../api';
import {AUTH} from '../types/actionTypes';

export const login = (formData, navigate) =>async(dispatch) => {
  try {
    const {data} = await api.login(formData);
    dispatch({type: AUTH,data})
    navigate("/");
  } catch (error) {
    alert(error.message);
    window.location.reload();
    console.log(error);
  }
}

export const signup = (formData, navigate) =>async(dispatch) => {
  try {
    const {data} = await api.signup(formData);
    dispatch({type: AUTH,data})
    navigate("/");
  } catch (error) {
    alert(error.message);
    window.location.reload();
    console.log(error);
  }
}

export const deleteAccount = (id,navigate) => async(dispatch) => {
  try {
    await api.deleteAccount(id);
    localStorage.removeItem('profile');
    navigate("/");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}