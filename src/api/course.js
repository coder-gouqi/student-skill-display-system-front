import { post } from '@/api/http';

export const courseAdd = (params) => post('/course/add', params);

export const courseUpdate = (params) => post('/course/update', params);

export const courseDelete = (params) => post('/course/delete', params);

export const courseQuery = (params) => post('/course/list/page', params);

export const courseUpload = (params) => post('/file/upload', params);
