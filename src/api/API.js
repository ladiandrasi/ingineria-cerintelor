import axios from 'axios';

class API {
    constructor() {
        this._axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
        };
        this._axios = axios.create(this._axiosConfig);
        this.request = this.request.bind(this);
    }

    request(method, url, params = {}, data, headers) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this._axios.request({
                    method, url, params, data,
                });
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default new API();
