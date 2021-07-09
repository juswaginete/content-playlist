import Cookies from 'universal-cookie';

const cookies = new Cookies();

let url = `${process.env.REACT_APP_API_URL}`;

const uploadContent = async (token) => {
  const uploadContentUrl = url + 'instorex/content/';

  return await fetch(uploadContentUrl, {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${token}`
    }
  })
  .then(handleResponse)
  .then(videos => {
    return videos;
  })
  .catch(error => {
    if (error === "Unauthorized") {
      const token = cookies.get('user');
      autoLogout(token.refresh)
        .then(() => {
          // remove cookie data
          cookies.remove('user', { path: '/' });
        });
    }
  })
}


const uploadContentSubfolder = async (token, data) => {
  const formData = new FormData();
  formData.append('endpoint', `/${data}`);
  formData.append('nextMarker', '');

  const uploadContentUrl = url + 'instorex/content/extended';

  return await fetch(uploadContentUrl, {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `JWT ${token}`
    }
  })
  .then(handleResponse)
  .then(videos => {
    return videos;
  })
}


const uploadContentPlaylist = async (token, data) => {
  const uploadContentUrl = url + 'instorex/playlist/dynamic/';

  return await fetch(uploadContentUrl, {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${token}`
    }
  })
  .then(handleResponse)
  .then(contents => {
    return contents;
  })
}

const scheduleDynamicContent = async (token, data) => {
  const uploadContentUrl = url + 'instorex/playlist/dynamic/';

  const dataObj = {
    content: [
      {
        "ContentId": data.Id,
        "FileName": data.fileName,
        "displayDuration": "00:00:00",
        "ValidityStartDate": "2021-03-29T00:00:00",
        "ValidityEndDate": "2021-06-29T00:00:00"
      }
    ]
  };

  return await fetch(uploadContentUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `JWT ${token}`
    },
    body: dataObj
  })
  .then(handleResponse)
  .then(contents => {
    return contents;
  })
}


const autoLogout = async (data) => {
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


const dynamicContentPlaylistDetail = async (token, id) => {
  const uploadContentUrl = url + `instorex/playlist/dynamic/${id}`;

  return await fetch(uploadContentUrl, {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${token}`
    }
  })
  .then(handleResponse)
  .then(contents => {
    return contents;
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

export const uploadContentService = {
  autoLogout,
  uploadContent,
  uploadContentSubfolder,
  uploadContentPlaylist,
  dynamicContentPlaylistDetail
}