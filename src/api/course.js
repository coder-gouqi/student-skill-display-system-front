import { get, getDownload, post } from '@/api/http';

export const courseAdd = (params) => post('/course/add', params);

export const courseUpdate = (params) => post('/course/update', params);

export const courseDelete = (params) => post('/course/delete', params);

export const courseQuery = (params) => post('/course/list/page', params);

export const courseSelectAll = () => get('/course/select');

export const courseUpload = (params) => post('/file/upload', params);

export const courseExport = () => getDownload('/excel/export?type=course');
