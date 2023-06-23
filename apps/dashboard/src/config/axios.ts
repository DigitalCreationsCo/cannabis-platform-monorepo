import axios from "axios";

const instance = axios.create({
    timeout: 3000,
    // validateStatus: (status: number) => (status >= 200 && status < 300) || status === 404
    validateStatus: status => true
})

instance.interceptors.response.use(success => {
    return Promise.resolve(success)
}, error => {
    if (error.code === 'ECONNREFUSED')
        return Promise.reject({
            ...error,
            success: false,
            message: 'The server is not available. Please try again later.'
        });

    return Promise.reject(error)
})

export { instance as axios };
