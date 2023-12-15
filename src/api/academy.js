import { get, post } from '@/api/http';

export const academyAdd = (params) => post('/academy/add', params);

export const academyUpdate = (params) => post('/academy/update', params);

export const academyDelete = (params) => post('/academy/delete', params);

export const academyQuery = (params) => post('/academy/list/page', params);

export const academySelectAll = () => get('/academy/select');

export const academyUpload = (params) => post('/file/upload', params);
