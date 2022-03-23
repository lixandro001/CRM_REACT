import Axios from 'axios';

const ErrorServer =
  'Ups!!! algo salió mal con el servidor, inténtelo más tarde 😭 ';

const axiosInstance = (_method, _url, authorization = false, _data = null) => {
  let config = {
    method: _method.toUpperCase(),
    url: _url
  };

  if (authorization) {
    const token = localStorage.getItem('token');
    config = {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    };
  }

  if (_method.toUpperCase() !== 'GET') {
    _data = JSON.stringify(_data);
    config = {
      ...config,
      headers: {
        ...config.headers,
        'Content-Type': 'application/json'
      },
      data: _data
    };
  }

  return new Promise((resolve, reject) => {
    Axios(config)
      .then(function (response) {
        resolve(response.data);
      })
      .catch((error) => {
        // let messageError = error.response || ErrorServer;
        const messageError =
          error.response.data || error.response.data || ErrorServer;
        reject(messageError);
      });
  });
};

export default axiosInstance;
