import axios from "./axios.customize";  // Config interceptors cho axios

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName,
        email,
        password,
        phone
    }
    return axios.post(URL_BACKEND, data);
}

const registerUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register";
    const data = {
        fullName,
        email,
        password,
        phone
    }
    return axios.post(URL_BACKEND, data);
}

const loginAPI = (email, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        username: email,
        password,
        delay: 2000
    }
    return axios.post(URL_BACKEND, data);
}

// Request đến server lấy thông tin account mà user đang login
// Không cần truyền data, vì ở axios.customize.js đã gửi kèm access_token từ localStorage rồi
const getAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account";
    return axios.get(URL_BACKEND);
}

const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout";
    return axios.post(URL_BACKEND);
}

const updateUserAPI = (_id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id,
        fullName,
        phone
    }
    return axios.put(URL_BACKEND, data);
}

const updateUserAvatarAPI = (avatar, _id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id,
        avatar,
        fullName,
        phone
    }
    return axios.put(URL_BACKEND, data);
}

const deleteUserAPI = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`;
    return axios.delete(URL_BACKEND);
}

const fetchUserAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

const handleUploadFile = (file, folder) => {
    const URL_BACKEND = `/api/v1/file/upload`;
    let config = {
        headers: {
            "upload-type": folder,  // folder được nhận diện xử lý phía backend
            "Content-Type": "multipart/form-data"
        }
    }
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file);

    return axios.post(URL_BACKEND, bodyFormData, config);
}

// BOOK SERVICES
const fetchBookAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

const createBookAPI = (thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book";
    const data = {
        thumbnail,
        mainText,
        author,
        price,
        quantity,
        category
    }
    return axios.post(URL_BACKEND, data);
}

const updateBookThumbnailAPI = (thumbnail, _id, mainText, author, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book";
    const data = {
        _id,
        thumbnail,
        mainText,
        author,
        price,
        quantity,
        category
    }
    return axios.put(URL_BACKEND, data);
}

const updateBookAPI = (_id, thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book";
    const data = {
        _id,
        thumbnail,
        mainText,
        author,
        price,
        quantity,
        category
    }
    return axios.put(URL_BACKEND, data);
}

const deleteBookAPI = (id) => {
    const URL_BACKEND = `/api/v1/book/${id}`;
    return axios.delete(URL_BACKEND);
}
//END BOOK SERVICE

export {
    createUserAPI,
    updateUserAPI,
    updateUserAvatarAPI,
    fetchUserAPI,
    deleteUserAPI,
    handleUploadFile,
    registerUserAPI,
    loginAPI,
    getAccountAPI,
    logoutAPI,
    fetchBookAPI,
    createBookAPI,
    updateBookThumbnailAPI,
    updateBookAPI,
    deleteBookAPI
}