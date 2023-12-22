import axios from 'axios';

const request = axios.create({
    // 后端接口地址和调用的路径进行拼接
    // 线上地址
    baseURL: 'http://43.136.130.87:8080/system/',
    // 本地开发地址
    // baseURL: 'http://localhost:8080/system/',
    //访问超时时间是5秒s
    timeout: 5000,
    withCredentials: true,
    AccessControlAllowCredentials: true
});

//线上图片访问地址
export const hostUrl = 'http://43.136.130.87/';

/**
 * 封装get方法
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        request
            .get(url, {
                params: params,
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
/**
 * 封装get方法(下载文件)
 */
export function getDownload(url, params = {}) {
    return new Promise((resolve, reject) => {
        request
            .get(url, {
                params: params,
                responseType: 'blob'
            })
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

export function exportFile(content, customFileName, type) {
    let blob = new Blob([content], { type: type || 'application/vnd.ms-excel' }); // 默认excel
    let filename = content.filename || customFileName;
    let URL = window.URL || window.webkitURL;
    let objectUrl = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
}


export default request;
