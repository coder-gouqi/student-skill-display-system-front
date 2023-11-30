import { post } from '@/api/http';

export const userLogin = (params) => post('/user/login', params);

export const userLogout = () => post('/user/logout');
