import * as types from "./AuthActionTypes";
//----------------------- Login Signup actions

export const signuprequest=()=>{
  return { type: types.SIGN_UP_REQUEST}
}

export const signupsuccess=(payload)=>{
  return { type: types.SIGN_UP_SUCCESS, payload}
}

export const signupfailure=()=>{
  return { type: types.SIGN_UP_FAILURE}
}

export const loginrequest = () => {
  return { type: types.EMAIL_LOGIN_REQUEST };
};

export const loginsuccess = (payload) => {
  return { type: types.EMAIL_LOGIN_SUCCESS, payload };
};

export const loginfailure = () => {
  return { type: types.EMAIL_LOGIN_FAILURE };
};

export const googleloginrequest = () => {
  return { type: types.GOOGLE_LOGIN_REQUEST };
};

export const googleloginsuccess = (payload) => {
  return { type: types.GOOGLE_LOGIN_SUCCESS, payload };
};

export const google_login_failure = () => {
  return { type: types.GOOGLE_LOGIN_FAILURE };
};

