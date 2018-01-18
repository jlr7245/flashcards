import { setUser } from './user'

export const postToLogin = (data) => {
  return dispatch => {
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.auth === true) {
          dispatch(setAuth(res.auth));
          dispatch(setUser(res.data.user));
        } else {
          dispatch(setAuth(res.auth));
        }
      }).catch(err => console.log(err));
  }
}

export const setAuth = (auth) => {
  return ({
  type: 'SET_AUTH',
  auth,
})};

export const getAuthStatus = () => {
  return dispatch => {
    fetch('/api/auth/verify', {
      credentials: 'include',
    })
    .then(res => res.json())
    .then(res => {
      if (res.auth === true) {
        dispatch(setAuth(res.auth));
        dispatch(setUser(res.data.user));
      } else dispatch(setAuth(res.auth));
    }).catch(err => console.log(err));
  }
};
