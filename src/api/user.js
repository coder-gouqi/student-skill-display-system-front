import { get, post } from '@/api/http';

export const userLogin = (params) => post('/user/login', params);

export const userLogout = () => post('/user/logout');

export const userGetLogin = () => get('/user/get/login');

