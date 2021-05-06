require('isomorphic-fetch');
import fetchIntercept from 'fetch-intercept';
import Cookies from 'js-cookie'
const apiUrl = 'http://127.0.0.1:8000';

const unregister = fetchIntercept.register({
  request: function (url, config) {
      // Modify the url or config here
      const token = Cookies.get('token')

      if (token) {
        if(config && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      console.log('config ', config);
      return [url, config];
  },

  requestError: function (error) {
      // Called when an error occured during another 'request' interceptor call
      return Promise.reject(error);
  },

  response: function (response) {
      // Modify the reponse object
      return response;
  },

  responseError: function (error) {
      // Handle an fetch error
      return Promise.reject(error);
  }
});

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function getData(url = '') {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const login = () => {
  postData(`${apiUrl}/api/login`, { username: "abc2", password: "12345678" })
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call

      const token = data.access_token

      // Cookies.remove('token')
      Cookies.set('token', token, { secure: true, sameSite: 'strict' })
    });
}

const whoAmI = () => {
  return getData(`${apiUrl}/api/me`)
}

export {
  login,
  whoAmI
}

// Unregister your interceptor
// unregister();