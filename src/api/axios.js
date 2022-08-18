import axios from 'axios';

const URL = 'https://api.drdilshod.com/';

const Axios = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default Axios;

// https://api.drdilshod.com/
