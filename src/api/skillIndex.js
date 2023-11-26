import { post } from '@/api/http';

export const skillIndexAdd = (params) => post('/skillIndex/add', params);

export const skillIndexUpdate = (params) => post('/skillIndex/update', params);

export const skillIndexDelete = (params) => post('/skillIndex/delete', params);

export const skillIndexQuery = (params) => post('/skillIndex/list/page', params);

export const skillIndexUpload = (params) => post('/file/upload', params);
