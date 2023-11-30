import axios from 'axios';

const request = axios.create({
    // 后端接口地址和调用的路径进行拼接
    // 线上地址
    // baseURL: 'http://xx.xx.xx.xx:8080/api/',
    // 本地开发地址
    baseURL: 'http://localhost:8080/system/',
    //访问超时时间是5秒s
    timeout: 5000
});

//线上图片访问地址
export const hostUrl = 'http://localhost:8080/system/';

/**
 * 封装get方法
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        request
            .get(url, { params: params })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * 封装post方法
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        request
            .post(url, data)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export const itemAdd = (params) => post('/item/add', params);

export const itemUpdate = (params) => post('/item/update', params);

export const itemDelete = (params) => post('/item/delete', params);

export const itemQuery = (params) => post('/item/list/page', params);

export const itemUpload = (params) => post('/file/upload', params);

export const DataList = () => get('/data/list');

export default request;
