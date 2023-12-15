import { get, post } from '@/api/http';

export const skillAdd = (params) => post('/skill/add', params);

export const skillUpdate = (params) => post('/skill/update', params);

export const skillDelete = (params) => post('/skill/delete', params);

export const skillQuery = (params) => post('/skill/list/page', params);

export const skillSelectAll = () => get('/skill/select');

export const skillUpload = (params) => post('/file/upload', params);
