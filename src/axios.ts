import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://zelse.asuscomm.com/SchoolHistoryGame/ep/',
});

export default axiosClient;