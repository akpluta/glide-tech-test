import axios from "axios";

export class BaseClient {
    API_BASE_URL = 'http://127.0.0.1:8000/api'

    getResourceUrl(path) {
        return `${this.API_BASE_URL}${path}`
    }

    /**
     * @param {string} path
     * @param {object|null} params
     * @returns {Promise<AxiosResponse<any>> | *}
     */
    get(path, params = {}) {
        return axios({
            url: this.getResourceUrl(path),
            method: 'get',
            params,
        })
    }

    /**
     * @param {string} path
     * @param {object|array|null} data
     * @returns {Promise<AxiosResponse<any>> | *}
     */
    post(path, data = {}) {
        return axios({
            url: this.getResourceUrl(path),
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data,
        })
    }

    /**
     * Custom error handler for Axios requests
     *
     * @param {AxiosError} error
     * @param {({httpStatus: number, message: string, response: object}) => void} rejectCallback
     * @returns {(function(axios.AxiosError): void)|*}
     */
    errorHandler(error, rejectCallback) {
        rejectCallback({
            httpStatus: error.status,
            message: error.message,
            response: error.response
        })
    }
}
