// CẤU HÌNH CUSTOM LẠI
// TẠO 1 INSTANCE CHO axios
// BEFORE GỬI LÊN VÀ BEFORE TRẢ VỀ
// GIỐNG NHƯ MIDDLEWARE
import axios from "axios";

//Import and config progress bar
import NProgress from "nprogress";
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100
})

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

// Alter defaults after instance has been created
//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    NProgress.start();
    // Trước khi gửi request API, kiểm tra có access_token trong localStorage không
    // Nếu có thì gửi access_token thông qua header
    // Code của mình dòng sau:
    if (typeof window !== "undefined" && window && window.localStorage && window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }
    //code của nó
    return config;
}, function (error) {
    NProgress.done();
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // code của mình dòng sau:
    if (response.data && response.data.data) return response.data;
    //code của nó
    return response;
}, function (error) {
    NProgress.done();
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && error.response.data) return error.response.data;
    return Promise.reject(error);
});

export default instance;