import axios from 'axios';

// Функція для визначення, чи є поточний сайт localhost
const isLocalhost = () => {
  // Перевіряємо, чи виконується код у браузері
  if (typeof window !== 'undefined') {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  }
  // Якщо не в браузері, а в середовищі Node.js, повертаємо false
  return false;
};

// Змінна для зберігання baseURL
let baseURL = 'https://zelse.asuscomm.com/SchoolHistoryGame';

let remoteServer = true;

// Якщо поточний сайт localhost, змінюємо baseURL
if (isLocalhost() && !remoteServer) {
  baseURL = 'http://127.0.0.1:8000/SchoolHistoryGame';
}

const axiosClient = axios.create({
  baseURL: baseURL,
});

export default axiosClient;