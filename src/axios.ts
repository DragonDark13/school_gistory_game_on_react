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
let baseURL = 'https://aleksdark1313.pythonanywhere.com/';

let remoteServer = false;

// Якщо поточний сайт localhost, змінюємо baseURL
if (isLocalhost() && !remoteServer) {
    baseURL = 'http://127.0.0.1:5000/';
}

const axiosClient = axios.create({
    baseURL: baseURL,
});

export default axiosClient;