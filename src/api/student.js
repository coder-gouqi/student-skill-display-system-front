import { get, getDownload, post } from '@/api/http';

export const studentAdd = (params) => post('/student/add', params);

export const studentUpdate = (params) => post('/student/update', params);

export const studentDelete = (params) => post('/student/delete', params);

export const studentQuery = (params) => post('/student/list/page', params);

export const studentSelectAll = () => get('/student/select');

export const studentUpload = (params) => post('/file/upload', params);

export const studentExport = () => getDownload('/excel/export?type=user');
