let url = `${process.env.REACT_APP_API_URL}`;

const login = async (data) => {
  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('password', data.password);

  const loginUrl = url + 'api/token/obtain/';

  return await fetch(loginUrl, {
    method: 'POST',
    body: formData
  })
  .then(handleResponse)
  .then(user => {
    return user;
  });
}

const obtainBearerNetwork = async (token, data) => {
  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('password', data.password);

  const loginUrl = url + 'instorex/obtain-bearer-network/';

  return await fetch(loginUrl, {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `JWT ${token}`
    }
  })
  .then(handleResponse)
  .then(user => {
    return user;
  });
}

const obtainBearerToken = async (token, data) => {
  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('password', data.password);

  const loginUrl = url + 'instorex/obtain-bearer-token/';

  return await fetch(loginUrl, {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `JWT ${token}`
    }
  })
  .then(handleResponse)
  .then(user => {
    return user;
  });
}

const logout = async (data) => {
  const formData = new FormData();
  formData.append('refresh_token', data);

  const logoutUrl = url + 'api/blacklist/';

  return await fetch(logoutUrl, {
    method: 'POST',
    body: formData
  })
  .then(handleResponse)
  .then(user => {
    return user;
  })
}

const handleResponse = async response => {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
          // auto logout if 401 response returned from api
          // logout();
          // location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export const userService = {
  login,
  logout,
  obtainBearerNetwork,
  obtainBearerToken
}