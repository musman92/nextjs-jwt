import axios from 'axios'
import Cookies from 'js-cookie'

const apiUrl = 'http://127.0.0.1:8000';


// Request interceptor
axios.interceptors.request.use(request => {
  const token = Cookies.get('token')
  console.log('a');
  if (token) {
    request.headers.common.Authorization = `Bearer ${token}`
  }
  // TODO refresh token

  return request
})

// Response interceptor
axios.interceptors.response.use(response => response, error => {
  console.log(error);
  return Promise.reject(error)
  const { status } = error.response
  console.log(status);
  if (status >= 500) {
    console.log(500);
  }

  if (status === 401) {
    console.log(401);
  }

  return Promise.reject(error)
})

const login = () => {
  console.log('login fn ');
  var data = new FormData();
  data.append('username', 'abc2');
  data.append('password', '12345678');

  var config = {
    method: 'post',
    url: 'http://127.0.0.1:8000/api/login',
    headers: {
      'Content-Type': 'application/json',
      // ...data.getHeaders()
    },
    data: data
  };

  axios(config)
    .then(function (response) {
      console.log(response.data);
      const token = response.data.access_token

      // Cookies.remove('token')
      Cookies.set('token', token, { secure: true, sameSite: 'strict' })
    })
    .catch(function (error) {
      console.log(error);
    });
}

const whoAmI = () => {
  axios.get(`${apiUrl}/api/me`)
    .then(resp => {
      console.log(resp.data);
    });
}


export {
  login,
  whoAmI
}