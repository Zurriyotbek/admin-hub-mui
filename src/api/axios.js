import axios from 'axios';

const URL = 'https://medifast.eduspace.me/';

const Axios = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default Axios;

// URL: 'https://medifast.eduspace.me/',
